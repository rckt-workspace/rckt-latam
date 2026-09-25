import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { FileText, MessageCircle, Phone } from "lucide-react";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import DiagnosticForm from "@/components/rckt/DiagnosticForm";
import GeneralCta from "@/components/rckt/GeneralCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";

const SITE_URL = "https://rckt.lat";

const WHATSAPP_URL = "#whatsapp";

export const Route = createFileRoute("/contacto")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Contacto — RCKT" },
      {
        name: "description",
        content:
          "Hablemos de tu proceso comercial. Escríbenos por WhatsApp o déjanos el contexto de tu operación en el formulario: llega al mismo lugar.",
      },
      { property: "og:title", content: "Contacto — RCKT" },
      {
        property: "og:description",
        content: "Formulario o WhatsApp — lo que prefieras, llega al mismo lugar.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/contacto" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/contacto" }],
  }),
  component: Contacto,
});

const datos = [
  ["Correo", "hola@rckt.lat", "mailto:hola@rckt.lat"],
  ["Razón social", "RCKT S.A.S.", ""],
  ["NIT", "902.075.396-5", ""],
  ["Dirección", "Carrera 11B # 99-25, Bogotá D.C., Colombia", ""],
  ["Privacidad", "privacy@rckt.lat", "mailto:privacy@rckt.lat"],
  ["Horario", "[pendiente]", ""],
] as const;

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
      el.style.setProperty("--d", `${(i % 5) * 90}ms`);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

function Contacto() {
  const rootRef = useReveal<HTMLDivElement>();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Contacto"
          title={
            <>
               Escríbenos por donde te quede <span className="hero-hand">más fácil</span>.
            </>
          }
          descriptor="Formulario o WhatsApp — lo que prefieras, llega al mismo lugar."
           context="WhatsApp y el formulario están al mismo nivel: los dos llegan al mismo CRM con su origen y te hacemos las mismas preguntas."
          ctaLabel="Ir al formulario →"
          ctaHref="#formulario"
        />

        <section id="formulario" className="relative isolate" style={{ background: "var(--kraft)", overflow: "clip" }}>
          <div ref={rootRef} className="relative z-10 mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[38%_1fr] lg:gap-14">
              {/* Formulario (primero en móvil) */}
              <div className="order-1 lg:order-2">
                <div data-reveal className="ct-rev">
                  <div className="ct-card ct-card--form p-6 md:p-10">
                    <DiagnosticForm
                      whatsappUrl={WHATSAPP_URL}
                      submitLabel="Revisar mi proceso comercial →"
                      legal={
                        <span className="form-note">
                          Al enviar este formulario, aceptas nuestra{" "}
                          <a href="/politica-tratamiento-datos.pdf" download>
                            Política de Tratamiento de Datos
                          </a>
                          .
                        </span>
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Canales */}
              <div className="order-2 lg:order-1">
                <div className="lg:sticky" style={{ top: "120px" }}>
                  <div data-reveal className="ct-rev">
                    <h2 className="font-display text-[26px] leading-[1.15] font-semibold tracking-tight md:text-[30px]">
                      Otras formas de hablar <em className="font-serif-accent">con nosotros.</em>
                    </h2>

                    <div className="mt-8 space-y-0">
                      <div className="flex gap-4 pb-7" id="whatsapp">
                        <span className="ct-icon" aria-hidden="true"><MessageCircle className="h-5 w-5" /></span>
                        <div>
                          <h3 className="font-display text-[17px] font-semibold">WhatsApp</h3>
                          <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted-foreground">Escríbenos y responde las mismas preguntas del formulario.</p>
                          <a href={WHATSAPP_URL} className="mt-3 inline-block text-[14px] font-semibold text-orange hover:underline">Escribir por WhatsApp →</a>
                        </div>
                      </div>

                      <div className="ct-divider flex gap-4 py-7">
                        <span className="ct-icon" aria-hidden="true"><FileText className="h-5 w-5" /></span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-[17px] font-semibold">Formulario de calificación</h3>
                            <span className="ct-badge">MISMO NIVEL</span>
                          </div>
                          <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted-foreground">Llega al mismo CRM con su origen y prepara la conversación.</p>
                          <a href="#formulario" className="mt-3 inline-block text-[14px] font-semibold text-orange hover:underline">Ir al formulario →</a>
                        </div>
                      </div>

                      <div className="ct-divider flex gap-4 py-7">
                        <span className="ct-icon" aria-hidden="true"><Phone className="h-5 w-5" /></span>
                        <div>
                          <h3 className="font-display text-[17px] font-semibold">Llamada</h3>
                          <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted-foreground">[pendiente]</p>
                        </div>
                      </div>
                    </div>

                    <div className="ct-mini mt-6 p-5">
                      <p className="label-orange !text-[10px]">Datos</p>
                      {datos.map(([titulo, valor, href]) =>
                        href ? (
                          <a key={titulo} href={href} className="mt-3 block text-[14.5px] font-semibold text-foreground hover:text-orange">{valor}</a>
                        ) : (
                          <p key={titulo} className="mt-2 text-[14px] text-muted-foreground">{valor}</p>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
