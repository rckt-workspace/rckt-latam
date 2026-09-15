import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/aviso-legal")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Aviso legal — RCKT" },
      { name: "description", content: "Información legal sobre RCKT, titular del sitio, condiciones de uso y responsabilidad." },
      { property: "og:title", content: "Aviso legal — RCKT" },
      { property: "og:description", content: "Información legal sobre RCKT, titular del sitio y condiciones de uso." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://rckt-latam.lovable.app/aviso-legal" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://rckt-latam.lovable.app/aviso-legal" }],
  }),
  component: AvisoLegal,
});

function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal">
      <p>
        Este sitio web es titularidad de RCKT, firma de sistemas de crecimiento con IA. Puedes
        contactarnos en <a href="mailto:hola@rckt.es">hola@rckt.es</a>.
      </p>
      <h2>Condiciones de uso</h2>
      <p>
        El acceso y la navegación por este sitio implican la aceptación de estas condiciones. Los
        contenidos tienen carácter informativo y pueden actualizarse sin previo aviso.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, marcas, logotipos e imágenes de este sitio pertenecen a RCKT o se utilizan con
        autorización. No se permite su reproducción sin consentimiento previo.
      </p>
      <h2>Responsabilidad</h2>
      <p>
        RCKT no se responsabiliza del uso que terceros hagan de la información publicada ni del
        contenido de sitios externos enlazados desde esta página.
      </p>
    </LegalPage>
  );
}

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
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
