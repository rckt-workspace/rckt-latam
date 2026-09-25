import type { ReactNode } from "react";
import { useSiteMotion } from "@/components/SiteChrome";
import logoDarkAsset from "@/assets/rckt-logo-dark.png";
import ThemeToggle from "@/components/rckt/ThemeToggle";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  useSiteMotion([]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow">
        <div className="mx-auto max-w-3xl px-6">
          {/* Minimal Header inside the same container */}
          <header className="py-10 flex justify-between items-center border-b border-border/50">
            <a href="/" className="logo">
              <img src={logoDarkAsset} alt="RCKT" className="h-7 w-auto" />
            </a>
            <ThemeToggle />
          </header>

          <div className="pb-20 pt-16 md:pb-28 md:pt-24">
            <h1 className="text-[36px] leading-[1.05] font-semibold md:text-[52px]">{title}</h1>
            <div className="mt-10 space-y-6 text-[16px] leading-relaxed text-foreground/90">
              {children}
            </div>
            
            <div className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[12px] font-mono text-muted-foreground uppercase tracking-wider">
              <div>&gt; sistema activo · 2026</div>
              <a href="/" className="hover:text-foreground transition-colors">
                Volver al inicio _
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
