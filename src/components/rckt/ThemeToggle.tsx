import { useEffect, useState } from "react";
import { Theme, THEME_EVENT, currentTheme, applyTheme } from "@/lib/theme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  // Use "dark" as initial state but sync immediately in useEffect.
  // To avoid hydration mismatch if SSR is used, we only show the actual state after mount.
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(currentTheme());
    setMounted(true);

    const onThemeChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as Theme;
      if (detail === "light" || detail === "dark") {
        setTheme(detail);
      } else {
        setTheme(currentTheme());
      }
    };

    window.addEventListener(THEME_EVENT, onThemeChange);
    window.addEventListener("storage", onThemeChange);
    return () => {
      window.removeEventListener(THEME_EVENT, onThemeChange);
      window.removeEventListener("storage", onThemeChange);
    };
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  // We still render the button structure but keep it consistent until mounted
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Activar versión clara" : "Activar versión oscura"}
      title={theme === "dark" ? "Versión clara" : "Versión oscura"}
      className={`theme-toggle ${theme === "dark" ? "is-dark" : "is-light"} ${className}`.trim()}
    >
      <span className="theme-toggle__thumb">
        {mounted ? (theme === "dark" ? <Moon /> : <Sun />) : <Moon />}
      </span>
    </button>
  );
}

const Sun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
  </svg>
);
