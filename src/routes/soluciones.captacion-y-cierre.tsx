import { BarChart3, CalendarX, Clock, Gauge, Layout, LineChart, Megaphone, MessageCircle, RefreshCw, Search, Users, Workflow } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import SiteFooter from "@/components/rckt/SiteFooter";
import FaqSection, { faqJsonLd, type FaqItem } from "@/components/rckt/FaqSection";
import FunnelBars from "@/components/rckt/FunnelBars";
import MethodCard, { type MethodField } from "@/components/rckt/MethodCard";
import MilestoneCards from "@/components/rckt/MilestoneCards";
import SignalCards from "@/components/rckt/SignalCards";
import SolutionSystemPanel from "@/components/rckt/SolutionSystemPanel";
import GeneralCta from "@/components/rckt/GeneralCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";

const SITE_URL = "https://rckt.lat";
const signals = [
  { titulo: "Respuesta tarde", frase: "Tardas más de una hora en responder a un prospecto que ya pagaste.", Icono: Clock },
  { titulo: "Fuera del CRM", frase: "Leads atendidos por WhatsApp desde el celular de la asesora, sin registro en el CRM.", Icono: MessageCircle },
  { titulo: "Métrica equivocada", frase: "Tu agencia optimiza por costo por lead, no por venta.", Icono: BarChart3 },
  { titulo: "Citas perdidas", frase: "Prospectos que agendan una cita y no llegan.", Icono: CalendarX },
  { titulo: "Sin atribución", frase: "Meta reporta 47 conversiones y tu cuenta bancaria dice otra cosa.", Icono: Search },
];
const milestones = [
  { dia: "30", texto: "Sistema operativo con fuente de verdad." },
  { dia: "60", texto: "Oportunidades entrando al CRM con seguimiento dentro del SLA." },
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
  { k: "Periodo", v: "Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90." },
  { k: "Alcance", v: "Revenue Engine: Demand System y Sales Flow bajo un solo responsable, medido del clic al cierre." },
  { k: "Inversión", v: "La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Mapa de fugas con tus números reales, tracking completo y campañas, WhatsApp y CRM conectados, para que cada prospecto tenga respuesta, seguimiento y dueño." },
  { k: "Resultado", v: "Se mide frente a la línea base firmada: costo por cliente adquirido y cuánto vale ese cliente frente a lo que costó traerlo." },
  { k: "Método de medición", v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas, porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales." },
];
const FAQS: FaqItem[] = [
  { question: "¿Qué sistema necesito si pago por leads y no sé cuáles compran?", answer: "Normalmente Revenue Engine: Demand System y Sales Flow bajo un solo responsable, medido del clic al cierre. Lo confirmamos con datos en el Revenue Diagnostic." },
  { question: "¿El diagnóstico es gratis?", answer: "No. Es trabajo real de tres semanas con tus datos, y se descuenta del sistema si sigues con nosotros." },
  { question: "¿Cuánto cuesta?", answer: "Depende de dónde esté tu fuga, y eso es justo lo que mide el Revenue Diagnostic. No damos precio de un sistema sin diagnóstico." },
  { question: "Mi agencia actual me da leads a la mitad de precio.", answer: "¿Y cuántos de esos leads compran? Si no lo sabes, ese es el problema, no el precio del lead. Optimizamos por venta, no por lead, y por eso el costo por lead puede ser mayor." },
  { question: "¿Me garantizan resultados?", answer: "No garantizamos ventas porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días vas a ver tu embudo completo con datos reales." },
];
export const Route = createFileRoute("/soluciones/captacion-y-cierre")({ staticData: { sitemap: true }, head: () => ({ meta: [
  { title: "Captación y cierre — Pagas por leads y no sabes cuáles compran | RCKT" },
  { name: "description", content: "Campañas, WhatsApp y CRM bajo un solo responsable, con medición del clic al cierre para saber qué leads compran." },
  { property: "og:title", content: "Captación y cierre — Saber qué leads compran" },
  { property: "og:description", content: "Dónde se pierde el dinero entre la inversión y la venta, y cómo se cierra cada fuga." },
  { property: "og:type", content: "website" }, { property: "og:url", content: SITE_URL + "/soluciones/captacion-y-cierre" }, { name: "twitter:card", content: "summary_large_image" },
], links: [{ rel: "canonical", href: SITE_URL + "/soluciones/captacion-y-cierre" }], scripts: [faqJsonLd(FAQS)] }), component: CaptacionPage });
function CaptacionPage() { return <div className="bg-background text-foreground antialiased"><main>
  <SystemPageHero label="Captación y cierre" title={<>Pagas por leads y no sabes <span className="hero-hand">cuáles compran.</span></>} descriptor="Meta y Google dicen una cosa, tu cuenta bancaria, otra." context="Ya inviertes en pauta y ya recibes leads, pero entre el WhatsApp y la venta se pierde dinero que nadie mide. Lo resolvemos con Revenue Engine, medido del clic al cierre." ctaLabel="Revisar mi proceso comercial →" />
  <SystemSection id="te-pasa-esto" num="01." label="Señales" title="Te pasa esto."><SignalCards items={signals} /></SystemSection>
  <SystemSection id="fugas" num="02." label="El embudo" title="Dónde se pierde el dinero."><FunnelBars stages={["Inversión", "Lead", "Contacto", "Calificación", "Cita", "Cotización", "Venta"]} leaks={[{ stage: "Contacto", label: "Respuesta tarde" }, { stage: "Calificación", label: "WhatsApp fuera del CRM" }, { stage: "Cotización", label: "Inasistencia" }, { stage: "Venta", label: "Sin saber qué campaña la trajo" }]} /></SystemSection>
  <SystemSection id="lo-que-hacemos" num="03." label="Lo que hacemos" title={<>Lo que hacemos: <span className="text-orange">Revenue Engine.</span></>}><SolutionSystemPanel features={features} system="Revenue Engine" summary="Demand System + Sales Flow bajo un solo responsable." href="/sistemas/revenue-engine"><p className="solution-system-card__meta">Compromiso mínimo: 6 meses</p></SolutionSystemPanel></SystemSection>
  <SystemSection id="noventa-dias" num="04." label="Los primeros 90 días" title="Qué cambia en 90 días."><MilestoneCards items={milestones} /></SystemSection>
  <SystemSection id="metodo" num="05." label="Prueba" title="El método."><MethodCard fields={methodFields} /></SystemSection>
  <SystemSection id="para-quien-no-es" num="06." label="Para quién no es" title="Honestidad antes de empezar."><div className="solution-honesty"><p>Negocios que aún no venden · sin presupuesto de mercadeo · que solo quieren optimizar por costo por lead · que buscan pagar solo por resultados.</p></div></SystemSection>
  <FaqSection items={FAQS} /><GeneralCta />
</main><SiteFooter /></div> }
