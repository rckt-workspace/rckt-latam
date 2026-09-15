import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rckt-site">
      <main className="legal-page">
        <div className="container">
          <Link className="legal-back" to="/">
            ← Volver al inicio
          </Link>
          <h1>{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
}
