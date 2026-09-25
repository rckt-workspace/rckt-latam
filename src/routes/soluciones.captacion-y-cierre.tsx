import { BarChart3, CalendarX, Gauge, Layout, LineChart, Megaphone, MessageCircle, RefreshCw, Search, Users, Workflow } from "lucide-react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import FaqSection, { faqJsonLd, type FaqItem } from "@/components/rckt/FaqSection";
import FunnelBars from "@/components/rckt/FunnelBars";
import MethodCard, { type MethodField } from "@/components/rckt/MethodCard";
import MilestoneCards from "@/components/rckt/MilestoneCards";
import SignalCards from "@/components/rckt/SignalCards";
import SolutionSystemPanel from "@/components/rckt/SolutionSystemPanel";
import SystemFinalCta from "@/components/rckt/SystemFinalCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";

const SITE_URL = "https://rckt-latam.lovable.app";

const signals = [
  { titulo: "WhatsApp fuera del CRM", frase: "Prospectos atendidos por WhatsApp desde el celular de la asesora, sin registro en el CRM.", Icono: MessageCircle },
  { titulo: "Inasistencia alta", frase: "Inasistencia alta, sin recordatorio de cita.", Icono: CalendarX },
  { titulo: "Métrica equivocada", frase: "Tu agencia de pauta optimiza por costo por lead.", Icono: BarChart3 },
  { titulo: "Sin atribución", frase: "Nadie sabe qué campaña trajo al cliente real.", Icono: Search },
];
const milestones = [
  { dia: "30", texto: "Sistema operativo con fuente de verdad." },
  { dia: "60", texto: "Prospectos entrando al CRM con seguimiento dentro del SLA." },
  { dia: "90", texto: "Revisión de línea base frente a resultado." },
];
const features = [
  { name: "Demand", detail: "Tier según tu inversión en pauta", Icon: Megaphone },
  { name: "Sales Flow", detail: "Campañas, WhatsApp y CRM conectados", Icon: Workflow },
  { name: "Landing de conversión", detail: "Con tracking y CRM conectados", Icon: Layout },
  { name: "CRM & RevOps", detail: "Pipeline, etapas, automatizaciones y dashboards", Icon: Gauge },
  { name: "Medición completa", detail: "Del clic al cierre, con una sola fuente de verdad", Icon: LineChart },
  { name: "Responsable de cuenta", detail: "Un solo responsable para todo el sistema", Icon: Users },
  { name: "Revisión mensual con decisores", detail: "Fugas y prioridades", Icon: RefreshCw },
  { name: "Ciclo de optimización de 90 días", detail: "Línea base frente a resultado", Icon: BarChart3 },
];
const methodFields: MethodField[] = [
  { k: "Situación inicial", v: "Meta o Google reportan un número de conversiones, mientras que Ventas registra otro; las asesoras atienden WhatsApp fuera del CRM y tardan más de una hora en responder." },
  { k: "Período", v: "Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90." },
  { k: "Alcance", v: "Revenue Engine: Demand System y Sales Flow bajo un solo responsable, medido del clic al cierre." },
  { k: "Inversión", v: "La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Mapa de fugas con tus números reales, tracking completo, y campañas, WhatsApp y CRM conectados, para que cada prospecto tenga respuesta, seguimiento y dueño." },
  { k: "Resultado", v: "Se mide frente a la línea base firmada: costo por cliente adquirido y cuánto vale ese cliente frente a lo que costó traerlo." },
  { k: "Método de medición", v: "Una sola fuente de verdad: pauta → prospecto → MQL → SQL → cita → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas, porque no controlamos tu cierre, tu inventario ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales." },
];
const FAQS: FaqItem[] = [];

export const Route = createFileRoute("/soluciones/captacion-y-cierre")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Captación y cierre — RCKT" },
      {
        name: "description",
        content:
          "Pagas por prospectos y no sabes cuáles compran. Revenue Engine: un responsable, una fuente de verdad, medición del clic al cierre.",
      },
      { property: "og:title", content: "Captación y cierre — RCKT" },
      {
        property: "og:description",
        content: "Meta dice una cosa; tu cuenta bancaria, otra. Así cerramos las seis fugas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/soluciones/captacion-y-cierre" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/soluciones/captacion-y-cierre" }],
    scripts: FAQS.length > 0 ? [faqJsonLd(FAQS)] : [],
  }),
  component: CaptacionPage,
  errorComponent: CaptacionError,
  notFoundComponent: () => <CaptacionError />,
});

function CaptacionPage() {
  useSiteMotion([]);

  return (
    <div className="rckt-site tcn-page">
      <main id="top">
        <SystemPageHero label="Captación y cierre" title={<>Pagas por prospectos y no sabes cuáles <em>compran</em></>} descriptor="Meta dice una cosa; tu cuenta bancaria, otra." promise="Revenue Engine: un responsable, una fuente de verdad, medición del clic al cierre." ctaLabel="Revisar mi proceso comercial →" />
        <SystemSection id="te-pasa-esto" num="01." label="Señales" title={<>La venta se pierde antes de llegar al <em className="font-serif-accent">cierre</em>.</>} phrase="WhatsApp, tiempos de respuesta, citas y atribución dejan señales concretas."><SignalCards items={signals} /></SystemSection>
        <SystemSection id="fugas" num="02." label="El embudo real" title={<>Seis pasos. Seis lugares donde se pierde una <em className="font-serif-accent">venta</em>.</>} phrase="Seguimos el recorrido completo desde la inversión hasta el cierre."><FunnelBars stages={["Inversión", "Lead", "Contacto", "Calificación", "Cita", "Propuesta", "Venta"]} leaks={[{ stage: "Contacto", label: "Respuesta tarde" }, { stage: "Calificación", label: "WhatsApp fuera del CRM" }, { stage: "Cita", label: "Inasistencia" }, { stage: "Venta", label: "Sin atribución" }]} /></SystemSection>
        <SystemSection id="lo-que-hacemos" num="03." label="Lo que hacemos" title={<>Un solo sistema del clic al <em className="font-serif-accent">cierre</em>.</>} phrase="Revenue Engine une Demand y Sales Flow bajo un responsable y una fuente de verdad."><SolutionSystemPanel features={features} system="Revenue Engine" summary="Demand System + Sales Flow bajo un solo responsable." href="/sistemas/revenue-engine"><p className="solution-system-card__meta">Compromiso mínimo: 6 meses</p></SolutionSystemPanel></SystemSection>
        <SystemSection id="noventa-dias" num="04." label="Qué cambia en 90 días" title={<>Tres cortes para medir el <em className="font-serif-accent">cambio</em>.</>} phrase="Día 30, día 60 y día 90 contra la misma línea base."><MilestoneCards items={milestones} /></SystemSection>
        <SystemSection id="caso" num="05." label="Prueba" title={<>El método antes que el <em className="font-serif-accent">titular</em>.</>} phrase="La ficha describe cómo medimos esta puerta sin presentar un caso de cliente."><MethodCard fields={methodFields} /></SystemSection>
        <SystemSection id="para-quien-no-es" num="06." label="Para quién no es" title={<>La base también tiene que estar <em className="font-serif-accent">lista</em>.</>}><div className="solution-honesty"><p>Negocios que aún no venden, sin presupuesto de pauta, o que solo quieren optimizar por costo por lead.</p></div></SystemSection>
        <FaqSection items={FAQS} />
        <SystemFinalCta label="Revisar mi proceso comercial →" />
      </main>
      <SiteFooter />
    </div>
  );
}

function CaptacionError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Captación y cierre</span>
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
