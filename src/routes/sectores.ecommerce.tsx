import { createFileRoute } from "@tanstack/react-router";
import SectorPage from "@/components/rckt/SectorPage";
import { SectorError } from "@/components/rckt/SectorShortPage";
import { SECTORS } from "@/components/rckt/sectorData";

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
  component: () => <SectorPage {...SECTORS.ecommerce} />,
  errorComponent: () => <SectorError kicker="Ecommerce" />,
  notFoundComponent: () => <SectorError kicker="Ecommerce" />,
});
