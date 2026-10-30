import { createFileRoute } from "@tanstack/react-router";
import { LandingClinicasIaAThanks } from "@/components/rckt/LandingClinicasIaA";
import { gtmHeadScripts } from "@/components/rckt/tracking";
const title = "Solicitud recibida · Clínicas estéticas IA · RCKT";
const description = "Gracias por solicitar el diagnóstico de tu clínica estética con RCKT.";
export const Route = createFileRoute("/lp/clinicas-esteticas-ia/gracias")({
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
  component: () => <LandingClinicasIaAThanks />,
});
