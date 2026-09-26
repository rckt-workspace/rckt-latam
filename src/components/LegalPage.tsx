import type { ReactNode } from "react";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rckt-site legal-page">
      <SiteNav />
      <main>
        <section>
          <article className="legal-page__inner">
            <h1>{title}</h1>
            <div className="legal-document">{children}</div>
            <div className="legal-page__status">&gt; sistema activo · 2026</div>
          </article>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
