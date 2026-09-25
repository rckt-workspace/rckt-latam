import { AlertCircle, Copy, FileCheck2, FileClock, Inbox, LifeBuoy, MessageSquareQuote, RefreshCw, Table2 } from "lucide-react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import FaqSection, { faqJsonLd, type FaqItem } from "@/components/rckt/FaqSection";
import MethodCard, { type MethodField } from "@/components/rckt/MethodCard";
import MilestoneCards from "@/components/rckt/MilestoneCards";
import SignalCards from "@/components/rckt/SignalCards";
import SolutionSystemPanel from "@/components/rckt/SolutionSystemPanel";
import GeneralCta from "@/components/rckt/GeneralCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";

const SITE_URL = "https://rckt-latam.lovable.app";

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
  { name: "Atención post-venta de primer nivel", detail: "El humano gestiona reclamaciones y devoluciones", Icon: LifeBuoy },
];
const milestones = [
  { dia: "1–2", kicker: "Semanas", texto: "Mapa del proceso — Volumen, tiempo, errores y costo; criterios de aceptación firmados antes de construir." },
  { dia: "3–6", kicker: "Semanas", texto: "Construcción e integración — El proceso se prueba con casos históricos y reales." },
  { dia: "7–8", kicker: "Semanas", texto: "Piloto controlado — Medición contra la línea base y transferencia al equipo." },
];
const methodFields: MethodField[] = [
  { k: "Situación inicial", v: "Cotizaciones hechas a mano, datos duplicados entre CRM, ERP y hojas de cálculo, y reporting manual cada semana." },
  { k: "Período", v: "Operations Sprint de 6 a 8 semanas, con los criterios de aceptación firmados en la semana 2; después, soporte mensual." },
  { k: "Alcance", v: "Un proceso por sprint, con aprobación humana en lo que importa." },
  { k: "Inversión", v: "Sprint por alcance y soporte mensual durante 6 meses." },
  { k: "Intervención", v: "Mapa del proceso (volumen, tiempo, errores y costo), construcción e integración con casos reales y piloto controlado." },
  { k: "Resultado", v: "Costo por ejecución correcta, tiempo de ciclo y tasa de excepciones, frente a la línea base." },
  { k: "Método de medición", v: "Ejecuciones correctas sin intervención por encima del umbral acordado, normalmente entre el 85% y el 90% en el piloto." },
  { k: "Limitaciones", v: "Sin línea base no hay sprint. Quedan fuera los procesos sin datos accesibles o sin un responsable del lado del cliente." },
];
const FAQS: FaqItem[] = [];

export const Route = createFileRoute("/soluciones/operacion")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Operación — RCKT" },
      {
        name: "description",
        content:
          "Tu equipo hace lo mismo cien veces por semana. Operations System: un proceso a la vez, con aprobación humana en lo que importa.",
      },
      { property: "og:title", content: "Operación — RCKT" },
      {
        property: "og:description",
        content:
          "Cotizaciones a mano, documentos que se copian entre sistemas, Excel donde debería haber un proceso.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/soluciones/operacion" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/soluciones/operacion" }],
    scripts: FAQS.length > 0 ? [faqJsonLd(FAQS)] : [],
  }),
  component: OperacionPage,
  errorComponent: OperacionError,
  notFoundComponent: () => <OperacionError />,
});

function OperacionPage() {
  useSiteMotion([]);

  return (
    <div className="rckt-site tcn-page">
      <main id="top">
        <SystemPageHero label="Operación" title={<>Tu equipo hace lo mismo cien veces por <em>semana</em></>} descriptor="Cotizaciones a mano, documentos que se copian entre sistemas, Excel donde debería haber un proceso." context="Operations System: un proceso a la vez, Sprint de 6-8 semanas, aprobación humana en lo que importa." ctaLabel="Revisar mi proceso comercial →" />
        <SystemSection id="te-pasa-esto" num="01." label="Señales" title={<>Lo repetitivo ya está costando <em className="font-serif-accent">demasiado</em>.</>} phrase="Tiempo, datos duplicados, reportes manuales y errores revelan el proceso a intervenir."><SignalCards items={signals} /></SystemSection>
        <SystemSection id="lo-que-hacemos" num="02." label="Lo que hacemos" title={<>Un proceso a la vez, con supervisión <em className="font-serif-accent">humana</em>.</>} phrase="Un Sprint de 6–8 semanas y aprobación humana en lo que importa."><SolutionSystemPanel features={features} system="Operations System" summary="Un proceso a la vez, Sprint de 6-8 semanas, aprobación humana en lo que importa." href="/sistemas/operations-system" /></SystemSection>
        <SystemSection id="noventa-dias" num="03." label="Qué cambia en 90 días" title={<>Del mapa a un proceso <em className="font-serif-accent">operativo</em>.</>} phrase="El Sprint mide la operación antes de construir, durante el piloto y contra la línea base."><MilestoneCards items={milestones} /></SystemSection>
        <SystemSection id="caso" num="04." label="Prueba" title={<>El método antes que el <em className="font-serif-accent">titular</em>.</>}><MethodCard fields={methodFields} /></SystemSection>
        <SystemSection id="para-quien-no-es" num="05." label="Para quién no es" title={<>La base también tiene que estar <em className="font-serif-accent">lista</em>.</>}><div className="solution-honesty"><p>Procesos críticos sin responsable del lado del cliente, o sin datos accesibles.</p></div></SystemSection>
        <FaqSection items={FAQS} />
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function OperacionError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Operación</span>
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
