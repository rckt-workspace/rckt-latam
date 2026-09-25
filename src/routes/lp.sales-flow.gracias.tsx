import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import CampaignShell from "@/components/rckt/CampaignShell";
import { gtmHeadScripts, saveCampaignParams, track } from "@/components/rckt/tracking";
import type { LeadLevel } from "@/components/rckt/leadScoring";

const description = "Gracias por solicitar una revisión de tu proceso comercial con RCKT LATAM.";
export const Route = createFileRoute("/lp/sales-flow/gracias")({
  staticData: { sitemap: false },
  validateSearch: (search: Record<string, unknown>) => ({ nivel: search.nivel === "sql" || search.nivel === "recurso" ? search.nivel : "mql" as LeadLevel }),
  head: () => ({ meta: [
    { title: "Solicitud recibida — RCKT LATAM" },
    { name: "description", content: description },
    { name: "robots", content: "noindex, follow" },
    { property: "og:title", content: "Solicitud recibida — RCKT LATAM" },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ], scripts: gtmHeadScripts }),
  component: ThankYou,
});

function ThankYou() {
  const { nivel } = Route.useSearch();
  useEffect(() => { saveCampaignParams(window.location.search); track("thank_you_view", { nivel }); }, [nivel]);
  const content = nivel === "sql"
    ? { title: "Tu solicitud cumple el perfil.", text: "Agenda tu reunión en las próximas 48 horas." }
    : nivel === "recurso"
      ? { title: "Gracias por escribirnos.", text: "Mientras tanto, esto te puede servir." }
      : { title: "Recibimos tu solicitud.", text: "Te contactamos en menos de 24 horas." };
  return <CampaignShell thanks><main><section className="campaign-thanks"><div className="campaign-shell campaign-thanks__inner">
    <p className="label-orange">RCKT LATAM · Solicitud recibida</p><h1>{content.title}</h1><p>{content.text}</p>
    {nivel === "sql" ? <div className="campaign-calendar">[PENDIENTE: enlace de agenda]</div> : null}
    {nivel === "recurso" ? <Link to="/recursos" className="btn-orange campaign-resource-link">Ver recursos →</Link> : null}
  </div></section></main></CampaignShell>;
}