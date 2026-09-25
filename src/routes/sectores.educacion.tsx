import { createFileRoute } from "@tanstack/react-router";
import SectorPage from "@/components/rckt/SectorPage";
import { SectorError } from "@/components/rckt/SectorShortPage";
import { SECTORS } from "@/components/rckt/sectorData";
import { faqJsonLd } from "@/components/rckt/FaqSection";

const SITE_URL = "https://rckt.lat";

export const Route = createFileRoute("/sectores/educacion")({
  staticData: { sitemap: true },
  head: () => ({
    scripts: [faqJsonLd(SECTORS.educacion.faqItems ?? [])],
    meta: [
      { title: "Educación privada — RCKT" },
      {
        name: "description",
        content:
          "Revenue Systems para educación privada: de la pauta de temporada de matrículas a la matrícula firmada.",
      },
      { property: "og:title", content: "Educación privada — RCKT" },
      {
        property: "og:description",
        content: "De la pauta de temporada de matrículas a la matrícula firmada.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sectores/educacion" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sectores/educacion" }],
  }),
  component: () => <SectorPage {...SECTORS.educacion} />,
  errorComponent: () => <SectorError kicker="Educación privada" />,
  notFoundComponent: () => <SectorError kicker="Educación privada" />,
});
