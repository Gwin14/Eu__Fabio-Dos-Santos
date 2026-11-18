// Pequenas telas ao vivo de cada app, em SVG e CSS. Loops de 2,5 a 4 s.

export function KomorebiVisual() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 v-komorebi" />
      {/* grade de terços */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 300 168">
        <path d="M100 0v168M200 0v168M0 56h300M0 112h300" stroke="white" strokeOpacity=".18" />
      </svg>
      <div className="v-focus absolute left-[58%] top-[34%] h-12 w-12 border border-[var(--accent)]" />
      <div className="absolute inset-x-4 top-3 flex justify-between font-mono text-[10px] text-white/85">
        <span>RAW · HEIF</span>
        <span>ISO 200 · 1/500</span>
      </div>
      <div className="absolute inset-x-4 bottom-3 flex gap-1.5">
        {["#d9a35c", "#7fa38c", "#b48a7a", "#8fa4c2", "#cfcfcf"].map((c, i) => (
          <span key={c} className="v-lut h-6 flex-1 rounded-[4px] border border-white/20" style={{ background: c, animationDelay: `${i * 0.64}s` }} />
        ))}
      </div>
    </div>
  );
}

export function HikariVisual() {
  const bars = [6, 10, 16, 22, 30, 38, 44, 48, 52, 50, 46, 40, 36, 33, 30, 28, 26, 30, 36, 44, 50, 46, 34, 22, 14, 8];
  return (
    <div className="absolute inset-0 p-4">
      <svg className="h-full w-full" viewBox="0 0 260 130" preserveAspectRatio="none">
        {[0.25, 0.5, 0.75].map((f) => (
          <path key={f} d={`M${260 * f} 0V130M0 ${130 * f}H260`} stroke="white" strokeOpacity=".08" />
        ))}
        {bars.map((h, i) => (
          <rect key={i} className="v-bar" x={i * 10} y={130 - h * 2} width="8" height={h * 2} fill="#ece6da" fillOpacity=".14" style={{ animationDelay: `${(i % 7) * 0.18}s` }} />
        ))}
        <path className="v-curve" d="M0 130 C 70 120, 90 80, 130 64 S 210 12, 260 0" fill="none" stroke="var(--accent)" strokeWidth="2" />
        <circle className="v-knob" cx="130" cy="64" r="5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function LutraVisual() {
  return (
    <div className="absolute inset-0">
      {/* log (lavado) */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(115deg,#6f7a7c,#8a8a80 45%,#9a9284 70%,#7d8486)" }} />
      {/* Rec.709 revelado, entrando por cortina */}
      <div className="v-wipe absolute inset-0" style={{ background: "linear-gradient(115deg,#1d3b4a,#c9894b 45%,#f2c27a 70%,#2b4d5c)" }} />
      <div className="absolute inset-x-4 top-3 flex justify-between font-mono text-[10px] text-white/90 [text-shadow:0_1px_2px_rgb(0_0_0/.5)]">
        <span>S-LOG3 → REC.709</span>
        <span>10-BIT · HEVC</span>
      </div>
      <svg className="absolute inset-x-4 bottom-3 h-12 w-[calc(100%-2rem)]" viewBox="0 0 200 40" preserveAspectRatio="none">
        <rect width="200" height="40" rx="3" fill="black" fillOpacity=".45" />
        {Array.from({ length: 40 }).map((_, i) => {
          const y = 20 + Math.sin(i / 3) * 9;
          return <rect key={i} x={i * 5 + 1} y={y - 4} width="3" height="8" fill="#9fe3a8" fillOpacity=".75" />;
        })}
      </svg>
    </div>
  );
}

export function TetoVisual() {
  const r = 52;
  const c = Math.PI * r;
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-6 px-4">
      <svg width="140" height="84" viewBox="0 0 140 84">
        <path d={`M18 74a${r} ${r} 0 0 1 104 0`} fill="none" stroke="white" strokeOpacity=".12" strokeWidth="10" strokeLinecap="round" />
        <path className="v-gauge" d={`M18 74a${r} ${r} 0 0 1 104 0`} fill="none" stroke="var(--ok)" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} style={{ ["--len" as string]: c }} />
        <text x="70" y="66" textAnchor="middle" fill="var(--ink)" fontSize="26" fontWeight="600" fontFamily="var(--font-geist)">
          78
        </text>
      </svg>
      <div className="font-mono text-[11px] leading-[1.9] text-[var(--ink-2)]">
        <div>
          <span className="text-[var(--ok)]">●</span> Vento 120 m · 14 km/h
        </div>
        <div>
          <span className="text-[var(--ok)]">●</span> GNSS · 21 sat
        </div>
        <div>
          <span className="text-[var(--accent)]">●</span> Kp 4 · NOAA
        </div>
      </div>
    </div>
  );
}

export function SoluneVisual() {
  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#1b2a44 0%,#3a3b52 55%,#b0704a 100%)" }}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 168" preserveAspectRatio="none">
        <path d="M20 150 Q150 -10 280 150" fill="none" stroke="white" strokeOpacity=".35" strokeDasharray="3 5" />
        <path d="M0 150H300" stroke="white" strokeOpacity=".3" />
      </svg>
      <span className="v-sun absolute h-4 w-4 rounded-full bg-[#ffd27a] shadow-[0_0_24px_6px_rgb(255_200_110/0.55)]" />
      <div className="absolute inset-x-4 top-3 flex justify-between font-mono text-[10px] text-white/85">
        <span>☉ 05:21 → 19:12</span>
        <span>☾ 78%</span>
      </div>
    </div>
  );
}

export function TerminalVisual({ lines }: { lines: string[] }) {
  return (
    <div className="absolute inset-0 p-4 font-mono text-[11.5px] leading-[1.75]">
      {lines.map((l, i) => (
        <div key={i} className={`v-line truncate ${l.startsWith("✓") ? "text-[var(--ok)]" : l.startsWith("$") ? "text-[var(--ink)]" : "text-[var(--muted)]"}`} style={{ animationDelay: `${i * 0.35}s` }}>
          {l}
        </div>
      ))}
    </div>
  );
}

export function SiteVisual({ title, tone }: { title: string; tone: string }) {
  return (
    <div className="absolute inset-0 p-4">
      <div className="h-full overflow-hidden rounded-md border border-white/10 bg-[#0f0e0c]">
        <div className="flex h-6 items-center gap-1.5 border-b border-white/10 px-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="ml-2 font-mono text-[9px] text-white/50">{title}</span>
        </div>
        <div className="relative h-[calc(100%-24px)]" style={{ background: tone }}>
          <div className="absolute bottom-3 left-3 space-y-1.5">
            <div className="h-2.5 w-28 rounded-sm bg-white/85" />
            <div className="h-2 w-20 rounded-sm bg-white/50" />
          </div>
          <div className="absolute right-3 top-3 flex gap-1 font-mono text-[9px] text-white/80">
            <span className="rounded bg-black/30 px-1">PT</span>
            <span className="rounded px-1">EN</span>
            <span className="rounded px-1">ES</span>
          </div>
        </div>
      </div>
    </div>
  );
}
