"use client";

import type { ReactNode } from "react";
import type { Project } from "@/content/site";
import { ui } from "@/content/site";
import { useLang } from "@/lib/i18n";

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-[var(--ink)]">
      <span className="link">{children}</span>
      <svg className="m-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export function ProjectLinks({ p }: { p: Project }) {
  const { t } = useLang();
  return (
    <div className="flex flex-wrap items-center gap-x-5">
      {p.url && <ExtLink href={p.url}>{t(ui.live)}</ExtLink>}
      {p.repo && <ExtLink href={p.repo}>{t(ui.code)}</ExtLink>}
      {p.privateRepo && !p.repo && <span className="font-mono text-[12px] text-[var(--muted)]">{t(ui.privateRepo)}</span>}
    </div>
  );
}

export default function ProjectCard({ p, visual, className = "" }: { p: Project; visual: ReactNode; className?: string }) {
  const { t } = useLang();
  return (
    <article className={`card flex flex-col overflow-hidden ${className}`}>
      <div className="relative h-[168px] overflow-hidden border-b border-[var(--line)] bg-[var(--bg-3)]" aria-hidden="true">
        {visual}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[19px] font-semibold tracking-tight">
          {p.name} <span className="font-normal text-[var(--muted)]">· {t(p.line)}</span>
        </h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--ink-2)]">{t(p.detail)}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-3">
          <ProjectLinks p={p} />
        </div>
      </div>
    </article>
  );
}
