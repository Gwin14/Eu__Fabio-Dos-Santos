"use client";

import { useEffect, useRef, useState } from "react";
import { inboxMock, omnichannel, ui } from "@/content/site";
import { useLang } from "@/lib/i18n";
import BrandIcon from "./BrandIcon";

function ChannelIcon({ channel, size = 14 }: { channel: string; size?: number }) {
  if (channel === "whatsapp") return <BrandIcon name="siWhatsapp" size={size} />;
  if (channel === "instagram") return <BrandIcon name="siInstagram" size={size} mono />;
  if (channel === "messenger") return <BrandIcon name="siMessenger" size={size} />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Site" role="img">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** A caixa de entrada do produto, recriada em HTML: as mensagens chegam em ciclo. */
function InboxMock() {
  const { t, lang } = useLang();
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const steps = inboxMock.thread.length + 2; // + digitando + pausa final

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- movimento reduzido mostra tudo parado
      setStep(steps);
      return;
    }
    if (paused) return;
    let visible = true;
    const io = new IntersectionObserver((e) => (visible = e[0]?.isIntersecting ?? true));
    if (ref.current) io.observe(ref.current);
    const id = window.setInterval(() => {
      if (visible) setStep((s) => (s >= steps ? 0 : s + 1));
    }, 1600);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [paused, steps]);

  // passo 0: 1 msg; 1: digitando; 2: resposta IA; 3: cliente; 4: proteção; 5: pausa
  const shown = step === 0 ? 1 : step === 1 ? 1 : Math.min(inboxMock.thread.length, step);
  const typing = step === 1;

  return (
    <div ref={ref} className="card overflow-hidden" aria-label={lang === "pt" ? "Demonstração da caixa de entrada" : "Inbox demo"} role="group">
      {/* barra da janela */}
      <div className="flex h-10 items-center gap-2 border-b border-[var(--line)] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 font-mono text-[11px] text-[var(--muted)]">/inbox</span>
      </div>
      <div className="grid h-[400px] grid-cols-1 sm:h-[440px] sm:grid-cols-[210px_1fr] xl:grid-cols-[120px_210px_1fr]">
        {/* filas */}
        <div className="hidden flex-col gap-1 border-r border-[var(--line)] p-3 xl:flex">
          {inboxMock.queues[lang].map((q, i) => (
            <div key={q} className="flex items-center justify-between rounded-md px-2 py-1.5 text-[12px]" style={{ background: i === 0 ? "rgb(236 230 218 / 0.07)" : undefined, color: i === 0 ? "var(--ink)" : "var(--muted)" }}>
              {q}
              <span className="font-mono text-[10px]">{[12, 4, 7, 0][i] || ""}</span>
            </div>
          ))}
        </div>
        {/* conversas */}
        <div className="hidden flex-col border-r border-[var(--line)] sm:flex">
          {inboxMock.convos.map((c, i) => (
            <div key={i} className="flex gap-3 border-b border-[var(--line)] px-3 py-3" style={{ background: i === 0 ? "rgb(240 162 59 / 0.07)" : undefined }}>
              <span className="mt-0.5 text-[var(--ink-2)]">
                <ChannelIcon channel={c.channel} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[12.5px] font-medium">{typeof c.name === "string" ? c.name : t(c.name)}</span>
                  <span className="font-mono text-[10px] text-[var(--muted)]">{c.time}</span>
                </span>
                <span className="block truncate text-[12px] text-[var(--muted)]">{t(c.preview)}</span>
              </span>
            </div>
          ))}
        </div>
        {/* conversa aberta */}
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2.5">
            <span className="flex items-center gap-2 text-[13px] font-medium">
              <ChannelIcon channel="whatsapp" /> Marina Alves
            </span>
            <span
              className="chip transition-[color,border-color] duration-200"
              style={{ color: shown >= 4 ? "var(--ink-2)" : "var(--ok)", borderColor: shown >= 4 ? "var(--line)" : "rgb(87 194 138 / 0.4)" }}
            >
              {shown >= 4 ? t(inboxMock.handoff) : t(inboxMock.aiOn)}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden p-4">
            {inboxMock.thread.slice(0, shown).map((m, i) => (
              <div
                key={`${i}-${step === 0 ? "a" : "b"}`}
                className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${m.from === "client" ? "self-start bg-[var(--bg-3)]" : m.from === "ai" ? "self-end bg-[var(--accent)] text-[var(--accent-ink)]" : "self-center border border-dashed border-[var(--rec)]/60 bg-[rgb(229_72_77/0.08)] text-[12px] text-[#f3a7a9]"}`}
                style={{ animation: "msgIn 240ms var(--ease-enter) both" }}
              >
                {m.from === "guard" && <span className="mr-1.5 font-mono text-[10px] uppercase tracking-wider">⛨</span>}
                {t(m.text)}
                {"source" in m && m.source && <span className="mt-1.5 block font-mono text-[10px] opacity-70">{t(m.source)}</span>}
              </div>
            ))}
            {typing && (
              <div className="self-end rounded-2xl bg-[var(--bg-3)] px-3.5 py-2.5 font-mono text-[11px] text-[var(--muted)]" style={{ animation: "msgIn 200ms var(--ease-enter) both" }}>
                {t(inboxMock.typing)}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 border-t border-[var(--line)] p-3">
            <span className="h-9 flex-1 rounded-full border border-[var(--line)] px-4 text-[12px] leading-9 text-[var(--muted)]">
              {lang === "pt" ? "Responder como equipe…" : "Reply as the team…"}
            </span>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="pointer-events-auto grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[var(--line-2)] text-[var(--ink-2)]"
              aria-label={paused ? (lang === "pt" ? "Continuar animação" : "Play animation") : lang === "pt" ? "Pausar animação" : "Pause animation"}
            >
              {paused ? (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7-4.5z" fill="currentColor" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes msgIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }`}</style>
    </div>
  );
}

export default function Omnichannel() {
  const { t } = useLang();
  return (
    <section id="omnichannel" aria-labelledby="omni-h" className="screen">
      <div className="wrap grid items-center gap-x-14 gap-y-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 id="omni-h" className="h2">
            {t(omnichannel.title)}
          </h2>
          <p className="eyebrow mt-5">{t(omnichannel.kicker)}</p>
          <p className="lead mt-5">{t(omnichannel.lead)}</p>
          <ul className="mt-7 space-y-3">
            {omnichannel.points.map((p, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-[var(--ink-2)]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                {t(p)}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-2">
            {omnichannel.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          <a href={omnichannel.url} target="_blank" rel="noopener" className="btn btn--ghost mt-8">
            {t(ui.live)}
            <svg className="m-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <InboxMock />
      </div>
    </section>
  );
}
