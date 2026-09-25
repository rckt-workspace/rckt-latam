import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  useSiteMotion([]);

  return (
    <div className="rckt-site legal-shell">
      <SiteHeader />
      <main>
        <section className="legal-hero section-light">
          <div className="container">
            <span className="kicker">Legal</span>
            <h1>{title}</h1>
          </div>
        </section>
        <section className="legal-page section-light">
          <div className="container">
            <Link className="legal-back" to="/">
              ← Volver al inicio
            </Link>
            <article className="legal-document">{children}</article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
