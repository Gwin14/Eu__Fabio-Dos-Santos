"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { contact, sections, ui } from "@/content/site";
import { useLang } from "@/lib/i18n";

type Item = { id: string; group: string; label: string; hint?: string };

export const openPalette = () => window.dispatchEvent(new CustomEvent("palette:open"));

export default function CommandPalette() {
  const { t, lang, setLang } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      lastFocus.current?.focus?.();
    }, 120);
  }, []);

  const show = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement;
    setQ("");
    setActive(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, [open, close, show]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.documentElement.style.overflow = "hidden";
    } else document.documentElement.style.overflow = "";
  }, [open]);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1800);
  };

  const nav = lang === "pt" ? "Seções" : "Sections";
  const act = lang === "pt" ? "Ações" : "Actions";
  const items: Item[] = [
    ...sections.map((s, i) => ({ id: s.id, group: nav, label: t(s.label), hint: String(i + 1).padStart(2, "0") })),
    { id: "copy", group: act, label: t(ui.copy), hint: contact.email },
    { id: "mail", group: act, label: t(ui.emailMe) },
    { id: "ask", group: act, label: lang === "pt" ? "Perguntar à IA sobre o Fábio" : "Ask the AI about Fábio" },
    { id: "lang", group: act, label: lang === "pt" ? "Switch to English" : "Mudar para português", hint: lang === "pt" ? "EN" : "PT" },
    { id: "cv", group: "Links", label: t(ui.seeCv), hint: "/cv" },
    { id: "li", group: "Links", label: "LinkedIn", hint: "fabio-santos14" },
    { id: "gh", group: "Links", label: "GitHub", hint: "Gwin14" },
    { id: "wa", group: "Links", label: "WhatsApp", hint: contact.phoneDisplay },
  ];

  const run = (id: string) => {
    const scrollTo = (target: string, after?: () => void) => {
      close();
      window.setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
        if (after) window.setTimeout(after, 500);
      }, 130);
    };
    if (sections.some((s) => s.id === id)) return scrollTo(id);
    switch (id) {
      case "copy":
        navigator.clipboard?.writeText(contact.email);
        flash(t(ui.copied));
        return close();
      case "mail":
        window.location.assign(`mailto:${contact.email}`);
        return close();
      case "ask":
        return scrollTo("ia", () => document.getElementById("ask-input")?.focus({ preventScroll: true }));
      case "lang":
        setLang(lang === "pt" ? "en" : "pt");
        return close();
      case "cv":
        close();
        return router.push("/cv");
      case "li":
        return window.open(contact.linkedin, "_blank", "noopener");
      case "gh":
        return window.open(contact.github, "_blank", "noopener");
      case "wa":
        return window.open(contact.whatsapp, "_blank", "noopener");
    }
  };

  const filtered = useMemo(() => {
    const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
    const n = norm(q.trim());
    return n ? items.filter((i) => norm(`${i.label} ${i.hint ?? ""} ${i.group}`).includes(n)) : items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, q]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) run(filtered[active].id);
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm max-sm:items-stretch max-sm:p-0"
          style={{ animation: `${closing ? "palOut" : "palIn"} ${closing ? 120 : 200}ms var(--ease) forwards` }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t(ui.palette)}
            onKeyDown={onKey}
            className="w-full max-w-[560px] overflow-hidden rounded-[var(--radius)] border border-[var(--line-2)] bg-[var(--bg-2)] shadow-2xl max-sm:max-w-none max-sm:rounded-none max-sm:border-0"
            style={{ animation: `${closing ? "palDropOut" : "palDrop"} ${closing ? 120 : 200}ms var(--ease) forwards` }}
          >
            <div className="flex items-center gap-3 border-b border-[var(--line)] px-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-[var(--muted)]">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <label htmlFor="palette-input" className="sr-only">
                {t(ui.palette)}
              </label>
              <input
                id="palette-input"
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                placeholder={t(ui.palette)}
                autoComplete="off"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={filtered[active] ? `pal-${filtered[active].id}` : undefined}
                className="h-14 w-full bg-transparent text-[16px] text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
              />
              <button type="button" onClick={close} className="chip h-11 min-w-11 cursor-pointer justify-center" aria-label={t(ui.close)}>
                Esc
              </button>
            </div>
            <ul id="palette-list" role="listbox" className="max-h-[60vh] overflow-y-auto p-2 max-sm:max-h-[calc(100svh-56px)]">
              {filtered.map((it, i) => {
                const header = it.group !== lastGroup ? it.group : null;
                lastGroup = it.group;
                return (
                  <li key={it.id} role="presentation">
                    {header && <div className="eyebrow px-3 pb-1 pt-3">{header}</div>}
                    <div
                      id={`pal-${it.id}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(it.id)}
                      className="flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-[var(--radius-sm)] px-3 text-[15px]"
                      style={{ background: i === active ? "rgb(236 230 218 / 0.07)" : undefined }}
                    >
                      <span>{it.label}</span>
                      {it.hint && <span className="truncate font-mono text-[12px] text-[var(--muted)]">{it.hint}</span>}
                    </div>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-[var(--muted)]">{lang === "pt" ? "Nada encontrado" : "Nothing found"}</li>
              )}
            </ul>
          </div>
        </div>
      )}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--bg)]"
        style={{ opacity: toast ? 1 : 0, transform: `translate(-50%, ${toast ? 0 : 8}px)`, transition: "opacity 150ms var(--ease), transform 150ms var(--ease)" }}
      >
        {toast}
      </div>
      <style>{`
        @keyframes palIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes palOut { from { opacity: 1 } to { opacity: 0 } }
        @keyframes palDrop { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: none } }
        @keyframes palDropOut { from { opacity: 1; transform: none } to { opacity: 0; transform: translateY(-6px) } }
      `}</style>
    </>
  );
}
