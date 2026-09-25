import { createFileRoute } from "@tanstack/react-router";
import SectorPage from "@/components/rckt/SectorPage";
import { SectorError } from "@/components/rckt/SectorShortPage";
import { SECTORS } from "@/components/rckt/sectorData";

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
  component: () => <SectorPage {...SECTORS.b2b} />,
  errorComponent: () => <SectorError kicker="Servicios B2B" />,
  notFoundComponent: () => <SectorError kicker="Servicios B2B" />,
});
