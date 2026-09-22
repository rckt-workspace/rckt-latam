import { createFileRoute } from "@tanstack/react-router";
import { SectorError, SectorShortPage } from "@/components/rckt/SectorShortPage";

const SITE_URL = "https://rckt-latam.lovable.app";

export const Route = createFileRoute("/sectores/construccion-inmobiliario")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Construcción e inmobiliario — RCKT" },
      {
        name: "description",
        content:
          "Revenue Systems para construcción e inmobiliario: del anuncio a la escritura, con seguimiento estructurado.",
      },
      { property: "og:title", content: "Construcción e inmobiliario — RCKT" },
      { property: "og:description", content: "Del anuncio a la escritura." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sectores/construccion-inmobiliario" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sectores/construccion-inmobiliario" }],
  }),
  component: () => (
    <SectorShortPage
      titulo="Revenue Systems para construcción e inmobiliario"
      subtitulo="Del anuncio a la escritura."
      flujo={["Anuncios", "Landing", "Asesor", "Visita", "Cotización", "Cierre"]}
      duele={[
        "Leads de baja calidad que entran sin filtro.",
        "Ciclos de venta largos sin seguimiento estructurado.",
        "Cotizaciones manuales que retrasan la decisión.",
      ]}
    />
  ),
  errorComponent: () => <SectorError kicker="Construcción e inmobiliario" />,
  notFoundComponent: () => <SectorError kicker="Construcción e inmobiliario" />,
});
