import { createFileRoute } from "@tanstack/react-router";
import { LandingCirugiaPlasticaCThanks } from "@/components/rckt/LandingCirugiaPlasticaC";
import { gtmHeadScripts } from "@/components/rckt/tracking";
const title = "Solicitud recibida · ChatGPT cirugía plástica · RCKT";
const description = "Gracias por solicitar el diagnóstico de visibilidad en IA de tu clínica con RCKT.";
export const Route = createFileRoute("/lp/chatgpt-ads-cirugia-plastica/gracias")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: gtmHeadScripts,
  }),
  component: () => <LandingCirugiaPlasticaCThanks />,
});
