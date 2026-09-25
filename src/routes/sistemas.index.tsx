import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Database, Megaphone, MessageCircle, UserRound, Workflow } from "lucide-react";

import SiteFooter from "@/components/rckt/SiteFooter";
import GeneralCta from "@/components/rckt/GeneralCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { SystemCards, type SystemCardData } from "@/components/rckt/SystemCards";
import { useInView } from "@/hooks/use-in-view";


const SISTEMAS_CARDS: SystemCardData[] = [
  { badge: "S1", kicker: "Sistema 01", title: "Generación de demanda medida hasta la venta", shortName: "Demand System", desc: "Cuando optimizas por costo por lead, las plataformas aprenden a traerte a quien llena formularios, no a quien compra. Manejamos tu pauta por las oportunidades que tu equipo acepta y por las que terminan en venta.", href: "/sistemas/demand-system", art: "radar" },
  { badge: "S2", kicker: "Sistema 02", title: "De lead a venta sin fugas", shortName: "Sales Flow", desc: "El prospecto te escribe por WhatsApp y la respuesta depende de quién esté libre. Sales Flow conecta tu pauta, WhatsApp y CRM: cada conversación con respuesta, seguimiento y dueño, y cada venta de vuelta a Meta y Google.", href: "/sistemas/sales-flow", art: "flow" },
  { badge: "S3", kicker: "Sistema 03", title: "Procesos que se ejecutan solos, con supervisión", shortName: "Operations System", desc: "6 de cada 10 pymes no ven retorno de la IA. Por eso empezamos por un proceso, no por una herramienta: medimos cuánto cuesta hoy y lo dejamos funcionando con una persona aprobando lo que importa.", href: "/sistemas/operations-system", art: "cycle" },
];

const DIAGRAM_BOXES = [
  { title: "Demand System", href: "/sistemas/demand-system" as const, Icon: Megaphone },
  { title: "Sales Flow", href: "/sistemas/sales-flow" as const, Icon: MessageCircle },
  { title: "Operations System", href: "/sistemas/operations-system" as const, Icon: Workflow },
];

const BASE_COMUN = [
  { label: "Fuente de verdad", Icon: Database },
  { label: "IA supervisada", Icon: Bot },
  { label: "Responsable de cuenta", Icon: UserRound },
];
const SITE_URL = "https://rckt.lat";

function Arquitectura() {
  const { ref, inView } = useInView<HTMLDivElement>({ fallbackMs: 1200 });

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "var(--kraft)" }}>
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div ref={ref} className="mb-10 flex items-center gap-3">
          <span className="inline-block h-4 w-[2px] bg-orange" />
          <span className="label-orange">Arquitectura</span>
        </div>

        <div
          data-in={inView ? "true" : "false"}
          data-ready="true"
          className="arch mx-auto max-w-[960px] text-center"
        >
          {/* Capa 1 */}
          <div className="arch-layer" style={{ transitionDelay: "0ms" }}>
            <span
              className="font-display inline-flex items-center rounded-full px-4 py-1.5 text-[12px] font-semibold"
              style={{ border: "1px solid var(--orange)", color: "var(--orange)" }}
            >
              Tu problema
            </span>
          </div>
          <span className="arch-line" style={{ ["--arch-line-h" as string]: "32px", transitionDelay: "80ms" }} aria-hidden="true" />

          {/* Capa 2 */}
          <div className="arch-layer relative overflow-hidden rounded-2xl px-6 py-5" style={{ background: "var(--orange)", transitionDelay: "120ms" }}>
            <div className="relative z-10">
              <p className="font-display text-[19px] font-semibold" style={{ color: "#f5f2ed" }}>
                Revenue Diagnostic
              </p>
              <p className="mt-1 text-[12.5px]" style={{ color: "rgba(245,242,237,0.85)" }}>
                Toda cuenta empieza aquí
              </p>
            </div>
          </div>
          <div className="arch-layer" style={{ transitionDelay: "200ms" }} aria-hidden="true">
            <span className="arch-line" style={{ ["--arch-line-h" as string]: "18px" }} />
            <div className="hidden md:grid grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="relative h-5">
                  <span
                    className="absolute top-0 h-px"
                    style={{
                      background: "var(--orange)",
                      left: i === 0 ? "50%" : 0,
                      right: i === 2 ? "50%" : 0,
                    }}
                  />
                  <span className="absolute left-1/2 top-0 h-5 w-px" style={{ background: "var(--orange)" }} />
                </div>
              ))}
            </div>
            <span className="arch-line md:hidden" style={{ ["--arch-line-h" as string]: "14px" }} />
          </div>


          {/* Capa 3 */}
          <div className="arch-layer grid gap-4 md:grid-cols-3" style={{ transitionDelay: "240ms" }}>
            {DIAGRAM_BOXES.map(({ title, href, Icon }) => (
              <Link key={title} to={href} className="arch-box flex flex-col items-center gap-2 rounded-2xl px-5 py-6 transition-colors hover:border-orange">
                <Icon className="h-5 w-5" style={{ color: "var(--orange)" }} strokeWidth={1.5} />
                <span className="font-display text-[14.5px] font-semibold">{title}</span>
              </Link>
            ))}
          </div>

          {/* Capa 4 — agrupaciones */}
          <div className="arch-layer mt-6" style={{ transitionDelay: "360ms" }}>
            <div className="hidden md:block">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 arch-bracket" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-3 flex justify-center md:justify-start">
              <span
                className="font-display inline-flex rounded-full px-4 py-1.5 text-[12px] font-semibold md:ml-[16%]"
                style={{ background: "var(--orange)", color: "#f5f2ed" }}
              >
                Revenue Engine · Demand + Sales Flow
              </span>
            </div>
            <div className="mt-6 hidden md:block arch-bracket arch-bracket--dashed" aria-hidden="true" />
            <div className="mt-3 flex justify-center">
              <span
                className="font-display inline-flex rounded-full px-4 py-1.5 text-[12px] font-semibold"
                style={{ border: "1.5px dashed var(--orange)", color: "var(--orange)" }}
              >
                Growth OS · los tres sistemas
              </span>
            </div>
          </div>

          {/* Capa 5 — la base */}
          <div className="arch-layer mt-10" style={{ transitionDelay: "480ms" }}>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: "var(--ink-soft)" }}>
              La base común
            </p>
            <div className="arch-base mt-3 grid grid-cols-1 rounded-2xl md:grid-cols-3">
              {BASE_COMUN.map(({ label, Icon }, i) => (
                <div
                  key={label}
                  className={`flex items-center justify-center gap-2 px-5 py-5 ${
                    i === 0
                      ? ""
                      : "border-t border-[rgba(252, 92, 31,0.25)] md:border-t-0 md:border-l md:border-[rgba(252, 92, 31,0.25)]"
                  }`}
                >

                  <Icon className="h-4 w-4 shrink-0" style={{ color: "var(--orange)" }} strokeWidth={1.5} />
                  <span className="font-display text-[13.5px] font-semibold" style={{ color: "var(--ink)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cards() {
  return (
    <section className="relative isolate overflow-hidden py-14 md:py-20" style={{ background: "var(--kraft-2)" }}>
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SystemCards systems={SISTEMAS_CARDS} />
      </div>
    </section>
  );
}

function Combos() {
  return (
    <section className="relative isolate overflow-hidden py-14 md:py-20" style={{ background: "var(--kraft)" }}>
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-center gap-3">
          <span className="inline-block h-4 w-[2px] bg-orange" />
          <span className="label-orange">Los dos combos</span>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-2">
          <div
            className="relative flex h-full flex-col overflow-hidden rounded-[28px] p-[44px]"
            style={{ background: "linear-gradient(135deg, #fc5c1f 0%, #fc5c1f 100%)" }}
          >
            <div className="relative z-10 flex h-full flex-col">
              <span
                className="font-mono inline-flex w-fit rounded-full px-3 py-1 text-[11px] tracking-[0.16em] uppercase"
                style={{ background: "rgba(245,242,237,0.2)", color: "#f5f2ed" }}
              >
                Producto principal
              </span>
              <h3 className="font-display mt-5 text-[40px] leading-tight font-semibold" style={{ color: "#f5f2ed" }}>
                Revenue Engine
              </h3>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span
                  className="font-display rounded-full px-4 py-1.5 text-[13px] font-semibold"
                  style={{ border: "1px solid rgba(245,242,237,0.5)", color: "#f5f2ed" }}
                >
                  Demand System
                </span>
                <span className="font-display text-[16px] font-semibold" style={{ color: "#f5f2ed" }} aria-hidden="true">
                  +
                </span>
                <span
                  className="font-display rounded-full px-4 py-1.5 text-[13px] font-semibold"
                  style={{ border: "1px solid rgba(245,242,237,0.5)", color: "#f5f2ed" }}
                >
                  Sales Flow
                </span>
              </div>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-left" data-align="left" style={{ color: "rgba(245,242,237,0.9)" }}>
                Pauta, WhatsApp y CRM bajo un solo responsable: la pauta que trae la conversación y el proceso que la convierte en venta.
              </p>
              <Link
                to="/sistemas/revenue-engine"
                className="font-display mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#f5f2ed] px-7 py-3.5 pt-3.5 text-[14px] font-semibold"
                style={{ color: "#fc5c1f", marginTop: "32px" }}
              >
                Ver Revenue Engine →
              </Link>
            </div>
          </div>

          <div
            className="combo-card-light relative flex h-full flex-col overflow-hidden rounded-[28px] p-[44px]"
          >
            <div className="relative z-10 flex h-full flex-col">
              <span
                className="font-mono inline-flex w-fit rounded-full px-3 py-1 text-[11px] tracking-[0.16em] uppercase"
                style={{ border: "1px solid var(--orange)", color: "var(--orange)" }}
              >
                Etapa posterior
              </span>
              <h3 className="font-display mt-5 text-[40px] leading-tight font-semibold" style={{ color: "var(--ink)" }}>
                Growth OS
              </h3>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-left" data-align="left" style={{ color: "var(--ink-soft)" }}>
                Para cuentas con Revenue Engine maduro y al menos un proceso operativo que automatizar. A Growth OS se llega por la escalera, nunca de entrada.
              </p>
              <a
                href="/sistemas/revenue-engine#escalera"
                className="font-display inline-flex w-fit items-center gap-2 text-[14px] font-semibold"
                style={{ color: "var(--orange)", marginTop: "32px" }}
              >
                Ver cómo crece una cuenta →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export const Route = createFileRoute("/sistemas/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Sistemas — Tres sistemas, una sola cadena de ingresos | RCKT" },
      {
        name: "description",
        content:
          "Demand System, Sales Flow y Operations System: tres sistemas que siguen la cadena de ingresos de cualquier negocio, del clic al cierre.",
      },
      { property: "og:title", content: "Sistemas — Tres sistemas, una sola cadena de ingresos | RCKT" },
      {
        property: "og:description",
        content: "Demand System, Sales Flow y Operations System: tres sistemas que siguen la cadena de ingresos de cualquier negocio, del clic al cierre.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas" }],
  }),
  component: SistemasIndex,
});

function SistemasIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <SystemPageHero
          label="Sistemas"
          title={
            <>
              Del anuncio a la venta, en tres <span className="hero-hand">sistemas</span>.
            </>
          }
          descriptor="Todo empieza por tu problema y por un Revenue Diagnostic. Con tus números sobre la mesa decidimos qué sistema construir primero: el que consigue clientes, el que los cierra por WhatsApp o el que atiende sin fricción."
          ctaLabel="Revisar mi proceso comercial →"
          ctaHref="/sistemas/revenue-diagnostic#formulario"
        />
        <Arquitectura />
        <Cards />
        <Combos />
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
