"use client";

import { ui } from "@/content/site";
import { useLang } from "@/lib/i18n";

export default function SkipLink() {
  const { t } = useLang();
  return (
    <a href="#conteudo" className="skip">
      {t(ui.skip)}
    </a>
  );
}
