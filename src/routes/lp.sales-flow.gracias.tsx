import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check } from "lucide-react";
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
    ? { label: "Solicitud prioritaria", title: "Tu solicitud cumple el perfil.", text: "Agenda tu reunión en las próximas 48 horas." }
    : nivel === "recurso"
      ? { label: "Solicitud recibida", title: "Gracias por escribirnos.", text: "Mientras tanto, esto te puede servir." }
      : { label: "Solicitud recibida", title: "Recibimos tu solicitud.", text: "Te contactamos en menos de 24 horas." };
  return <CampaignShell thanks><main><section className="campaign-thanks"><div className="campaign-shell">
    <div className="campaign-thanks__card">
      <span className="campaign-thanks__icon" aria-hidden="true"><Check strokeWidth={2.5} /></span>
      <p className="label-orange">{content.label}</p>
      <h1>{content.title}</h1>
      <p className="campaign-thanks__text">{content.text}</p>
      <span className="campaign-thanks__rule" aria-hidden="true" />
      {nivel === "sql" ? <div className="campaign-calendar">[PENDIENTE: enlace de agenda]</div> : null}
      {nivel === "recurso" ? <Link to="/recursos" className="btn-orange campaign-resource-link">Ver recursos →</Link> : null}
      <a className="campaign-thanks__back" href="/lp/sales-flow">Volver al inicio</a>
    </div>
  </div></section></main></CampaignShell>;
}
