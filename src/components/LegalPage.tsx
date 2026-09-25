import type { ReactNode } from "react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  useSiteMotion([]);

  return (
    <div className="rckt-site legal-shell">
      <SiteHeader />
      <main className="legal-page">
        <div className="legal-page__inner">
          <h1>{title}</h1>
          <article className="legal-document">{children}</article>
          <div className="legal-page__status">&gt; sistema activo · 2026</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
