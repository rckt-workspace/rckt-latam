import { AlertCircle, Copy, FileCheck2, FileClock, Inbox, LifeBuoy, MessageSquareQuote, RefreshCw, Table2 } from "lucide-react";
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
  { titulo: "Cotizaciones lentas", frase: "Cotizaciones que tardan horas y dependen de una persona.", Icono: FileClock },
  { titulo: "Datos duplicados", frase: "Datos duplicados entre CRM, ERP y hojas de cálculo.", Icono: Copy },
  { titulo: "Reporting manual", frase: "Reporting manual cada semana.", Icono: Table2 },
  { titulo: "Errores repetidos", frase: "Errores que se repiten porque nadie los documenta.", Icono: AlertCircle },
];
const features = [
  { name: "Cotizaciones desde WhatsApp o correo", detail: "El humano aprueba el envío y las condiciones especiales", Icon: MessageSquareQuote },
  { name: "Clasificación y respuesta de solicitudes", detail: "El humano aprueba los casos fuera de patrón", Icon: Inbox },
  { name: "Generación y verificación de documentos", detail: "El humano aprueba la firma y las excepciones", Icon: FileCheck2 },
  { name: "Sincronización CRM ↔ ERP u hojas", detail: "El humano resuelve los conflictos de datos", Icon: RefreshCw },
  { name: "Reporting comercial", detail: "El humano interpreta y decide", Icon: Table2 },
  { name: "Atención postventa de primer nivel", detail: "El humano gestiona reclamaciones y devoluciones", Icon: LifeBuoy },
];
const milestones = [
  { dia: "1–2", kicker: "Semanas", texto: "Mapa del proceso: volumen, tiempo, errores y costo; criterios de aceptación firmados antes de construir." },
  { dia: "3–6", kicker: "Semanas", texto: "Construcción e integración: el proceso se prueba con casos históricos y reales." },
  { dia: "7–8", kicker: "Semanas", texto: "Piloto controlado: medición contra la línea base y transferencia al equipo." },
];
const methodFields: MethodField[] = [
  { k: "Situación inicial", v: "Cotizaciones hechas a mano, datos duplicados entre CRM, ERP y hojas de cálculo, y reporting manual cada semana." },
  { k: "Periodo", v: "Operations Sprint de 6 a 8 semanas, con los criterios de aceptación firmados en la semana 2; después, soporte mensual." },
  { k: "Alcance", v: "Un proceso por sprint, con aprobación humana en lo que importa." },
  { k: "Inversión", v: "Sprint por alcance y soporte mensual durante 6 meses." },
  { k: "Intervención", v: "Mapa del proceso (volumen, tiempo, errores y costo), construcción e integración con casos reales y piloto controlado." },
  { k: "Resultado", v: "Costo por ejecución correcta, tiempo de ciclo y tasa de excepciones, frente a la línea base." },
  { k: "Método de medición", v: "Ejecuciones correctas sin intervención por encima del umbral acordado, normalmente entre el 85% y el 90% en el piloto." },
  { k: "Limitaciones", v: "Sin línea base no hay sprint. Quedan fuera los procesos sin datos accesibles o sin un responsable del lado del cliente." },
];
const FAQS: FaqItem[] = [
  { question: "Quiero un chatbot con IA.", answer: "No vendemos chatbots. Si tienes un proceso que tu equipo repite muchas veces, lo medimos y lo automatizamos con supervisión. Si es curiosidad por la IA, hay herramientas gratis para probar." },
  { question: "¿Qué procesos se pueden automatizar?", answer: "Cotizaciones desde WhatsApp o correo, clasificación y respuesta de solicitudes, generación y verificación de documentos, sincronización CRM ↔ ERP u hojas, reporting comercial y atención postventa de primer nivel. Si tu proceso no está en esta lista, se evalúa antes de cotizar." },
  { question: "¿Cuánto tarda?", answer: "Un Sprint de 6 a 8 semanas por proceso: un proceso por sprint, y el segundo reutiliza la infraestructura del primero." },
  { question: "¿Qué pasa con los casos que el sistema no resuelve?", answer: "Toda excepción tiene una ruta humana definida. Una persona aprueba lo que importa: envíos, condiciones especiales, firmas y reclamaciones." },
  { question: "¿Y si no sé cuánto me cuesta el proceso hoy?", answer: "Sin línea base no hay sprint: si no sabes cuánto te cuesta el proceso hoy, el Revenue Diagnostic lo mide primero." },
];
export const Route = createFileRoute("/soluciones/operacion")({ staticData: { sitemap: true }, head: () => ({ meta: [
  { title: "Operación — Automatización supervisada | RCKT" }, { name: "description", content: "Operations System automatiza un proceso repetitivo a la vez, con aprobación humana en lo que importa." },
  { property: "og:title", content: "Operación — Un proceso a la vez" }, { property: "og:description", content: "Cotizaciones, documentos y sincronización de sistemas con supervisión humana." },
  { property: "og:type", content: "website" }, { property: "og:url", content: SITE_URL + "/soluciones/operacion" }, { name: "twitter:card", content: "summary_large_image" },
], links: [{ rel: "canonical", href: SITE_URL + "/soluciones/operacion" }], scripts: [faqJsonLd(FAQS)] }), component: OperacionPage });
function OperacionPage() { return <div className="bg-background text-foreground antialiased"><main>
  <SystemPageHero label="Operación" title={<>Tu equipo hace lo mismo cien veces por <span className="hero-hand">semana.</span></>} descriptor="Cotizaciones a mano, documentos que se copian entre sistemas, Excel donde debería haber un proceso." context="Operations System: un proceso a la vez, Sprint de 6–8 semanas, aprobación humana en lo que importa." ctaLabel="Revisar mi proceso comercial →" />
  <SystemSection id="te-pasa-esto" num="01." label="Señales" title="Te pasa esto."><SignalCards items={signals} /></SystemSection>
  <SystemSection id="lo-que-hacemos" num="02." label="Lo que hacemos" title={<>Lo que hacemos: <span className="text-orange">Operations System.</span></>}><SolutionSystemPanel features={features} system="Operations System" summary="Un proceso a la vez, Sprint de 6–8 semanas y aprobación humana en lo que importa." href="/sistemas/operations-system" /></SystemSection>
  <SystemSection id="noventa-dias" num="03." label="El Sprint" title="Qué cambia en 90 días."><MilestoneCards items={milestones} /></SystemSection>
  <SystemSection id="metodo" num="04." label="Prueba" title="El método."><MethodCard fields={methodFields} /></SystemSection>
  <SystemSection id="para-quien-no-es" num="05." label="Para quién no es" title="Honestidad antes de empezar."><div className="solution-honesty"><p>Procesos críticos sin responsable del lado del cliente · procesos sin datos accesibles · equipos que buscan automatizar sin medir primero.</p></div></SystemSection>
  <FaqSection items={FAQS} /><GeneralCta />
</main><SiteFooter /></div> }
