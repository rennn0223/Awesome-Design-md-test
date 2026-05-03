"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Lang = "en" | "zh";

const LANG_KEY = "portfolio-lang";

interface LangState {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export const LangContext = createContext<LangState>({
  lang: "en",
  setLang: () => {},
});

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "zh") {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
