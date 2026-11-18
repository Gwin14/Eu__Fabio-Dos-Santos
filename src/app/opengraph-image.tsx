import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Fábio Santos, desenvolvedor full stack e mobile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/img/fabio.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0d0c0a", color: "#ece6da", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px", width: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: "#9c9486", letterSpacing: 2, textTransform: "uppercase" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#57c28a" }} />
            Florianópolis, SC
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 116, fontWeight: 700, lineHeight: 0.92, letterSpacing: -5 }}>Fábio</div>
            <div style={{ fontSize: 116, fontWeight: 700, lineHeight: 0.92, letterSpacing: -5 }}>Santos</div>
            <div style={{ fontSize: 36, marginTop: 24, color: "#c9c1b3" }}>Desenvolvedor full stack e mobile</div>
          </div>
          <div style={{ fontSize: 22, color: "#f0a23b" }}>Next.js · React Native · Supabase · IA</div>
        </div>
        <div style={{ display: "flex", flex: 1, position: "relative" }}>
          <img src={src} alt="" width={480} height={630} style={{ width: 480, height: 630, objectFit: "cover" }} />
        </div>
      </div>
    ),
    size,
  );
}
