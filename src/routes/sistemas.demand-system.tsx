import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import FaqSection, { faqJsonLd } from "@/components/rckt/FaqSection";
import { AcceptanceSteps, CapabilityCards, RuleList } from "@/components/rckt/SystemBlocks";
import SystemFinalCta from "@/components/rckt/SystemFinalCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";
import { DEMAND_SYSTEM_FAQS } from "@/content/systemFaqs";

const SITE_URL = "https://rckt-latam.lovable.app";
const INCLUYE = [
  { titulo: "Performance Media", detalle: "Meta, Google Search, PMax cuando aplique, LinkedIn selectivo para B2B, retargeting." },
  { titulo: "Creative Performance", detalle: "Testing continuo de piezas y mensajes." },
  { titulo: "Search & AI Visibility", detalle: "Presencia en buscadores y en respuestas generadas con IA." },
  { titulo: "Medición completa", detalle: "Lectura por etapa, del clic a la venta." },
];
const TIERS = [
  { titulo: "Core", detalle: "Según canales e inversión en pauta." },
  { titulo: "Growth", detalle: "Según canales e inversión en pauta." },
  { titulo: "Scale", detalle: "Según canales e inversión en pauta." },
];
const ACEPTACION = ["Tracking validado de extremo a extremo", "Estructura de campañas activa", "Primer reporte por etapa entregado"];

export const Route = createFileRoute("/sistemas/demand-system")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Demand System — RCKT" },
      { name: "description", content: "Generación de demanda medida hasta la venta: performance media, creatividad con testing continuo, visibilidad en IA y medición por etapa." },
      { property: "og:title", content: "Demand System — RCKT" },
      { property: "og:description", content: "Nunca optimizamos por costo por lead; la unidad es SQL o venta." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/demand-system" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/demand-system" }],
    scripts: [faqJsonLd(DEMAND_SYSTEM_FAQS)],
  }), component: DemandPage, errorComponent: DemandError, notFoundComponent: () => <DemandError />,
});

function DemandPage() {
  useSiteMotion([]);
  return <div className="rckt-site tcn-page"><main id="top">
    <SystemPageHero label="Demand System" title={<>Generación de demanda medida hasta la <em>venta</em>.</>} promise="Manejamos tu pauta, pero no la optimizamos por leads baratos: la optimizamos por las oportunidades que tu equipo comercial acepta y por las que terminan en venta." />
    <SystemSection num="01." label="El problema" title={<>Los leads baratos pueden salir muy <em className="font-serif-accent">caros</em>.</>} phrase="Cada semana debes poder ver el embudo completo, no solo los clics."><p className="system-section__lead">Manejamos tu pauta, pero no la optimizamos por leads baratos: la optimizamos por las oportunidades que tu equipo comercial acepta y por las que terminan en venta.</p></SystemSection>
    <SystemSection id="que-incluye" num="02." label="Qué incluye" title={<>Demanda medida hasta la <em className="font-serif-accent">venta</em>.</>} phrase="Medios, creatividad, visibilidad y medición por etapa."><CapabilityCards items={INCLUYE} /></SystemSection>
    <SystemSection id="tiers" num="03." label="Niveles" title="La intensidad cambia; la regla no." phrase="Core, Growth y Scale se definen según canales e inversión en pauta."><CapabilityCards items={TIERS} /></SystemSection>
    <SystemSection id="no-incluye" num="04." label="Qué no incluye" title={<>La pauta no arregla lo que pasa <em className="font-serif-accent">después</em>.</>} phrase="Estos elementos pertenecen a otros sistemas o los paga directamente tu empresa."><RuleList items={["El gasto en pauta", "Desarrollo web", "CRM y RevOps", "Agentes conversacionales"]} /></SystemSection>
    <SystemSection id="condicion" num="05." label="Reglas" title={<>Nunca optimizamos por costo por <em className="font-serif-accent">lead</em>.</>} phrase="La unidad es SQL o venta."><div className="system-highlight"><p>Nunca optimizamos por costo por lead; la unidad es SQL o venta.</p></div></SystemSection>
    <SystemSection id="para-quien" num="06." label="Para quién" title={<>Oferta probada, proceso comercial y CRM <em className="font-serif-accent">funcionando</em>.</>} phrase="Si esa base no existe, la recomendación es Revenue Engine."><RuleList items={["Cuentas con oferta probada", "Proceso comercial funcionando", "CRM funcionando", "Si no los tienes, la recomendación es Revenue Engine"]} /></SystemSection>
    <SystemSection num="07." label="Cómo empieza" title={<>Primero conectamos la medición de extremo a <em className="font-serif-accent">extremo</em>.</>} phrase="El sistema se acepta cuando ya puede leerse por etapa."><AcceptanceSteps plazo="Sistema aceptado en máximo 21 días" items={ACEPTACION.map((texto) => ({ texto }))} /></SystemSection>
    <FaqSection items={DEMAND_SYSTEM_FAQS} /><SystemFinalCta />
  </main><SiteFooter /></div>;
}

function DemandError() { const router = useRouter(); return <div className="rckt-site tcn-page"><SiteHeader /><main className="band"><div className="container"><div className="form-card" role="alert"><span className="kicker">Demand System</span><h1>No pudimos mostrar esta página.</h1><p>Intenta cargarla nuevamente. Si el problema continúa, puedes volver al inicio.</p><div className="form-actions"><button className="btn btn-primary" type="button" onClick={() => void router.invalidate()}>Intentar de nuevo</button><a className="btn" href="/">Volver al inicio</a></div></div></div></main><SiteFooter /></div>; }
