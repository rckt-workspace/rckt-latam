import { useEffect, useRef } from "react";
import { BarChart3, Bot, CalendarCheck, CalendarClock, Check, CircleAlert, ClipboardList, LockKeyhole, Megaphone, MessageCircle, ShieldCheck, Target, UserCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import heroPhoto from "@/assets/sector-salud.jpg";
import CampaignShell from "@/components/rckt/CampaignShell";
import DiagnosticForm from "@/components/rckt/DiagnosticForm";
import FaqSection, { type FaqItem } from "@/components/rckt/FaqSection";
import SectionHeader from "@/components/rckt/SectionHeader";
import { saveCampaignParams, track } from "@/components/rckt/tracking";
import { WHATSAPP_URL } from "@/config/contact";
import type { LeadLevel } from "@/components/rckt/leadScoring";

export const CLINIC_TITLE = "Sistema de captación y seguimiento de pacientes para clínicas · Bogotá · RCKT";
export const CLINIC_DESCRIPTION = "Conectamos tu pauta, tu WhatsApp y tu agenda para que cada persona que escribe reciba respuesta, seguimiento y recordatorio de su cita, y para que sepas qué campaña llena tus consultorios.";

const steps = [
  { title: "Cada conversación con su origen.", text: "Sabes de qué campaña, anuncio y tratamiento vino cada persona que escribe.", Icon: Target },
  { title: "Respuesta inmediata, a cualquier hora.", text: "Un agente supervisado saluda, pregunta por el tratamiento de interés, la sede y la disponibilidad, y pasa la conversación a la asesora cuando la persona quiere agendar o pregunta algo clínico.", Icon: Bot },
  { title: "Asignación por sede y asesora.", text: "Cada paciente potencial tiene responsable y tiempo máximo de respuesta. Si se vence, el sistema avisa.", Icon: UserCheck },
  { title: "Seguimiento y recordatorios.", text: "Secuencia a los días 0, 1, 3 y 7 para quien no responde; recordatorio 24 horas y 2 horas antes de la cita; mensaje de recuperación para quien no asistió.", Icon: CalendarClock },
  { title: "La venta vuelve a la pauta.", text: "Valoración realizada y tratamiento aceptado se envían a Meta y Google, que empiezan a buscar personas parecidas a las que sí se tratan.", Icon: BarChart3 },
];
const milestones = [
  { day: "30", text: "Todas las conversaciones en el CRM con su origen. Tablero con interesados, tiempo de respuesta, citas agendadas, asistencia e inasistencia por asesora y por sede" },
  { day: "60", text: "Qué campañas y qué tratamientos traen pacientes que sí asisten. Se mueve la inversión hacia esos" },
  { day: "90", text: "Costo por valoración realizada y por tratamiento aceptado, comparado con tu línea base" },
];
const leaks = [
  ["Entre el anuncio y la respuesta", "La asesora está en consulta o es fin de semana; el mensaje se responde horas después y el paciente ya agendó en otra parte"],
  ["Entre la conversación y la valoración", "Se resuelven dudas y se manda el precio, pero nadie vuelve a escribir si la persona no contesta"],
  ["Entre la cita agendada y la asistencia", "Sin recordatorio, una parte de las citas no se presenta y ese espacio de agenda se pierde"],
  ["Entre el tratamiento aceptado y la pauta", "La venta queda en el sistema de la clínica y nunca vuelve a Meta ni a Google, que siguen optimizando por conversaciones"],
];
const integrations = [
  { name: "WhatsApp Business", Icon: MessageCircle },
  { name: "Meta", Icon: Megaphone },
  { name: "Google", Icon: BarChart3 },
  { name: "Agenda / historia clínica", Icon: ClipboardList },
];
const fits = [
  "Ya pautas en Meta o Google de forma constante.",
  "Tienes asesoras o recepción atendiendo WhatsApp.",
  "El ticket de tus tratamientos justifica hacer seguimiento uno por uno.",
  "Puedes compartir qué pacientes agendaron, asistieron y aceptaron tratamiento.",
];
const notFits = [
  "Estás abriendo y todavía no tienes pacientes ni pauta.",
  "Buscas que alguien te maneje las redes sociales.",
  "Buscas el mensaje más barato, sin mirar cuántos se tratan.",
  "No puedes dar acceso a los datos de agenda y tratamientos.",
];
const faq: FaqItem[] = [
  { question: "¿Cuánto cuesta?", answer: "Depende de dónde esté la fuga, y eso lo mide el diagnóstico. El alcance sí está definido de antemano: qué incluye, qué no incluye y cómo se acepta cada entrega." },
  { question: "¿Sirve si tengo varias sedes?", answer: "Sí. El sistema asigna por sede y por asesora, y el tablero muestra el desempeño de cada una por separado." },
  { question: "¿Un robot va a atender a mis pacientes?", answer: "Un agente responde de inmediato, pregunta el tratamiento de interés y la disponibilidad, y pasa la conversación a tu asesora cuando hay intención de agendar o una duda clínica. Nunca da diagnósticos ni negocia precios." },
  { question: "¿Y la inasistencia?", answer: "Es una de las primeras cosas que se trabajan: recordatorios automáticos antes de la cita y mensaje de recuperación para quien no llegó, con el dato medido antes y después." },
  { question: "¿Me garantizan más pacientes?", answer: "No. No controlamos tu agenda, tus precios ni tu equipo. Lo que vas a tener en 30 días es tu embudo completo con datos reales, desde la pauta hasta el tratamiento aceptado." },
];

function Actions({ section, landing }: { section: string; landing: string }) {
  return <div className="campaign-actions">
    <a className="btn-orange" href="#formulario">Revisar mi proceso comercial</a>
    <a className="hero-whatsapp-btn" href={WHATSAPP_URL} onClick={() => track("whatsapp_click", { section, landing, utm_content: landing })}>Escríbenos por WhatsApp</a>
  </div>;
}

function CampaignNote({ icon: Icon, text, compact = false }: { icon: LucideIcon; text: string; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      element.dataset.campaignVisible = "true";
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) {
        element.dataset.campaignVisible = "true";
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const colonIndex = text.indexOf(":");
  const lead = colonIndex > 0 && colonIndex <= 90 ? text.slice(0, colonIndex + 1) : null;
  return <div ref={ref} className={compact ? "campaign-note campaign-note--compact" : "campaign-note"}>
    <span className="campaign-note__icon" aria-hidden="true"><Icon strokeWidth={1.6} /></span>
    {compact ? null : <span className="campaign-note__line" aria-hidden="true" />}
    <p className="campaign-note__text">{lead ? <><strong>{lead}</strong>{text.slice(colonIndex + 1)}</> : text}</p>
  </div>;
}

function useCampaignReveal() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".campaign-page main");
    if (!main || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const groups = main.querySelectorAll<HTMLElement>(".campaign-questions, .campaign-process, .campaign-timeline, .campaign-chips, .campaign-fit, .campaign-proof, .campaign-close");
    const frames = new Set<number>();
    const timers: number[] = [];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const group = entry.target as HTMLElement;
        group.dataset.campaignVisible = "true";
        if (group.classList.contains("campaign-timeline")) group.querySelectorAll<HTMLElement>(".milestone-card__num").forEach((number, index) => {
          const target = Number(number.textContent);
          if (!Number.isFinite(target)) return;
          timers.push(window.setTimeout(() => {
            let start: number | undefined;
            const step = (now: number) => {
              start ??= now;
              const progress = Math.min((now - start) / 800, 1);
              number.textContent = String(Math.round(target * (1 - (1 - progress) ** 3)));
              if (progress < 1) frames.add(requestAnimationFrame(step));
            };
            frames.add(requestAnimationFrame(step));
          }, index * 600));
        });
        observer.unobserve(group);
      });
    }, { threshold: 0.15 });
    groups.forEach(group => observer.observe(group));
    main.dataset.campaignReady = "true";
    return () => { observer.disconnect(); timers.forEach(clearTimeout); frames.forEach(cancelAnimationFrame); };
  }, []);
}

export function ClinicasCampaign({ variant }: { variant: "a" | "b" }) {
  const landing = variant === "b" ? "sales-flow-clinicas-bogota-b" : "sales-flow-clinicas-bogota";
  const base = `/lp/${landing}`;
  const navigate = useNavigate();
  const formStarted = useRef(false);
  useCampaignReveal();
  useEffect(() => {
    saveCampaignParams(window.location.search);
    saveCampaignParams(`?utm_content=${landing}`);
    track("lp_view", { landing, utm_content: landing });
  }, [landing]);
  return <CampaignShell minimal landingBase={base}><main>
    <section id="top" className="campaign-hero">
      <div className="campaign-hero__photo" aria-hidden="true"><img src={heroPhoto} alt="" /></div>
      <div className="campaign-shell campaign-hero__inner">
        <p className="label-orange">Sales Flow · RCKT LATAM</p>
        <h1>Tu clínica no tiene un problema de pacientes interesados. Tiene un problema de <span className="hero-hand">seguimiento</span>.</h1>
        <p className="campaign-hero__sub">{CLINIC_DESCRIPTION}</p>
        <Actions section="hero" landing={landing} />
        <CampaignNote compact icon={CalendarCheck} text="Tres semanas de diagnóstico con tus datos: cuántos interesados llegan, cuántos agendan, cuántos asisten y cuántos aceptan el tratamiento." />
      </div>
    </section>
    <section className="campaign-section"><div className="campaign-shell campaign-content">
      <SectionHeader num="01." label="El problema económico" title="Pagaste por ese paciente. ¿Cuánto te demoras en responderle?" />
      <p className="campaign-statement">En una clínica, la persona que escribe por WhatsApp está comparando tres o cuatro opciones al mismo tiempo. La que responde primero y hace seguimiento se queda con la valoración. El resto de la inversión en pauta se pierde en conversaciones que nunca se retomaron.</p>
      <div className="campaign-funnel"><h3>Las cuatro fugas típicas de una clínica:</h3><div className="campaign-questions">{leaks.map(([where, what]) => <div className="campaign-question" key={where}><strong>{where}</strong><p>{what}</p></div>)}</div></div>
      <CampaignNote icon={CircleAlert} text="El costo real no es el del mensaje: es el de la silla vacía y el del tratamiento que se fue a otra clínica." />
    </div></section>
    <section className="campaign-section"><div className="campaign-shell campaign-content">
      <SectionHeader num="02." label="Cómo funciona" title="Sales Flow para clínicas: del anuncio a la valoración, con seguimiento automático." />
      <div className="campaign-process"><div className="campaign-process__line" aria-hidden="true" /><div className="campaign-process__steps">{steps.map(({ title, text, Icon }, index) => <article className="campaign-process__step" key={title}><span className="campaign-process__circle"><Icon aria-hidden="true" strokeWidth={1.5} /></span><span className="campaign-process__number">{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      <CampaignNote icon={ShieldCheck} text="El agente nunca da diagnósticos, no promete resultados clínicos y no negocia precios. Esas conversaciones pasan siempre a una persona de tu equipo." />
    </div></section>
    <section className="campaign-section"><div className="campaign-shell campaign-content">
      <SectionHeader num="03." label="Qué cambia en 90 días" title="Qué cambia en 90 días" />
      <div className="campaign-timeline"><div className="campaign-timeline__line" aria-hidden="true" /><div className="campaign-timeline__steps">{milestones.map(({ day, text }) => <article className="campaign-timeline__step" key={day}><span className="campaign-timeline__dot" aria-hidden="true" /><span className="label-orange">Día</span><p className="milestone-card__num">{day}</p><p className="milestone-card__text">{text}</p></article>)}</div></div>
    </div></section>
    <section className="campaign-section"><div className="campaign-shell campaign-content">
      <SectionHeader num="04." label="Prueba" title="Empezamos midiendo tu clínica, no mostrándote casos ajenos." />
      <div className="campaign-proof"><p>Durante tres semanas revisamos tu pauta, una muestra de tus conversaciones de WhatsApp, tu agenda y tus datos de tratamientos aceptados. Reconstruimos el recorrido completo: inversión, interesados, respuesta, citas agendadas, asistencia y tratamientos. Ese documento te dice cuánto estás perdiendo en cada paso y qué se construye primero.</p></div>
    </div></section>
    <section className="campaign-section"><div className="campaign-shell campaign-content">
      <SectionHeader num="05." label="Integraciones y medición" title="Con tu número, tu agenda y tu software." />
      <p className="campaign-statement">Nos conectamos a tu WhatsApp Business, a tus cuentas de Meta y Google y a tu software de agenda o historia clínica cuando permite integración. Si no la permite, definimos el punto de registro manual más corto posible para no depender de la memoria de nadie. Todo queda a tu nombre y documentado.</p>
      <div className="campaign-chips">{integrations.map(({ name, Icon }) => <div className="campaign-chip" key={name}><Icon aria-hidden="true" /><span>{name}</span></div>)}</div>
      <CampaignNote icon={LockKeyhole} text="Manejo de datos personales conforme a la normativa colombiana, con autorización expresa. No se envía información clínica a las plataformas publicitarias: solo señales de etapa comercial." />
    </div></section>
    <section className="campaign-section"><div className="campaign-shell campaign-content">
      <SectionHeader num="06." label="Para quién" title="Es para tu clínica si:" />
      <div className="campaign-fit"><div className="band--orange"><h3>Es para tu clínica si:</h3><ul>{fits.map(text => <li key={text}>{text}</li>)}</ul></div><div><h3>No es para tu clínica si:</h3><ul>{notFits.map(text => <li key={text}>{text}</li>)}</ul></div></div>
    </div></section>
    <FaqSection items={faq} title="Preguntas frecuentes" />
    <section className="campaign-section" id="formulario" onInputCapture={event => { if (!formStarted.current && event.target instanceof HTMLInputElement && event.target.value.trim() && event.target.type !== "checkbox") { formStarted.current = true; track("form_start", { landing, utm_content: landing }); } }} onChangeCapture={event => { if (!formStarted.current && event.target instanceof HTMLSelectElement && event.target.value) { formStarted.current = true; track("form_start", { landing, utm_content: landing }); } }}>
      <div className="campaign-shell campaign-content"><SectionHeader num="07." label="Revenue Diagnostic" title="Revisar mi proceso comercial" />
        <div className="campaign-form-wrap">
          <DiagnosticForm mode="clinic" source={`lp-${landing}`} consentVersion="RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" whatsappUrl={WHATSAPP_URL} submitLabel="Revisar mi proceso comercial" onSuccess={result => {
            track("lead_valido", { landing, utm_content: landing, score: result.score, nivel: result.nivel });
            if (result.score >= 50) track("mql", { landing, utm_content: landing, score: result.score, nivel: result.nivel });
            void navigate({ to: variant === "b" ? "/lp/sales-flow-clinicas-bogota-b/gracias" : "/lp/sales-flow-clinicas-bogota/gracias", search: { nivel: result.nivel } });
          }} />
        </div>
      </div>
    </section>
    <section className="campaign-close"><div className="campaign-shell"><div className="campaign-close__card band--orange"><h2>Empecemos por medir tu clínica.</h2><p className="campaign-close__text">Tres semanas, tus números y una reunión con quien decide.</p><Actions section="cierre" landing={landing} /></div></div></section>
  </main>
    {variant === "b" && <a className="campaign-clinic-float" href={WHATSAPP_URL} aria-label="Escríbenos por WhatsApp" title="Escríbenos por WhatsApp" onClick={() => track("whatsapp_click", { section: "flotante", landing, utm_content: landing })}><svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 .8A15.1 15.1 0 0 0 3 23.6L1 31l7.6-2a15.1 15.1 0 1 0 7.4-28.2Zm0 27.5a12.3 12.3 0 0 1-6.3-1.7l-.5-.3-4.4 1.2L6 23.2l-.3-.5A12.4 12.4 0 1 1 16 28.3Zm6.8-9.3c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.3-1 1.2-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.5-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2 0-.5 0-.7l-1.2-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.3 2.5 3.9 6 5.4.8.4 1.5.6 2 .7.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5Z" /></svg></a>}
  </CampaignShell>;
}

export function ClinicasThanks({ variant, nivel }: { variant: "a" | "b"; nivel: LeadLevel }) {
  const landing = variant === "b" ? "sales-flow-clinicas-bogota-b" : "sales-flow-clinicas-bogota";
  const base = `/lp/${landing}`;
  useEffect(() => {
    saveCampaignParams(window.location.search);
    saveCampaignParams(`?utm_content=${landing}`);
    track("thank_you_view", { nivel, landing, utm_content: landing });
  }, [nivel, landing]);
  useEffect(() => {
    const card = document.querySelector<HTMLElement>(".campaign-thanks__card");
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => { if (entries[0]?.isIntersecting) { card.dataset.campaignVisible = "true"; observer.disconnect(); } }, { threshold: 0.15 });
    observer.observe(card);
    card.dataset.campaignReady = "true";
    return () => observer.disconnect();
  }, []);
  const content = nivel === "sql"
    ? { label: "Solicitud prioritaria", title: "Recibido.", text: "Vamos a revisar tu pauta, tus conversaciones de WhatsApp y tu proceso comercial en los próximos días. Escríbenos si tienes preguntas mientras tanto." }
    : nivel === "recurso"
      ? { label: "Solicitud recibida", title: "Gracias por escribir.", text: "Por lo que nos cuentas, hoy no somos la mejor opción para ti y preferimos decírtelo. Si más adelante ya estás invirtiendo y quieres escalar, nos encantaría hablar." }
      : { label: "Solicitud recibida", title: "Recibido.", text: "Te contactamos en menos de 24 horas hábiles. Mientras tanto, esto es lo que incluye el diagnóstico:" };
  return <CampaignShell thanks minimal landingBase={base}><main><section className="campaign-thanks"><div className="campaign-shell"><div className="campaign-thanks__card">
    <span className="campaign-thanks__icon" aria-hidden="true"><Check strokeWidth={2.5} /></span>
    <p className="label-orange">{content.label}</p><h1>{content.title}</h1><p className="campaign-thanks__text">{content.text}</p><span className="campaign-thanks__rule" aria-hidden="true" />
    {nivel === "sql" || nivel === "recurso" ? <a className="btn-orange campaign-resource-link" href="/contacto">Hablar con RCKT</a> : null}
    {nivel === "mql" ? <><ul className="campaign-thanks__list"><li>Mapa de fugas con tus números reales</li><li>Línea base documentada y firmada</li><li>Roadmap de 90 días priorizado por impacto</li></ul><p className="campaign-thanks__note">Si quieres adelantar, responde este correo con acceso de lectura a tus cuentas de anuncios.</p></> : null}
    <a className="campaign-thanks__back" href={base}>Volver al inicio</a>
  </div></div></section></main></CampaignShell>;
}
