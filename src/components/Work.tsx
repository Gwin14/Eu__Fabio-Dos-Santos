"use client";

import { inUse, inUseIntro, mobileApps, mobileIntro } from "@/content/site";
import { useLang } from "@/lib/i18n";
import ProjectCard from "./ProjectCard";
import { HikariVisual, KomorebiVisual, LutraVisual, SiteVisual, SoluneVisual, TerminalVisual, TetoVisual } from "./Visuals";

const mobileVisuals: Record<string, React.ReactNode> = {
  komorebi: <KomorebiVisual />,
  hikari: <HikariVisual />,
  lutra: <LutraVisual />,
  teto: <TetoVisual />,
  solune: <SoluneVisual />,
};

const mobileSpan: Record<string, string> = {
  komorebi: "lg:col-span-3",
  hikari: "lg:col-span-3",
  lutra: "lg:col-span-2",
  teto: "lg:col-span-2",
  solune: "lg:col-span-2",
};

export function MobileApps() {
  const { t } = useLang();
  return (
    <section id="mobile" aria-labelledby="mobile-h" className="screen">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 id="mobile-h" className="h2">
            {t(mobileIntro.title)}
          </h2>
          <p className="lead lg:justify-self-end">{t(mobileIntro.lead)}</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {mobileApps.map((p) => (
            <ProjectCard key={p.id} p={p} visual={mobileVisuals[p.id]} className={mobileSpan[p.id]} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function InUse() {
  const { t, lang } = useLang();
  const visuals: Record<string, React.ReactNode> = {
    robobackup: (
      <TerminalVisual
        lines={
          lang === "pt"
            ? ["$ rotina: Fotos da recepção → HD externo", "  modo: versões com data (últimas 7)", "  agendada: todo dia 22:00 · SYSTEM", "  copiando 1.284 arquivos · 38 MB/s", "✓ backup concluído · 0 falhas"]
            : ["$ routine: Front desk photos → external drive", "  mode: dated versions (last 7)", "  scheduled: daily 10pm · SYSTEM", "  copying 1,284 files · 38 MB/s", "✓ backup finished · 0 failures"]
        }
      />
    ),
    "teclado-pdv": (
      <TerminalVisual
        lines={
          lang === "pt"
            ? ["$ TecladoPDV.exe  (bandeja)", "  Alt ✕  Win ✕  Ctrl ✕  Esc ✕", "  Ctrl+Alt+Shift+F12 → senha", "  senha: hash + salt, nunca texto puro", "✓ proteção ativa no caixa 03"]
            : ["$ TecladoPDV.exe  (tray)", "  Alt ✕  Win ✕  Ctrl ✕  Esc ✕", "  Ctrl+Alt+Shift+F12 → password", "  password: salted hash, never plain text", "✓ protection on at checkout 03"]
        }
      />
    ),
    pousada: <SiteVisual title="hotelpousadasantos.com.br" tone="linear-gradient(160deg,#4f7d8f,#d8c39a 70%,#b89466)" />,
    cantos: <SiteVisual title="cantosdolitoral.com.br" tone="linear-gradient(160deg,#2f6f73,#7fb2a6 55%,#e7d6ae)" />,
  };
  return (
    <section id="em-uso" aria-labelledby="inuse-h" className="screen">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 id="inuse-h" className="h2">
            {t(inUseIntro.title)}
          </h2>
          <p className="lead lg:justify-self-end">{t(inUseIntro.lead)}</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {inUse.map((p) => (
            <ProjectCard key={p.id} p={p} visual={visuals[p.id]} />
          ))}
        </div>
      </div>
    </section>
  );
}
