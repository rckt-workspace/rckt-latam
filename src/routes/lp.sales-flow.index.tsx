import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BarChart3, Bot, CalendarClock, Megaphone, MessageCircle, ShieldCheck, Target, UserCheck, Waypoints } from "lucide-react";
import { useEffect, useRef } from "react";
import heroPhoto from "@/assets/lp-sales-flow-hero.jpg";
import CampaignShell from "@/components/rckt/CampaignShell";
import DiagnosticForm from "@/components/rckt/DiagnosticForm";
import FaqSection, { type FaqItem } from "@/components/rckt/FaqSection";
import SectionHeader from "@/components/rckt/SectionHeader";
import { scoreLead } from "@/components/rckt/leadScoring";
import { gtmHeadScripts, saveCampaignParams, track } from "@/components/rckt/tracking";

const description = "Conectamos tus campañas, tu WhatsApp y tu CRM para calificar cada oportunidad, darle seguimiento y saber cuáles terminan comprando.";
const title = "Sales Flow · De la conversación de WhatsApp a la venta, medido · RCKT";
export const Route = createFileRoute("/lp/sales-flow/")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: gtmHeadScripts,
  }),
  component: SalesFlowCampaign,
});

const processCards = [
  { titulo: "Entrada con origen.", detalle: "Cada conversación que entra por WhatsApp queda registrada con la campaña, el anuncio y el público que la generó.", Icon: Target },
  { titulo: "Calificación inmediata.", detalle: "Un agente supervisado responde al momento, hace las preguntas que ustedes definan y pasa la conversación a un asesor cuando hay intención real de compra, una queja o una pregunta que requiere criterio humano.", Icon: Bot },
  { titulo: "Asignación y tiempo de respuesta.", detalle: "Cada oportunidad tiene dueño, sede y tiempo máximo de respuesta. Si se vence, el sistema avisa al asesor y a su líder.", Icon: UserCheck },
  { titulo: "Seguimiento que no depende de la memoria.", detalle: "Secuencias en día 0, 1, 3 y 7; recordatorio de cita o reunión; recuperación de quien dejó de responder.", Icon: CalendarClock },
  { titulo: "El dato vuelve a la pauta.", detalle: "Oportunidad aceptada, reunión y venta se envían a Meta y Google para que optimicen por lo que factura, no por lo que conversa.", Icon: BarChart3 },
];
const milestones = [
  { dia: "30", texto: "Todas las conversaciones en el CRM con su origen. Tablero con oportunidades, tiempo de primera respuesta, porcentaje dentro del tiempo acordado y estado por asesor" },
  { dia: "60", texto: "Primera lectura por campaña con la calidad que reporta tu equipo comercial. Se mueve la inversión hacia lo que genera oportunidades aceptadas" },
  { dia: "90", texto: "Comparación con tu línea base: costo por cliente nuevo, antes y después. Decisión con datos sobre qué escalar" },
];
const integrations = [
  { name: "CRM", Icon: Waypoints },
  { name: "WhatsApp Business", Icon: MessageCircle },
  { name: "Meta", Icon: Megaphone },
  { name: "Google", Icon: BarChart3 },
];
const questions = [
  ["¿Cuántos de los que escribieron recibieron respuesta en menos de 15 minutos?", "Menos de la mitad, y en fin de semana casi ninguno"],
  ["¿A cuántos se les volvió a escribir si no respondieron?", "Casi ninguno; no hay secuencia definida"],
  ["¿Cuántas conversaciones quedaron registradas en el CRM?", "Una parte pequeña; el resto vive en el celular del asesor"],
  ["¿Qué campaña trajo a los clientes que sí compraron?", "No se sabe: el dato de venta nunca vuelve a Meta ni a Google"],
];
const faq: FaqItem[] = [
  { question: "¿Cuánto cuesta?", answer: "Depende de dónde esté la fuga, y eso lo mide el diagnóstico. Lo que está definido desde el principio es el alcance: qué incluye, qué no incluye y cómo se acepta cada entrega." },
  { question: "¿Tengo que cambiar de número de WhatsApp?", answer: "No. Trabajamos sobre tu número, verificado en la API de WhatsApp Business. Sigue siendo tuyo." },
  { question: "¿Un robot va a atender a mis clientes?", answer: "Un agente responde de inmediato, hace las preguntas que ustedes definan y organiza la conversación. Cuando hay intención de compra, queja o algo fuera de guión, pasa a un asesor. Cada cuenta tiene por escrito qué hace el agente solo y qué necesita aprobación." },
  { question: "¿Y si mis asesores no usan el CRM?", answer: "Es lo más común. Por eso el sistema registra la conversación automáticamente en lugar de pedirle al asesor que la copie, y capacitamos al equipo en la primera semana." },
  { question: "¿Me garantizan más ventas?", answer: "No. No controlamos tu precio, tu inventario ni el cierre de tu equipo. Lo que sí vas a tener en 30 días es tu embudo completo con datos reales, y cada decisión medida hasta la venta." },
];

function CampaignActions({ section }: { section: string }) {
  return <div className="campaign-actions">
    <a className="btn-orange" href="#formulario">Revisar mi proceso comercial</a>
    <a className="hero-whatsapp-btn" href="#whatsapp" onClick={() => track("whatsapp_click", { section })}>Escríbenos por WhatsApp</a>
  </div>;
}

function SalesFlowCampaign() {
  const navigate = useNavigate();
  const formStarted = useRef(false);
  useEffect(() => { saveCampaignParams(window.location.search); track("lp_view", {}); }, []);
  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".campaign-page main");
    if (!main) return;
    const groups = main.querySelectorAll<HTMLElement>(".campaign-questions, .campaign-process, .campaign-timeline, .campaign-chips, .campaign-fit, .campaign-proof, .campaign-close");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !('IntersectionObserver' in window)) return;
    const frames = new Set<number>();
    const animateNumbers = (group: HTMLElement) => {
      group.querySelectorAll<HTMLElement>(".milestone-card__num").forEach((number, index) => {
        const target = Number(number.textContent);
        if (!Number.isFinite(target)) return;
        const delay = window.setTimeout(() => {
          let start: number | undefined;
          const step = (now: number) => {
            start ??= now;
            const progress = Math.min((now - start) / 800, 1);
            number.textContent = String(Math.round(target * (1 - (1 - progress) ** 3)));
            if (progress < 1) { const frame = requestAnimationFrame(step); frames.add(frame); }
          };
          const frame = requestAnimationFrame(step);
          frames.add(frame);
        }, index * 600);
        timers.push(delay);
      });
    };
    const timers: number[] = [];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const group = entry.target as HTMLElement;
        group.dataset.campaignVisible = "true";
        if (group.classList.contains("campaign-timeline")) animateNumbers(group);
        observer.unobserve(group);
      });
    }, { threshold: 0.15 });
    groups.forEach(group => observer.observe(group));
    main.dataset.campaignReady = "true";
    return () => { observer.disconnect(); timers.forEach(clearTimeout); frames.forEach(cancelAnimationFrame); };
  }, []);
  return <CampaignShell><main>
    <section id="top" className="campaign-hero">
      <div className="campaign-hero__photo" aria-hidden="true"><img src={heroPhoto} alt="" /></div>
      <div className="campaign-shell campaign-hero__inner">
        <p className="label-orange">Sales Flow · RCKT LATAM</p>
        <h1>Convierte las conversaciones de WhatsApp en un proceso comercial <span className="hero-hand">medible</span>.</h1>
         <p className="campaign-hero__sub">Conectamos tus campañas, tu WhatsApp y tu CRM para calificar cada oportunidad, darle seguimiento y saber cuáles terminan comprando.</p>
        <CampaignActions section="hero" />
         <p className="campaign-hero__note">Tres semanas de diagnóstico con tus datos. Te decimos cuánto pierdes entre la pauta y la venta, y dónde.</p>
      </div>
    </section>
    <section className="campaign-section">
      <div className="campaign-shell campaign-content">
         <SectionHeader num="01." label="El problema económico" title="Meta te muestra conversaciones. Tu banco te muestra otra cosa." />
         <p className="campaign-statement">Pagas por que alguien te escriba. Ese mensaje llega al celular de una asesora que está atendiendo a otro cliente, responde cuando puede, contesta unas cuantas preguntas y ahí queda. Nadie registró de qué campaña vino, nadie volvió a escribirle a los tres días y nadie sabe si compró.</p>
         <div className="campaign-funnel">
           <h3>Revísalo con tus números del mes pasado:</h3>
           <div className="campaign-questions">{questions.map(([question, answer]) => <div className="campaign-question" key={question}><strong>{question}</strong><p>{answer}</p></div>)}</div>
        </div>
         <p className="campaign-statement">Mientras el dato de venta no vuelva a las plataformas, tu pauta se optimiza por conversaciones baratas, no por clientes.</p>
      </div>
    </section>
    <section className="campaign-section">
        <div className="campaign-shell campaign-content"><SectionHeader num="02." label="Cómo funciona" title="Sales Flow: de la pauta a la venta, con responsable en cada paso." /><div className="campaign-process"><div className="campaign-process__line" aria-hidden="true" /><div className="campaign-process__steps">{processCards.map(({ titulo, detalle, Icon }, index) => <article className="campaign-process__step" key={titulo}><span className="campaign-process__circle"><Icon aria-hidden="true" strokeWidth={1.5} /></span><span className="campaign-process__number">{String(index + 1).padStart(2, "0")}</span><h3>{titulo}</h3><p>{detalle}</p></article>)}</div></div><p className="campaign-statement campaign-process__note"><ShieldCheck aria-hidden="true" strokeWidth={1.6} />El número de WhatsApp sigue siendo el de ustedes. El agente responde y ordena; las decisiones de precio, condiciones y cierre las toma su equipo.</p></div>
    </section>
    <section className="campaign-section">
        <div className="campaign-shell campaign-content"><SectionHeader num="03." label="Qué cambia en 90 días" title="Qué cambia en 90 días" /><div className="campaign-timeline"><div className="campaign-timeline__line" aria-hidden="true" /><div className="campaign-timeline__steps">{milestones.map(item => <article className="campaign-timeline__step" key={item.dia}><span className="campaign-timeline__dot" aria-hidden="true" /><span className="label-orange">Día</span><p className="milestone-card__num">{item.dia}</p><p className="milestone-card__text">{item.texto}</p></article>)}</div></div></div>
    </section>
    <section className="campaign-section">
       <div className="campaign-shell campaign-content"><SectionHeader num="04." label="Prueba" title="Primero medimos, después prometemos." /><div className="campaign-proof"><p>El primer paso es un diagnóstico de tres semanas sobre tus datos reales: pauta, conversaciones, CRM y ventas de los últimos tres meses. De ahí sale el mapa de dónde se pierden las oportunidades, cuánto cuesta cada fuga al mes y qué se construye en los primeros 90 días. Esa medición queda firmada y es contra lo que se compara todo después.</p></div></div>
    </section>
    <section className="campaign-section">
       <div className="campaign-shell campaign-content"><SectionHeader num="05." label="Integraciones y medición" title="Funciona con lo que ya usas." />
         <p className="campaign-statement">Nos conectamos con tu cuenta de WhatsApp Business, tus cuentas de Meta y Google, y tu CRM. Si no tienes CRM, te recomendamos uno y lo dejamos funcionando. Las cuentas, el número y la base de datos son tuyos; te entregamos accesos y documentación desde el inicio.</p>
        <div className="campaign-chips">{integrations.map(({ name, Icon }) => <div className="campaign-chip" key={name}><Icon aria-hidden="true" /><span>{name}</span></div>)}</div>
         <p className="campaign-statement">Manejo de datos personales conforme a la normativa colombiana, con autorización expresa en el formulario y en el primer mensaje de WhatsApp.</p>
      </div>
    </section>
    <section className="campaign-section">
       <div className="campaign-shell campaign-content"><SectionHeader num="06." label="Para quién" title="Es para tu empresa si:" />
         <div className="campaign-fit"><div className="band--orange"><h3>Es para tu empresa si:</h3><ul>{["Ya vendes y ya inviertes en pauta todos los meses.", "Tienes asesores atendiendo WhatsApp o llamadas.", "Tu producto o servicio tiene un ticket que justifica hacer seguimiento.", "Puedes darnos acceso a tus datos de ventas para medir hasta el final."].map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>No es para tu empresa si:</h3><ul>{["Estás empezando y aún no tienes ventas.", "Buscas quien te maneje las redes sociales.", "Buscas el lead más barato posible.", "No quieres compartir qué oportunidades terminaron en venta."].map(item => <li key={item}>{item}</li>)}</ul></div></div>
      </div>
    </section>
     <FaqSection items={faq} title="Preguntas frecuentes" />
     <section className="campaign-section" id="formulario" onInputCapture={event => { if (!formStarted.current && event.target instanceof HTMLInputElement && event.target.value.trim() && event.target.type !== "checkbox") { formStarted.current = true; track("form_start", {}); } }} onChangeCapture={event => { if (!formStarted.current && event.target instanceof HTMLSelectElement && event.target.value) { formStarted.current = true; track("form_start", {}); } }} onClickCapture={event => { if ((event.target as HTMLElement).closest('a[href="#whatsapp"]')) track("whatsapp_click", { section: "formulario" }); }}>
      <div className="campaign-shell campaign-content">
         <SectionHeader num="07." label="Revenue Diagnostic" title="Revisar mi proceso comercial" />
        <div className="campaign-form-wrap">
           <DiagnosticForm whatsappUrl="#whatsapp" submitLabel="Revisar mi proceso comercial" onSuccess={values => {
            const { score, nivel } = scoreLead(values);
            track("lead_valido", { score, nivel });
             if (score >= 50) track("mql", { score, nivel });
            void navigate({ to: "/lp/sales-flow/gracias", search: { nivel } });
          }} legal={<span className="form-note">Al enviar este formulario, aceptas nuestra <a href="/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" target="_blank" rel="noopener noreferrer">Política de Tratamiento de Datos</a>.</span>} />
        </div>
      </div>
    </section>
     <section className="campaign-close"><div className="campaign-shell"><div className="campaign-close__card band--orange"><h2>Empecemos por medir.</h2><p className="campaign-close__text">Tres semanas, tus números y una reunión con quien decide en tu empresa.</p><CampaignActions section="cierre" /></div></div></section>
  </main></CampaignShell>;
}