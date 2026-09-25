import { Image as ImageIcon, LineChart, Megaphone, MessageCircle, Search, Sparkles, Tag, TrendingUp, Workflow } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import SiteFooter from "@/components/rckt/SiteFooter";
import FaqSection, { faqJsonLd, type FaqItem } from "@/components/rckt/FaqSection";
import MethodCard, { type MethodField } from "@/components/rckt/MethodCard";
import MilestoneCards from "@/components/rckt/MilestoneCards";
import SignalCards from "@/components/rckt/SignalCards";
import SolutionSystemPanel from "@/components/rckt/SolutionSystemPanel";
import GeneralCta from "@/components/rckt/GeneralCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";
const SITE_URL = "https://rckt.lat";
const signals = [
  { titulo: "Anuncios cansados", frase: "La misma pieza lleva meses rotando y cada semana rinde menos.", Icono: ImageIcon },
  { titulo: "Catálogo sin lectura", frase: "No sabes qué producto de verdad paga la pauta.", Icono: Tag },
  { titulo: "Ventas por WhatsApp sin dueño", frase: "Parte de los pedidos se cierra por WhatsApp y ninguna campaña se lleva el crédito.", Icono: MessageCircle },
  { titulo: "CAC en alza", frase: "El costo de adquisición sube más rápido que el ticket promedio.", Icono: TrendingUp },
];
const milestones = [
  { dia: "01", texto: "Piezas nuevas cada semana, probadas con IA" },
  { dia: "02", texto: "Reporte por margen de contribución, no por ROAS de plataforma" },
  { dia: "03", texto: "Las ventas de WhatsApp atribuidas a su campaña, si aplica" },
];
const features = [
  { name: "Performance Media", detail: "Meta, Google Search, PMax, YouTube y Display en retargeting", Icon: Megaphone },
  { name: "Creative Performance", detail: "Producción y testing con IA: hooks, ángulos, formatos, iteración semanal", Icon: Sparkles },
  { name: "Search & AI Visibility", detail: "SEO técnico y de contenido, presencia en respuestas de IA", Icon: Search },
  { name: "Medición", detail: "Tracking completo y reporte semanal por etapa del embudo", Icon: LineChart },
  { name: "Sales Flow, si WhatsApp pesa", detail: "Campañas, WhatsApp y CRM conectados", Icon: Workflow },
];
const methodFields: MethodField[] = [
  { k: "Situación inicial", v: "La pauta reporta ROAS alto, el margen no aparece en el banco, las piezas llevan meses sin cambiar y los pedidos por WhatsApp no se atribuyen." },
  { k: "Periodo", v: "Revenue Diagnostic de 2 a 3 semanas y Demand System con compromiso mínimo de 3 meses." },
  { k: "Alcance", v: "Demand System, más Sales Flow si WhatsApp pesa en la conversión." },
  { k: "Inversión", v: "La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Testing creativo continuo con IA, tracking completo y lectura comercial del catálogo." },
  { k: "Resultado", v: "Margen de contribución tras adquisición, frente a la línea base firmada." },
  { k: "Método de medición", v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas, porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales." },
];
const FAQS: FaqItem[] = [
  { question: "¿El ROAS no es suficiente?", answer: "No. La plataforma puede mostrar un ROAS alto mientras el margen en el banco sigue bajo; por eso medimos el margen que queda después de pagar la adquisición." },
  { question: "¿Qué necesita mi tienda?", answer: "Demand System, y Sales Flow si buena parte de la venta pasa por WhatsApp. El Revenue Diagnostic lo define con datos." },
  { question: "¿Y las ventas que cierro por WhatsApp?", answer: "También se miden: con Sales Flow entran al embudo y se atribuyen a la campaña que las trajo." },
  { question: "¿Cuál es el compromiso mínimo?", answer: "3 meses de Demand System; la pauta va aparte, en tus cuentas." },
  { question: "Mis anuncios ya no rinden como antes.", answer: "La creatividad se agota: en Demand System producimos y probamos piezas nuevas cada semana." },
];
export const Route = createFileRoute("/soluciones/ecommerce-rentable")({ staticData: { sitemap: true }, head: () => ({ meta: [
  { title: "Ecommerce rentable — Crecer con margen | RCKT" }, { name: "description", content: "Pauta, creatividad y medición por margen de contribución tras adquisición, no solo por ROAS de plataforma." },
  { property: "og:title", content: "Ecommerce rentable — Crecer con margen" }, { property: "og:description", content: "El ROAS sube en la plataforma, el margen no sube en el banco. Así se corrige." },
  { property: "og:type", content: "website" }, { property: "og:url", content: SITE_URL + "/soluciones/ecommerce-rentable" }, { name: "twitter:card", content: "summary_large_image" },
], links: [{ rel: "canonical", href: SITE_URL + "/soluciones/ecommerce-rentable" }], scripts: [faqJsonLd(FAQS)] }), component: EcommercePage });
function EcommercePage() { return <div className="bg-background text-foreground antialiased"><main>
  <SystemPageHero label="Ecommerce rentable" title={<>Inviertes en pauta y no crece <span className="hero-hand">con margen.</span></>} descriptor="La plataforma celebra el ROAS; el banco no ve el margen." context="Tu tienda vende y la pauta crece, pero cada cliente nuevo cuesta más y el margen no aparece. Por eso medimos lo que queda después de pagar la adquisición, no solo lo que reporta la plataforma." ctaLabel="Revisar mi proceso comercial →" />
  <SystemSection id="te-pasa-esto" num="01." label="Señales" title="Te pasa esto."><SignalCards items={signals} /></SystemSection>
  <SystemSection id="lo-que-hacemos" num="02." label="Lo que hacemos" title={<>Lo que hacemos: <span className="text-orange">Demand System.</span></>}><SolutionSystemPanel features={features} system="Demand System" summary="Pauta, creatividad y medición por margen; si WhatsApp pesa en la venta, sumamos Sales Flow." href="/sistemas/demand-system"><p className="solution-system-card__meta">Indicador: margen de contribución tras adquisición.</p></SolutionSystemPanel></SystemSection>
  <SystemSection id="noventa-dias" num="03." label="Los primeros 90 días" title="Qué cambia en 90 días."><MilestoneCards items={milestones} kicker="Cambio" /></SystemSection>
  <SystemSection id="metodo" num="04." label="Prueba" title="El método."><MethodCard fields={methodFields} /></SystemSection>
  <SystemSection id="para-quien-no-es" num="05." label="Para quién no es" title="Honestidad antes de empezar."><div className="solution-honesty"><p>Si tu margen no alcanza para sostener la pauta o no conoces la rentabilidad de cada producto, primero hay que ordenar eso.</p></div></SystemSection>
  <FaqSection items={FAQS} /><GeneralCta />
</main><SiteFooter /></div> }
