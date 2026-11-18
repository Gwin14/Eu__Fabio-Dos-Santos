"use client";

import Link from "next/link";
import { certifications, contact, education, experience, hero, inUse, languages, mobileApps, omnichannel, stackGroups } from "@/content/site";
import { useLang } from "@/lib/i18n";

export default function Resume() {
  const { t, lang, setLang } = useLang();
  const L = (pt: string, en: string) => (lang === "pt" ? pt : en);
  const projects = [
    { name: L("Central omnichannel com IA", "Omnichannel AI hub"), line: t(omnichannel.lead), stack: omnichannel.stack.join(", ") },
    ...mobileApps.map((p) => ({ name: p.name, line: `${t(p.line)}. ${t(p.detail)}`, stack: p.stack.join(", ") })),
    ...inUse.map((p) => ({ name: p.name, line: `${t(p.line)}. ${t(p.detail)}`, stack: p.stack.join(", ") })),
  ];

  return (
    <div className="cv min-h-screen bg-[var(--bg)] py-10 print:py-0">
      <div className="no-print wrap mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="btn btn--ghost btn--sm h-11">
          ← {L("Voltar ao portfólio", "Back to portfolio")}
        </Link>
        <div className="flex gap-2">
          <button type="button" className="btn btn--ghost btn--sm h-11" onClick={() => setLang(lang === "pt" ? "en" : "pt")}>
            {lang === "pt" ? "English version" : "Versão em português"}
          </button>
          <button type="button" className="btn btn--sm h-11" onClick={() => window.print()}>
            {L("Salvar em PDF", "Save as PDF")}
          </button>
        </div>
      </div>

      <article className="cv-sheet mx-auto max-w-[820px] rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg-2)] p-[clamp(20px,5vw,56px)] text-[14.5px] leading-relaxed print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-0 print:text-[11.5px]">
        <header className="border-b border-[var(--line)] pb-6 print:border-neutral-300">
          <h1 className="font-[family-name:var(--font-display)] text-[40px] font-semibold leading-none tracking-[-0.03em] print:text-[28px]">Fábio Santos</h1>
          <p className="mt-2 text-[18px] text-[var(--ink-2)] print:text-[14px] print:text-neutral-700">{t(hero.role)}</p>
          <p className="mt-3 font-mono text-[12.5px] text-[var(--muted)] print:text-neutral-600">
            {contact.email} · {contact.phoneDisplay} · fabiosantos.dev.br · {contact.city}
            <br />
            linkedin.com/in/fabio-santos14 · github.com/Gwin14
          </p>
        </header>

        <section className="mt-6">
          <h2 className="cv-h">{L("Resumo", "Summary")}</h2>
          <p className="mt-2">{t(hero.lead)}</p>
        </section>

        <section className="mt-6">
          <h2 className="cv-h">{L("Experiência", "Experience")}</h2>
          {experience.map((e) => (
            <div key={e.org} className="mt-3 break-inside-avoid">
              <p className="flex flex-wrap justify-between gap-x-4 font-semibold">
                <span>
                  {t(e.role)} · {e.org}
                </span>
                <span className="font-mono text-[12.5px] font-normal text-[var(--muted)] print:text-neutral-600">{t(e.period)}</span>
              </p>
              <ul className="mt-1 list-disc pl-5 text-[var(--ink-2)] print:text-neutral-800">
                {e.items[lang].map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-6">
          <h2 className="cv-h">{L("Projetos", "Projects")}</h2>
          {projects.map((p) => (
            <div key={p.name} className="mt-2.5 break-inside-avoid">
              <p>
                <span className="font-semibold">{p.name}</span> — <span className="text-[var(--ink-2)] print:text-neutral-800">{p.line}</span>
              </p>
              <p className="font-mono text-[12px] text-[var(--muted)] print:text-neutral-600">{p.stack}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-6 sm:grid-cols-2 print:grid-cols-2">
          <div>
            <h2 className="cv-h">{L("Formação", "Education")}</h2>
            {education.map((e) => (
              <p key={e.period.pt} className="mt-2">
                <span className="font-semibold">{t(e.course)}</span>
                <br />
                <span className="text-[var(--ink-2)] print:text-neutral-700">
                  {e.org} · {t(e.period)}
                </span>
              </p>
            ))}
            <h2 className="cv-h mt-5">{L("Idiomas", "Languages")}</h2>
            <p className="mt-2">{languages.map((l) => `${t(l.name)} — ${t(l.level)}`).join(" · ")}</p>
          </div>
          <div>
            <h2 className="cv-h">{L("Certificações", "Certifications")}</h2>
            <ul className="mt-2 space-y-1">
              {certifications.map((c) => (
                <li key={c.name.pt}>
                  {t(c.name)} <span className="text-[var(--muted)] print:text-neutral-600">· {c.org}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="cv-h">{L("Competências", "Skills")}</h2>
          <ul className="mt-2 space-y-1">
            {stackGroups.map((g) => (
              <li key={g.title.pt}>
                <span className="font-semibold">{t(g.title)}:</span> {g.items.map((i) => i.name).join(", ")}
              </li>
            ))}
          </ul>
        </section>
      </article>

      <style>{`
        .cv-h { font-family: var(--font-mono); font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); }
        @media print {
          @page { margin: 14mm; }
          .cv-h { color: #8a5a14; font-size: 10px; }
          .cv a { color: inherit; }
        }
      `}</style>
    </div>
  );
}
