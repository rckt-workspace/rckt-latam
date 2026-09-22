import { createFileRoute } from "@tanstack/react-router";
import { SectorError, SectorShortPage } from "@/components/rckt/SectorShortPage";

const SITE_URL = "https://rckt-latam.lovable.app";

export const Route = createFileRoute("/sectores/servicios-b2b")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Servicios B2B — RCKT" },
      {
        name: "description",
        content:
          "Revenue Systems para servicios B2B: de la búsqueda al contrato firmado, con pipeline medible.",
      },
      { property: "og:title", content: "Servicios B2B — RCKT" },
      { property: "og:description", content: "De la búsqueda al contrato firmado." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sectores/servicios-b2b" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sectores/servicios-b2b" }],
  }),
  component: () => (
    <SectorShortPage
      titulo="Revenue Systems para servicios B2B"
      subtitulo="De la búsqueda al contrato firmado."
      flujo={["Google/LinkedIn", "Lead", "Reunión", "Propuesta", "Cierre"]}
      duele={[
        "Pipeline corto e impredecible.",
        "Dependencia excesiva de referidos.",
        "Dificultad para medir qué genera reuniones calificadas.",
      ]}
    />
  ),
  errorComponent: () => <SectorError kicker="Servicios B2B" />,
  notFoundComponent: () => <SectorError kicker="Servicios B2B" />,
});
