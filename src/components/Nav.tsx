"use client";

import { useEffect, useState } from "react";
import { contact, sections, ui } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { openPalette } from "./CommandPalette";

export function Monogram({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="9.5" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2.4" opacity="0.7" />
      <circle cx="16" cy="16" r="3" fill="var(--accent)" />
    </svg>
  );
}

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [current, setCurrent] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = sections.findIndex((s) => s.id === e.target.id);
            if (i >= 0) setCurrent(i);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header
      className="no-print fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200"
      style={{
        background: scrolled ? "rgb(13 12 10 / 0.78)" : "transparent",
        borderColor: scrolled ? "var(--line)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(1.2)" : undefined,
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(1.2)" : undefined,
      }}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#inicio" className="flex min-h-11 items-center gap-3 font-medium" aria-label="Fábio Santos, início">
          <Monogram />
          <span className="tracking-tight max-sm:hidden">Fábio Santos</span>
        </a>

        <div className="hidden items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--muted)] lg:flex" aria-hidden="true">
          <span className="text-[var(--ink)]">FR {String(current + 1).padStart(2, "0")}</span>
          <span className="relative h-px w-24 bg-[var(--line-2)]">
            <span
              className="absolute inset-y-0 left-0 w-full origin-left bg-[var(--accent)]"
              style={{ transform: `scaleX(${(current + 1) / sections.length})`, transition: "transform var(--m-slide) var(--ease-io)" }}
            />
          </span>
          <span>{t(sections[current].label)}</span>
        </div>

        <nav className="flex items-center gap-2" aria-label={lang === "pt" ? "Ações" : "Actions"}>
          <div className="flex h-10 items-center rounded-full border border-[var(--line)] p-1 font-mono text-[12px]" role="group" aria-label="Idioma / Language">
            {(["pt", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className="h-8 min-w-10 cursor-pointer rounded-full px-2 uppercase transition-[background-color,color] duration-150"
                style={{ background: lang === l ? "var(--ink)" : "transparent", color: lang === l ? "var(--bg)" : "var(--muted)" }}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={openPalette}
            className="btn btn--ghost btn--sm max-md:!hidden"
            aria-label={t(ui.palette)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <kbd className="font-mono text-[12px] text-[var(--muted)]">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <a href={`mailto:${contact.email}`} className="btn btn--sm max-md:!hidden">
            {t(ui.emailMe)}
          </a>
          <button
            type="button"
            onClick={openPalette}
            className="btn btn--ghost btn--sm h-11 md:!hidden"
            aria-haspopup="dialog"
            aria-expanded="false"
          >
            {t(ui.menu)}
          </button>
        </nav>
      </div>
    </header>
  );
}
