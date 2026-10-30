import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { saveDiagnosticLead } from "@/lib/leads-diagnostic.functions";
import { getCampaignParams, saveCampaignParams, track } from "@/components/rckt/tracking";
import { WHATSAPP_URL, contactConfig } from "@/config/contact";
import logoDark from "@/assets/rckt-logo-dark.png";

export const LANDING_C_TITLE = "ChatGPT y cirugía plástica: prepara tu clínica | RCKT";
export const LANDING_C_DESCRIPTION =
  "Tus futuros pacientes ya le preguntan a ChatGPT dónde operarse. Posiciona tu clínica de cirugía plástica en las respuestas de IA y pauta lo que hoy sí es elegible.";

const LANDING = "chatgpt-ads-cirugia-plastica";
const CONSENT_VERSION = "RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf";

const serif = "font-['Instrument_Serif',serif]";

function ImagePlaceholder({ name, className = "", tone = "pearl" }: { name: string; className?: string; tone?: "pearl" | "light" | "dark" }) {
  const tones = {
    pearl: "border-[#D9DDE4] bg-[#EEF1F6] text-[#4F4F4D]",
    light: "border-[#D9DDE4] bg-[#F4F6FA] text-[#4F4F4D]",
    dark: "border-[#3A3A3A] bg-[#2C2C2C] text-[#BDB8B1]",
  } as const;
  return (
    <div className={`flex items-center justify-center rounded-[4px] border ${tones[tone]} ${className}`} role="img" aria-label={name}>
      <span className="px-3 text-center text-[12px] font-medium tracking-wide">{name}</span>
    </div>
  );
}

function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16 .8A15.1 15.1 0 0 0 3 23.6L1 31l7.6-2a15.1 15.1 0 1 0 7.4-28.2Zm0 27.5a12.3 12.3 0 0 1-6.3-1.7l-.5-.3-4.4 1.2L6 23.2l-.3-.5A12.4 12.4 0 1 1 16 28.3Zm6.8-9.3c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.3-1 1.2-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.5-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2 0-.5 0-.7l-1.2-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.3 2.5 3.9 6 5.4.8.4 1.5.6 2 .7.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5Z" />
    </svg>
  );
}

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#diagnostico"
      className={`inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#005CFF] px-8 text-[16px] font-semibold text-white transition-colors hover:bg-[#004AD0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF] ${className}`}
    >
      {children}
    </a>
  );
}

function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#D9DDE4] bg-[#FBFBFA]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" aria-label="RCKT">
          <img src={logoDark} alt="RCKT" className="h-7 w-auto" />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Secciones">
          <a href="#beneficios" className="text-[15px] font-medium text-[#212121] transition-colors hover:text-[#005CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
            Beneficios
          </a>
          <a href="#proceso" className="text-[15px] font-medium text-[#212121] transition-colors hover:text-[#005CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
            Cómo funciona
          </a>
        </nav>
        <a
          href="#diagnostico"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#212121] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#005CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]"
        >
          Solicitar diagnóstico
        </a>
      </div>
    </header>
  );
}

const heroChats = [
  {
    id: "cirujano",
    label: "Elegir cirujano",
    question: "¿Qué debo revisar antes de elegir cirujano plástico en Cali?",
    answer: "Confirma que el cirujano esté certificado por la sociedad científica correspondiente, que opere en una institución habilitada y que te explique riesgos y recuperación.",
    foot: "Fuente citada · [Tu clínica]",
  },
  {
    id: "rinoplastia",
    label: "Recuperación de rinoplastia",
    question: "¿Cuánto tiempo toma recuperarse de una rinoplastia?",
    answer: "Depende de cada caso y de la técnica utilizada. Lo más importante es seguir las indicaciones de tu cirujano y asistir a los controles.",
    foot: "Fuente citada · [Tu clínica]",
  },
  {
    id: "no-quirurgicos",
    label: "Tratamientos no quirúrgicos",
    question: "¿Qué opciones no quirúrgicas hay para rejuvenecer el rostro?",
    answer: "Existen alternativas como bioestimuladores, láser o toxina botulínica. Lo recomendable es una valoración con un profesional.",
    foot: "Patrocinado · [Tu clínica] · Valoración estética profesional",
  },
] as const;

function HeroSection() {
  const [active, setActive] = useState(0);
  const chat = heroChats[active];
  return (
    <section id="top" className="relative bg-[#FBFBFA]">
      <div className="relative overflow-hidden">
        <ImagePlaceholder name="C-01-hero-consulta.jpg" tone="light" className="absolute inset-0 h-full w-full rounded-none border-0" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: "linear-gradient(to right, rgba(251,251,250,0.97) 0%, rgba(251,251,250,0.85) 40%, rgba(251,251,250,0.25) 70%, transparent 100%)" }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-[640px]">
            <span className="inline-block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#005CFF]">
              Para clínicas de cirugía plástica
            </span>
            <h1 className={`${serif} mt-5 text-[#212121]`} style={{ fontSize: "clamp(50px, 6.5vw, 92px)", lineHeight: 0.95 }}>
              Cuando ChatGPT abra la pauta para cirugía, tu clínica ya debería estar <em>lista</em>.
            </h1>
            <p className="mt-6 text-[17px] leading-[1.5] text-[#4F4F4D] md:text-[18px]">
              Hoy OpenAI no aprueba anuncios de procedimientos quirúrgicos, pero tus futuros pacientes ya le preguntan a ChatGPT dónde operarse. Te ayudamos a aparecer en esas respuestas desde ahora.
            </p>
            <div className="mt-8 rounded-[4px] border border-[#D9DDE4] bg-white p-5 shadow-sm md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4F4F4D]">Ejemplo ilustrativo · elige una búsqueda</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {heroChats.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-pressed={active === index}
                    className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF] ${
                      active === index ? "border-[#005CFF] bg-[#005CFF] text-white" : "border-[#D9DDE4] bg-white text-[#212121] hover:border-[#005CFF]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mt-5">
                <div className="flex justify-end">
                  <p className="max-w-[90%] rounded-[14px] rounded-br-[4px] bg-[#005CFF] px-4 py-3 text-left text-[14px] leading-[1.5] text-white">
                    {chat.question}
                  </p>
                </div>
                <div className="mt-3 flex justify-start">
                  <p className="max-w-[95%] rounded-[14px] rounded-bl-[4px] bg-[#F4F6FA] px-4 py-3 text-[14px] leading-[1.5] text-[#212121]">
                    {chat.answer}
                  </p>
                </div>
                <p className="mt-3 text-[12px] font-medium text-[#4F4F4D]">{chat.foot}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CtaButton>Solicitar diagnóstico de visibilidad en IA</CtaButton>
              <p className="text-[13px] text-[#4F4F4D]">Diagnóstico inicial · Clínicas de cirugía plástica en Colombia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const problemaCards = [
  { num: "01", title: "Permitido", text: "Procedimientos mínimamente invasivos, con revisión caso por caso." },
  { num: "02", title: "Aún no", text: "La cirugía plástica no está en la lista aprobada y no hay fecha confirmada para que lo esté." },
  { num: "03", title: "En movimiento", text: "OpenAI ha cambiado sus reglas varias veces en 2026." },
  { num: "04", title: "Ya ocurre", text: "Tus pacientes ya consultan a la IA antes de elegir cirujano." },
];

function ProblemaSection() {
  return (
    <section className="bg-[#FBFBFA] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <h2 className={`${serif} text-[#212121]`} style={{ fontSize: "clamp(38px, 4.5vw, 62px)", lineHeight: 1 }}>
            Lo que otras agencias no te van a decir sobre ChatGPT <em>Ads</em>.
          </h2>
          <p className="text-[17px] leading-[1.5] text-[#4F4F4D] lg:pt-3">
            Antes de invertir, conviene saber qué permite hoy OpenAI y qué no. Así tomas decisiones con información real.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ImagePlaceholder name="C-02-problema-paciente-celular.jpg" className="h-[280px] sm:col-span-2 sm:row-span-2 sm:h-full" />
          {problemaCards.map((card) => (
            <article key={card.num} className="rounded-[4px] bg-[#EEF1F6] p-6">
              <span className="text-[14px] font-bold text-[#005CFF]">{card.num}</span>
              <h3 className={`${serif} mt-3 text-[26px] leading-[1.1] text-[#212121]`}>{card.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.5] text-[#4F4F4D]">{card.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-[4px] bg-[#EEF1F6] px-6 py-10 text-center md:py-14">
          <p className={`${serif} mx-auto max-w-[820px] italic text-[#005CFF]`} style={{ fontSize: "clamp(26px, 3.2vw, 40px)", lineHeight: 1.15 }}>
            La ventaja no la tendrá quien pague primero, sino la clínica que la IA ya reconozca como referente.
          </p>
        </div>
      </div>
    </section>
  );
}

const oportunidadPartes = [
  { num: "1", title: "La respuesta", text: "ChatGPT cita fuentes confiables, y trabajamos para que tu clínica sea una de ellas." },
  { num: "2", title: "El espacio patrocinado", text: "Mientras tanto, pautamos tus servicios no quirúrgicos elegibles." },
  { num: "3", title: "La conversación", text: "El paciente llega a tu WhatsApp pidiendo una valoración." },
];

function OportunidadSection() {
  const [active, setActive] = useState(0);
  const partClass = (part: number) =>
    `transition-opacity duration-300 ${active === part ? "rounded-[4px] border-2 border-[#005CFF]" : "border-2 border-transparent opacity-40"}`;
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className={`${serif} text-[#212121]`} style={{ fontSize: "clamp(38px, 4.5vw, 62px)", lineHeight: 1 }}>
            Dos formas de estar en la <em>conversación</em>.
          </h2>
          <p className="mt-6 text-[17px] leading-[1.5] text-[#4F4F4D]">
            Mientras se abre la pauta para cirugía, tu clínica puede ganar visibilidad en las respuestas y captar pacientes con los servicios que sí son elegibles.
          </p>
          <div className="mt-10 flex flex-col">
            {oportunidadPartes.map((parte, index) => (
              <button
                key={parte.num}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className="border-t border-[#D9DDE4] py-5 text-left last:border-b focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]"
              >
                <span className="flex items-baseline gap-4">
                  <span className={`${serif} italic text-[#005CFF]`} style={{ fontSize: "30px" }}>{parte.num}</span>
                  <span className={`${serif} text-[26px] leading-[1.1] ${active === index ? "text-[#005CFF]" : "text-[#212121]"}`}>{parte.title}</span>
                </span>
                {active === index && (
                  <span className="mt-2 block pl-12 text-[15px] leading-[1.5] text-[#4F4F4D]">{parte.text}</span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="rounded-[4px] bg-[#F4F6FA] p-6 md:p-8">
            <div className={`${partClass(0)} p-1`}>
              <div className="flex justify-end">
                <p className="max-w-[90%] rounded-[14px] rounded-br-[4px] bg-[#005CFF] px-4 py-3 text-[14px] leading-[1.5] text-white">
                  Busco opciones para rejuvenecer el rostro sin cirugía.
                </p>
              </div>
              <div className="mt-3 flex justify-start">
                <p className="max-w-[95%] rounded-[14px] rounded-bl-[4px] bg-white px-4 py-3 text-[14px] leading-[1.5] text-[#212121]">
                  Existen alternativas como bioestimuladores, láser o toxina botulínica. Lo recomendable es una valoración con un profesional.
                </p>
              </div>
              <p className="mt-3 text-[12px] font-medium text-[#4F4F4D]">Fuente citada · [Tu clínica]</p>
            </div>
            <div className={`mt-4 ${partClass(1)} p-1`}>
              <div className="rounded-[4px] border border-[#D9DDE4] bg-white px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#005CFF]">Patrocinado</p>
                <p className="mt-1 text-[14px] font-semibold text-[#212121]">[Tu clínica]</p>
                <p className="text-[13px] text-[#4F4F4D]">Valoración estética profesional</p>
              </div>
            </div>
            <div className={`mt-4 ${partClass(2)} p-1`}>
              <div className="flex justify-end">
                <p className="max-w-[90%] rounded-[14px] rounded-br-[4px] bg-[#212121] px-4 py-3 text-[14px] leading-[1.5] text-white">
                  Hola, quiero agendar una valoración
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-[12px] leading-[1.5] text-[#4F4F4D]">
            Ejemplo conceptual: representación ilustrativa, no un formato confirmado ni una promesa de aparición para una consulta concreta.
          </p>
        </div>
      </div>
    </section>
  );
}

const beneficios = [
  { num: "01", title: "Ser fuente de referencia", text: "Que la IA mencione a tu clínica cuando hablan de cirugía en tu ciudad." },
  { num: "02", title: "Generar leads ya", text: "Con los tratamientos que hoy sí se pueden pautar." },
  { num: "03", title: "Tener la cuenta lista", text: "Para activar campañas de cirugía apenas se aprueben." },
  { num: "04", title: "Proteger tu reputación", text: "Sin promesas que no se pueden cumplir." },
];

function BeneficiosSection() {
  return (
    <section id="beneficios" className="bg-[#FBFBFA] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 className={`${serif} max-w-[820px] text-[#212121]`} style={{ fontSize: "clamp(38px, 4.5vw, 62px)", lineHeight: 1 }}>
          Prepararte hoy es llegar <em>primero</em> mañana.
        </h2>
        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <ImagePlaceholder name="C-03-beneficios-equipo.jpg" className="h-[320px] md:h-[440px]" />
          <ul>
            {beneficios.map((item) => (
              <li key={item.num} className="flex gap-6 border-t border-[#D9DDE4] py-6 first:pt-0 lg:first:border-t-0">
                <span className={`${serif} shrink-0 italic text-[#005CFF]`} style={{ fontSize: "34px", lineHeight: 1 }}>{item.num}</span>
                <div>
                  <h3 className="text-[18px] font-bold text-[#212121]">{item.title}</h3>
                  <p className="mt-1 text-[15px] leading-[1.5] text-[#4F4F4D]">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const servicios = [
  { num: "01", tag: "para ser citado", title: "Visibilidad orgánica en IA", text: "Contenido, perfiles y menciones que la IA usa como fuente.", image: "C-05-servicio-01-diagnostico.jpg" },
  { num: "02", tag: "para captar hoy", title: "Pauta en lo elegible", text: "Campañas de tratamientos no quirúrgicos con leads directos a WhatsApp.", image: "C-06-servicio-02-estrategia.jpg" },
  { num: "03", tag: "para activar rápido", title: "Cuenta lista para el día uno", text: "Ads Manager configurado, credenciales verificadas y anuncios preparados.", image: "C-07-servicio-03-landing.jpg" },
  { num: "04", tag: "para no perder la ventana", title: "Monitoreo de políticas", text: "Revisamos cada cambio de OpenAI por ti.", image: "C-08-servicio-04-seguimiento-y-anuncio.jpg" },
];

function ServiciosSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 className={`${serif} max-w-[760px] text-[#212121]`} style={{ fontSize: "clamp(38px, 4.5vw, 62px)", lineHeight: 1 }}>
          Tres frentes y un <em>seguimiento</em> constante.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((servicio) => (
            <article key={servicio.num}>
              <ImagePlaceholder name={servicio.image} className="h-[240px] w-full" />
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-[14px] font-bold text-[#005CFF]">{servicio.num}</span>
                <span className={`${serif} italic text-[#005CFF]`} style={{ fontSize: "18px" }}>· {servicio.tag} ·</span>
              </div>
              <h3 className={`${serif} mt-2 text-[24px] leading-[1.1] text-[#212121]`}>{servicio.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.5] text-[#4F4F4D]">{servicio.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const diferenciadorTags = ["Ley 1581 de 2012", "Ética médica", "Políticas de OpenAI", "Medición real"];

function DiferenciadorSection() {
  return (
    <section className="bg-[#212121] py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <ImagePlaceholder name="C-09-diferenciador-ojo.jpg" tone="dark" className="h-[300px] md:h-[420px]" />
        <div>
          <h2 className={`${serif} text-white`} style={{ fontSize: "clamp(38px, 4.5vw, 62px)", lineHeight: 1 }}>
            Transparencia antes que <em>promesas</em>.
          </h2>
          <p className="mt-6 text-[17px] leading-[1.5] text-white/80">
            No prometemos pauta para cirugía porque hoy OpenAI no la aprueba, y prometerla pondría en riesgo tu cuenta y tu reputación. Te decimos qué se puede hacer hoy y te preparamos para lo que viene.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {diferenciadorTags.map((tag) => (
              <div key={tag} className="border-t border-white/20 py-4">
                <span className="text-[15px] font-medium text-white">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const procesoPasos = [
  { num: "1", title: "Cuéntanos sobre tu clínica", text: "Procedimientos, sedes y canales actuales." },
  { num: "2", title: "Revisamos cómo apareces hoy en ChatGPT", text: "Qué dice la IA de tu clínica y de tu competencia." },
  { num: "3", title: "Te entregamos el plan", text: "Qué pautar ya y qué preparar para cirugía." },
];

function ProcesoSection() {
  return (
    <section id="proceso" className="bg-[#FBFBFA] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 className={`${serif} max-w-[700px] text-[#212121]`} style={{ fontSize: "clamp(38px, 4.5vw, 62px)", lineHeight: 1 }}>
          Tu diagnóstico, en tres <em>pasos</em>.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {procesoPasos.map((paso) => (
            <article key={paso.num} className="border-t border-[#D9DDE4] pt-8">
              <span className={`${serif} italic text-[#005CFF]`} style={{ fontSize: "clamp(48px, 5vw, 64px)", lineHeight: 1 }}>
                {paso.num}
              </span>
              <h3 className="mt-5 text-[18px] font-bold leading-[1.3] text-[#212121]">{paso.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.5] text-[#4F4F4D]">{paso.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const fieldClass =
  "mt-1 w-full border-0 border-b border-[#D9DDE4] bg-transparent px-0 py-3 text-[15px] text-[#212121] placeholder:text-[#4F4F4D]/60 focus-visible:outline-none focus-visible:border-[#005CFF]";

function FormularioSection() {
  const navigate = useNavigate();
  const enviar = useServerFn(saveDiagnosticLead);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const formStarted = useRef(false);

  function markStarted(value: string) {
    if (!formStarted.current && value.trim()) {
      formStarted.current = true;
      track("form_start", { landing: LANDING, utm_content: LANDING });
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!consent) {
      setError("Debes autorizar el tratamiento de tus datos personales.");
      return;
    }
    const form = new FormData(event.currentTarget);
    const get = (key: string) => String(form.get(key) ?? "").trim();
    if (!get("nombre") || !get("empresa")) {
      setError("Completa tu nombre y el nombre de la clínica.");
      return;
    }
    setEnviando(true);
    try {
      const campaign = getCampaignParams();
      await enviar({
        data: {
          data: {
            empresa: get("empresa"),
            nombre: get("nombre"),
            ciudad: get("ciudad"),
            telefono: get("telefono"),
            tratamientos_principales: get("tratamientos_principales"),
            pais: "Colombia",
            sector: "Cirugía plástica",
          },
          attribution: {
            source: "lp-sales-flow-clinicas-bogota",
            landing_path: window.location.pathname,
            referrer: document.referrer || undefined,
            ...campaign,
            consent_version: CONSENT_VERSION,
            consent_accepted: true,
          },
        },
      });
      track("lead_valido", { landing: LANDING, utm_content: LANDING });
      void navigate({ to: "/lp/chatgpt-ads-cirugia-plastica/gracias" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos enviar tu solicitud. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section id="diagnostico" className="bg-[#FBFBFA] py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className={`${serif} text-[#212121]`} style={{ fontSize: "clamp(38px, 4.5vw, 62px)", lineHeight: 1 }}>
            Solicita tu diagnóstico de visibilidad en <em>IA</em>.
          </h2>
          <p className="mt-6 text-[17px] leading-[1.5] text-[#4F4F4D]">
            Te mostramos cómo aparece hoy tu clínica en ChatGPT, qué servicios puedes pautar ya y qué falta para estar listo cuando se abra la categoría quirúrgica.
          </p>
          <ImagePlaceholder name="C-04-formulario-directora.jpg" className="mt-10 hidden h-[280px] lg:block" />
        </div>
        <form onSubmit={onSubmit} className="rounded-[4px] bg-[#F4F6FA] p-6 md:p-9">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="c-nombre" className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Nombre completo</label>
              <input id="c-nombre" name="nombre" type="text" autoComplete="name" className={fieldClass} placeholder="Nombre y apellidos" onInput={(e) => markStarted(e.currentTarget.value)} />
            </div>
            <div>
              <label htmlFor="c-empresa" className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Nombre de la clínica *</label>
              <input id="c-empresa" name="empresa" type="text" autoComplete="organization" required className={fieldClass} placeholder="Nombre de la clínica" onInput={(e) => markStarted(e.currentTarget.value)} />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="c-ciudad" className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Ciudad</label>
                <input id="c-ciudad" name="ciudad" type="text" autoComplete="address-level2" className={fieldClass} placeholder="Bogotá" />
              </div>
              <div>
                <label htmlFor="c-telefono" className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">WhatsApp</label>
                <input id="c-telefono" name="telefono" type="tel" autoComplete="tel" className={fieldClass} placeholder="+57 300 000 0000" />
              </div>
            </div>
            <div>
              <label htmlFor="c-tratamientos" className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Procedimientos quirúrgicos principales</label>
              <input id="c-tratamientos" name="tratamientos_principales" type="text" className={fieldClass} placeholder="Ej.: rinoplastia, lipoescultura" />
            </div>
            <input type="hidden" name="pais" value="Colombia" />
            <input type="hidden" name="sector" value="Cirugía plástica" />
            <div className="flex items-start gap-3">
              <input
                id="c-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#005CFF]"
              />
              <label htmlFor="c-consent" className="text-[13px] leading-[1.5] text-[#4F4F4D]">
                Autorizo el tratamiento de mis datos personales según la{" "}
                <a href="/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#005CFF] underline">
                  política de tratamiento de datos
                </a>
                .
              </label>
            </div>
            {error && (
              <p role="alert" className="text-[14px] font-medium text-[#B3261E]">{error}</p>
            )}
            <button
              type="submit"
              disabled={enviando}
              className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#005CFF] px-8 text-[16px] font-semibold text-white transition-colors hover:bg-[#004AD0] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]"
            >
              {enviando ? "Enviando…" : "Solicitar mi diagnóstico"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const faqItems = [
  { question: "¿Por qué no prometen pauta para cirugía desde ya?", answer: "Porque hoy OpenAI no la aprueba, y prometerla pondría en riesgo tu cuenta y tu reputación." },
  { question: "¿Qué pasa si OpenAI aprueba la categoría?", answer: "Activamos las campañas que ya dejamos preparadas, sin perder semanas en configuración." },
  { question: "¿Qué es la visibilidad orgánica en IA?", answer: "Que ChatGPT mencione o cite a tu clínica en sus respuestas sin que sea un anuncio." },
  { question: "¿Esto reemplaza Google o Meta?", answer: "No. Se suma a los canales que ya te funcionan." },
  { question: "¿Cuánto cuesta?", answer: "Depende de tus procedimientos, tus sedes y tus objetivos. Lo definimos contigo en el diagnóstico." },
];

function FaqSectionLanding() {
  return (
    <section className="bg-[#FBFBFA] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[760px] px-5 md:px-8">
        <h2 className={`${serif} text-center text-[#212121]`} style={{ fontSize: "clamp(38px, 4.5vw, 62px)", lineHeight: 1 }}>
          Preguntas frecuentes
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`} className="border-b border-[#D9DDE4]">
              <AccordionTrigger className="py-5 text-left text-[17px] font-semibold text-[#212121] hover:text-[#005CFF] [&>svg]:text-[#005CFF]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-[1.6] text-[#4F4F4D]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CierreSection() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 items-center lg:grid-cols-2">
        <div className="mx-auto w-full max-w-[600px] px-5 py-16 md:px-8 md:py-24 lg:ml-auto lg:pr-16">
          <h2 className={`${serif} text-[#212121]`} style={{ fontSize: "clamp(38px, 4.5vw, 62px)", lineHeight: 1 }}>
            Tus futuros pacientes ya le preguntan a la IA dónde <em>operarse</em>.
          </h2>
          <p className="mt-6 text-[17px] leading-[1.5] text-[#4F4F4D]">
            Asegúrate de que tu clínica esté en esa respuesta.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CtaButton>Quiero preparar mi clínica</CtaButton>
            <p className="text-[13px] text-[#4F4F4D]">Conversemos sobre una estrategia diseñada para tu clínica.</p>
          </div>
        </div>
        <ImagePlaceholder name="C-10-cierre-pantalla.jpg" tone="light" className="h-[320px] w-full rounded-none border-0 lg:h-full lg:min-h-[480px]" />
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-[#F4F6FA] py-14">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <img src={logoDark} alt="RCKT" className="h-7 w-auto" />
          <p className="mt-4 max-w-[260px] text-[14px] leading-[1.6] text-[#4F4F4D]">
            Estrategia, publicidad y automatización para clínicas estéticas en Colombia.
          </p>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Contacto</h3>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href={`mailto:${contactConfig.sales.email}`} className="text-[#212121] transition-colors hover:text-[#005CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
                {contactConfig.sales.email}
              </a>
            </li>
            <li>
              <a href={WHATSAPP_URL} className="text-[#212121] transition-colors hover:text-[#005CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Redes</h3>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href={contactConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[#212121] transition-colors hover:text-[#005CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
                Instagram
              </a>
            </li>
            <li>
              <a href={contactConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#212121] transition-colors hover:text-[#005CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Legal</h3>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href="/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" target="_blank" rel="noopener noreferrer" className="text-[#212121] transition-colors hover:text-[#005CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
                Política de tratamiento de datos
              </a>
            </li>
            <li>
              <a href="/legal/privacidad" className="text-[#212121] transition-colors hover:text-[#005CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
                Aviso de privacidad
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      onClick={() => track("whatsapp_click", { section: "flotante", landing: LANDING, utm_content: LANDING })}
      className="fixed bottom-6 right-6 z-50 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#005CFF] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]"
    >
      <WhatsAppIcon />
    </a>
  );
}

export function LandingCirugiaPlasticaC() {
  useEffect(() => {
    saveCampaignParams(window.location.search);
    saveCampaignParams(`?utm_content=${LANDING}`);
    track("lp_view", { landing: LANDING, utm_content: LANDING });
  }, []);
  return (
    <div className="bg-[#FBFBFA] font-['Switzer',sans-serif] text-[#212121] antialiased">
      <LandingHeader />
      <main>
        <HeroSection />
        <ProblemaSection />
        <OportunidadSection />
        <BeneficiosSection />
        <ServiciosSection />
        <DiferenciadorSection />
        <ProcesoSection />
        <FormularioSection />
        <FaqSectionLanding />
        <CierreSection />
      </main>
      <LandingFooter />
      <WhatsAppFloat />
    </div>
  );
}

export function LandingCirugiaPlasticaCThanks() {
  useEffect(() => {
    saveCampaignParams(window.location.search);
    saveCampaignParams(`?utm_content=${LANDING}`);
    track("thank_you_view", { nivel: "mql", landing: LANDING, utm_content: LANDING });
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-[#FBFBFA] font-['Switzer',sans-serif] text-[#212121] antialiased">
      <header className="border-b border-[#D9DDE4] bg-[#FBFBFA]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center px-5 md:px-8">
          <a href="/" aria-label="RCKT">
            <img src={logoDark} alt="RCKT" className="h-7 w-auto" />
          </a>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-[560px] rounded-[4px] border border-[#D9DDE4] bg-white p-8 text-center shadow-sm md:p-12">
          <span className="mx-auto flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#005CFF] text-white">
            <Check strokeWidth={2.5} className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className={`${serif} mt-6 text-[#212121]`} style={{ fontSize: "clamp(38px, 4vw, 52px)", lineHeight: 1 }}>
            Recibimos tu solicitud.
          </h1>
          <p className="mt-4 text-[17px] leading-[1.5] text-[#4F4F4D]">
            Te contactaremos por WhatsApp para preparar el diagnóstico de visibilidad de tu clínica.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#005CFF] px-8 text-[16px] font-semibold text-white transition-colors hover:bg-[#004AD0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]"
          >
            Volver al inicio
          </a>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
