import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Calculator, Check, Clock, FileSignature, FileText, Map, MessagesSquare, Route as RouteIcon, Search, Target, Users } from "lucide-react";
import { useState } from "react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import DiagnosticForm from "@/components/rckt/DiagnosticForm";
import FaqSection, { faqJsonLd } from "@/components/rckt/FaqSection";
import GeneralCta from "@/components/rckt/GeneralCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { REVENUE_DIAGNOSTIC_FAQS } from "@/content/systemFaqs";

const SITE_URL = "https://rckt-latam.lovable.app";
// TODO: reemplazar por el número real de WhatsApp Business (formato internacional, sin signos).
const WHATSAPP_NUMBER = "573000000000";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20quiero%20solicitar%20el%20Revenue%20Diagnostic`;

const INCLUYE = [
  { titulo: "Mapa de fugas", detalle: "Con tus números reales, punto por punto del embudo." },
  { titulo: "Auditoría de adquisición", detalle: "Oferta, campañas, landing, web y tracking: GTM, GA4, píxel, CAPI, UTMs y conversiones offline." },
  { titulo: "Auditoría comercial", detalle: "CRM y proceso de ventas, de la primera respuesta al cierre." },
  { titulo: "Unit economics", detalle: "CAC, MQL, SQL, show rate, close rate y payback." },
  { titulo: "Línea base firmada", detalle: "El punto de partida acordado, sin interpretaciones." },
  { titulo: "Roadmap de 90 días", detalle: "Priorizado por impacto económico, no por facilidad." },
];
const NECESITAMOS = ["Acceso de lectura a Meta, Google, GA4 y GTM", "CRM o exportación", "Datos de venta del último trimestre", "2–3 entrevistas (comercial, mercadeo, operaciones)", "Acceso a WhatsApp Business o muestra de conversaciones"];
const PASOS = [
  { label: "Diagnostic", texto: "2–3 semanas. Medimos, firmamos línea base y priorizamos." },
  { label: "Setup con aceptación", texto: "Implementamos solo lo aprobado, con criterio de éxito escrito." },
  { label: "Operación", texto: "Ciclos de 90 días, medidos hasta la venta." },
];
const STATS = [
  { label: "Duración", value: "2–3 semanas", detail: "de diagnóstico", Icon: Clock },
  { label: "Entregable", detail: "Mapa de fugas, línea base firmada y roadmap de 90 días", Icon: FileText },
  { label: "Para quién", detail: "Toda cuenta nueva, sin excepción", Icon: Users },
  { label: "Qué mide el éxito", detail: "Que decidas con datos", Icon: Target },
];
const INCLUDE_ICONS = [Map, Search, MessagesSquare, Calculator, FileSignature, RouteIcon];

export const Route = createFileRoute("/sistemas/revenue-diagnostic")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Revenue Diagnostic — RCKT" },
      { name: "description", content: "En tres semanas medimos cuánto pierdes entre la campaña y el cierre, en qué punto exacto y qué haríamos en 90 días. La única puerta de entrada a RCKT." },
      { property: "og:title", content: "Revenue Diagnostic — RCKT" },
      { property: "og:description", content: "Diagnóstico de ingresos: mapa de fugas, línea base firmada y roadmap de 90 días priorizado por impacto económico." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/revenue-diagnostic" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/revenue-diagnostic" }],
    scripts: [faqJsonLd(REVENUE_DIAGNOSTIC_FAQS)],
  }),
  component: RevenueDiagnostic,
  errorComponent: RevenueDiagnosticError,
  notFoundComponent: () => <RevenueDiagnosticError />,
});

function RevenueDiagnostic() {
  const [listo, setListo] = useState(false);
  useSiteMotion([listo]);
  return (
    <div className="rckt-site tcn-page">
      <main id="top">
        <SystemPageHero
          label="Revenue Diagnostic"
          title={<>Antes de tocar nada, <em>medimos</em>.</>} quoteLabel="La realidad de la mayoría" quote="El 85% de los leads se pierden entre la campaña y la venta sin que nadie sepa exactamente por qué."
          descriptor="Diagnóstico de ingresos — la única puerta de entrada."
          context="En tres semanas te decimos cuánto pierdes entre la campaña y el cierre, en qué punto exacto, y qué haríamos en 90 días. Si sigues con nosotros, lo que pagas por el diagnóstico se descuenta del sistema."
          ctaHref="#solicitar"
        />
        <section className="system-composition system-stats"><div className="container system-stat-grid">{STATS.map(({ label, value, detail, Icon }) => <article className="system-stat-card" key={label}><span className="system-icon"><Icon aria-hidden="true" /></span><p className="label-orange">{label}</p>{value ? <strong>{value}</strong> : null}<p>{detail}</p></article>)}</div></section>
        <section className="system-composition system-warm" id="incluye"><div className="container"><div className="system-composition__heading"><span className="label-orange">Qué incluye</span><h2>Primero encontramos la <em className="font-serif-accent">fuga</em>.</h2><p>Mapa, auditorías y economía unitaria con una línea base acordada contigo.</p></div><div className="system-feature-grid">{INCLUYE.map((item, index) => { const Icon = INCLUDE_ICONS[index]; return <article className="system-feature-card" key={item.titulo}>{Icon ? <span className="system-icon"><Icon aria-hidden="true" /></span> : null}<h3>{item.titulo}</h3><p>{item.detalle}</p></article>; })}</div><aside className="system-orange-band"><span className="label-on-orange">Qué no incluye</span><h3>Diagnosticar no es implementar.</h3><p>El alcance termina en una decisión informada y un roadmap priorizado.</p><small>Implementación · Cambios en campañas · Desarrollo · Configuración de CRM · Creatividades</small></aside></div></section>
        <section className="system-composition"><div className="container"><div className="system-composition__heading"><span className="label-orange">Requisitos</span><h2>Para medir, necesitamos ver el sistema <em className="font-serif-accent">completo</em>.</h2><p>Trabajamos con acceso de lectura y evidencia del último trimestre.</p></div><ul className="system-check-grid">{NECESITAMOS.map((item) => <li key={item}><span className="system-check"><Check aria-hidden="true" /></span>{item}</li>)}</ul></div></section>
        <section className="system-orange-statement"><div className="container"><span className="label-on-orange">El problema</span><p>Sin línea base, cualquier decisión es una apuesta. Antes de recomendar un sistema, medimos la cadena completa entre la campaña y el cierre.</p></div></section>
        <section className="system-composition system-warm"><div className="container"><div className="system-composition__heading"><span className="label-orange">Cómo empieza</span><h2>Medimos antes de mover una <em className="font-serif-accent">pieza</em>.</h2><p>Del diagnóstico a ciclos de operación medidos hasta la venta.</p></div><div className="system-step-grid">{PASOS.map((item, index) => <article key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.label}</h3><p>{item.texto}</p></article>)}</div></div></section>
        <section className="system-composition" id="solicitar"><div className="container system-form-container"><div className="system-composition__heading"><span className="label-orange">Formulario</span><h2>Cuéntanos cómo está hoy tu <em className="font-serif-accent">operación</em>.</h2><p>Con esto preparamos la primera conversación con contexto real.</p></div><div className="form-card"><DiagnosticForm whatsappUrl={WHATSAPP_URL} onSent={() => setListo(true)} /></div></div></section>
        <FaqSection items={REVENUE_DIAGNOSTIC_FAQS} />
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function RevenueDiagnosticError() {
  const router = useRouter();
  return <div className="rckt-site tcn-page"><SiteHeader /><main className="band"><div className="container"><div className="form-card" role="alert"><span className="kicker">Revenue Diagnostic</span><h1>No pudimos mostrar esta página.</h1><p>Intenta cargarla nuevamente. Si el problema continúa, puedes volver al inicio.</p><div className="form-actions"><button className="btn btn-primary" type="button" onClick={() => void router.invalidate()}>Intentar de nuevo</button><a className="btn" href="/">Volver al inicio</a></div></div></div></main><SiteFooter /></div>;
}
