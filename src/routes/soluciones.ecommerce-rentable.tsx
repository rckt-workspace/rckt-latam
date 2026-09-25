import { Image, LineChart, Megaphone, MessageCircle, Search, ShoppingBag, Sparkles, TrendingUp, Workflow } from "lucide-react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import FaqSection, { faqJsonLd, type FaqItem } from "@/components/rckt/FaqSection";
import MethodCard, { type MethodField } from "@/components/rckt/MethodCard";
import MilestoneCards from "@/components/rckt/MilestoneCards";
import SignalCards from "@/components/rckt/SignalCards";
import SolutionSystemPanel from "@/components/rckt/SolutionSystemPanel";
import SystemFinalCta from "@/components/rckt/SystemFinalCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";

const SITE_URL = "https://rckt-latam.lovable.app";

const signals = [
  { titulo: "Creatividad agotada.", Icono: Image },
  { titulo: "Catálogo sin lectura comercial.", Icono: ShoppingBag },
  { titulo: "WhatsApp entra en la venta pero nadie lo mide.", Icono: MessageCircle },
  { titulo: "El costo de adquisición sube más rápido que el ticket promedio.", Icono: TrendingUp },
];

const milestones = [
  { dia: "01", texto: "Testing creativo continuo — Producción y rotación con criterio, no por intuición." },
  { dia: "02", texto: "Medición por margen de contribución — No solo ROAS: el resultado se lee en el margen." },
  { dia: "03", texto: "WhatsApp integrado al embudo — Si aplica, la conversación entra al mismo sistema." },
];
const features = [
  { name: "Performance Media", detail: "Meta, Google Search, PMax, YouTube y Display en retargeting", Icon: Megaphone },
  { name: "Creative Performance", detail: "Producción y testing con IA: hooks, ángulos, formatos, iteración semanal", Icon: Sparkles },
  { name: "Search & AI Visibility", detail: "SEO técnico y de contenido, presencia en respuestas de IA", Icon: Search },
  { name: "Medición", detail: "Tracking completo y reporte semanal por etapa del embudo", Icon: LineChart },
  { name: "Sales Flow, si WhatsApp pesa", detail: "Campañas, WhatsApp y CRM conectados", Icon: Workflow },
];
const methodFields: MethodField[] = [
  { k: "Situación inicial", v: "ROAS alto en la plataforma y margen bajo en el banco; creatividad agotada; WhatsApp en el proceso de venta sin medir." },
  { k: "Período", v: "Revenue Diagnostic de 2 a 3 semanas y Demand System con compromiso mínimo de 3 meses." },
  { k: "Alcance", v: "Demand System, más Sales Flow si WhatsApp pesa en la conversión." },
  { k: "Inversión", v: "La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Testing creativo continuo con IA, tracking completo y lectura comercial del catálogo." },
  { k: "Resultado", v: "Margen de contribución tras adquisición, frente a la línea base firmada." },
  { k: "Método de medición", v: "Una sola fuente de verdad: pauta → prospecto → MQL → SQL → cita → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas, porque no controlamos tu cierre, tu inventario ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales." },
];
const FAQS: FaqItem[] = [];

export const Route = createFileRoute("/soluciones/ecommerce-rentable")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Ecommerce rentable — RCKT" },
      {
        name: "description",
        content:
          "Inviertes en pauta y no crece con margen. Demand System con Sales Flow cuando WhatsApp pesa en la conversión.",
      },
      { property: "og:title", content: "Ecommerce rentable — RCKT" },
      {
        property: "og:description",
        content: "El ROAS sube en la plataforma; el margen no sube en el banco.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/soluciones/ecommerce-rentable" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/soluciones/ecommerce-rentable" }],
    scripts: FAQS.length > 0 ? [faqJsonLd(FAQS)] : [],
  }),
  component: EcommercePage,
  errorComponent: EcommerceError,
  notFoundComponent: () => <EcommerceError />,
});

function EcommercePage() {
  useSiteMotion([]);

  return (
    <div className="rckt-site tcn-page">
      <main id="top">
        <SystemPageHero label="Ecommerce rentable" title={<>Inviertes en pauta y no crece con <em>margen</em></>} descriptor="El ROAS sube en la plataforma; el margen no sube en el banco." promise="Demand System con Sales Flow cuando WhatsApp pesa en la conversión." ctaLabel="Revisar mi proceso comercial →" />
        <SystemSection id="te-pasa-esto" num="01." label="Señales" title={<>El ROAS no cuenta toda la <em className="font-serif-accent">historia</em>.</>} phrase="Creatividad, catálogo, WhatsApp y costo de adquisición muestran dónde se pierde margen."><SignalCards items={signals} /></SystemSection>
        <SystemSection id="lo-que-hacemos" num="02." label="Lo que hacemos" title={<>Demanda que se lee en el <em className="font-serif-accent">margen</em>.</>} phrase="Demand System, con Sales Flow cuando WhatsApp pesa en la conversión."><SolutionSystemPanel features={features} system="Demand System" summary="Demand System, con Sales Flow si WhatsApp pesa en la conversión." href="/sistemas/demand-system" /></SystemSection>
        <SystemSection id="noventa-dias" num="03." label="Qué cambia en 90 días" title={<>Tres cambios que sí llegan al <em className="font-serif-accent">negocio</em>.</>} phrase="Creatividad, margen y conversación dentro del mismo sistema."><MilestoneCards items={milestones} kicker="Cambio" /></SystemSection>
        <SystemSection id="caso" num="04." label="Prueba" title={<>El método antes que el <em className="font-serif-accent">titular</em>.</>}><MethodCard fields={methodFields} /></SystemSection>
        <SystemSection id="para-quien-no-es" num="05." label="Para quién no es" title={<>La base también tiene que estar <em className="font-serif-accent">lista</em>.</>}><div className="solution-honesty"><p>Tiendas sin margen para sostener pauta, catálogos sin unit economics claras.</p></div></SystemSection>
        <FaqSection items={FAQS} />
        <SystemFinalCta label="Revisar mi proceso comercial →" />
      </main>
      <SiteFooter />
    </div>
  );
}

function EcommerceError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Ecommerce rentable</span>
            <h1>No pudimos mostrar esta página.</h1>
            <p>Intenta cargarla nuevamente. Si el problema continúa, puedes volver al inicio.</p>
            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => void router.invalidate()}
              >
                Intentar de nuevo
              </button>
              <a className="btn" href="/">
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
