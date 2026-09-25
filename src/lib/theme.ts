export type Theme = "light" | "dark";

export const THEME_EVENT = "rckt:theme";
export const STORAGE_KEY = "rckt-theme";

export function getStoredTheme(): Theme | null {
  try {
    const theme = localStorage.getItem(STORAGE_KEY);
    if (theme === "light" || theme === "dark") return theme;
  } catch (e) {}
  return null;
}

export function getSystemTheme(): Theme {
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function currentTheme(): Theme {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }
  return "dark"; // Default for RCKT
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const isDark = theme === "dark";
  
  root.classList.toggle("dark", isDark);
  root.setAttribute("data-theme", theme);
  
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {}
  
  window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: theme }));
}

/** 
 * Hook-like logic for imperative updates on non-React buttons 
 */
export function syncThemeButtons(toggles: HTMLButtonElement[], theme: Theme) {
  const isDark = theme === "dark";
  toggles.forEach((button) => {
    button.classList.toggle("is-dark", isDark);
    button.classList.toggle("is-light", !isDark);
    button.setAttribute("aria-label", isDark ? "Activar versión clara" : "Activar versión oscura");
    button.setAttribute("title", isDark ? "Versión clara" : "Versión oscura");
  });
}
