import { createFileRoute } from "@tanstack/react-router";
import { ClinicasThanks } from "@/components/rckt/ClinicasCampaign";
import { gtmHeadScripts } from "@/components/rckt/tracking";
import type { LeadLevel } from "@/components/rckt/leadScoring";
const title = "Solicitud recibida · Clínicas Bogotá · RCKT";
const description = "Gracias por solicitar una revisión del proceso comercial de tu clínica con RCKT LATAM.";
export const Route = createFileRoute("/lp/sales-flow-clinicas-bogota-b/gracias")({
  staticData: { sitemap: false },
  validateSearch: (search: Record<string, unknown>) => ({ nivel: (search.nivel === "sql" || search.nivel === "recurso" ? search.nivel : "mql") as LeadLevel }),
  head: () => ({ meta: [
    { title }, { name: "description", content: description }, { name: "robots", content: "noindex, follow" },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], scripts: gtmHeadScripts }),
  component: ThankYou,
});
function ThankYou() { const { nivel } = Route.useSearch(); return <ClinicasThanks variant="b" nivel={nivel} />; }
