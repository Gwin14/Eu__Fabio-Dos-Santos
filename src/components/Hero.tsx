"use client";

import { useEffect, useRef, useState } from "react";
import { contact, grades, hero, ui } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { floripaTime, isGoldenHour, sunAltitude } from "@/lib/sun";
import GradedPortrait from "./GradedPortrait";
import DecryptedText from "./DecryptedText";
import Magnet from "./Magnet";

function Corner({ className }: { className: string }) {
  return (
    <svg className={`absolute h-5 w-5 text-[var(--ink)] ${className}`} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M1 8V1h7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const [gradeId, setGradeId] = useState("komorebi");
  const [sun, setSun] = useState<{ alt: number; time: string } | null>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const userPicked = useRef(false);

  // Luz real de Florianópolis agora: na hora dourada, a foto abre no look "Hora dourada".
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const alt = sunAltitude(now);
      setSun({ alt, time: floripaTime(now) });
      if (!userPicked.current && isGoldenHour(alt)) setGradeId("dourada");
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  // Timecode de gravação, escrito direto no DOM (24 fps sem re-render)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const start = performance.now();
    let raf = 0;
    const pad = (n: number) => String(n).padStart(2, "0");
    const loop = (now: number) => {
      const f = Math.floor(((now - start) / 1000) * 24);
      const s = Math.floor(f / 24);
      if (tcRef.current) tcRef.current.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f % 24)}`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const grade = grades.find((g) => g.id === gradeId) ?? grades[1];
  const golden = sun ? isGoldenHour(sun.alt) : false;
  const sunLine = sun
    ? (sun.alt >= 0 ? t(ui.sunUp) : t(ui.sunDown)).replace("{deg}", String(Math.abs(Math.round(sun.alt))))
    : "";

  return (
    <section id="inicio" aria-labelledby="hero-h" className="relative min-h-[100svh] pb-14 pt-24 lg:pt-28">
      {/* vazamento de luz que acompanha o sol real */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(60% 55% at 78% 30%, rgb(240 162 59 / ${golden ? 0.2 : 0.09}), transparent 70%)`,
        }}
      />
      <div className="wrap grid items-center gap-x-14 gap-y-10 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <p className="enter-fade mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--ink-2)]" style={{ animationDelay: "0ms" }}>
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--ok)] opacity-40 motion-reduce:hidden" />
              <span className="relative h-2 w-2 rounded-full bg-[var(--ok)]" />
            </span>
            {t(ui.available)}
            <span className="text-[var(--muted)]">· {contact.city}</span>
          </p>

          <h1 id="hero-h" className="font-[family-name:var(--font-display)] font-semibold tracking-[-0.045em]">
            <span className="enter-line text-[clamp(56px,10.5vw,152px)] leading-[0.88]">
              <span style={{ animationDelay: "60ms" }}>Fábio</span>
            </span>
            <span className="enter-line text-[clamp(56px,10.5vw,152px)] leading-[0.88]">
              <span style={{ animationDelay: "140ms" }}>Santos</span>
            </span>
            <span className="enter-line mt-5 text-[clamp(22px,2.4vw,32px)] leading-tight tracking-[-0.02em] text-[var(--ink-2)]">
              <span style={{ animationDelay: "220ms" }}>{t(hero.role)}</span>
            </span>
          </h1>

          <p className="lead enter-fade mt-6" style={{ animationDelay: "560ms" }}>
            {t(hero.lead)}
          </p>

          <div className="enter-fade mt-9 flex flex-wrap gap-3 max-sm:flex-col" style={{ animationDelay: "620ms" }}>
            <Magnet padding={40} magnetStrength={6} tilt={0} scale={1} wrapperClassName="max-sm:w-full" innerClassName="max-sm:w-full">
              <a href={`mailto:${contact.email}`} className="btn max-sm:w-full">
                {t(ui.emailMe)}
                <svg className="m-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnet>
            <a href="/cv" className="btn btn--ghost max-sm:w-full">
              {t(ui.seeCv)}
            </a>
          </div>

          <p className="enter-fade mt-8 max-w-[56ch] font-mono text-[12.5px] leading-relaxed text-[var(--muted)]" style={{ animationDelay: "680ms" }}>
            {t(hero.fact)}
          </p>
        </div>

        {/* Visor de câmera com a foto revelada ao vivo em WebGL */}
        <div className="min-w-0 lg:justify-self-end">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[540px] overflow-hidden rounded-[var(--radius)] bg-[var(--bg-3)] lg:max-h-[66svh] lg:w-auto">
            <div className="enter-media absolute inset-0">
              <GradedPortrait
                src="/img/fabio.jpg"
                alt={lang === "pt" ? "Fábio Santos sorrindo numa praia de Florianópolis, céu azul ao fundo" : "Fábio Santos smiling on a beach in Florianópolis, blue sky behind"}
                grade={grade}
                compareLabel={t(ui.dragCompare)}
              />
            </div>
            {/* HUD */}
            <div className="pointer-events-none absolute inset-0 z-20 p-4 font-mono text-[10px] uppercase sm:text-[11px] tracking-[0.08em] text-white/90 [text-shadow:0_1px_2px_rgb(0_0_0/0.6)]" aria-hidden="true">
              <Corner className="left-3 top-3" />
              <Corner className="right-3 top-3 rotate-90" />
              <Corner className="bottom-3 right-3 rotate-180" />
              <Corner className="bottom-3 left-3 -rotate-90" />
              <div className="flex items-center justify-between px-3 pt-2">
                <span className="flex items-center gap-2">
                  <span className="rec-dot" />
                  REC <span ref={tcRef}>00:00:00:00</span>
                </span>
                <span className="max-sm:hidden">ISO 100 · 1/250 · ƒ1.8</span>
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 px-3 pb-2">
                <span className="max-w-[60%] leading-relaxed">
                  {sun && (
                    <>
                      FLN {sun.time}
                      <br />
                      <span className={golden ? "text-[var(--accent)]" : undefined}>{golden ? t(ui.goldenHour) : sunLine}</span>
                    </>
                  )}
                </span>
                <span className="text-right">
                  LUT ·{" "}
                  <DecryptedText key={grade.id} text={t(grade.label)} animateOn="view" speed={40} maxIterations={8} sequential revealDirection="start" className="text-[var(--accent)]" encryptedClassName="text-white/50" />
                </span>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-4 w-full max-w-[540px]">
            <div role="radiogroup" aria-label={t(ui.gradeLabel)} className="flex flex-wrap gap-1.5">
              {grades.map((g) => {
                const on = g.id === gradeId;
                return (
                  <button
                    key={g.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => {
                      userPicked.current = true;
                      setGradeId(g.id);
                    }}
                    className="h-11 cursor-pointer rounded-full border px-3 font-mono text-[11.5px] transition-[background-color,border-color,color] duration-150"
                    style={{
                      background: on ? "var(--ink)" : "transparent",
                      color: on ? "var(--bg)" : "var(--ink-2)",
                      borderColor: on ? "var(--ink)" : "var(--line-2)",
                    }}
                  >
                    {t(g.label)}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 font-mono text-[11.5px] text-[var(--muted)]">
              {lang === "pt" ? "Revelação ao vivo em WebGL, como no Lutra e no Komorebi. " : "Live WebGL grading, as in Lutra and Komorebi. "}
              {t(ui.dragCompare)}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
