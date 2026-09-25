import { createFileRoute } from "@tanstack/react-router";
import SectorPage from "@/components/rckt/SectorPage";
import { SectorError } from "@/components/rckt/SectorShortPage";
import { SECTORS } from "@/components/rckt/sectorData";

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
  component: () => <SectorPage {...SECTORS.industria} />,
  errorComponent: () => <SectorError kicker="Industria y distribución" />,
  notFoundComponent: () => <SectorError kicker="Industria y distribución" />,
});
