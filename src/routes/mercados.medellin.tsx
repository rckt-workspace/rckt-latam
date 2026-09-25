import { createFileRoute } from "@tanstack/react-router";
import MarketLocationPage, { getMarketJsonLd } from "@/components/rckt/MarketLocationPage";
const SITE_URL = "https://rckt.lat";
export const Route = createFileRoute("/mercados/medellin")({
  staticData: { sitemap: true },
  head: () => ({ meta: [{ title: "RCKT en Medellín | RCKT LATAM" }, { name: "description", content: "RCKT en Medellín: sistemas comerciales para empresas de tecnología, ecommerce, servicios y salud." }, { property: "og:title", content: "RCKT en Medellín | RCKT LATAM" }, { property: "og:description", content: "Sistemas comerciales de RCKT para empresas en Medellín." }, { property: "og:type", content: "website" }, { property: "og:url", content: `${SITE_URL}/mercados/medellin` }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: `${SITE_URL}/mercados/medellin` }], scripts: [{ type: "application/ld+json", children: JSON.stringify(getMarketJsonLd("RCKT Medellín", "Medellín")) }] }),
  component: () => <MarketLocationPage city="Medellín" cityId="medellin" context="Medellín es una de nuestras ciudades activas en Colombia." why="Tecnología, ecommerce, servicios y salud." />,
});