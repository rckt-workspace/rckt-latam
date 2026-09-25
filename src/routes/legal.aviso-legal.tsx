import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/aviso-legal")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Aviso legal — RCKT" },
      {
        name: "description",
        content:
          "Información legal de RCKT: titular del sitio, condiciones de uso, propiedad intelectual y responsabilidad.",
      },
      { property: "og:title", content: "Aviso legal — RCKT" },
      {
        property: "og:description",
        content: "Información legal de RCKT: titular del sitio y condiciones de uso.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://rckt.lat/legal/aviso-legal" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.lat/legal/aviso-legal" }],
  }),
  component: AvisoLegal,
});

function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal">
      <p>
        Este sitio es titularidad de RCKT, firma que diseña y opera sistemas que convierten
        demanda en ventas. Puedes escribirnos a <a href="mailto:hola@rckt.lat">hola@rckt.lat</a>.
      </p>
      <h2>Condiciones de uso</h2>
      <p>
        El acceso y la navegación por este sitio implican la aceptación de estas condiciones. Los
        contenidos tienen carácter informativo y pueden actualizarse sin previo aviso.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, marcas, logotipos e imágenes pertenecen a RCKT o se usan con autorización. No se
        permite su reproducción sin consentimiento previo.
      </p>
      <h2>Responsabilidad</h2>
      <p>
        RCKT no se responsabiliza del uso que terceros hagan de la información publicada ni del
        contenido de sitios externos enlazados desde esta página.
      </p>
    </LegalPage>
  );
}
