import { createFileRoute } from "@tanstack/react-router";
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
    ? { label: "Solicitud prioritaria", title: "Recibido.", text: "Agenda aquí tu reunión de 30 minutos. Vamos a revisar tu pauta, tus conversaciones de WhatsApp y tu proceso comercial. Si prefieres, escríbenos directo por WhatsApp y seguimos por ahí." }
    : nivel === "recurso"
      ? { label: "Solicitud recibida", title: "Gracias por escribir.", text: "Por lo que nos cuentas, hoy no somos la mejor opción para ti y preferimos decírtelo. Te dejamos esta guía, que resuelve buena parte de lo que preguntas: [PENDIENTE: enlace a la guía del cluster]. Si más adelante ya estás invirtiendo y quieres escalar, escríbenos." }
      : { label: "Solicitud recibida", title: "Recibido.", text: "Te contactamos en menos de 24 horas hábiles. Mientras tanto, esto es lo que incluye el diagnóstico:" };
  return <CampaignShell thanks><main><section className="campaign-thanks"><div className="campaign-shell">
    <div className="campaign-thanks__card">
      <span className="campaign-thanks__icon" aria-hidden="true"><Check strokeWidth={2.5} /></span>
      <p className="label-orange">{content.label}</p>
      <h1>{content.title}</h1>
      <p className="campaign-thanks__text">{content.text}</p>
      <span className="campaign-thanks__rule" aria-hidden="true" />
      {nivel === "sql" ? <div className="campaign-calendar">[PENDIENTE: enlace de agenda]</div> : null}
       {nivel === "sql" ? <a className="btn-orange campaign-resource-link" href="#whatsapp" onClick={() => track("whatsapp_click", { section: "gracias" })}>Escríbenos por WhatsApp</a> : null}
       {nivel === "mql" ? <><ul className="campaign-thanks__list"><li>Mapa de fugas con tus números reales</li><li>Línea base documentada y firmada</li><li>Roadmap de 90 días priorizado por impacto</li></ul><p className="campaign-thanks__note">Si quieres adelantar, responde este correo con acceso de lectura a tus cuentas de anuncios.</p></> : null}
      <a className="campaign-thanks__back" href="/lp/sales-flow">Volver al inicio</a>
    </div>
  </div></section></main></CampaignShell>;
}
