"use client";

import { useState } from "react";
import {
  archive,
  archiveIntro,
  careerIntro,
  certifications,
  contact,
  contactIntro,
  education,
  experience,
  footer,
  languages,
  stackGroups,
  stackIntro,
  ui,
} from "@/content/site";
import { useLang } from "@/lib/i18n";
import BrandIcon from "./BrandIcon";
import DecryptedText from "./DecryptedText";
import { ExtLink } from "./ProjectCard";
import { Monogram } from "./Nav";

export function Career() {
  const { t, lang } = useLang();
  return (
    <section id="trajetoria" aria-labelledby="career-h" className="screen">
      <div className="wrap">
        <h2 id="career-h" className="h2">
          {t(careerIntro.title)}
        </h2>
        <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <h3 className="eyebrow">{t(careerIntro.work)}</h3>
            <ol className="mt-4">
              {experience.map((e) => (
                <li key={e.org} className="grid gap-x-6 gap-y-1 border-t border-[var(--line)] py-6 sm:grid-cols-[160px_1fr]">
                  <span className="font-mono text-[13px] text-[var(--muted)]">{t(e.period)}</span>
                  <div>
                    <p className="text-[19px] font-semibold tracking-tight">
                      {t(e.role)} <span className="font-normal text-[var(--ink-2)]">· {e.org}</span>
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      {e.items[lang].map((it) => (
                        <li key={it} className="flex gap-3 text-[15px] text-[var(--ink-2)]">
                          <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-10">
            <div>
              <h3 className="eyebrow">{t(careerIntro.edu)}</h3>
              <ul className="mt-4">
                {education.map((e) => (
                  <li key={e.period.pt} className="border-t border-[var(--line)] py-5">
                    <p className="text-[17px] font-semibold leading-snug tracking-tight">{t(e.course)}</p>
                    <p className="mt-1 text-[14px] text-[var(--ink-2)]">
                      {e.org} <span className="font-mono text-[12.5px] text-[var(--muted)]">· {t(e.period)}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow">{t(careerIntro.certs)}</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {certifications.map((c) => (
                  <li key={c.name.pt} className="rounded-[var(--radius-sm)] border border-[var(--line)] px-4 py-3">
                    <p className="text-[14.5px] font-medium leading-snug">{t(c.name)}</p>
                    <p className="mt-0.5 font-mono text-[12px] text-[var(--muted)]">{c.org}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow">{t(careerIntro.langs)}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {languages.map((l) => (
                  <li key={l.name.pt} className="chip h-9 px-4 text-[13px]">
                    {t(l.name)} · <span className="text-[var(--ink)]">{t(l.level)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Stack() {
  const { t } = useLang();
  return (
    <section id="stack" aria-labelledby="stack-h" className="screen">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 id="stack-h" className="h2">
            {t(stackIntro.title)}
          </h2>
          <p className="lead lg:justify-self-end">{t(stackIntro.lead)}</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stackGroups.map((g) => (
            <div key={g.title.pt} className="card m-nolift p-5">
              <h3 className="eyebrow">{t(g.title)}</h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                {g.items.map((it) => (
                  <li key={it.name} className="flex min-h-7 items-center gap-2.5 text-[14.5px] text-[var(--ink)]">
                    {it.icon && <BrandIcon name={it.icon} size={18} />}
                    {it.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Archive() {
  const { t } = useLang();
  const [filter, setFilter] = useState("todos");
  const list = filter === "todos" ? archive : archive.filter((p) => p.tags.includes(filter));
  return (
    <section id="arquivo" aria-labelledby="archive-h" className="screen">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 id="archive-h" className="h2">
            {t(archiveIntro.title)}
          </h2>
          <p className="lead lg:justify-self-end">{t(archiveIntro.lead)}</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={t(archiveIntro.title)}>
          {archiveIntro.filters.map((f) => {
            const on = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.id)}
                className="h-11 cursor-pointer rounded-full border px-4 font-mono text-[12.5px] transition-[background-color,border-color,color] duration-150"
                style={{ background: on ? "var(--ink)" : "transparent", color: on ? "var(--bg)" : "var(--ink-2)", borderColor: on ? "var(--ink)" : "var(--line-2)" }}
              >
                {t(f.label)}
              </button>
            );
          })}
        </div>
        <ul className="mt-6">
          {list.map((p) => (
            <li key={p.id} className="grid items-center gap-x-6 gap-y-2 border-t border-[var(--line)] py-4 md:grid-cols-[230px_1fr_auto]" style={{ animation: "rowIn 240ms var(--ease-enter) both" }}>
              <span className="text-[17px] font-semibold tracking-tight">{p.name}</span>
              <span className="text-[15px] text-[var(--ink-2)]">
                {t(p.line)}
                <span className="mt-1 block font-mono text-[12px] text-[var(--muted)]">{p.stack.join(" · ")}</span>
              </span>
              <span className="flex gap-5">
                {p.url && <ExtLink href={p.url}>{t(ui.live)}</ExtLink>}
                {p.repo && <ExtLink href={p.repo}>{t(ui.code)}</ExtLink>}
              </span>
            </li>
          ))}
        </ul>
        <style>{`@keyframes rowIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
      </div>
    </section>
  );
}

export function Contact() {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <section id="contato" aria-labelledby="contact-h" className="screen flex flex-col">
      <div className="wrap flex flex-1 flex-col justify-center">
        <h2 id="contact-h" className="h2">
          {t(contactIntro.title)}
        </h2>
        <p className="lead mt-6">{t(contactIntro.lead)}</p>

        {/* momento tipográfico: o e-mail em escala de cartaz, revelado como um sinal sendo decodificado */}
        <a
          href={`mailto:${contact.email}`}
          className="mt-12 block break-all font-[family-name:var(--font-display)] text-[clamp(30px,6.6vw,104px)] font-semibold leading-[0.95] tracking-[-0.04em] transition-colors duration-150 hover:text-[var(--accent)]"
        >
          <DecryptedText text={contact.email} animateOn="view" speed={30} maxIterations={14} sequential revealDirection="start" encryptedClassName="text-[var(--muted)]" />
        </a>

        <div className="mt-10 flex flex-wrap gap-3 max-sm:flex-col">
          <a href={`mailto:${contact.email}`} className="btn max-sm:w-full">
            {t(ui.emailMe)}
          </a>
          <button type="button" onClick={copy} className="btn btn--ghost max-sm:w-full" aria-live="polite">
            {copied ? t(ui.copied) : t(ui.copy)}
          </button>
        </div>

        <ul className="mt-10 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <ExtLink href={contact.linkedin}>LinkedIn</ExtLink>
          </li>
          <li>
            <ExtLink href={contact.github}>GitHub</ExtLink>
          </li>
          <li>
            <ExtLink href={contact.whatsapp}>
              {t(contactIntro.whatsapp)} {contact.phoneDisplay}
            </ExtLink>
          </li>
          <li>
            <a href="/cv" className="inline-flex min-h-11 items-center text-[14px] font-medium">
              <span className="link">{t(ui.seeCv)}</span>
            </a>
          </li>
        </ul>

        <p className="mt-12 max-w-[60ch] border-t border-[var(--line)] pt-6 text-[15px] text-[var(--ink-2)]">
          {t(contactIntro.outside)}{" "}
          <a href={contact.photography} target="_blank" rel="noopener" className="link text-[var(--ink)]">
            {t(contactIntro.photoLink)}
          </a>
        </p>
      </div>

      <footer className="wrap mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6 text-[13px] text-[var(--muted)]">
        <span className="flex items-center gap-3">
          <Monogram size={22} />© 2026 Fábio Santos · {contact.city}
        </span>
        <span>
          {t(footer.made).replace(lang === "pt" ? " Código no GitHub." : " Code on GitHub.", " ")}
          <a href={footer.repo} target="_blank" rel="noopener" className="link text-[var(--ink-2)]">
            {lang === "pt" ? "Código no GitHub" : "Code on GitHub"}
          </a>
        </span>
      </footer>
    </section>
  );
}
