"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { L, Lang } from "@/content/site";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (v: L) => string };

const LangContext = createContext<Ctx>({ lang: "pt", setLang: () => {}, t: (v) => v.pt });

const KEY = "fs-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    let initial: Lang | null = null;
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "pt" || saved === "en") initial = saved;
    } catch {}
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "pt" || fromUrl === "en") initial = fromUrl;
    if (!initial && !navigator.language.toLowerCase().startsWith("pt")) initial = "en";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- preferência só existe no navegador
    if (initial) setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  const t = useCallback((v: L) => v[lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
