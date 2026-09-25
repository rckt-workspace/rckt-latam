import { createFileRoute } from "@tanstack/react-router";
import MarketLocationPage, { getMarketJsonLd } from "@/components/rckt/MarketLocationPage";
const SITE_URL = "https://rckt.lat";
export const Route = createFileRoute("/mercados/bogota")({
  staticData: { sitemap: true },
  head: () => ({ meta: [{ title: "RCKT en Bogotá | RCKT LATAM" }, { name: "description", content: "RCKT en Bogotá: sistemas comerciales para empresas de B2B, servicios, salud y ecommerce." }, { property: "og:title", content: "RCKT en Bogotá | RCKT LATAM" }, { property: "og:description", content: "Sistemas comerciales de RCKT para empresas en Bogotá." }, { property: "og:type", content: "website" }, { property: "og:url", content: `${SITE_URL}/mercados/bogota` }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: `${SITE_URL}/mercados/bogota` }], scripts: [{ type: "application/ld+json", children: JSON.stringify(getMarketJsonLd("RCKT Bogotá", "Bogotá")) }] }),
  component: () => <MarketLocationPage city="Bogotá" cityId="bogota" context="Bogotá es una de nuestras ciudades activas en Colombia." why="Ciudad prioritaria, con concentración empresarial en B2B, servicios, salud y ecommerce." />,
});