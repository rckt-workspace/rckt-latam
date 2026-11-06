import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { saveDiagnosticLead } from "@/lib/leads-diagnostic.functions";
import { getCampaignParams, saveCampaignParams, track } from "@/components/rckt/tracking";
import { WHATSAPP_URL, contactConfig } from "@/config/contact";
import logoDark from "@/assets/rckt-logo-dark.png";
import logoLight from "@/assets/rckt-logo-light.png";
import imgA01 from "@/assets/A-01-hero-consulta.jpg";
import imgA01Movil from "@/assets/A-01-hero-movil.jpg";
import imgA02 from "@/assets/A-02-problema-paciente-celular.jpg";
import imgA03 from "@/assets/A-03-beneficios-equipo.jpg";
import imgA04 from "@/assets/A-04-formulario-directora.jpg";
import imgA05 from "@/assets/A-05-servicio-01-diagnostico.jpg";
import imgA06 from "@/assets/A-06-servicio-02-estrategia.jpg";
import imgA07 from "@/assets/A-07-servicio-03-landing.jpg";
import imgA08 from "@/assets/A-08-servicio-04-seguimiento.jpg";
import imgA09 from "@/assets/A-09-diferenciador-libreta.jpg";
import imgA10 from "@/assets/A-10-cierre-ojo.jpg";

const landingImages: Record<string, string> = {
  "A-01-hero-consulta.jpg": imgA01,
  "A-02-problema-paciente-celular.jpg": imgA02,
  "A-03-beneficios-equipo.jpg": imgA03,
  "A-04-formulario-directora.jpg": imgA04,
  "A-05-servicio-01-diagnostico.jpg": imgA05,
  "A-06-servicio-02-estrategia.jpg": imgA06,
  "A-07-servicio-03-landing.jpg": imgA07,
  "A-08-servicio-04-seguimiento.jpg": imgA08,
  "A-09-diferenciador-libreta.jpg": imgA09,
  "A-10-cierre-ojo.jpg": imgA10,
};

export const LANDING_TITLE = "Marketing e IA para clínicas estéticas en Colombia | RCKT";
export const LANDING_DESCRIPTION =
  "Descubre cómo integrar la publicidad en ChatGPT y la inteligencia artificial en una estrategia de captación de pacientes para tu clínica estética.";

const LANDING = "clinicas-esteticas-ia";
const CONSENT_VERSION = "RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf";

const fontDisplay = "font-['Bricolage_Grotesque',sans-serif]";

function ImagePlaceholder({
  name,
  className = "",
  position = "50% 25%",
}: {
  name: string;
  className?: string;
  position?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[24px] ${className}`}>
      <img
        src={landingImages[name]}
        alt=""
        className="h-full w-full object-cover"
        style={{ objectPosition: position }}
        loading="lazy"
      />
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
      className={`inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#6A3FE0] px-8 text-[15px] font-semibold text-white! transition-colors hover:bg-[#4B2BB8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A3FE0] ${className}`}
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
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-6 ${
        scrolled ? "pt-3" : "pt-0"
      }`}
    >
      <div
        className={`mx-auto flex w-full items-center justify-between gap-4 px-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-8 ${
          scrolled
            ? "h-[60px] max-w-[1100px] rounded-full border border-[#DCD1FA] bg-white/75 shadow-[0_10px_30px_rgba(42,26,85,0.10)] backdrop-blur-md"
            : "h-[68px] max-w-[1200px] border border-transparent bg-transparent"
        }`}
      >
        <a href="#top" aria-label="RCKT">
          <img src={logoDark} alt="RCKT" className={`w-auto transition-all duration-500 ${scrolled ? "h-6" : "h-7"}`} />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Secciones">
          <a href="#beneficios" className="text-[15px] font-medium text-[#212121] transition-colors hover:text-[#6A3FE0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A3FE0]">
            Beneficios
          </a>
          <a href="#proceso" className="text-[15px] font-medium text-[#212121] transition-colors hover:text-[#6A3FE0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A3FE0]">
            Cómo funciona
          </a>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#diagnostico"
            className="inline-flex h-[40px] items-center justify-center whitespace-nowrap rounded-full bg-[#6A3FE0] px-4 text-[13px] font-semibold text-white! transition-colors hover:bg-[#4B2BB8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A3FE0]"
          >
            Solicitar diagnóstico
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-[#DCD1FA] bg-white/75 text-[#212121] backdrop-blur-md transition-colors hover:text-[#6A3FE0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A3FE0]"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
        <div className="hidden md:block">
          <CtaButton className="min-h-[42px] px-6 text-[14px]">Solicitar diagnóstico</CtaButton>
        </div>
      </div>
      {menuOpen && (
        <div className="mx-auto mt-2 w-full max-w-[1100px] rounded-[24px] border border-[#DCD1FA] bg-white/90 p-2 shadow-[0_10px_30px_rgba(42,26,85,0.10)] backdrop-blur-md md:hidden">
          <a
            href="#beneficios"
            onClick={() => setMenuOpen(false)}
            className="flex min-h-[44px] items-center px-4 text-[16px] font-medium text-[#212121] transition-colors hover:text-[#6A3FE0]"
          >
            Beneficios
          </a>
          <a
            href="#proceso"
            onClick={() => setMenuOpen(false)}
            className="flex min-h-[44px] items-center px-4 text-[16px] font-medium text-[#212121] transition-colors hover:text-[#6A3FE0]"
          >
            Cómo funciona
          </a>
        </div>
      )}
    </header>
  );
}

const heroGradient =
  "radial-gradient(60% 55% at 18% 20%, #D7C8FF 0%, transparent 70%), radial-gradient(50% 50% at 80% 15%, #CFC2FF 0%, transparent 70%), radial-gradient(55% 60% at 70% 85%, #E9DCFF 0%, transparent 70%), radial-gradient(40% 40% at 25% 85%, #FFE6DA 0%, transparent 70%), #F6F2FF";

function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-[max(100svh,720px)] flex-col overflow-hidden md:block md:min-h-[680px]">
      <img
        src={imgA01}
        alt=""
        className="absolute inset-0 hidden! h-full w-full object-cover object-[70%_30%] md:block!"
        loading="eager"
      />
      <img
        src={imgA01Movil}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[50%_100%] brightness-90 saturate-90 md:hidden!"
        loading="eager"
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(246,242,255,0.97) 0%, rgba(246,242,255,0.92) 30%, rgba(233,220,255,0.75) 48%, rgba(233,220,255,0) 68%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: "linear-gradient(to bottom, rgba(251,251,250,0.80) 0%, rgba(251,251,250,0.55) 40%, rgba(251,251,250,0.15) 70%, rgba(251,251,250,0) 100%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex w-full max-w-[1200px] items-center px-5 pb-16 pt-[120px] md:min-h-[680px] md:px-8 md:pb-20 md:pt-[140px]">
        <div className="max-w-[560px] max-md:[text-shadow:0_0_12px_rgba(255,255,255,0.9)]">
          <span className="inline-block rounded-full bg-[#4B2BB8] px-4 py-1.5 text-[12px] font-semibold tracking-wide !text-white max-md:text-[#000000]!">
            Marketing + inteligencia artificial
          </span>
          <h1
            className={`${fontDisplay} mt-6 font-bold text-[#212121] max-md:text-[#000000]!`}
            style={{ fontSize: "clamp(38px, 4.6vw, 64px)", lineHeight: 1, letterSpacing: "-0.03em" }}
          >
            Tus futuros pacientes ya consultan sobre tratamientos estéticos con IA. ¿Tu clínica está preparada?
          </h1>
          <p className="mt-6 text-[17px] leading-[1.5] text-[#212121] max-md:text-[#000000]! max-md:font-medium">
            La forma de buscar información sobre tratamientos estéticos está evolucionando. En RCKT te ayudamos a preparar la estrategia digital de tu clínica para las nuevas oportunidades publicitarias de ChatGPT, mientras OpenAI habilita publicidad para anunciar servicios de salud en Colombia.
          </p>
          <p className="mt-4 text-[15px] font-semibold leading-[1.5] text-[#212121] max-md:text-[#000000]! max-md:font-medium">
            Prepárate con una estrategia, no con suposiciones.
          </p>
          <p className="mt-1 text-[15px] leading-[1.5] text-[#4B4366] max-md:text-[#000000]! max-md:font-medium">
            Analizamos tu presencia digital, tus tratamientos y los requisitos que podrían aplicar a tu clínica.
          </p>
          <div className="mt-8">
            <CtaButton>Quiero explorar esta oportunidad</CtaButton>
          </div>
          <p className="mt-4 text-[13px] text-[#4B4366] max-md:text-[#000000]! max-md:font-medium">Diagnóstico inicial · Enfoque para clínicas en Colombia</p>
        </div>
      </div>
      <div className="absolute bottom-6 right-6 z-10 hidden w-[280px] rounded-[20px] border border-[#DCD1FA] bg-white p-4 shadow-lg md:block">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4B4366]">Ejemplo ilustrativo</p>
        <p className="mt-2 text-[14px] leading-[1.5] text-[#212121]">¿Qué opciones hay para rejuvenecimiento facial?</p>
        <p className="mt-2 rounded-[12px] bg-[#F1ECFF] px-3 py-2 text-[12px] text-[#4B4366]">
          Patrocinado · Valoración estética profesional
        </p>
      </div>
    </section>
  );
}

const problemaCards = [
  { num: "01", title: "Investigan", text: "Buscan información sobre procedimientos, beneficios y riesgos." },
  { num: "02", title: "Comparan", text: "Exploran alternativas y preparan preguntas antes de consultar." },
  { num: "03", title: "Consultan", text: "Contactan clínicas para conocer disponibilidad y solicitar valoraciones." },
];

function ProblemaSection() {
  return (
    <section className="bg-[#FBFAFF] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className={`${fontDisplay} font-bold text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              La búsqueda de un tratamiento estético ya no empieza siempre en Google.
            </h2>
            <p className="mt-6 text-[16px] leading-[1.5] text-[#4B4366]">
              Antes de solicitar una valoración, muchas personas quieren entender qué tratamientos existen, cuáles son sus diferencias, qué cuidados requieren y qué deberían preguntar a un profesional.
            </p>
            <p className="mt-4 text-[16px] leading-[1.5] text-[#4B4366]">
              Hoy, herramientas de inteligencia artificial como ChatGPT también pueden formar parte de ese proceso de información.
            </p>
            <p className="mt-4 text-[16px] leading-[1.5] text-[#4B4366]">
              Esto no significa que la IA reemplace una valoración médica. Significa que las clínicas necesitan comprender cómo están evolucionando los canales digitales por los que las personas investigan y toman decisiones.
            </p>
          </div>
          <ImagePlaceholder name="A-02-problema-paciente-celular.jpg" className="h-[280px] md:h-[340px]" position="50% 15%" />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {problemaCards.map((card) => (
            <article key={card.num} className="rounded-[24px] border border-[#DCD1FA] bg-[#F1ECFF] p-6">
              <span className={`${fontDisplay} text-[15px] font-bold text-[#6A3FE0]`}>{card.num}</span>
              <h3 className={`${fontDisplay} mt-3 text-[19px] font-bold text-[#212121]`}>{card.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.5] text-[#4B4366]">{card.text}</p>
            </article>
          ))}
        </div>
        <p
          className={`${fontDisplay} mt-10 max-w-[820px] font-bold text-[#4B2BB8]`}
          style={{ fontSize: "clamp(20px, 2.2vw, 28px)", lineHeight: 1.2, letterSpacing: "-0.01em" }}
        >
          Tu clínica no necesita perseguir cada tendencia. Necesita entender cuáles pueden convertirse en oportunidades reales para sus pacientes y su negocio.
        </p>
      </div>
    </section>
  );
}

function OportunidadSection() {
  return (
    <section className="bg-[#6A3FE0] py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className={`${fontDisplay} font-bold text-white`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Así podría verse tu experiencia publicitaria cuando el servicio esté autorizado.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.5] text-white/90">
            Imagina que una persona está investigando opciones de medicina estética. Antes de contactar una clínica, puede consultar dudas sobre procedimientos, cuidados, seguridad y criterios para elegir un profesional.
          </p>
          <p className="mt-4 text-[16px] leading-[1.5] text-white/90">
            En un escenario donde la publicidad de servicios de salud esté autorizada, los anuncios patrocinados podrían convertirse en una nueva forma de dar visibilidad a las clínicas.
          </p>
        </div>
        <div>
          <div className="rounded-[24px] bg-white p-6 shadow-xl">
            <div className="flex justify-end">
              <p className="max-w-[80%] rounded-[16px] rounded-br-[4px] bg-[#6A3FE0] px-4 py-3 text-[14px] leading-[1.5] text-white">
                Busco información sobre rejuvenecimiento facial.
              </p>
            </div>
            <div className="mt-4 flex justify-start">
              <p className="max-w-[85%] rounded-[16px] rounded-bl-[4px] bg-[#F1ECFF] px-4 py-3 text-[14px] leading-[1.5] text-[#212121]">
                Existen distintas alternativas según tu tipo de piel y tus objetivos. Lo recomendable es una valoración con un profesional.
              </p>
            </div>
            <div className="mt-4 rounded-[14px] border border-[#DCD1FA] bg-[#FBFAFF] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6A3FE0]">Patrocinado</p>
              <p className="mt-1 text-[14px] font-semibold text-[#212121]">[Tu clínica]</p>
              <p className="text-[13px] text-[#4B4366]">Valoración estética profesional</p>
            </div>
          </div>
          <p className="mt-4 text-[12px] leading-[1.5] text-white/80">
            Ejemplo conceptual: es una representación ilustrativa, no un formato confirmado ni una promesa de aparición para una consulta concreta.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContextoSection() {
  return (
    <section id="contexto" className="bg-[#FBFAFF] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <span className="inline-block rounded-full bg-[#4B2BB8] px-4 py-1.5 text-[12px] font-semibold tracking-wide !text-white">
          Contexto · Octubre 2026
        </span>
        <h2
          className={`${fontDisplay} mt-5 max-w-[820px] font-bold text-[#212121]`}
          style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          ChatGPT Ads llegó a Colombia. ¿Qué significa para el sector de la medicina estética?
        </h2>
        <p className="mt-6 max-w-[720px] text-[16px] leading-[1.5] text-[#4B4366]">
          La llegada de formatos publicitarios a ChatGPT abre nuevas posibilidades para las marcas. Sin embargo, las clínicas estéticas pertenecen a un sector regulado, por lo que no deben asumir que todos sus servicios y tratamientos pueden anunciarse de inmediato.
        </p>
        <p
          className={`${fontDisplay} mt-8 max-w-[820px] font-bold text-[#4B2BB8]`}
          style={{ fontSize: "clamp(20px, 2.2vw, 28px)", lineHeight: 1.2, letterSpacing: "-0.01em" }}
        >
          La disponibilidad de anuncios no equivale a la autorización de cualquier campaña de salud.
        </p>
        <p className="mt-6 max-w-[720px] text-[16px] leading-[1.5] text-[#4B4366]">
          Por eso, antes de invertir, es importante conocer las políticas publicitarias, revisar los requisitos aplicables y preparar una estrategia responsable.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="rounded-[24px] border border-[#DCD1FA] bg-white p-7">
            <h3 className={`${fontDisplay} text-[19px] font-bold leading-[1.2] text-[#212121]`}>Qué puedes hacer desde ahora</h3>
            <p className="mt-3 text-[15px] leading-[1.5] text-[#4B4366]">
              Revisar tu presencia digital, optimizar la página web, mejorar la información de tus servicios, organizar el seguimiento de contactos y evaluar la preparación de tu clínica.
            </p>
          </article>
          <article className="rounded-[24px] border border-[#DCD1FA] bg-[#F1ECFF] p-7">
            <h3 className={`${fontDisplay} text-[19px] font-bold leading-[1.2] text-[#212121]`}>Qué depende de la plataforma</h3>
            <p className="mt-3 text-[15px] leading-[1.5] text-[#4B4366]">
              La disponibilidad de campañas para servicios de salud, la aprobación de anuncios y las condiciones de segmentación y publicación.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

const beneficios = [
  { title: "Fortalece tu credibilidad", text: "Presenta tus profesionales, servicios, habilitaciones e información de manera clara y verificable." },
  { title: "Mejora tu presencia digital", text: "Optimiza tu web para que las personas encuentren información útil y puedan solicitar una valoración." },
  { title: "Organiza tus oportunidades", text: "Facilita la atención por WhatsApp y el seguimiento de las solicitudes recibidas." },
  { title: "Prepárate con información", text: "Evalúa los requisitos y la viabilidad de futuros canales publicitarios antes de comprometer presupuesto." },
];

function BeneficiosSection() {
  return (
    <section id="beneficios" className="bg-[#FBFAFF] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2
          className={`${fontDisplay} max-w-[900px] font-bold text-[#212121]`}
          style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          Tu clínica no necesita esperar para fortalecer su estrategia digital.
        </h2>
        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <ImagePlaceholder name="A-03-beneficios-equipo.jpg" className="h-[280px] md:h-[360px]" position="50% 25%" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {beneficios.map((item) => (
              <article key={item.title} className="rounded-[24px] border border-[#DCD1FA] bg-[#F1ECFF] p-6">
                <h3 className={`${fontDisplay} text-[19px] font-bold leading-[1.2] text-[#212121]`}>{item.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.5] text-[#4B4366]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const servicios = [
  { num: "01", title: "Diagnóstico de presencia digital", text: "Analizamos tu sitio web, servicios, canales de captación y proceso de atención para identificar oportunidades de mejora.", image: "A-05-servicio-01-diagnostico.jpg" },
  { num: "02", title: "Estrategia de marketing e IA", text: "Diseñamos una hoja de ruta para fortalecer la visibilidad de tu clínica y evaluar nuevos canales publicitarios conforme a su disponibilidad.", image: "A-06-servicio-02-estrategia.jpg" },
  { num: "03", title: "Optimización de landing y mensajes", text: "Mejoramos la presentación de tus servicios, la claridad de la información y los puntos de contacto con pacientes potenciales.", image: "A-07-servicio-03-landing.jpg" },
  { num: "04", title: "Seguimiento de oportunidades", text: "Organizamos la medición de consultas, contactos y citas, respetando la privacidad de los pacientes.", image: "A-08-servicio-04-seguimiento.jpg" },
];

function ServicioCard({ servicio }: { servicio: (typeof servicios)[number] }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="group h-[360px] cursor-pointer [perspective:1200px]"
      onClick={() => setFlipped((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setFlipped((value) => !value);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${servicio.title}: ver detalle`}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 flex overflow-hidden rounded-[24px] border border-[#DCD1FA] bg-white [backface-visibility:hidden]">
          <div className="flex w-[72px] shrink-0 flex-col items-center justify-between border-r border-[#DCD1FA] bg-[#F1ECFF] py-6">
            <span className={`${fontDisplay} text-[15px] font-bold text-[#6A3FE0]`}>{servicio.num}</span>
            <span
              className={`${fontDisplay} text-[17px] font-bold text-[#212121]`}
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {servicio.title}
            </span>
          </div>
          <ImagePlaceholder name={servicio.image} className="m-4 flex-1" position="50% 30%" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-between rounded-[24px] bg-[#4B2BB8] p-7 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <span className={`${fontDisplay} text-[15px] font-bold text-white/70`}>{servicio.num}</span>
            <h3 className={`${fontDisplay} mt-3 text-[20px] font-bold leading-[1.15] text-white`}>{servicio.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.5] text-white/90">{servicio.text}</p>
          </div>
          <a
            href="#diagnostico"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-white px-6 text-[15px] font-semibold text-[#4B2BB8] transition-colors hover:bg-[#F1ECFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Cómo empezamos
          </a>
        </div>
      </div>
    </div>
  );
}

function ServiciosSection() {
  return (
    <section className="bg-[#FBFAFF] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className={`${fontDisplay} max-w-[640px] font-bold text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            De la estrategia digital a una clínica mejor preparada para captar pacientes.
          </h2>
          <p className="text-[13px] text-[#4B4366] md:pb-2">Pasa el cursor por cada tarjeta para ver qué incluye.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((servicio) => (
            <ServicioCard key={servicio.num} servicio={servicio} />
          ))}
        </div>
      </div>
    </section>
  );
}

const aspectosRevisamos = [
  "Habilitaciones y registros que correspondan al servicio.",
  "Información verificable de los profesionales.",
  "Mensajes publicitarios responsables.",
  "Tratamiento adecuado de datos personales.",
  "Coherencia entre anuncios, web y servicios ofrecidos.",
];

function DiferenciadorSection() {
  return (
    <section className="bg-[#2A1A55] py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <ImagePlaceholder name="A-09-diferenciador-libreta.jpg" className="h-[260px] md:h-[340px]" position="50% 35%" />
        <div>
          <h2 className={`${fontDisplay} font-bold text-white`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            En salud, la confianza es tan importante como la visibilidad.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.5] text-white/85">
            La publicidad de servicios estéticos requiere especial cuidado. Una estrategia responsable debe comunicar información verificable, respetar la privacidad de los pacientes y evitar promesas sobre resultados médicos.
          </p>
          <p className="mt-4 text-[16px] leading-[1.5] text-white/85">
            En RCKT revisamos los requisitos aplicables antes de recomendar campañas, porque una buena estrategia de marketing no debería poner en riesgo la reputación de tu clínica.
          </p>
          <p className="mt-8 text-[15px] font-semibold text-white">Aspectos que revisamos</p>
          <ul className="mt-4 flex flex-col gap-3">
            {aspectosRevisamos.map((aspecto) => (
              <li key={aspecto} className="flex items-start gap-3">
                <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#DCD1FA]" aria-hidden="true" />
                <span className="text-[15px] leading-[1.5] text-white">{aspecto}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const procesoPasos = [
  { num: "1", title: "Cuéntanos sobre tu clínica", text: "Completa un formulario breve con tus servicios y objetivos." },
  { num: "2", title: "Evaluamos tu situación", text: "Revisamos tus canales actuales y las oportunidades posibles." },
  { num: "3", title: "Definimos el siguiente paso", text: "Te presentamos una orientación inicial y, si hay encaje, una propuesta de trabajo." },
];

function ProcesoSection() {
  return (
    <section id="proceso" className="bg-[#FBFAFF] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2 className={`${fontDisplay} max-w-[700px] font-bold text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Tu siguiente paso puede ser más sencillo de lo que imaginas.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {procesoPasos.map((paso) => (
            <article key={paso.num} className="rounded-[24px] border border-[#DCD1FA] bg-[#F1ECFF] p-7">
              <span className={`${fontDisplay} flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#6A3FE0] text-[18px] font-bold text-white`}>
                {paso.num}
              </span>
              <h3 className={`${fontDisplay} mt-5 text-[19px] font-bold leading-[1.2] text-[#212121]`}>{paso.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.5] text-[#4B4366]">{paso.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const servicioOpciones = [
  "Tratamientos faciales",
  "Tratamientos corporales",
  "Medicina estética",
  "Cirugía plástica",
  "Otros",
] as const;

const inputClass =
  "mt-2 w-full rounded-[12px] border border-[#DCD1FA] bg-white px-4 py-3 text-[15px] text-[#212121] placeholder:text-[#4B4366]/60 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#6A3FE0]";

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
      void navigate({ to: "/lp/clinicas-esteticas-ia/gracias" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos enviar tu solicitud. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section id="diagnostico" className="bg-[#F1ECFF] py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className={`${fontDisplay} font-bold text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Descubre qué tan preparada está tu clínica para las nuevas oportunidades del marketing con IA.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.5] text-[#4B4366]">
            Solicita una revisión inicial de tu presencia digital y conoce qué acciones podrían ayudarte a mejorar tu estrategia de captación.
          </p>
          <ImagePlaceholder name="A-04-formulario-directora.jpg" className="mt-10 hidden h-[380px] lg:block" position="50% 12%" />
        </div>
        <form onSubmit={onSubmit} className="rounded-[24px] border border-[#DCD1FA] bg-white p-6 shadow-lg md:p-9">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label htmlFor="ia-nombre" className="text-[14px] font-semibold text-[#212121]">Nombre completo</label>
              <input id="ia-nombre" name="nombre" type="text" autoComplete="name" className={inputClass} placeholder="Nombre y apellidos" onInput={(e) => markStarted(e.currentTarget.value)} />
            </div>
            <div>
              <label htmlFor="ia-empresa" className="text-[14px] font-semibold text-[#212121]">Nombre de la clínica *</label>
              <input id="ia-empresa" name="empresa" type="text" autoComplete="organization" required className={inputClass} placeholder="Nombre de la clínica" onInput={(e) => markStarted(e.currentTarget.value)} />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="ia-ciudad" className="text-[14px] font-semibold text-[#212121]">Ciudad</label>
                <input id="ia-ciudad" name="ciudad" type="text" autoComplete="address-level2" className={inputClass} placeholder="Bogotá" />
              </div>
              <div>
                <label htmlFor="ia-telefono" className="text-[14px] font-semibold text-[#212121]">WhatsApp</label>
                <input id="ia-telefono" name="telefono" type="tel" autoComplete="tel" className={inputClass} placeholder="+57 300 000 0000" />
              </div>
            </div>
            <div>
              <label htmlFor="ia-sector" className="text-[14px] font-semibold text-[#212121]">Servicio principal</label>
              <select id="ia-sector" name="sector" defaultValue="" className={inputClass} onChange={(e) => markStarted(e.currentTarget.value)}>
                <option value="">Selecciona una opción</option>
                {servicioOpciones.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
            <input type="hidden" name="pais" value="Colombia" />
            <label htmlFor="ia-consent" className="col-span-full grid w-full grid-cols-[20px_1fr] items-start gap-3 normal-case tracking-normal font-normal">
              <input
                id="ia-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-[1px] h-[18px] w-[18px] accent-[#6A3FE0]"
              />
              <span className="whitespace-normal break-normal text-[13px] font-normal normal-case leading-[1.5] tracking-normal text-[#4B4366]">
                Autorizo el tratamiento de mis datos personales según la{" "}
                <a href="/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#6A3FE0]! underline">
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
              className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#6A3FE0] px-8 text-[16px] font-semibold text-white! transition-colors hover:bg-[#4B2BB8] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A3FE0]"
            >
              {enviando ? "Enviando…" : "Solicitar diagnóstico de mi clínica"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const faqItems = [
  { question: "¿Mi clínica ya puede anunciarse en ChatGPT?", answer: "La disponibilidad depende del mercado, las condiciones de acceso y las políticas vigentes. Primero verificamos si existe una opción viable en Colombia y para los servicios que ofreces." },
  { question: "¿Debo dejar Google Ads o Meta Ads?", answer: "No. Se evalúan oportunidades complementarias, no se reemplazan canales que ya funcionan." },
  { question: "¿Funciona para cualquier tratamiento?", answer: "No necesariamente. Hay que revisar políticas y restricciones aplicables a publicidad de salud." },
  { question: "¿Cuánto presupuesto necesito?", answer: "Depende de los canales disponibles, alcance del piloto, servicios y objetivos." },
  { question: "¿Garantizan pacientes nuevos?", answer: "No. Se definen métricas de contactos válidos, solicitudes de valoración, citas y resultados comerciales." },
];

function FaqSectionLanding() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-[760px] px-5 md:px-8">
        <h2 className={`${fontDisplay} text-center font-bold text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Preguntas frecuentes
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`} className="border-b border-[#DCD1FA]">
              <AccordionTrigger className="py-5 text-left text-[17px] font-semibold text-[#212121] hover:text-[#6A3FE0] [&>svg]:text-[#6A3FE0]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-[1.6] text-[#4B4366]">
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
    <section className="relative overflow-hidden" style={{ background: heroGradient }}>
      <div
        className="absolute inset-y-0 right-0 hidden w-[55%] lg:block"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 38%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 38%)",
        }}
        aria-hidden="true"
      >
        <img src={imgA10} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
        <div className="max-w-[520px]">
          <h2 className={`${fontDisplay} font-bold text-[#212121]`} style={{ fontSize: "clamp(28px, 3vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            El futuro del marketing también se está construyendo con inteligencia artificial.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.5] text-[#4B4366]">
            La inteligencia artificial está transformando la forma de buscar información y explorar servicios. Tu clínica puede empezar a prepararse con una estrategia digital clara, responsable y medible.
          </p>
          <div className="mt-8">
            <CtaButton>Quiero preparar mi clínica</CtaButton>
          </div>
          <p className="mt-4 text-[13px] text-[#4B4366]">Conversemos sobre una estrategia diseñada para tu negocio.</p>
        </div>
        <div className="mt-10 lg:hidden">
          <img src={imgA10} alt="" className="h-[260px] w-full rounded-[24px] object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-[#2A1A55] py-14">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <img src={logoLight} alt="RCKT" className="h-7 w-auto" />
          <p className="mt-4 max-w-[260px] text-[14px] leading-[1.6] text-white">
            Estrategia, publicidad y automatización para clínicas estéticas en Colombia.
          </p>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white">Contacto</h3>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href={`mailto:${contactConfig.sales.email}`} className="text-white! transition-colors hover:text-white! hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                {contactConfig.sales.email}
              </a>
            </li>
            <li>
              <a href={WHATSAPP_URL} className="text-white! transition-colors hover:text-white! hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white">Redes</h3>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href={contactConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white! transition-colors hover:text-white! hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Instagram
              </a>
            </li>
            <li>
              <a href={contactConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white! transition-colors hover:text-white! hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white">Legal</h3>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href="/RCKT-SAS-Politica-de-Tratamiento-de-Datos.pdf" target="_blank" rel="noopener noreferrer" className="text-white! transition-colors hover:text-white! hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Política de tratamiento de datos
              </a>
            </li>
            <li>
              <a href="/legal/privacidad" className="text-white! transition-colors hover:text-white! hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
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
      className="fixed bottom-6 right-6 z-50 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#6A3FE0] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A3FE0]"
    >
      <WhatsAppIcon />
    </a>
  );
}

// Fija el tema claro y el fondo propio de la landing mientras está montada; restaura el sitio al salir, sin tocar localStorage.
function useLightThemePin() {
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    const previousTheme = root.getAttribute("data-theme");
    const previousBodyBg = document.body.style.background;
    root.classList.remove("dark");
    root.setAttribute("data-theme", "light");
    document.body.style.background = "#FBFAFF";
    return () => {
      root.classList.toggle("dark", hadDark);
      if (previousTheme) root.setAttribute("data-theme", previousTheme);
      else root.removeAttribute("data-theme");
      document.body.style.background = previousBodyBg;
    };
  }, []);
}

export function LandingClinicasIaA() {
  useLightThemePin();
  useEffect(() => {
    saveCampaignParams(window.location.search);
    saveCampaignParams(`?utm_content=${LANDING}`);
    track("lp_view", { landing: LANDING, utm_content: LANDING });
  }, []);
  return (
    <div className="bg-[#FBFAFF] font-['Switzer',sans-serif] text-[#212121] antialiased">
      <LandingHeader />
      <main>
        <HeroSection />
        <ProblemaSection />
        <ContextoSection />
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

export function LandingClinicasIaAThanks() {
  useLightThemePin();
  useEffect(() => {
    saveCampaignParams(window.location.search);
    saveCampaignParams(`?utm_content=${LANDING}`);
    track("thank_you_view", { nivel: "mql", landing: LANDING, utm_content: LANDING });
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-[#FBFAFF] font-['Switzer',sans-serif] text-[#212121] antialiased">
      <header className="border-b border-[#DCD1FA]/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center px-5 md:px-8">
          <a href="/" aria-label="RCKT">
            <img src={logoDark} alt="RCKT" className="h-7 w-auto" />
          </a>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-16" style={{ background: heroGradient }}>
        <div className="w-full max-w-[560px] rounded-[24px] border border-[#DCD1FA] bg-white p-8 text-center shadow-xl md:p-12">
          <span className="mx-auto flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#6A3FE0] text-white">
            <Check strokeWidth={2.5} className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className={`${fontDisplay} mt-6 font-bold text-[#212121]`} style={{ fontSize: "clamp(34px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Recibimos tu solicitud.
          </h1>
          <p className="mt-4 text-[16px] leading-[1.5] text-[#4B4366]">
            Te contactaremos por WhatsApp para conversar sobre el diagnóstico de tu clínica.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#6A3FE0] px-8 text-[16px] font-semibold text-white! transition-colors hover:bg-[#4B2BB8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A3FE0]"
          >
            Volver al inicio
          </a>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
