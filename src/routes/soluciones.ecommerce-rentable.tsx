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
  { titulo: "Creatividad agotada", frase: "El mismo anuncio desde hace meses.", Icono: ImageIcon },
  { titulo: "Catálogo sin lectura", frase: "No sabes qué producto realmente paga la pauta.", Icono: Tag },
  { titulo: "WhatsApp sin medir", frase: "WhatsApp entra en el proceso de venta, pero nadie lo mide.", Icono: MessageCircle },
  { titulo: "CAC en alza", frase: "El costo de adquisición sube más rápido que el ticket promedio.", Icono: TrendingUp },
];
const milestones = [
  { dia: "01", texto: "Testing creativo continuo con IA: hooks, ángulos, formatos." },
  { dia: "02", texto: "Medición por margen de contribución, no solo ROAS." },
  { dia: "03", texto: "WhatsApp integrado al embudo, si aplica." },
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
  { k: "Periodo", v: "Revenue Diagnostic de 2 a 3 semanas y Demand System con compromiso mínimo de 3 meses." },
  { k: "Alcance", v: "Demand System, más Sales Flow si WhatsApp pesa en la conversión." },
  { k: "Inversión", v: "La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros." },
  { k: "Intervención", v: "Testing creativo continuo con IA, tracking completo y lectura comercial del catálogo." },
  { k: "Resultado", v: "Margen de contribución tras adquisición, frente a la línea base firmada." },
  { k: "Método de medición", v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú." },
  { k: "Limitaciones", v: "No garantizamos ventas, porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días verás tu embudo completo con datos reales." },
];
const FAQS: FaqItem[] = [
  { question: "¿Por qué no se mide solo el ROAS?", answer: "Porque un ROAS alto en la plataforma puede convivir con un margen bajo en el banco. Medimos por margen de contribución tras adquisición." },
  { question: "¿Qué sistema necesita mi tienda?", answer: "Demand System, con Sales Flow si WhatsApp pesa en tu conversión. Lo decidimos con datos en el Revenue Diagnostic." },
  { question: "Vendo también por WhatsApp, ¿eso se mide?", answer: "Sí. Si WhatsApp entra en tu proceso de venta, se integra al embudo con Sales Flow para que esas ventas también se atribuyan." },
  { question: "¿Cuál es el compromiso mínimo?", answer: "3 meses de Demand System, con la pauta pagada aparte en tus propias cuentas." },
  { question: "Solo quiero que me manejen la pauta.", answer: "Podemos, si ya tienes CRM y proceso comercial funcionando. Si no, vas a pagar leads que se pierden después. Empecemos por el Diagnostic y te decimos con datos qué necesitas." },
];
export const Route = createFileRoute("/soluciones/ecommerce-rentable")({ staticData: { sitemap: true }, head: () => ({ meta: [
  { title: "Ecommerce rentable — Crecer con margen | RCKT" }, { name: "description", content: "Pauta, creatividad y medición por margen de contribución tras adquisición, no solo por ROAS de plataforma." },
  { property: "og:title", content: "Ecommerce rentable — Crecer con margen" }, { property: "og:description", content: "El ROAS sube en la plataforma, el margen no sube en el banco. Así se corrige." },
  { property: "og:type", content: "website" }, { property: "og:url", content: SITE_URL + "/soluciones/ecommerce-rentable" }, { name: "twitter:card", content: "summary_large_image" },
], links: [{ rel: "canonical", href: SITE_URL + "/soluciones/ecommerce-rentable" }], scripts: [faqJsonLd(FAQS)] }), component: EcommercePage });
function EcommercePage() { return <div className="bg-background text-foreground antialiased"><main>
  <SystemPageHero label="Ecommerce rentable" title={<>Inviertes en pauta y no crece <span className="hero-hand">con margen.</span></>} descriptor="El ROAS sube en la plataforma, el margen no sube en el banco." context="Tu tienda ya vende e invierte en pauta, pero el crecimiento no se traduce en margen. Medimos por margen de contribución tras adquisición, no solo por ROAS." ctaLabel="Revisar mi proceso comercial →" />
  <SystemSection id="te-pasa-esto" num="01." label="Señales" title="Te pasa esto."><SignalCards items={signals} /></SystemSection>
  <SystemSection id="lo-que-hacemos" num="02." label="Lo que hacemos" title={<>Lo que hacemos: <span className="text-orange">Demand System.</span></>}><SolutionSystemPanel features={features} system="Demand System" summary="Demand System, con Sales Flow si WhatsApp pesa en la conversión." href="/sistemas/demand-system"><p className="solution-system-card__meta">Indicador: margen de contribución tras adquisición.</p></SolutionSystemPanel></SystemSection>
  <SystemSection id="noventa-dias" num="03." label="Los primeros 90 días" title="Qué cambia en 90 días."><MilestoneCards items={milestones} kicker="Cambio" /></SystemSection>
  <SystemSection id="metodo" num="04." label="Prueba" title="El método."><MethodCard fields={methodFields} /></SystemSection>
  <SystemSection id="para-quien-no-es" num="05." label="Para quién no es" title="Honestidad antes de empezar."><div className="solution-honesty"><p>Tiendas sin margen para sostener la pauta · catálogos sin unit economics claras.</p></div></SystemSection>
  <FaqSection items={FAQS} /><GeneralCta />
</main><SiteFooter /></div> }
