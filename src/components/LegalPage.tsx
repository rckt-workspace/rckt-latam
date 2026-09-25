import type { ReactNode } from "react";
import { useSiteMotion } from "@/components/SiteChrome";
import logoDarkAsset from "@/assets/rckt-logo-dark.png";
import logoLightAsset from "@/assets/rckt-logo-light.png";
import ThemeToggle from "@/components/rckt/ThemeToggle";
import { useEffect, useState } from "react";
import { currentTheme, THEME_EVENT } from "@/lib/theme";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  useSiteMotion([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setTheme(currentTheme());
    const onThemeChange = () => setTheme(currentTheme());
    window.addEventListener(THEME_EVENT, onThemeChange);
    return () => window.removeEventListener(THEME_EVENT, onThemeChange);
  }, []);

  return (
    <div className="legal-page min-h-screen bg-background text-foreground selection:bg-primary/20">
      <div className="mx-auto max-w-3xl px-6">
        {/* Simple Header: Logo + Theme Toggle only. No main nav, no CTA. */}
        <header className="flex items-center justify-between py-10 md:py-14">
          <a href="/" className="transition-opacity hover:opacity-80">
            <img 
              src={theme === "dark" ? logoLightAsset : logoDarkAsset} 
              alt="RCKT" 
              className="h-7 w-auto md:h-8" 
            />
          </a>
          <ThemeToggle />
        </header>

        <main className="pb-24 pt-4 md:pb-32">
          <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <h1 className="mb-12 text-[36px] font-semibold leading-tight tracking-tight text-foreground md:text-[52px]">
              {title}
            </h1>
            
            <div className="legal-content space-y-8 text-[16px] leading-relaxed text-foreground md:text-[17px]">
              {children}
            </div>
          </article>

          {/* Final Line / Footer info */}
          <footer className="mt-24 border-t border-border pt-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                &gt; sistema activo · 2026
              </div>
              <a 
                href="/" 
                className="group inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>Volver al inicio</span>
                <span className="transition-transform group-hover:translate-x-1">_</span>
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
