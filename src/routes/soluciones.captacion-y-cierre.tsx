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
import SiteNav from "@/components/rckt/SiteNav";

const SITE_URL = "https://rckt.lat";
const signals = [
  { titulo: "47 conversaciones, 2 clientes", frase: "La diferencia está entre las dos pantallas.", Icono: Clock },
  { titulo: "El celular de la asesora", frase: "Está atendiendo bien a un cliente y perdiendo otros tres.", Icono: MessageCircle },
  { titulo: "Costo por lead", frase: "Te hace comprar barato lo que no compra.", Icono: BarChart3 },
  { titulo: "Quince minutos", frase: "Después de ese minuto, tu prospecto ya le escribió a otro.", Icono: CalendarX },
  { titulo: "La venta no vuelve", frase: "El dato de venta vive en tu CRM y las plataformas nunca lo ven.", Icono: Search },
];
const milestones = [
  { dia: "30", texto: "Cada conversación entra al CRM con su campaña de origen" },
  { dia: "60", texto: "Primera respuesta y seguimiento dentro del tiempo acordado" },
  { dia: "90", texto: "Línea base frente a resultado, y el dato de venta de vuelta a Meta y Google" },
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
  { k: "Situación inicial", v: "Meta reporta muchas conversaciones y pocas ventas; los leads se atienden desde el celular de la asesora, sin registro en el CRM, y la primera respuesta depende de quién esté libre." },
  { k: "Periodo", v: "Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90." },
  { k: "Alcance", v: "Revenue Engine: Demand System y Sales Flow bajo un solo responsable, medido del clic al cierre." },
  { k: "Inversión", v: "La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Primera respuesta en minutos, seguimiento a quien no contesta, cada conversación en el CRM y el dato de venta de vuelta a Meta y Google." },
  { k: "Resultado", v: "Se mide frente a la línea base firmada: costo por cliente adquirido y cuánto vale ese cliente frente a lo que costó traerlo." },
  { k: "Método de medición", v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días vas a ver tu embudo completo con datos reales." },
];
const FAQS: FaqItem[] = [
  { question: "¿Qué sistema me sirve si pago por leads y no sé cuáles compran?", answer: "En la mayoría de los casos, Revenue Engine: la pauta y el proceso de WhatsApp y CRM con un solo responsable. El Revenue Diagnostic lo confirma con tus números." },
  { question: "¿Hay que pagar el diagnóstico?", answer: "Sí. Son tres semanas de trabajo con tus datos, y lo que pagas se descuenta del sistema si sigues con nosotros." },
  { question: "¿Un sistema automático va a atender a mis clientes?", answer: "Responde lo que se repite mil veces y entrega la conversación a tu asesora en cuanto hay intención de agendar. Lo que hace y lo que no, queda por escrito." },
  { question: "¿Necesito más pauta?", answer: "No para empezar: el tiempo de primera respuesta es la variable más barata de arreglar y la que más cambia el resultado." },
  { question: "¿Pueden garantizar ventas?", answer: "No, porque el cierre, el stock y los precios dependen de ti. Lo que sí garantizamos es que en 30 días vas a ver tu embudo completo con datos reales." },
];
export const Route = createFileRoute("/soluciones/captacion-y-cierre")({ staticData: { sitemap: true }, head: () => ({ meta: [
  { title: "Captación y cierre — Pagas por leads y no sabes cuáles compran | RCKT" },
  { name: "description", content: "Campañas, WhatsApp y CRM bajo un solo responsable, con medición del clic al cierre para saber qué leads compran." },
  { property: "og:title", content: "Captación y cierre — Saber qué leads compran" },
  { property: "og:description", content: "Dónde se pierde el dinero entre la inversión y la venta, y cómo se cierra cada fuga." },
  { property: "og:type", content: "website" }, { property: "og:url", content: SITE_URL + "/soluciones/captacion-y-cierre" }, { name: "twitter:card", content: "summary_large_image" },
], links: [{ rel: "canonical", href: SITE_URL + "/soluciones/captacion-y-cierre" }], scripts: [faqJsonLd(FAQS)] }), component: CaptacionPage });
function CaptacionPage() { return <div className="rckt-site bg-background text-foreground antialiased"><SiteNav /><main>
  <SystemPageHero label="Captación y cierre" title={<>Pagas por leads y no sabes <span className="hero-hand">cuáles compran.</span></>} descriptor="Meta te muestra cuántas personas escribieron. Nadie te muestra cuántas compraron." context="Esa parte del recorrido casi nunca está medida, y es donde se decide si la pauta te sirve o no. Lo resolvemos con Revenue Engine, medido del clic al cierre." ctaLabel="Revisar mi proceso comercial →" />
  <SystemSection id="te-pasa-esto" num="01." label="Señales" title="Te pasa esto."><SignalCards items={signals} /></SystemSection>
  <SystemSection id="fugas" num="02." label="El embudo" title="Dónde se te va la venta."><FunnelBars stages={["Pauta", "WhatsApp", "Calificación", "CRM", "Venta"]} leaks={[{ stage: "WhatsApp", label: "¿respondiste en menos de 15 minutos?" }, { stage: "Calificación", label: "¿a cuántos les volviste a escribir?" }, { stage: "CRM", label: "¿cuántas conversaciones quedaron registradas?" }, { stage: "Venta", label: "¿qué campaña trajo a los que compraron?" }]} /></SystemSection>
  <SystemSection id="lo-que-hacemos" num="03." label="Lo que hacemos" title={<>Lo que hacemos: <span className="text-orange">Revenue Engine.</span></>}><SolutionSystemPanel features={features} system="Revenue Engine" summary="La pauta que trae la conversación y el proceso que la convierte en venta, bajo un solo responsable y con una sola fuente de verdad." href="/sistemas/revenue-engine"><p className="solution-system-card__meta">Compromiso mínimo: 6 meses</p></SolutionSystemPanel></SystemSection>
  <SystemSection id="noventa-dias" num="04." label="Los primeros 90 días" title="Qué cambia en 90 días."><MilestoneCards items={milestones} /></SystemSection>
  <SystemSection id="metodo" num="05." label="Prueba" title="El método."><MethodCard fields={methodFields} /></SystemSection>
  <SystemSection id="para-quien-no-es" num="06." label="Para quién no es" title="Honestidad antes de empezar."><div className="solution-honesty"><p>Si todavía no vendes, si no tienes presupuesto de mercadeo, si solo quieres bajar el costo por lead o si buscas pagar solo por resultados, hoy no somos la mejor opción.</p></div></SystemSection>
  <FaqSection items={FAQS} /><GeneralCta />
</main><SiteFooter /></div> }
