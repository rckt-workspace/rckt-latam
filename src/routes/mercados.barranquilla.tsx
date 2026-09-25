import { createFileRoute } from "@tanstack/react-router";
import MarketLocationPage, { getMarketJsonLd } from "@/components/rckt/MarketLocationPage";
const SITE_URL = "https://rckt.lat";
export const Route = createFileRoute("/mercados/barranquilla")({
  staticData: { sitemap: true },
  head: () => ({ meta: [{ title: "RCKT en Barranquilla | RCKT LATAM" }, { name: "description", content: "RCKT en Barranquilla: sistemas comerciales para empresas de salud, comercio, servicios, construcción e industria." }, { property: "og:title", content: "RCKT en Barranquilla | RCKT LATAM" }, { property: "og:description", content: "Sistemas comerciales de RCKT para empresas en Barranquilla." }, { property: "og:type", content: "website" }, { property: "og:url", content: `${SITE_URL}/mercados/barranquilla` }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: `${SITE_URL}/mercados/barranquilla` }], scripts: [{ type: "application/ld+json", children: JSON.stringify(getMarketJsonLd("RCKT Barranquilla", "Barranquilla")) }] }),
  component: () => <MarketLocationPage city="Barranquilla" cityId="barranquilla" context="Barranquilla es una de nuestras ciudades activas en Colombia." why="Salud, comercio, servicios, construcción e industria." />,
});