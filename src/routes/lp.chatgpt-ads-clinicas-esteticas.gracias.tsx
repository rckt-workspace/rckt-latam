import { createFileRoute } from "@tanstack/react-router";
import { LandingChatGptAdsBThanks } from "@/components/rckt/LandingChatGptAdsB";
import { gtmHeadScripts } from "@/components/rckt/tracking";
const title = "Solicitud recibida · ChatGPT Ads clínicas estéticas · RCKT";
const description = "Gracias por solicitar tu auditoría de canales IA con RCKT.";
export const Route = createFileRoute("/lp/chatgpt-ads-clinicas-esteticas/gracias")({
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
  component: () => <LandingChatGptAdsBThanks />,
});
