import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { saveDiagnosticLead } from "@/lib/leads-diagnostic.functions";
import { getCampaignParams, saveCampaignParams, track } from "@/components/rckt/tracking";
import { WHATSAPP_URL, contactConfig } from "@/config/contact";
import logoDark from "@/assets/rckt-logo-dark.png";
import logoLight from "@/assets/rckt-logo-light.png";
import imgB01 from "@/assets/B-01-hero-consulta.jpg";
import imgB02 from "@/assets/B-02-problema-paciente-celular.jpg";
import imgB03 from "@/assets/B-03-beneficios-equipo.jpg";
import imgB04 from "@/assets/B-04-formulario-director.jpg";
import imgB05 from "@/assets/B-05-servicio-01-diagnostico.jpg";
import imgB06 from "@/assets/B-06-servicio-02-estrategia.jpg";
import imgB07 from "@/assets/B-07-servicio-03-landing.jpg";
import imgB08 from "@/assets/B-08-servicio-04-seguimiento.jpg";
import imgB09 from "@/assets/B-09-diferenciador-rostro.jpg";
import imgB10 from "@/assets/B-10-cierre-mujer-celular.jpg";

const landingImages: Record<string, string> = {
  "B-01-hero-consulta.jpg": imgB01,
  "B-02-problema-paciente-celular.jpg": imgB02,
  "B-03-beneficios-equipo.jpg": imgB03,
  "B-04-formulario-director.jpg": imgB04,
  "B-05-servicio-01-diagnostico.jpg": imgB05,
  "B-06-servicio-02-estrategia.jpg": imgB06,
  "B-07-servicio-03-landing.jpg": imgB07,
  "B-08-servicio-04-seguimiento.jpg": imgB08,
  "B-09-diferenciador-rostro.jpg": imgB09,
  "B-10-cierre-mujer-celular.jpg": imgB10,
};

export const LANDING_B_TITLE = "ChatGPT Ads para clínicas estéticas en Colombia | RCKT";
export const LANDING_B_DESCRIPTION =
  "Capta pacientes con anuncios en ChatGPT antes de que se sature el mercado. Estrategia, verificación y campañas para clínicas de medicina estética en Colombia.";

const LANDING = "chatgpt-ads-clinicas-esteticas";
const CONSENT_VERSION = "RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf";

function ImagePlaceholder({ name, className = "" }: { name: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[24px] ${className}`}>
      <img src={landingImages[name]} alt="" className="h-full w-full object-cover" loading="lazy" />
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
      className={`inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#FC5C1F] px-8 text-[16px] font-semibold text-[#1A1A1A] transition-colors hover:bg-[#ff7340] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F] ${className}`}
    >
      {children}
    </a>
  );
}

function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#3A3A3A] bg-[#212121]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" aria-label="RCKT">
          <img src={logoLight} alt="RCKT" className="h-7 w-auto" />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Secciones">
          <a href="#beneficios" className="text-[15px] font-medium text-[#F5F2ED] transition-colors hover:text-[#FC5C1F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F]">
            Beneficios
          </a>
          <a href="#proceso" className="text-[15px] font-medium text-[#F5F2ED] transition-colors hover:text-[#FC5C1F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F]">
            Cómo funciona
          </a>
        </nav>
        <a
          href="#diagnostico"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#F5F2ED] px-6 text-[15px] font-semibold text-[#1A1A1A] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F]"
        >
          Agendar consultoría
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="top" className="bg-[#212121] px-4 pt-6 md:px-8 md:pt-10">
      <div className="relative mx-auto w-full max-w-[1200px] overflow-hidden rounded-[28px]">
        <ImagePlaceholder name="B-01-hero-consulta.jpg" className="absolute inset-0 h-full w-full rounded-none border-0" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: "linear-gradient(to right, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.55) 45%, transparent 75%)" }}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/[0.72] md:hidden" aria-hidden="true" />
        <div className="relative z-10 flex min-h-[520px] flex-col justify-center px-6 py-16 md:min-h-[600px] md:max-w-[58%] md:px-12">
          <span className="inline-block w-fit rounded-full border border-[#FC5C1F] px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#FC5C1F]">
            ChatGPT Ads ya llegó a Colombia
          </span>
          <h1
            className="mt-6 font-extrabold text-[#F5F2ED]"
            style={{ fontSize: "clamp(44px, 6vw, 84px)", lineHeight: 0.98, letterSpacing: "-0.04em" }}
          >
            Adelántate a tu competencia: capta pacientes con ChatGPT Ads antes de que se sature el mercado.
          </h1>
          <p className="mt-6 text-[17px] leading-[1.5] text-[#D6D1CA] md:text-[19px]">
            Llegamos a la persona que ya está comparando dónde hacerse un tratamiento estético, justo cuando se lo pregunta a la IA.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CtaButton>Solicitar auditoría de canales IA</CtaButton>
            <p className="text-[13px] text-[#BDB8B1]">Para clínicas de medicina estética no quirúrgica en Colombia</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const problemaItems = [
  { num: "01", title: "Canal recién abierto", text: "Menos anunciantes que en Google o Meta." },
  { num: "02", title: "Intención real", text: "El anuncio aparece cuando la persona compara opciones." },
  { num: "03", title: "Aprendizaje temprano", text: "Quien llega primero sabe antes qué funciona." },
  { num: "04", title: "Cumplimiento desde el inicio", text: "Campañas alineadas con la normativa de salud." },
];

function ProblemaSection() {
  return (
    <section className="bg-[#212121] py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-bold text-[#F5F2ED]" style={{ fontSize: "clamp(34px, 4vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            La conversación sobre dónde tratarse ya empezó en ChatGPT.
          </h2>
          <p className="mt-6 text-[17px] leading-[1.5] text-[#D6D1CA]">
            Cada vez más personas le preguntan a la IA qué tratamiento les conviene, cuánto cuesta y en qué clínica hacérselo. Ahora las clínicas colombianas pueden estar presentes en ese momento.
          </p>
          <ImagePlaceholder name="B-02-problema-paciente-celular.jpg" className="mt-10 h-[280px] md:h-[340px]" />
        </div>
        <div>
          <ul>
            {problemaItems.map((item) => (
              <li key={item.num} className="border-t border-[#3A3A3A] py-7 first:border-t-0 first:pt-0">
                <span className="text-[14px] font-bold text-[#FC5C1F]">{item.num}</span>
                <h3 className="mt-2 text-[24px] font-bold leading-[1.15] text-[#F5F2ED] md:text-[28px]">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.5] text-[#BDB8B1]">{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-[#3A3A3A] pt-8 text-[20px] font-bold leading-[1.3] text-[#F5F2ED] md:text-[24px]">
            Las primeras clínicas en llegar compiten con menos anunciantes y aprenden antes qué funciona.
          </p>
        </div>
      </div>
    </section>
  );
}

function OportunidadSection() {
  return (
    <section className="bg-[#F5F2ED] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <h2 className="font-bold text-[#212121]" style={{ fontSize: "clamp(34px, 4vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Así aparece tu clínica dentro de la conversación.
          </h2>
          <p className="text-[17px] leading-[1.5] text-[#4B4366] lg:pt-3">
            El anuncio va debajo de la respuesta, nunca dentro, y siempre marcado como patrocinado. OpenAI no comparte las conversaciones con los anunciantes: el anuncio se activa por el tema de la consulta.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-10">
            <div>
              <p className="font-extrabold text-[#FC5C1F]" style={{ fontSize: "clamp(64px, 7vw, 96px)", lineHeight: 1 }}>21.10</p>
              <div className="mt-4 border-t border-dashed border-[#BDB8B1] pt-4">
                <p className="text-[16px] font-semibold text-[#212121]">OpenAI anunció ChatGPT Ads para Colombia.</p>
                <p className="mt-1 text-[12px] text-[#4B4366]">Fuente: OpenAI, octubre de 2026</p>
              </div>
            </div>
            <div>
              <p className="font-extrabold text-[#FC5C1F]" style={{ fontSize: "clamp(64px, 7vw, 96px)", lineHeight: 1 }}>1.200 M</p>
              <div className="mt-4 border-t border-dashed border-[#BDB8B1] pt-4">
                <p className="text-[16px] font-semibold text-[#212121]">personas usan ChatGPT cada semana.</p>
                <p className="mt-1 text-[12px] text-[#4B4366]">Fuente: OpenAI, octubre de 2026</p>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-[24px] bg-[#212121] p-6 shadow-xl md:p-8">
              <div className="flex justify-end">
                <p className="max-w-[85%] rounded-[16px] rounded-br-[4px] bg-[#FC5C1F] px-4 py-3 text-[14px] leading-[1.5] text-[#1A1A1A]">
                  ¿Dónde me puedo hacer un tratamiento con ácido hialurónico en Bogotá?
                </p>
              </div>
              <div className="mt-4 flex justify-start">
                <p className="max-w-[90%] rounded-[16px] rounded-bl-[4px] bg-[#2C2C2C] px-4 py-3 text-[14px] leading-[1.5] text-[#F5F2ED]">
                  Revisa que el médico tenga formación certificada, que el producto tenga registro INVIMA y que te hagan una valoración antes del procedimiento.
                </p>
              </div>
              <div className="mt-4 rounded-[14px] border border-[#FC5C1F] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FC5C1F]">Patrocinado</p>
                <p className="mt-1 text-[14px] font-semibold text-[#F5F2ED]">[Tu clínica]</p>
                <p className="text-[13px] text-[#BDB8B1]">Agenda tu valoración</p>
              </div>
            </div>
            <p className="mt-4 text-[12px] leading-[1.5] text-[#4B4366]">
              Ejemplo conceptual: representación ilustrativa, no un formato confirmado ni una promesa de aparición para una consulta concreta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const beneficios = [
  { num: "01", title: "El momento", text: "El paciente conversa y compara, no solo busca palabras sueltas." },
  { num: "02", title: "La ubicación", text: "Debajo de una respuesta relacionada con tu tratamiento." },
  { num: "03", title: "La competencia", text: "Baja, porque el canal acaba de abrir en Colombia." },
  { num: "04", title: "La medición", text: "Cada lead queda registrado con su origen para comparar su costo con tus otros canales." },
];

function BeneficiosSection() {
  return (
    <section id="beneficios" className="bg-[#212121] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <ImagePlaceholder name="B-03-beneficios-equipo.jpg" className="h-[260px] w-full md:h-[380px]" />
        <h2 className="mt-12 max-w-[900px] font-bold text-[#F5F2ED]" style={{ fontSize: "clamp(34px, 4vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          No reemplaza a Google ni a Meta. Llega a un momento que ellos no cubren.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {beneficios.map((item) => (
            <article key={item.num}>
              <span className="text-[15px] font-bold text-[#FC5C1F]">{item.num}</span>
              <div className="mt-3 border-t border-dashed border-[#3A3A3A] pt-4">
                <h3 className="text-[22px] font-bold text-[#F5F2ED]">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.5] text-[#BDB8B1]">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const servicios = [
  { num: "01", title: "Cuenta y verificación", text: "Creamos tu cuenta en Ads Manager y gestionamos la revisión de OpenAI para el sector salud.", image: "B-05-servicio-01-diagnostico.jpg" },
  { num: "02", title: "Estrategia de intenciones", text: "Mapeamos cómo pregunta tu paciente: tratamientos, ciudades, comparaciones y dudas de precio.", image: "B-06-servicio-02-estrategia.jpg" },
  { num: "03", title: "Anuncios y landing", text: "Piezas sin promesas de resultados ni descuentos, y una página pensada para convertir consultas en valoraciones.", image: "B-07-servicio-03-landing.jpg" },
  { num: "04", title: "WhatsApp y reportes", text: "Cada lead llega a tu equipo comercial, con un reporte semanal de clics, leads y citas agendadas.", image: "B-08-servicio-04-seguimiento.jpg" },
];

function ServiciosSection() {
  return (
    <section className="bg-[#212121] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 className="max-w-[760px] font-bold text-[#F5F2ED]" style={{ fontSize: "clamp(34px, 4vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          Un servicio completo, de la cuenta a la cita agendada.
        </h2>
        <Accordion type="single" collapsible defaultValue="servicio-0" className="mt-12">
          {servicios.map((servicio, index) => (
            <AccordionItem key={servicio.num} value={`servicio-${index}`} className="border-b border-[#3A3A3A]">
              <AccordionTrigger className="py-6 text-left hover:no-underline [&>svg]:text-[#FC5C1F]">
                <span className="flex items-baseline gap-5">
                  <span className="text-[15px] font-bold text-[#FC5C1F]">{servicio.num}</span>
                  <span className="text-[24px] font-bold leading-[1.15] text-[#F5F2ED] md:text-[30px]">{servicio.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                  <p className="max-w-[460px] text-[16px] leading-[1.6] text-[#D6D1CA] md:pl-12">{servicio.text}</p>
                  <ImagePlaceholder name={servicio.image} className="h-[220px] md:h-[260px]" />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

const diferenciadorTags = [
  "Ley 1581 de 2012",
  "Ética publicitaria en salud",
  "Políticas de OpenAI",
  "Sin promesas de resultados",
];

function DiferenciadorSection() {
  return (
    <section className="bg-[#1A1A1A] py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-bold text-[#F5F2ED]" style={{ fontSize: "clamp(34px, 4vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Campañas que cuidan la reputación de tu clínica.
          </h2>
          <p className="mt-6 text-[17px] leading-[1.5] text-[#D6D1CA]">
            Trabajamos alineados con la Ley 1581 de protección de datos personales, la ética médica colombiana y las políticas publicitarias de OpenAI para el sector salud.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {diferenciadorTags.map((tag) => (
              <div key={tag} className="flex items-center gap-3 border-t border-[#3A3A3A] py-4">
                <span className="text-[20px] font-bold text-[#FC5C1F]" aria-hidden="true">+</span>
                <span className="text-[15px] font-medium text-[#F5F2ED]">{tag}</span>
              </div>
            ))}
          </div>
        </div>
        <ImagePlaceholder name="B-09-diferenciador-rostro.jpg" className="h-[300px] md:h-[420px]" />
      </div>
    </section>
  );
}

const procesoPasos = [
  { num: "1", title: "Auditoría de canales IA", text: "Revisamos elegibilidad, tratamientos y competencia en tu ciudad." },
  { num: "2", title: "Verificación y lanzamiento", text: "Gestionamos la revisión de OpenAI y activamos campaña, landing y WhatsApp." },
  { num: "3", title: "Optimización semanal", text: "Ajustamos según leads y citas reales." },
];

function ProcesoSection() {
  return (
    <section id="proceso" className="bg-[#212121] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 className="max-w-[700px] font-bold text-[#F5F2ED]" style={{ fontSize: "clamp(34px, 4vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          De la auditoría al primer lead.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {procesoPasos.map((paso) => (
            <article key={paso.num} className="border-t border-[#3A3A3A] pt-8">
              <span className="font-extrabold text-[#FC5C1F]" style={{ fontSize: "clamp(64px, 6vw, 96px)", lineHeight: 1 }}>
                {paso.num}
              </span>
              <h3 className="mt-5 text-[22px] font-bold leading-[1.2] text-[#F5F2ED]">{paso.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.5] text-[#BDB8B1]">{paso.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const procedimientoOpciones = ["No quirúrgicos", "Quirúrgicos", "Ambos"] as const;
const sedesOpciones = ["1", "2 a 3", "4 o más"] as const;

const inputClass =
  "mt-2 w-full rounded-[12px] border border-[#3A3A3A] bg-[#212121] px-4 py-3 text-[15px] text-[#F5F2ED] placeholder:text-[#BDB8B1]/60 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#FC5C1F]";

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
            sector: get("sector"),
            numero_sedes: get("numero_sedes"),
            pais: "Colombia",
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
      void navigate({ to: "/lp/chatgpt-ads-clinicas-esteticas/gracias" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos enviar tu solicitud. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section id="diagnostico" className="bg-[#212121] py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-bold text-[#F5F2ED]" style={{ fontSize: "clamp(34px, 4vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            Agenda tu consultoría de viabilidad.
          </h2>
          <p className="mt-6 text-[17px] leading-[1.5] text-[#D6D1CA]">
            Revisamos si tu clínica es elegible, qué tratamientos conviene priorizar y qué inversión tiene sentido para tu ciudad.
          </p>
          <ImagePlaceholder name="B-04-formulario-director.jpg" className="mt-10 hidden h-[280px] lg:block" />
        </div>
        <form onSubmit={onSubmit} className="rounded-[24px] border border-[#3A3A3A] bg-[#2C2C2C] p-6 shadow-lg md:p-9">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label htmlFor="b-nombre" className="text-[14px] font-semibold text-[#F5F2ED]">Nombre completo</label>
              <input id="b-nombre" name="nombre" type="text" autoComplete="name" className={inputClass} placeholder="Nombre y apellidos" onInput={(e) => markStarted(e.currentTarget.value)} />
            </div>
            <div>
              <label htmlFor="b-empresa" className="text-[14px] font-semibold text-[#F5F2ED]">Nombre de la clínica *</label>
              <input id="b-empresa" name="empresa" type="text" autoComplete="organization" required className={inputClass} placeholder="Nombre de la clínica" onInput={(e) => markStarted(e.currentTarget.value)} />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="b-ciudad" className="text-[14px] font-semibold text-[#F5F2ED]">Ciudad</label>
                <input id="b-ciudad" name="ciudad" type="text" autoComplete="address-level2" className={inputClass} placeholder="Bogotá" />
              </div>
              <div>
                <label htmlFor="b-telefono" className="text-[14px] font-semibold text-[#F5F2ED]">WhatsApp</label>
                <input id="b-telefono" name="telefono" type="tel" autoComplete="tel" className={inputClass} placeholder="+57 300 000 0000" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="b-sector" className="text-[14px] font-semibold text-[#F5F2ED]">Tipo de procedimientos</label>
                <select id="b-sector" name="sector" defaultValue="" className={inputClass} onChange={(e) => markStarted(e.currentTarget.value)}>
                  <option value="">Selecciona una opción</option>
                  {procedimientoOpciones.map((opcion) => (
                    <option key={opcion} value={opcion}>{opcion}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="b-sedes" className="text-[14px] font-semibold text-[#F5F2ED]">Número de sedes</label>
                <select id="b-sedes" name="numero_sedes" defaultValue="" className={inputClass}>
                  <option value="">Selecciona una opción</option>
                  {sedesOpciones.map((opcion) => (
                    <option key={opcion} value={opcion}>{opcion}</option>
                  ))}
                </select>
              </div>
            </div>
            <input type="hidden" name="pais" value="Colombia" />
            <div className="flex items-start gap-3">
              <input
                id="b-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#FC5C1F]"
              />
              <label htmlFor="b-consent" className="text-[13px] leading-[1.5] text-[#BDB8B1]">
                Autorizo el tratamiento de mis datos personales según la{" "}
                <a href="/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#FC5C1F] underline">
                  política de tratamiento de datos
                </a>
                .
              </label>
            </div>
            {error && (
              <p role="alert" className="text-[14px] font-medium text-[#FC5C1F]">{error}</p>
            )}
            <button
              type="submit"
              disabled={enviando}
              className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#FC5C1F] px-8 text-[16px] font-semibold text-[#1A1A1A] transition-colors hover:bg-[#ff7340] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F]"
            >
              {enviando ? "Enviando…" : "Solicitar mi auditoría"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const faqItems = [
  { question: "¿Mi clínica puede anunciarse en ChatGPT?", answer: "Los procedimientos estéticos mínimamente invasivos están entre las categorías que OpenAI revisa caso por caso. Lo validamos contigo en la auditoría." },
  { question: "¿OpenAI ve los datos de mis pacientes?", answer: "No. OpenAI no comparte las conversaciones con los anunciantes, y los leads llegan directo a tu equipo." },
  { question: "¿Debo dejar Google o Meta?", answer: "No. ChatGPT Ads se suma a los canales que ya te funcionan." },
  { question: "¿Cuánto debo invertir?", answer: "Depende de tu ciudad, tus tratamientos y tus objetivos. Lo definimos contigo en la auditoría." },
  { question: "¿En cuánto tiempo veo resultados?", answer: "Depende de la aprobación de OpenAI y del volumen de consultas en tu ciudad. En la auditoría te damos un estimado." },
];

function FaqSectionLanding() {
  return (
    <section className="bg-[#1A1A1A] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[760px] px-5 md:px-8">
        <h2 className="text-center font-bold text-[#F5F2ED]" style={{ fontSize: "clamp(34px, 4vw, 54px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          Preguntas frecuentes
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`} className="border-b border-[#3A3A3A]">
              <AccordionTrigger className="py-5 text-left text-[17px] font-semibold text-[#F5F2ED] hover:text-[#FC5C1F] [&>svg]:text-[#FC5C1F]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-[1.6] text-[#BDB8B1]">
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
    <section className="bg-[#212121] px-4 pb-6 md:px-8 md:pb-10">
      <div className="relative mx-auto w-full max-w-[1200px] overflow-hidden rounded-[28px]">
        <ImagePlaceholder name="B-10-cierre-mujer-celular.jpg" className="absolute inset-0 h-full w-full rounded-none border-0" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: "linear-gradient(to left, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.55) 45%, transparent 75%)" }}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/[0.72] md:hidden" aria-hidden="true" />
        <div className="relative z-10 flex min-h-[480px] flex-col items-end justify-center px-6 py-16 text-right md:px-12">
          <div className="md:max-w-[52%]">
            <h2 className="font-extrabold text-[#F5F2ED]" style={{ fontSize: "clamp(36px, 4.5vw, 60px)", lineHeight: 1.02, letterSpacing: "-0.03em" }}>
              El paciente ya no busca “clínica estética”. Le pregunta a la IA cuál le conviene.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.5] text-[#D6D1CA]">
              Ahí es donde tu clínica tiene que estar.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
              <CtaButton>Quiero adelantarme</CtaButton>
              <p className="text-[13px] text-[#BDB8B1]">Auditoría inicial para clínicas en Colombia.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-[#1A1A1A] py-14">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <img src={logoLight} alt="RCKT" className="h-7 w-auto" />
          <p className="mt-4 max-w-[260px] text-[14px] leading-[1.6] text-[#BDB8B1]">
            Estrategia, publicidad y automatización para clínicas estéticas en Colombia.
          </p>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#BDB8B1]">Contacto</h3>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href={`mailto:${contactConfig.sales.email}`} className="text-[#D6D1CA] transition-colors hover:text-[#F5F2ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F]">
                {contactConfig.sales.email}
              </a>
            </li>
            <li>
              <a href={WHATSAPP_URL} className="text-[#D6D1CA] transition-colors hover:text-[#F5F2ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F]">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#BDB8B1]">Redes</h3>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href={contactConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[#D6D1CA] transition-colors hover:text-[#F5F2ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F]">
                Instagram
              </a>
            </li>
            <li>
              <a href={contactConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#D6D1CA] transition-colors hover:text-[#F5F2ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F]">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#BDB8B1]">Legal</h3>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href="/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" target="_blank" rel="noopener noreferrer" className="text-[#D6D1CA] transition-colors hover:text-[#F5F2ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F]">
                Política de tratamiento de datos
              </a>
            </li>
            <li>
              <a href="/legal/privacidad" className="text-[#D6D1CA] transition-colors hover:text-[#F5F2ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F]">
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
      className="fixed bottom-6 right-6 z-50 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#FC5C1F] text-[#1A1A1A] shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F]"
    >
      <WhatsAppIcon />
    </a>
  );
}

export function LandingChatGptAdsB() {
  useEffect(() => {
    saveCampaignParams(window.location.search);
    saveCampaignParams(`?utm_content=${LANDING}`);
    track("lp_view", { landing: LANDING, utm_content: LANDING });
  }, []);
  return (
    <div className="bg-[#212121] font-['Switzer',sans-serif] text-[#F5F2ED] antialiased">
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

export function LandingChatGptAdsBThanks() {
  useEffect(() => {
    saveCampaignParams(window.location.search);
    saveCampaignParams(`?utm_content=${LANDING}`);
    track("thank_you_view", { nivel: "mql", landing: LANDING, utm_content: LANDING });
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-[#212121] font-['Switzer',sans-serif] text-[#F5F2ED] antialiased">
      <header className="border-b border-[#3A3A3A] bg-[#212121]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center px-5 md:px-8">
          <a href="/" aria-label="RCKT">
            <img src={logoLight} alt="RCKT" className="h-7 w-auto" />
          </a>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-[560px] rounded-[24px] border border-[#3A3A3A] bg-[#2C2C2C] p-8 text-center shadow-xl md:p-12">
          <span className="mx-auto flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#FC5C1F] text-[#1A1A1A]">
            <Check strokeWidth={2.5} className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-6 font-extrabold text-[#F5F2ED]" style={{ fontSize: "clamp(34px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Recibimos tu solicitud.
          </h1>
          <p className="mt-4 text-[17px] leading-[1.5] text-[#D6D1CA]">
            Te contactaremos por WhatsApp para agendar tu auditoría de canales IA.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#FC5C1F] px-8 text-[16px] font-semibold text-[#1A1A1A] transition-colors hover:bg-[#ff7340] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC5C1F]"
          >
            Volver al inicio
          </a>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
