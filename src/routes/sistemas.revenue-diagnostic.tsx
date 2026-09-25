import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import DiagnosticForm from "@/components/rckt/DiagnosticForm";
import FaqSection, { faqJsonLd } from "@/components/rckt/FaqSection";
import { AcceptanceSteps, CapabilityCards, RuleList } from "@/components/rckt/SystemBlocks";
import SystemFinalCta from "@/components/rckt/SystemFinalCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";
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
          title={<>Antes de tocar nada, <em>medimos</em>.</>}
          descriptor="Diagnóstico de ingresos — la única puerta de entrada."
          promise="En tres semanas te decimos cuánto pierdes entre la campaña y el cierre, en qué punto exacto, y qué haríamos en 90 días. Si sigues con nosotros, lo que pagas por el diagnóstico se descuenta del sistema."
          ctaHref="#solicitar"
        />
        <SystemSection num="01." label="El problema" title={<>Sin línea base, cualquier decisión es una <em className="font-serif-accent">apuesta</em>.</>} phrase="Antes de recomendar un sistema, medimos la cadena completa entre la campaña y el cierre.">
          <p className="system-section__lead">En tres semanas te decimos cuánto pierdes entre la campaña y el cierre, en qué punto exacto, y qué haríamos en 90 días.</p>
        </SystemSection>
        <SystemSection id="incluye" num="02." label="Qué incluye" title={<>Primero encontramos la <em className="font-serif-accent">fuga</em>.</>} phrase="Mapa, auditorías y economía unitaria con una línea base acordada contigo.">
          <CapabilityCards items={INCLUYE} />
        </SystemSection>
        <SystemSection num="03." label="Qué no incluye" title={<>Diagnosticar no es <em className="font-serif-accent">implementar</em>.</>} phrase="El alcance termina en una decisión informada y un roadmap priorizado.">
          <RuleList items={["Implementación", "Cambios en campañas", "Desarrollo", "Configuración de CRM", "Creatividades"]} />
        </SystemSection>
        <SystemSection num="04." label="Requisitos" title={<>Para medir, necesitamos ver el sistema <em className="font-serif-accent">completo</em>.</>} phrase="Trabajamos con acceso de lectura y evidencia del último trimestre.">
          <RuleList items={NECESITAMOS} />
        </SystemSection>
        <SystemSection num="05." label="Cómo empieza" title={<>Medimos antes de mover una <em className="font-serif-accent">pieza</em>.</>} phrase="Del diagnóstico a ciclos de operación medidos hasta la venta.">
          <AcceptanceSteps items={PASOS} plazo="Revenue Diagnostic de 2–3 semanas" />
        </SystemSection>
        <FaqSection items={REVENUE_DIAGNOSTIC_FAQS} />
        <SystemSection id="solicitar" num="06." label="Formulario" title={<>Cuéntanos cómo está hoy tu <em className="font-serif-accent">operación</em>.</>} phrase="Con esto preparamos la primera conversación con contexto real.">
          <div className="form-card"><DiagnosticForm whatsappUrl={WHATSAPP_URL} onSent={() => setListo(true)} /></div>
        </SystemSection>
        <SystemFinalCta href="#solicitar" />
      </main>
      <SiteFooter />
    </div>
  );
}

function RevenueDiagnosticError() {
  const router = useRouter();
  return <div className="rckt-site tcn-page"><SiteHeader /><main className="band"><div className="container"><div className="form-card" role="alert"><span className="kicker">Revenue Diagnostic</span><h1>No pudimos mostrar esta página.</h1><p>Intenta cargarla nuevamente. Si el problema continúa, puedes volver al inicio.</p><div className="form-actions"><button className="btn btn-primary" type="button" onClick={() => void router.invalidate()}>Intentar de nuevo</button><a className="btn" href="/">Volver al inicio</a></div></div></div></main><SiteFooter /></div>;
}
