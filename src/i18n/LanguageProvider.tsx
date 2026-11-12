import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { es, type Dictionary } from "./es";
import { en } from "./en";

export type Lang = "es" | "en";
const STORAGE_KEY = "rckt-lang";
const DICTS: Record<Lang, Dictionary> = { es, en };
const HTML_LANG: Record<Lang, string> = { es: "es-419", en: "en" };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dictionary };
const LanguageContext = createContext<Ctx>({ lang: "es", setLang: () => {}, t: es });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    let next: Lang | null = null;
    try {
      const param = new URLSearchParams(window.location.search).get("lang");
      if (param === "en" || param === "es") next = param;
    } catch { /* ignore */ }
    if (!next) {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "en" || stored === "es") next = stored;
      } catch { /* ignore */ }
    } else {
      try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
    }
    if (next) setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", HTML_LANG[lang]);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  return <LanguageContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const btn = (l: Lang) => (
    <button type="button" onClick={() => setLang(l)} aria-pressed={lang === l} className={`cursor-pointer font-display transition-colors ${lang === l ? "text-orange font-semibold" : "hover:text-ink dark:hover:text-paper"}`}>{l.toUpperCase()}</button>
  );
  return (
    <div role="group" aria-label={t.nav.language} className={`flex items-center gap-1 text-xs text-ink/60 dark:text-paper/60 ${className}`}>
      {btn("es")}<span aria-hidden="true">|</span>{btn("en")}
    </div>
  );
}
