import type { Lang } from "@/content/site";

// Índice local usado quando a API do Claude não está configurada ou falha.
type Entry = { keys: string[]; pt: string; en: string };

const entries: Entry[] = [
  {
    keys: ["ia", "ai", "inteligencia", "intelligence", "gemini", "claude", "llm", "gpt", "agente", "agent", "mcp"],
    pt: "Na central omnichannel, o Gemini responde clientes só com o que está na base de conhecimento, com proteções e registro de cada decisão. No Komorebi, o Gemini gera LUTs a partir de uma descrição e analisa a composição da foto. O Snaption resume páginas com IA antes de salvar no Notion. No desenvolvimento, ele trabalha com agentes de código como o Claude Code e servidores MCP.",
    en: "In the omnichannel hub, Gemini answers customers only from the knowledge base, with guardrails and a log of every decision. In Komorebi, Gemini generates LUTs from a description and analyzes photo composition. Snaption summarizes pages with AI before saving them to Notion. For development, he works with coding agents like Claude Code and MCP servers.",
  },
  {
    keys: ["react native", "expo", "mobile", "ios", "android", "swift", "kotlin", "app", "apps", "celular"],
    pt: "Sim. Ele fez cinco apps em Expo e React Native: Komorebi (câmera), Hikari (editor RAW), Lutra (grading de vídeo log), Teto (condições de voo para drones) e Solune (sol e lua em AR). Quando precisa, escreve módulos nativos em Swift e Kotlin, além de widgets e Live Activities no iOS.",
    en: "Yes. He built five Expo and React Native apps: Komorebi (camera), Hikari (RAW editor), Lutra (log video grading), Teto (drone flight conditions) and Solune (sun and moon in AR). When needed he writes native modules in Swift and Kotlin, plus iOS widgets and Live Activities.",
  },
  {
    keys: ["backend", "back-end", "api", "banco", "database", "supabase", "postgres", "sql", "django", "spring", "node", "servidor", "server"],
    pt: "No back-end ele usa Supabase com Postgres, RLS, Realtime e Edge Functions (central omnichannel multi-tenant e Cantos do Litoral), Django (Snaption, Prismo, Hermes), Spring Boot em Java (pizzaria full stack), Node.js e Hono com SQLite (MyndShelf), além de um servidor WebSocket autoritativo para um jogo multiplayer.",
    en: "On the back end he uses Supabase with Postgres, RLS, Realtime and Edge Functions (the multi-tenant omnichannel hub and Cantos do Litoral), Django (Snaption, Prismo, Hermes), Spring Boot in Java (full stack pizzeria), Node.js and Hono with SQLite (MyndShelf), plus an authoritative WebSocket server for a multiplayer game.",
  },
  {
    keys: ["ingles", "english", "idioma", "language", "fala", "speak"],
    pt: "Português nativo e inglês avançado, com certificação de Inglês Avançado pela Rockfeller.",
    en: "Native Portuguese and advanced English, with an Advanced English certificate from Rockfeller.",
  },
  {
    keys: ["experiencia", "experience", "trabalho", "work", "emprego", "job", "santos", "supermercado", "kharitas"],
    pt: "Desde julho de 2024 ele trabalha na TI da Santos Supermercados: manutenção de computadores, impressoras e rede, suporte às unidades e desenvolvimento de sites e programas internos. Antes foi designer de estampas na Kharitas (2023–2024) e copeiro no Hotel Pousada Santos (2022–2023).",
    en: "Since July 2024 he has worked in IT at Santos Supermercados: computer, printer and network maintenance, store support, and building internal websites and programs. Before that he was a print designer at Kharitas (2023–2024) and pantry staff at Hotel Pousada Santos (2022–2023).",
  },
  {
    keys: ["formacao", "education", "faculdade", "curso", "degree", "senac", "estudo", "certific"],
    pt: "Ele cursa Análise e Desenvolvimento de Sistemas no Senac Santa Catarina desde 2024 e fez o Técnico Integrado em Desenvolvimento de Jogos Digitais no Senac (2020–2022). Tem certificações em Modelagem de Software e Programação de Soluções Computacionais (Unisul), Hackatruck MakerSpace e Inglês Avançado (Rockfeller).",
    en: "He has been studying Systems Analysis and Development at Senac Santa Catarina since 2024 and completed a technical high school in Digital Game Development at Senac (2020–2022). He holds certificates in Software Modeling and Computational Solutions Programming (Unisul), Hackatruck MakerSpace and Advanced English (Rockfeller).",
  },
  {
    keys: ["contato", "contact", "email", "e-mail", "telefone", "phone", "whatsapp", "linkedin", "falar", "reach", "hire", "contratar"],
    pt: "E-mail: contato@fabiosantos.dev.br. WhatsApp: (48) 98450-5685. LinkedIn: linkedin.com/in/fabio-santos14. GitHub: github.com/Gwin14.",
    en: "Email: contato@fabiosantos.dev.br. WhatsApp: +55 48 98450-5685. LinkedIn: linkedin.com/in/fabio-santos14. GitHub: github.com/Gwin14.",
  },
  {
    keys: ["remoto", "remote", "onde", "where", "cidade", "city", "florianopolis", "mora", "live", "located"],
    pt: "Ele mora em Florianópolis, SC, e procura vagas full stack ou mobile, remotas ou na Grande Florianópolis.",
    en: "He lives in Florianópolis, Brazil, and is looking for full stack or mobile roles, remote or in Greater Florianópolis.",
  },
  {
    keys: ["rust", "tauri", "desktop", "windows", "c#", "csharp", ".net", "backup"],
    pt: "No desktop: o RoboBackup, em Rust com Tauri, agenda backups do Windows pelo Robocopy e está instalado no Hotel Pousada Santos. O Teclado PDV, em C# e Windows Forms, bloqueia teclas nos caixas do supermercado.",
    en: "On desktop: RoboBackup, in Rust with Tauri, schedules Windows backups through Robocopy and is installed at Hotel Pousada Santos. Teclado PDV, in C# and Windows Forms, locks keys on the supermarket checkouts.",
  },
  {
    keys: ["next", "react", "web", "site", "frontend", "front-end", "typescript", "tailwind"],
    pt: "Na web ele usa principalmente Next.js, React e TypeScript: a central omnichannel, o site do Hotel Pousada Santos (Next.js 16, Sanity, 3 idiomas), o guia Cantos do Litoral (PWA com Supabase) e este portfólio, com WebGL e a API do Claude.",
    en: "On the web he mostly uses Next.js, React and TypeScript: the omnichannel hub, the Hotel Pousada Santos website (Next.js 16, Sanity, 3 languages), the Cantos do Litoral guide (a Supabase PWA) and this portfolio, with WebGL and the Claude API.",
  },
  {
    keys: ["jogo", "game", "godot", "unity", "gdscript"],
    pt: "Ele começou com jogos: técnico em Desenvolvimento de Jogos Digitais, jogos em Unity e Godot, o Click! Click Here! (jogo educativo sobre phishing em Godot 4.5) e um jogo de luta multiplayer online no navegador com servidor WebSocket autoritativo.",
    en: "He started with games: a technical degree in Digital Game Development, games in Unity and Godot, Click! Click Here! (an educational phishing game in Godot 4.5) and an online multiplayer browser fighting game with an authoritative WebSocket server.",
  },
];

const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function localAnswer(question: string, lang: Lang): string {
  const q = norm(question);
  let best: Entry | null = null;
  let score = 0;
  for (const e of entries) {
    const s = e.keys.reduce((acc, k) => acc + (q.includes(norm(k)) ? k.length : 0), 0);
    if (s > score) {
      score = s;
      best = e;
    }
  }
  if (!best)
    return lang === "pt"
      ? "Não achei isso no índice local. Pergunte sobre projetos, IA, mobile, back-end, experiência, formação ou contato."
      : "I couldn't find that in the local index. Ask about projects, AI, mobile, back end, experience, education or contact.";
  return best[lang];
}
