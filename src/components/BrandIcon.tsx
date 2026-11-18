import {
  siAngular,
  siClaude,
  siCoreldraw,
  siDocker,
  siDotnet,
  siDjango,
  siExpo,
  siFigma,
  siFlutter,
  siGit,
  siGithub,
  siGodotengine,
  siGooglegemini,
  siHono,
  siInstagram,
  siJavascript,
  siKotlin,
  siMessenger,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siOpenrouter,
  siPostgresql,
  siPython,
  siReact,
  siRust,
  siSpringboot,
  siSqlite,
  siSupabase,
  siSwift,
  siTailwindcss,
  siTauri,
  siTypescript,
  siUnity,
  siVercel,
  siWhatsapp,
  type SimpleIcon,
} from "simple-icons";

const icons: Record<string, SimpleIcon> = {
  siAngular,
  siClaude,
  siCoreldraw,
  siDocker,
  siDotnet,
  siDjango,
  siExpo,
  siFigma,
  siFlutter,
  siGit,
  siGithub,
  siGodotengine,
  siGooglegemini,
  siHono,
  siInstagram,
  siJavascript,
  siKotlin,
  siMessenger,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siOpenrouter,
  siPostgresql,
  siPython,
  siReact,
  siRust,
  siSpringboot,
  siSqlite,
  siSupabase,
  siSwift,
  siTailwindcss,
  siTauri,
  siTypescript,
  siUnity,
  siVercel,
  siWhatsapp,
};

// Marcas com cor muito escura somem no fundo escuro: usam a cor do texto.
const luminance = (hex: string) => {
  const n = parseInt(hex, 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

export default function BrandIcon({ name, size = 20, mono = false }: { name: string; size?: number; mono?: boolean }) {
  const icon = icons[name];
  if (!icon) return null;
  const fill = mono || luminance(icon.hex) < 0.06 ? "currentColor" : `#${icon.hex}`;
  return (
    <svg role="img" aria-label={icon.title} width={size} height={size} viewBox="0 0 24 24" className="shrink-0">
      <path d={icon.path} fill={fill} />
    </svg>
  );
}
