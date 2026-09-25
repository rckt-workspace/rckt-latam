import { createFileRoute } from "@tanstack/react-router";
import SectorPage from "@/components/rckt/SectorPage";
import { SectorError } from "@/components/rckt/SectorShortPage";
import { SECTORS } from "@/components/rckt/sectorData";
import { faqJsonLd } from "@/components/rckt/FaqSection";

const SITE_URL = "https://rckt-latam.lovable.app";

export const Route = createFileRoute("/sectores/salud-estetica-odontologia")({
  staticData: { sitemap: true },
  head: () => ({
    scripts: [faqJsonLd(SECTORS.salud.faqItems ?? [])],
    meta: [
      { title: "Salud, estética y odontología — RCKT" },
      {
        name: "description",
        content:
          "Revenue Systems para salud, estética y odontología: del clic al paciente que sí llega a la cita.",
      },
      { property: "og:title", content: "Salud, estética y odontología — RCKT" },
      { property: "og:description", content: "Del clic al paciente que sí llega a la cita." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sectores/salud-estetica-odontologia" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sectores/salud-estetica-odontologia" }],
  }),
  component: () => <SectorPage {...SECTORS.salud} />,
  errorComponent: () => <SectorError kicker="Salud, estética y odontología" />,
  notFoundComponent: () => <SectorError kicker="Salud, estética y odontología" />,
});
