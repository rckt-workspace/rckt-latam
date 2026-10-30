import { createFileRoute } from "@tanstack/react-router";
import { LandingAcademiasCThanks } from "@/components/rckt/LandingAcademiasC";
import { gtmHeadScripts } from "@/components/rckt/tracking";
const title = "Solicitud recibida · ChatGPT Ads academias · RCKT";
const description = "Gracias por solicitar el diagnóstico de de tu academia con RCKT.";
export const Route = createFileRoute("/lp/chatgpt-ads-academias/gracias")({
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
  component: () => <LandingAcademiasCThanks />,
});
