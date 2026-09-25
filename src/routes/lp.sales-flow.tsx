import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import heroPhoto from "@/assets/rckt-hero.jpg";
import ctaPhoto from "@/assets/rckt-cta.jpg";
import CampaignShell from "@/components/rckt/CampaignShell";
import DiagnosticForm from "@/components/rckt/DiagnosticForm";
import FaqSection, { type FaqItem } from "@/components/rckt/FaqSection";
import MethodCard, { type MethodField } from "@/components/rckt/MethodCard";
import SectionHeader from "@/components/rckt/SectionHeader";
import { AcceptanceSteps } from "@/components/rckt/SystemBlocks";
import MilestoneCards from "@/components/rckt/MilestoneCards";
import { scoreLead } from "@/components/rckt/leadScoring";
import { gtmHeadScripts, saveCampaignParams, track } from "@/components/rckt/tracking";

const description = "Convierte las conversaciones de WhatsApp en un proceso comercial medible. Revisa dónde se pierden las conversaciones y mide hasta la venta.";
export const Route = createFileRoute("/lp/sales-flow")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Sales Flow — RCKT LATAM" },
      { name: "description", content: description },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Sales Flow — RCKT LATAM" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: gtmHeadScripts,
  }),
  component: SalesFlowCampaign,
});

const steps = [
  { label: "01 · Pauta", texto: "Cada conversación llega con su campaña identificada", hito: "1" },
  { label: "02 · WhatsApp", texto: "Primera respuesta en minutos, sin depender de quién esté libre", hito: "2" },
  { label: "03 · Calificación", texto: "Lo repetitivo se responde solo; con intención de compra, pasa a tu asesora", hito: "3" },
  { label: "04 · CRM", texto: "Cada conversación registrada, con seguimiento a quien no contesta", hito: "4" },
  { label: "05 · Venta", texto: "El dato de venta vuelve a Meta y Google", hito: "5" },
];
const milestones = [
  { dia: "30", texto: "Sistema operativo con fuente de verdad" },
  { dia: "60", texto: "Primera lectura de dónde se pierden las conversaciones" },
  { dia: "90", texto: "Línea base frente a resultado" },
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
const faq: FaqItem[] = [
  { question: "¿Cuánto cuesta?", answer: "Depende de dónde esté tu fuga, y eso es justo lo que mide el Revenue Diagnostic. Lo que sí te podemos decir es cómo funciona y qué incluye." },
  { question: "¿Cuánto tarda?", answer: "El Diagnostic toma de 2 a 3 semanas, y el sistema queda aceptado en máximo 30 días desde el inicio del setup." },
  { question: "¿Por qué necesitan tanto acceso?", answer: "Porque sin él no podemos medir hasta la venta. Los accesos son de lectura donde se pueda y quedan documentados." },
  { question: "¿Me garantizan resultados?", answer: "No garantizamos ventas porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días vas a ver tu embudo completo con datos reales." },
  { question: "¿Qué pasa después?", answer: "Decides con datos si sigues. Si sigues, lo que pagaste por el Diagnostic se descuenta del sistema." },
];

function CampaignActions({ section }: { section: string }) {
  return <div className="campaign-actions">
    <a className="btn-orange" href="#formulario">Revisar mi proceso comercial →</a>
    <a className="hero-whatsapp-btn" href="#whatsapp" onClick={() => track("whatsapp_click", { section })}>Escribir por WhatsApp</a>
  </div>;
}

function SalesFlowCampaign() {
  const navigate = useNavigate();
  useEffect(() => { saveCampaignParams(window.location.search); }, []);
  return <CampaignShell><main>
    <section id="top" className="campaign-hero">
      <div className="campaign-hero__photo" aria-hidden="true"><img src={heroPhoto} alt="" /></div>
      <div className="campaign-shell campaign-hero__inner">
        <p className="label-orange">Sales Flow · RCKT LATAM</p>
        <h1>Convierte las conversaciones de WhatsApp en un proceso comercial <span className="hero-hand">medible</span>.</h1>
        <p className="campaign-hero__sub">Meta te muestra cuántas personas escribieron. Nadie te muestra cuántas compraron.</p>
        <CampaignActions section="hero" />
      </div>
    </section>
    <section className="campaign-section">
      <div className="campaign-shell campaign-content">
        <SectionHeader num="01." label="El problema económico" title="Lo que pasa entre un lead y un cliente." />
        <div className="campaign-funnel" aria-label="Ejemplo: 47 leads, 11 contactados, 5 reuniones, 1 cliente">
          <p className="label-orange">Ejemplo</p>
          <div className="campaign-funnel__row">{[["47", "leads"], ["11", "contactados"], ["5", "reuniones"], ["1", "cliente"]].map(([value, label], i) => <div className="campaign-funnel__step" key={label}>{i > 0 && <span className="campaign-funnel__arrow" aria-hidden="true">→</span>}<strong>{value}</strong><span>{label}</span></div>)}</div>
        </div>
        <p className="campaign-statement">Esa parte del recorrido casi nunca está medida, y es donde se decide si la pauta te sirve o no.</p>
      </div>
    </section>
    <section className="campaign-section">
      <div className="campaign-shell campaign-content"><SectionHeader num="02." label="Cómo funciona" title="Del anuncio a la venta, sin perder el hilo." /><AcceptanceSteps items={steps} /></div>
    </section>
    <section className="campaign-section">
      <div className="campaign-shell campaign-content"><SectionHeader num="03." label="Qué cambia en 90 días" title="Una lectura más clara, cada mes." /><div className="mt-10"><MilestoneCards items={milestones} /></div></div>
    </section>
    <section className="campaign-section">
      <div className="campaign-shell campaign-content"><SectionHeader num="04." label="Prueba" title="El método antes que el titular." /><MethodCard fields={methodFields} className="mt-10" /></div>
    </section>
    <section className="campaign-section">
      <div className="campaign-shell campaign-content"><SectionHeader num="05." label="Integraciones y medición" title="Una sola lectura del recorrido." />
        <div className="campaign-chips">{["CRM", "WhatsApp Business API", "Meta", "Google", "Dashboard"].map(item => <span className="campaign-chip" key={item}>{item}</span>)}</div>
        <p className="campaign-statement">Cada semana ves tu embudo por etapa y los tiempos de respuesta de tu equipo.</p>
      </div>
    </section>
    <section className="campaign-section">
      <div className="campaign-shell campaign-content"><SectionHeader num="06." label="Para quién" title="Un proceso que ya tiene qué medir." />
        <div className="campaign-fit"><div><h3>Es para ti si</h3><ul>{["Ya vendes y ya inviertes en pauta", "Te escriben por WhatsApp", "Tienes asesoras o un equipo comercial", "Quieres saber qué campaña trae ventas"].map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>No es para ti si</h3><ul>{["Buscas una web de bajo costo", "Todavía no vendes", "Quieres un chatbot por curiosidad", "Quieres pagar solo por resultados"].map(item => <li key={item}>{item}</li>)}</ul></div></div>
      </div>
    </section>
    <FaqSection items={faq} />
    <section className="campaign-section" id="formulario">
      <div className="campaign-shell campaign-content campaign-form-layout"><div><SectionHeader num="07." label="Revenue Diagnostic" title="Revisemos tu proceso comercial." /><p className="campaign-statement">Meta te muestra cuántas personas escribieron. Nadie te muestra cuántas compraron.</p></div>
        <DiagnosticForm whatsappUrl="#whatsapp" submitLabel="Revisar mi proceso comercial →" onSuccess={values => {
          const { score, nivel } = scoreLead(values);
          track("lead_valido", { score, nivel });
          void navigate({ to: "/lp/sales-flow/gracias", search: { nivel } });
        }} legal={<span className="form-note">Al enviar este formulario, aceptas nuestra <a href="/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" target="_blank" rel="noopener noreferrer">Política de Tratamiento de Datos</a>.</span>} />
      </div>
    </section>
    <section className="campaign-close general-cta"><div className="campaign-close__photo" aria-hidden="true"><img src={ctaPhoto} alt="" /></div><div className="campaign-shell campaign-close__inner"><p className="label-orange">¿Empezamos?</p><h2>¿Revisamos tu proceso comercial?</h2><CampaignActions section="cierre" /></div></section>
  </main></CampaignShell>;
}