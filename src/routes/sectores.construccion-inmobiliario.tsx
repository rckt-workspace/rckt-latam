import { createFileRoute } from "@tanstack/react-router";
import SectorPage from "@/components/rckt/SectorPage";
import { SectorError } from "@/components/rckt/SectorShortPage";
import { SECTORS } from "@/components/rckt/sectorData";

const SITE_URL = "https://rckt.lat";

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
  component: () => <SectorPage {...SECTORS.construccion} />,
  errorComponent: () => <SectorError kicker="Construcción e inmobiliario" />,
  notFoundComponent: () => <SectorError kicker="Construcción e inmobiliario" />,
});
