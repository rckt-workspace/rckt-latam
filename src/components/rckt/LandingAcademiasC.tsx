import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, Menu, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { saveDiagnosticLead } from "@/lib/leads-diagnostic.functions";
import { getCampaignParams, saveCampaignParams, track } from "@/components/rckt/tracking";
import { WHATSAPP_URL, contactConfig } from "@/config/contact";
import logoDark from "@/assets/rckt-logo-dark.png";
import imgC01Hero from "@/assets/C-01-hero.jpg";
import imgC02Problema from "@/assets/C-02-problema.jpg";
import imgC03Beneficios from "@/assets/C-03-beneficios.jpg";
import imgC04Formulario from "@/assets/C-04-formulario.jpg";
import imgC05Servicio01 from "@/assets/C-05-servicio-01.jpg";
import imgC06Servicio02 from "@/assets/C-06-servicio-02.jpg";
import imgC07Servicio03 from "@/assets/C-07-servicio-03.jpg";
import imgC08Servicio04 from "@/assets/C-08-servicio-04.jpg";
import imgC09Diferenciador from "@/assets/C-09-diferenciador.jpg";
import imgC10Cierre from "@/assets/C-10-cierre.jpg";

export const LANDING_C_TITLE = "ChatGPT Ads para academias y centros de formación | RCKT";
export const LANDING_C_DESCRIPTION =
  "Las academias en Colombia ya pueden anunciarse en ChatGPT. Te ayudamos a aparecer cuando tus futuros estudiantes comparan cursos, horarios y precios.";

const LANDING = "chatgpt-ads-academias";
const CONSENT_VERSION = "RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf";

const serif = "font-['Instrument_Serif',serif]";

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
      className={`inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#005CFF] px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#004AD0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF] ${className}`}
    >
      {children}
    </a>
  );
}

function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const linkClass = "text-[15px] font-medium text-[#212121]! transition-colors hover:text-[#005CFF]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]";
  const btnClass = "inline-flex items-center justify-center rounded-full bg-[#212121] font-semibold text-white! transition-colors hover:bg-[#005CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]";
  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-6 ${scrolled ? "pt-3" : "pt-0"}`}>
      <div
        className={`mx-auto flex w-full items-center justify-between gap-4 px-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-8 ${
          scrolled
            ? "h-[60px] max-w-[1100px] rounded-full border border-[#D9DDE4] bg-white/75 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md"
            : "h-[68px] max-w-[1200px] border border-transparent bg-[#FBFBFA]"
        }`}
      >
        <a href="#top" aria-label="RCKT" className="shrink-0">
          <img src={logoDark} alt="RCKT" className={`w-auto transition-all duration-500 ${scrolled ? "h-6" : "h-7"}`} />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Secciones">
          <a href="#beneficios" className={linkClass}>Beneficios</a>
          <a href="#proceso" className={linkClass}>Cómo funciona</a>
        </nav>
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <a href="#diagnostico" className={`${btnClass} h-[40px] whitespace-nowrap px-4 text-[13px]`}>Solicitar diagnóstico</a>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-[#D9DDE4] bg-white/75 text-[#212121]! backdrop-blur-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
        <div className="hidden md:block">
          <a href="#diagnostico" className={`${btnClass} min-h-[42px] px-6 text-[14px]`}>Solicitar diagnóstico</a>
        </div>
      </div>
      {menuOpen && (
        <div className="mx-auto mt-2 w-full max-w-[1100px] rounded-[24px] border border-[#D9DDE4] bg-white/90 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md md:hidden">
          <a href="#beneficios" onClick={() => setMenuOpen(false)} className="flex min-h-[44px] items-center px-4 text-[16px] font-medium text-[#212121]! transition-colors hover:text-[#005CFF]!">Beneficios</a>
          <a href="#proceso" onClick={() => setMenuOpen(false)} className="flex min-h-[44px] items-center px-4 text-[16px] font-medium text-[#212121]! transition-colors hover:text-[#005CFF]!">Cómo funciona</a>
        </div>
      )}
    </header>
  );
}

const heroChats = [
  {
    id: "ingles",
    label: "Cursos de inglés",
    question: "¿Dónde puedo estudiar inglés en Bogotá con horario nocturno?",
    answer: "Revisa el nivel de entrada, la intensidad horaria y si el certificado está alineado con el Marco Común Europeo de Referencia.",
    foot: "Patrocinado · [Tu academia] · Agenda tu clase de prueba",
  },
  {
    id: "preuniversitario",
    label: "Preuniversitario",
    question: "¿Qué preuniversitario le sirve a mi hija para el examen de Estado?",
    answer: "Compara la cantidad de simulacros, el tamaño de los grupos y el acompañamiento que ofrecen.",
    foot: "Patrocinado · [Tu academia] · Conoce el plan de estudio",
  },
  {
    id: "programacion",
    label: "Curso de programación",
    question: "¿Qué curso corto de programación me recomiendas para empezar?",
    answer: "Busca uno con proyectos prácticos, mentorías y un certificado que puedas mostrar.",
    foot: "Patrocinado · [Tu academia] · Inscripciones abiertas",
  },
] as const;

function HeroSection() {
  const [active, setActive] = useState(0);
  const chat = heroChats[active];
  return (
    <section id="top" className="relative bg-[#FBFBFA] pt-[68px]">
      <div className="relative overflow-hidden">
        <img
          src={imgC01Hero}
          alt="Asesora de una academia orientando a un estudiante"
          className="absolute! inset-0 h-full w-full rounded-none border-0 object-cover object-[72%_50%] md:object-[50%_50%]"
        />
        <div
          className="absolute inset-0 hidden! md:block!"
          aria-hidden="true"
          style={{ background: "linear-gradient(to right, rgba(251,251,250,0.97) 0%, rgba(251,251,250,0.85) 40%, rgba(251,251,250,0.25) 70%, transparent 100%)" }}
        />
        <div
          className="absolute inset-0 md:hidden!"
          aria-hidden="true"
          style={{ background: "linear-gradient(to bottom, rgba(251,251,250,0.92) 0%, rgba(251,251,250,0.75) 50%, rgba(251,251,250,0.35) 100%)" }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-[640px]">
            <span className="inline-block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#005CFF]">
              Para academias y centros de formación
            </span>
            <h1 className={`${serif} mt-5 text-[#212121]`} style={{ fontSize: "clamp(38px, 4.6vw, 64px)", lineHeight: 0.95 }}>
              Tus próximos estudiantes ya le preguntan a ChatGPT dónde <em>estudiar</em>.
            </h1>
            <p className="mt-6 text-[15px] leading-[1.5] text-[#4F4F4D] md:text-[16px]">
              Desde octubre de 2026 las academias en Colombia pueden anunciarse en ChatGPT. Te ayudamos a aparecer justo cuando alguien compara cursos, horarios y precios.
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
              <CtaButton>Solicitar diagnóstico para mi academia</CtaButton>
              <p className="text-[13px] text-[#4F4F4D]">Diagnóstico inicial · Academias en Colombia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const problemaCards = [
  { num: "01", title: "Comparan", text: "Programas, modalidades y duración." },
  { num: "02", title: "Preguntan", text: "Horarios, precios y formas de pago." },
  { num: "03", title: "Verifican", text: "Certificados, docentes y opiniones." },
  { num: "04", title: "Se inscriben", text: "Cuando encuentran una opción clara y confiable." },
];

function ProblemaSection() {
  return (
    <section className="bg-[#FBFBFA] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <h2 className={`${serif} text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1 }}>
            Elegir dónde estudiar ya no empieza solo en <em>Google</em>.
          </h2>
          <p className="text-[15px] leading-[1.5] text-[#4F4F4D] md:text-[16px] lg:pt-3">
            Antes de pedir información, las personas comparan programas, horarios, precios y opiniones. Cada vez más lo hacen conversando con la IA.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <img src={imgC02Problema} alt="Joven comparando cursos en su celular" className="h-[280px] w-full rounded-[4px] object-cover object-[50%_30%] sm:col-span-2 sm:row-span-2 sm:h-full" />
          {problemaCards.map((card) => (
            <article key={card.num} className="rounded-[4px] bg-[#EEF1F6] p-6">
              <span className="text-[14px] font-bold text-[#005CFF]">{card.num}</span>
              <h3 className={`${serif} mt-3 text-[22px] leading-[1.1] text-[#212121]`}>{card.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#4F4F4D]">{card.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[4px] bg-[#EEF1F6] px-6 py-10 text-center md:py-14">
          <p className={`${serif} mx-auto max-w-[820px] italic text-[#005CFF]`} style={{ fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: 1.15 }}>
            Tu academia necesita una estrategia que acompañe ese recorrido, no solo anuncios que generen clics.
          </p>
        </div>
      </div>
    </section>
  );
}

const oportunidadPartes = [
  { num: "1", title: "La respuesta", text: "ChatGPT responde con información general y útil para quien pregunta." },
  { num: "2", title: "El espacio patrocinado", text: "Debajo aparece tu curso, con un llamado a la acción claro." },
  { num: "3", title: "La conversación", text: "El interesado te escribe por WhatsApp para pedir información." },
];

function OportunidadSection() {
  const [active, setActive] = useState(0);
  const partClass = (part: number) =>
    `transition-opacity duration-300 ${active === part ? "rounded-[4px] border-2 border-[#005CFF]" : "border-2 border-transparent opacity-40"}`;
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className={`${serif} text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1 }}>
            Así aparece tu academia en la <em>conversación</em>.
          </h2>
          <p className="mt-6 text-[15px] leading-[1.5] text-[#4F4F4D] md:text-[16px]">
            El anuncio no cambia lo que responde ChatGPT. Aparece debajo, marcado como patrocinado, cuando la conversación tiene relación con lo que ofreces.
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
                  <span className={`${serif} text-[22px] leading-[1.1] ${active === index ? "text-[#005CFF]" : "text-[#212121]"}`}>{parte.title}</span>
                </span>
                {active === index && (
                  <span className="mt-2 block pl-12 text-[14px] leading-[1.5] text-[#4F4F4D]">{parte.text}</span>
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
                  Busco un curso de inglés intensivo para adultos en Medellín.
                </p>
              </div>
              <div className="mt-3 flex justify-start">
                <p className="max-w-[95%] rounded-[14px] rounded-bl-[4px] bg-white px-4 py-3 text-[14px] leading-[1.5] text-[#212121]">
                  Te conviene revisar la intensidad semanal, el tamaño de los grupos y si el curso incluye certificación de nivel.
                </p>
              </div>
            </div>
            <div className={`mt-4 ${partClass(1)} p-1`}>
              <div className="rounded-[4px] border border-[#D9DDE4] bg-white px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#005CFF]">Patrocinado</p>
                <p className="mt-1 text-[14px] font-semibold text-[#212121]">[Tu academia]</p>
                <p className="text-[13px] text-[#4F4F4D]">Inglés intensivo para adultos</p>
              </div>
            </div>
            <div className={`mt-4 ${partClass(2)} p-1`}>
              <div className="flex justify-end">
                <p className="max-w-[90%] rounded-[14px] rounded-br-[4px] bg-[#212121] px-4 py-3 text-[14px] leading-[1.5] text-white">
                  Hola, quiero información sobre horarios y precios
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

const h2Style = { fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1 } as const;

const contextoCifras = [
  { value: "21.10.2026", text: "Colombia entra a ChatGPT Ads." },
  { value: "84 %", text: "de los estudiantes de educación superior en Colombia usa IA generativa de forma habitual." },
  { value: "10.000 COP", text: "inversión mínima diaria por campaña." },
];
const contextoComo = [
  "Un espacio patrocinado aparece debajo de la respuesta.",
  "Solo lo ven mayores de 18 años en los planes gratuitos, por eso le hablamos a adultos y a padres de familia.",
  "El anunciante nunca ve las conversaciones.",
];
const permitido = [
  "Academias, institutos y centros de formación.",
  "Cursos, diplomados, idiomas y preuniversitarios.",
  "Academias de tecnología, arte, música y deportes.",
  "Cursos de finanzas o de preparación en derecho, siempre que no ofrezcan servicios financieros ni legales.",
];
const noPermitido = [
  "Anuncios dirigidos a menores de edad.",
  "Promesas de empleo, salario o resultados garantizados.",
  "Cursos que promocionen servicios médicos.",
];

function ContextoSection() {
  return (
    <section id="contexto" className="bg-[#FFFFFF] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <span className="inline-block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#005CFF]">El contexto</span>
            <h2 className={`${serif} mt-4 text-[#212121]`} style={h2Style}>
              La publicidad en ChatGPT ya está abierta para la <em>educación</em>.
            </h2>
          </div>
          <p className="text-[15px] leading-[1.5] text-[#4F4F4D] md:text-[16px] lg:pt-10">
            Desde el 21 de octubre de 2026, las academias en Colombia pueden anunciarse en ChatGPT, directamente desde el Ads Manager o con un socio tecnológico.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {contextoCifras.map((c) => (
            <div key={c.value} className="border-t border-[#D9DDE4] pt-6">
              <p className={`${serif} italic text-[#005CFF]`} style={{ fontSize: "clamp(36px, 3.6vw, 48px)", lineHeight: 1 }}>{c.value}</p>
              <p className="mt-3 text-[14px] leading-[1.5] text-[#4F4F4D]">{c.text}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-10 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Cómo funciona</h3>
        <ol className="mt-4">
          {contextoComo.map((t, i) => (
            <li key={t} className="flex gap-4 border-t border-[#D9DDE4] py-4 last:border-b">
              <span className="shrink-0 text-[14px] font-bold text-[#005CFF]">0{i + 1}</span>
              <span className="text-[14px] leading-[1.5] text-[#212121]">{t}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {[{ title: "Permitido", items: permitido }, { title: "No permitido", items: noPermitido }].map((col) => (
            <div key={col.title} className="rounded-[4px] bg-[#EEF1F6] p-6 md:p-8">
              <h3 className={`${serif} text-[22px] leading-[1.1] text-[#212121]`}>{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.items.map((t) => (
                  <li key={t} className="flex gap-3 text-[14px] leading-[1.5] text-[#4F4F4D]">
                    <span className="font-bold text-[#005CFF]" aria-hidden="true">{col.title === "Permitido" ? "+" : "−"}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[12px] leading-[1.5] text-[#4F4F4D]">
          Fuentes: OpenAI, política de anuncios y centro de ayuda, octubre de 2026; GAD3 para Planeta Formación y Universidades; Ministerio de Educación Nacional, Decreto 1075 de 2015. Las políticas cambian con frecuencia y las verificamos en cada diagnóstico.
        </p>
      </div>
    </section>
  );
}

const requisitos = [
  { num: "01", title: "Identidad comercial verificable", text: "Academia registrada en Colombia, con verificación del negocio y correo corporativo." },
  { num: "02", title: "Licencias y autorizaciones", text: "Programas de 160 horas o más: licencia y número de registro visibles en el anuncio. Cursos cortos: aclarar que no conducen a título." },
  { num: "03", title: "Publicidad veraz", text: "Sin prometer empleos, salarios, títulos que no se otorgan ni resultados garantizados." },
  { num: "04", title: "Página de destino conforme", text: "Programa, horarios, precios y certificado explicados igual que en el anuncio." },
  { num: "05", title: "Revisión y aprobación final", text: "OpenAI aprueba la cuenta, el anuncio y la página, y puede retirar anuncios después." },
];

function RequisitosSection() {
  return (
    <section id="requisitos" className="bg-[#FBFBFA] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="inline-block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#005CFF]">Requisitos</span>
          <h2 className={`${serif} mt-4 text-[#212121]`} style={h2Style}>
            Lo que OpenAI le pide a tu <em>academia</em>.
          </h2>
          <p className="mt-6 text-[15px] leading-[1.5] text-[#4F4F4D] md:text-[16px]">
            La educación es una categoría permitida, pero cada anunciante pasa por una revisión. Esto es lo que revisamos contigo antes de lanzar.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {requisitos.map((r) => (
            <article key={r.num} className="h-full rounded-[4px] border border-[#D9DDE4] bg-white p-6">
              <span className={`${serif} italic text-[#005CFF]`} style={{ fontSize: "32px", lineHeight: 1 }}>{r.num}</span>
              <h3 className="mt-4 text-[15px] font-semibold leading-[1.3] text-[#212121]">{r.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#4F4F4D]">{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const beneficios = [
  { num: "01", title: "Momento de decisión", text: "Apareces cuando la persona está comparando opciones." },
  { num: "02", title: "Le hablas a quien decide", text: "Adultos que estudian y padres que eligen por sus hijos." },
  { num: "03", title: "Cada inscripción medida", text: "Sabes cuántas solicitudes e inscripciones llegan desde ChatGPT." },
  { num: "04", title: "Antes que tu competencia", text: "El canal acaba de abrir y todavía hay pocos anunciantes." },
];

function BeneficiosSection() {
  return (
    <section id="beneficios" className="bg-[#FBFBFA] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 className={`${serif} max-w-[820px] text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1 }}>
          Llega a tus futuros estudiantes en el momento <em>justo</em>.
        </h2>
        <div className="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <img src={imgC03Beneficios} alt="Equipo de una academia en reunión" className="h-[320px] w-full rounded-[4px] object-cover md:h-[440px]" />
          <ul>
            {beneficios.map((item) => (
              <li key={item.num} className="flex gap-6 border-t border-[#D9DDE4] py-6 first:pt-0 lg:first:border-t-0">
                <span className={`${serif} shrink-0 italic text-[#005CFF]`} style={{ fontSize: "28px", lineHeight: 1 }}>{item.num}</span>
                <div>
                  <h3 className="text-[16px] font-bold text-[#212121]">{item.title}</h3>
                  <p className="mt-1 text-[14px] leading-[1.5] text-[#4F4F4D]">{item.text}</p>
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
  { num: "01", tag: "para entrar bien", title: "Cuenta y verificación", text: "Abrimos tu cuenta con los datos de tu academia y la dejamos lista para la revisión de OpenAI.", image: imgC05Servicio01 },
  { num: "02", tag: "para que te encuentren", title: "Estrategia de intenciones", text: "Mapeamos cómo preguntan tus futuros estudiantes: programas, horarios, precios y ciudades.", image: imgC06Servicio02 },
  { num: "03", tag: "para convertir", title: "Anuncios y landing de inscripción", text: "Piezas claras y una página que convierte consultas en solicitudes.", image: imgC07Servicio03 },
  { num: "04", tag: "para no perder a nadie", title: "Seguimiento y reportes", text: "Cada lead llega a tu WhatsApp, con un reporte semanal de clics, leads e inscripciones.", image: imgC08Servicio04 },
];

function ServiciosSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 className={`${serif} max-w-[760px] text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1 }}>
          De la cuenta a la <em>inscripción</em>.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((servicio) => (
            <article key={servicio.num}>
              <img src={servicio.image} alt={servicio.title} className="h-[240px] w-full rounded-[4px] object-cover" />
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-[14px] font-bold text-[#005CFF]">{servicio.num}</span>
                <span className={`${serif} italic text-[#005CFF]`} style={{ fontSize: "18px" }}>· {servicio.tag} ·</span>
              </div>
              <h3 className={`${serif} mt-2 text-[20px] leading-[1.1] text-[#212121]`}>{servicio.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#4F4F4D]">{servicio.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const diferenciadorTags = ["Políticas de OpenAI", "Estatuto del Consumidor", "Ley 1581 de 2012", "Medición real"];

function DiferenciadorSection() {
  return (
    <section className="bg-[#212121] py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <img src={imgC09Diferenciador} alt="Campus de una academia" className="h-[300px] w-full rounded-[4px] object-cover md:h-[420px]" />
        <div>
          <h2 className={`${serif} text-white`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1 }}>
            Publicidad <em>veraz</em> para educación.
          </h2>
          <p className="mt-6 text-[15px] leading-[1.5] text-white/80 md:text-[16px]">
            No prometemos empleos, salarios ni resultados garantizados. Mostramos lo que tu academia ofrece de verdad: programas, horarios, certificados y precios claros. En Colombia, la SIC ya ha multado a academias y cursos por publicidad engañosa. Por eso revisamos cada anuncio antes de publicarlo.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {diferenciadorTags.map((tag) => (
              <div key={tag} className="border-t border-white/20 py-4">
                <span className="text-[14px] font-medium text-white">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const procesoPasos = [
  { num: "1", title: "Cuéntanos sobre tu academia", text: "Programas, sedes y cómo captas estudiantes hoy." },
  { num: "2", title: "Preparamos la cuenta y la landing", text: "Verificación, medición y una página alineada con la política de OpenAI." },
  { num: "3", title: "Lanzamos y optimizamos", text: "Ajustamos cada semana según leads e inscripciones reales." },
];

function ProcesoSection() {
  return (
    <section id="proceso" className="bg-[#FBFBFA] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 className={`${serif} max-w-[700px] text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1 }}>
          Tu campaña, en tres <em>pasos</em>.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
          {procesoPasos.map((paso) => (
            <article key={paso.num} className="border-t border-[#D9DDE4] pt-8">
              <span className={`${serif} italic text-[#005CFF]`} style={{ fontSize: "clamp(36px, 3.6vw, 48px)", lineHeight: 1 }}>
                {paso.num}
              </span>
              <h3 className="mt-5 text-[16px] font-bold leading-[1.3] text-[#212121]">{paso.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#4F4F4D]">{paso.text}</p>
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
    const registro = get("registro_programas");
    if (!get("nombre") || !get("empresa")) {
      setError("Completa tu nombre y el nombre de la academia.");
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
            pais: "Colombia",
            tratamientos_principales: get("cursos") || undefined,
            problema_principal: registro ? `Registro de programas: ${registro}` : undefined,
          },
          attribution: {
            source: "lp-sales-flow",
            landing_path: window.location.pathname,
            referrer: document.referrer || undefined,
            ...campaign,
            consent_version: CONSENT_VERSION,
            consent_accepted: true,
          },
        },
      });
      track("lead_valido", { landing: LANDING, utm_content: LANDING });
      void navigate({ to: "/lp/chatgpt-ads-academias/gracias" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos enviar tu solicitud. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section id="diagnostico" className="bg-[#FBFBFA] py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className={`${serif} text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1 }}>
            Solicita el diagnóstico de tu <em>academia</em>.
          </h2>
          <p className="mt-6 text-[15px] leading-[1.5] text-[#4F4F4D] md:text-[16px]">
            Revisamos tus programas, tu página y tu competencia para definir cómo empezar a pautar en ChatGPT.
          </p>
          <img src={imgC04Formulario} alt="Director de una academia" className="mt-10 hidden! h-[280px] w-full rounded-[4px] object-cover object-[50%_20%] lg:block!" />
        </div>
        <form onSubmit={onSubmit} className="rounded-[4px] bg-[#F4F6FA] p-6 md:p-9">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="c-nombre" className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Nombre completo</label>
              <input id="c-nombre" name="nombre" type="text" autoComplete="name" className={fieldClass} placeholder="Nombre y apellidos" onInput={(e) => markStarted(e.currentTarget.value)} />
            </div>
            <div>
              <label htmlFor="c-empresa" className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Nombre de la academia *</label>
              <input id="c-empresa" name="empresa" type="text" autoComplete="organization" required className={fieldClass} placeholder="Nombre de la academia" onInput={(e) => markStarted(e.currentTarget.value)} />
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
              <label htmlFor="c-sector" className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Tipo de formación</label>
              <select id="c-sector" name="sector" defaultValue="" className={fieldClass}>
                <option value="" disabled>Selecciona una opción</option>
                {["Idiomas", "Preuniversitario", "Cursos técnicos", "Programación y tecnología", "Arte y música", "Otro"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="c-cursos" className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">¿Qué cursos quieres llenar?</label>
              <input id="c-cursos" name="cursos" type="text" maxLength={120} placeholder="Ej.: inglés para adultos, preicfes, programación" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="c-registro" className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">¿Tus programas tienen registro ante la secretaría de educación?</label>
              <select id="c-registro" name="registro_programas" defaultValue="" className={fieldClass}>
                <option value="" disabled>Selecciona una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
                <option value="Son cursos cortos (menos de 160 horas)">Son cursos cortos (menos de 160 horas)</option>
              </select>
            </div>
            <input type="hidden" name="pais" value="Colombia" />
            <label htmlFor="c-consent" className="col-span-full grid w-full grid-cols-[20px_1fr] items-start gap-3 font-normal normal-case tracking-normal">
              <input
                id="c-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-[1px] h-[18px] w-[18px] accent-[#005CFF]"
              />
              <span className="whitespace-normal break-normal text-[13px] font-normal normal-case leading-[1.5] tracking-normal text-[#4F4F4D]">
                Autorizo el tratamiento de mis datos personales según la{" "}
                <a href="/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#005CFF]! underline">
                  política de tratamiento de datos
                </a>
                .
              </span>
            </label>
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
  { question: "¿Mi academia puede anunciarse en ChatGPT?", answer: "Sí. La educación es una categoría permitida en Colombia. Cada cuenta y cada anuncio pasan por la revisión de OpenAI." },
  { question: "¿Puedo pautarle a estudiantes menores de edad?", answer: "No. OpenAI no muestra anuncios a menores de 18 años. Por eso las campañas le hablan a adultos y a padres de familia." },
  { question: "¿Cuánto debo invertir?", answer: "El mínimo es de 10.000 COP diarios por campaña. Definimos el presupuesto según tus programas, tu ciudad y tus metas de inscripción." },
  { question: "¿Esto reemplaza Google o Meta?", answer: "No. Se suma a los canales que ya te funcionan." },
  { question: "¿Garantizan inscripciones?", answer: "No. Medimos leads, solicitudes de información e inscripciones para que veas qué funciona." },
];

function FaqSectionLanding() {
  return (
    <section className="bg-[#FBFBFA] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[760px] px-5 md:px-8">
        <h2 className={`${serif} text-center text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1 }}>
          Preguntas frecuentes
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`} className="border-b border-[#D9DDE4]">
              <AccordionTrigger className="py-5 text-left text-[15px] font-semibold text-[#212121] hover:text-[#005CFF] [&>svg]:text-[#005CFF]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[14px] leading-[1.6] text-[#4F4F4D]">
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
          <h2 className={`${serif} text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1 }}>
            Tus futuros estudiantes ya están <em>preguntando</em>.
          </h2>
          <p className="mt-6 text-[15px] leading-[1.5] text-[#4F4F4D] md:text-[16px]">
            Asegúrate de que tu academia esté en esa respuesta.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CtaButton>Quiero que encuentren mi academia</CtaButton>
            <p className="text-[13px] text-[#4F4F4D]">Conversemos sobre una estrategia diseñada para tu academia.</p>
          </div>
        </div>
        <img src={imgC10Cierre} alt="Escritorio de una academia" className="h-[320px] w-full rounded-none border-0 object-cover lg:h-full lg:min-h-[480px]" />
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
            Estrategia, publicidad y automatización para academias y centros de formación en Colombia.
          </p>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Contacto</h3>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href={`mailto:${contactConfig.sales.email}`} className="text-[#212121]! transition-colors hover:text-[#005CFF]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
                {contactConfig.sales.email}
              </a>
            </li>
            <li>
              <a href={WHATSAPP_URL} className="text-[#212121]! transition-colors hover:text-[#005CFF]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Redes</h3>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href={contactConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[#212121]! transition-colors hover:text-[#005CFF]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
                Instagram
              </a>
            </li>
            <li>
              <a href={contactConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#212121]! transition-colors hover:text-[#005CFF]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4F4F4D]">Legal</h3>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href="/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" target="_blank" rel="noopener noreferrer" className="text-[#212121]! transition-colors hover:text-[#005CFF]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
                Política de tratamiento de datos
              </a>
            </li>
            <li>
              <a href="/legal/privacidad" className="text-[#212121]! transition-colors hover:text-[#005CFF]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005CFF]">
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

// Fija el tema claro mientras la landing está montada y restaura el tema del sitio al salir, sin tocar localStorage.
function useLightThemePin() {
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    const previousTheme = root.getAttribute("data-theme");
    const previousBodyBg = document.body.style.background;
    root.classList.remove("dark");
    root.setAttribute("data-theme", "light");
    document.body.style.background = "#FBFBFA";
    return () => {
      root.classList.toggle("dark", hadDark);
      if (previousTheme) root.setAttribute("data-theme", previousTheme);
      else root.removeAttribute("data-theme");
      document.body.style.background = previousBodyBg;
    };
  }, []);
}

export function LandingAcademiasC() {
  useLightThemePin();
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
        <ContextoSection />
        <RequisitosSection />
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

export function LandingAcademiasCThanks() {
  useLightThemePin();
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
          <p className="mt-4 text-[15px] leading-[1.5] text-[#4F4F4D] md:text-[16px]">
            Te contactaremos por WhatsApp para preparar el diagnóstico de tu academia.
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
