import Anthropic from "@anthropic-ai/sdk";
import { factSheet } from "@/content/site";

// Chat "Pergunte sobre mim": responde só com a ficha de fatos do portfólio.
// Sem ANTHROPIC_API_KEY, responde 503 e o cliente usa o índice local.

const MAX_QUESTION = 400;
const MAX_TURNS = 6;
const LIMIT_PER_HOUR = 20;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT_PER_HOUR;
}

const SYSTEM = `Você é o assistente do portfólio de Fábio Santos, falando com recrutadores e visitantes.
Responda apenas com base na ficha abaixo. Se a resposta não estiver na ficha, diga que não sabe e sugira o e-mail de contato.
Não invente números, empresas, datas, salários ou opiniões. Fale de Fábio na terceira pessoa.
Responda no idioma da pergunta, em no máximo 90 palavras, em texto corrido sem markdown, títulos ou listas.

<ficha>
${factSheet}
</ficha>`;

type Turn = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ offline: true }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  let body: { question?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const question = typeof body.question === "string" ? body.question.trim().slice(0, MAX_QUESTION) : "";
  if (!question) return Response.json({ error: "empty" }, { status: 400 });

  const history: Turn[] = Array.isArray(body.history)
    ? (body.history as Turn[])
        .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string")
        .slice(-MAX_TURNS)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 1200) }))
    : [];
  // a conversa precisa começar pelo usuário
  while (history.length && history[0].role !== "user") history.shift();

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const s = client.beta.messages.stream({
          model: "claude-opus-5-5",
          max_tokens: 1024, // respostas curtas por design
          output_config: { effort: "low" },
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          system: SYSTEM,
          messages: [...history, { role: "user", content: question }],
        });
        for await (const event of s) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await s.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode("\n[refusal]"));
        }
      } catch (err) {
        if (err instanceof Anthropic.RateLimitError) controller.enqueue(encoder.encode("\n[busy]"));
        else if (err instanceof Anthropic.APIError) controller.enqueue(encoder.encode("\n[error]"));
        else controller.enqueue(encoder.encode("\n[error]"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
