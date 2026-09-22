import { createFileRoute } from "@tanstack/react-router";
import { SectorError, SectorShortPage } from "@/components/rckt/SectorShortPage";

const SITE_URL = "https://rckt-latam.lovable.app";

export const Route = createFileRoute("/sectores/industria-distribucion")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Industria y distribución — RCKT" },
      {
        name: "description",
        content:
          "Revenue Systems para industria y distribución: de la cotización al pedido entregado.",
      },
      { property: "og:title", content: "Industria y distribución — RCKT" },
      { property: "og:description", content: "De la cotización al pedido entregado." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sectores/industria-distribucion" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sectores/industria-distribucion" }],
  }),
  component: () => (
    <SectorShortPage
      titulo="Revenue Systems para industria y distribución"
      subtitulo="De la cotización al pedido entregado."
      flujo={["Cotización", "Pedido", "Documento", "Entrega", "Soporte"]}
      duele={[
        "Cotizaciones manuales que tardan horas.",
        "CRM y ERP desconectados entre sí.",
        "Reporting manual que nadie confirma.",
      ]}
      ctaLabel="Revisar mi proceso →"
    />
  ),
  errorComponent: () => <SectorError kicker="Industria y distribución" />,
  notFoundComponent: () => <SectorError kicker="Industria y distribución" />,
});
