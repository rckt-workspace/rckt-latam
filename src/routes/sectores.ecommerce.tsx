import { createFileRoute } from "@tanstack/react-router";
import { SectorError, SectorShortPage } from "@/components/rckt/SectorShortPage";

const SITE_URL = "https://rckt-latam.lovable.app";

export const Route = createFileRoute("/sectores/ecommerce")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Ecommerce — RCKT" },
      {
        name: "description",
        content: "Revenue Systems para ecommerce: de la pauta al margen, no solo al ROAS.",
      },
      { property: "og:title", content: "Ecommerce — RCKT" },
      { property: "og:description", content: "De la pauta al margen, no solo al ROAS." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sectores/ecommerce" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sectores/ecommerce" }],
  }),
  component: () => (
    <SectorShortPage
      titulo="Revenue Systems para ecommerce"
      subtitulo="De la pauta al margen, no solo al ROAS."
      flujo={["Anuncios", "Tienda", "Compra", "Recompra"]}
      duele={[
        "CAC en aumento campaña tras campaña.",
        "WhatsApp usado en la venta, pero sin medir.",
        "Poca recompra y sin sistema para provocarla.",
      ]}
    />
  ),
  errorComponent: () => <SectorError kicker="Ecommerce" />,
  notFoundComponent: () => <SectorError kicker="Ecommerce" />,
});
