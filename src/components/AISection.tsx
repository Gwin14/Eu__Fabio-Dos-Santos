"use client";

import { useRef, useState, type FormEvent } from "react";
import { aiIntro } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { localAnswer } from "@/lib/localAnswer";
import BrandIcon from "./BrandIcon";

type Msg = { role: "user" | "assistant"; content: string; offline?: boolean };

function AskPanel() {
  const { t, lang } = useLang();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => requestAnimationFrame(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight }));

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || busy) return;
    setErr("");
    setQ("");
    setBusy(true);
    const history = msgs.filter((m) => !m.offline).map(({ role, content }) => ({ role, content }));
    setMsgs((m) => [...m, { role: "user", content: text }, { role: "assistant", content: "" }]);
    scrollDown();

    const fallback = () => {
      setMsgs((m) => {
        const next = [...m];
        next[next.length - 1] = { role: "assistant", content: localAnswer(text, lang), offline: true };
        return next;
      });
    };

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, history }),
      });
      if (res.status === 503 || !res.body) {
        fallback();
        return;
      }
      if (!res.ok) {
        setErr(t(aiIntro.askError));
        fallback();
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        const shown = acc.replace(/\n\[(error|busy|refusal)\]$/, "");
        setMsgs((m) => {
          const next = [...m];
          next[next.length - 1] = { role: "assistant", content: shown };
          return next;
        });
        scrollDown();
      }
      if (/\[(error|busy|refusal)\]$/.test(acc)) {
        setErr(t(aiIntro.askError));
        fallback();
      }
    } catch {
      setErr(t(aiIntro.askError));
      fallback();
    } finally {
      setBusy(false);
      scrollDown();
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(q);
  };

  return (
    <div className="card flex h-full min-h-[480px] flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-4">
        <div>
          <h3 className="text-[17px] font-semibold">{t(aiIntro.askTitle)}</h3>
          <p className="mt-0.5 text-[13px] text-[var(--muted)]">{t(aiIntro.askLead)}</p>
        </div>
        <span className="text-[var(--ink-2)]">
          <BrandIcon name="siClaude" size={22} />
        </span>
      </div>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-5" aria-live="polite">
        {msgs.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {aiIntro.suggestions[lang].map((s) => (
              <button key={s} type="button" onClick={() => ask(s)} className="btn btn--ghost btn--sm h-11 whitespace-normal text-left">
                {s}
              </button>
            ))}
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed ${m.role === "user" ? "bg-[var(--ink)] text-[var(--bg)]" : "bg-[var(--bg-3)] text-[var(--ink)]"}`}
            >
              {m.offline && <span className="mb-1.5 block font-mono text-[11px] text-[var(--muted)]">{t(aiIntro.askOffline)}</span>}
              {m.content || <span className="inline-block h-4 w-2 animate-pulse bg-[var(--accent)] align-middle" aria-label="…" />}
            </div>
          </div>
        ))}
        {err && <p className="text-[13px] text-[#f3a7a9]">{err}</p>}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2 border-t border-[var(--line)] p-3">
        <label htmlFor="ask-input" className="sr-only">
          {t(aiIntro.askLabel)}
        </label>
        <input
          id="ask-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          maxLength={400}
          placeholder={t(aiIntro.askPlaceholder)}
          className="h-12 min-w-0 flex-1 rounded-full border border-[var(--line-2)] bg-transparent px-5 text-[15px] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgb(240_162_59/0.18)]"
        />
        <button type="submit" disabled={busy || !q.trim()} className="btn h-12 disabled:cursor-not-allowed disabled:opacity-50">
          {t(aiIntro.askSend)}
        </button>
      </form>
    </div>
  );
}

export default function AISection() {
  const { t } = useLang();
  return (
    <section id="ia" aria-labelledby="ia-h" className="screen">
      <div className="wrap grid gap-x-14 gap-y-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 id="ia-h" className="h2">
            {t(aiIntro.title)}
          </h2>
          <p className="lead mt-6">{t(aiIntro.lead)}</p>
          <ol className="mt-10 space-y-7">
            {aiIntro.items.map((it, i) => (
              <li key={i} className="grid grid-cols-[44px_1fr] gap-4 border-t border-[var(--line)] pt-6">
                <span className="font-mono text-[13px] text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[18px] font-semibold tracking-tight">{t(it.title)}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--ink-2)]">{t(it.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <AskPanel />
      </div>
    </section>
  );
}
