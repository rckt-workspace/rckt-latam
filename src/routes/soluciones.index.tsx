import { createFileRoute, Link } from "@tanstack/react-router";

import GeneralCta from "@/components/rckt/GeneralCta";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import solucionCaptacionImg from "@/assets/solucion-captacion.jpg";
import solucionEcommerceImg from "@/assets/solucion-ecommerce.jpg";
import solucionOperacionImg from "@/assets/solucion-operacion.jpg";

const SITE_URL = "https://rckt.lat";
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

export const Route = createFileRoute("/soluciones/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Soluciones — RCKT" },
      {
        name: "description",
        content:
          "Entras por tu problema, no por el nombre de un sistema: captación y cierre, ecommerce rentable y operación.",
      },
      { property: "og:title", content: "Soluciones — RCKT" },
      {
        property: "og:description",
        content:
          "Tres puertas de entrada según el problema real de tu negocio, medidas del clic al cierre.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/soluciones" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/soluciones" }],
  }),
  component: SolucionesPage,
});

const SOLUCIONES = [
  {
    badge: "01",
    titulo: "Pagas por leads y no sabes cuáles compran.",
    subtitulo: "Meta y Google dicen una cosa, tu cuenta bancaria, otra.",
    label: "Sistema recomendado · Revenue Engine",
    botonLabel: "Ver captación y cierre →",
    href: "/soluciones/captacion-y-cierre" as const,
    image: solucionCaptacionImg,
  },
  {
    badge: "02",
    titulo: "Inviertes en pauta y no crece con margen.",
    subtitulo: "El ROAS sube en la plataforma, el margen no sube en el banco.",
    label: "Sistema recomendado · Demand System",
    botonLabel: "Ver ecommerce rentable →",
    href: "/soluciones/ecommerce-rentable" as const,
    image: solucionEcommerceImg,
  },
  {
    badge: "03",
    titulo: "Tu equipo hace lo mismo cien veces por semana.",
    subtitulo:
      "Cotizaciones a mano, documentos que se copian entre sistemas, Excel donde debería haber un proceso.",
    label: "Sistema recomendado · Operations System",
    botonLabel: "Ver operación →",
    href: "/soluciones/operacion" as const,
    image: solucionOperacionImg,
  },
];

function Cards() {
  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "var(--kraft)" }}>
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {SOLUCIONES.map((s) => (
            <article key={s.badge} className="card-kraft flex flex-col overflow-hidden p-0">
              <div className="relative h-40 w-full overflow-hidden">
                <img src={s.image} alt="" className="h-full w-full object-cover object-center" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(33,33,33,0.45), transparent 72%)" }}
                />
                <span className="absolute top-4 left-4 rounded-full bg-[rgba(245,242,237,0.9)] px-3 py-1 font-mono text-[11px] tracking-wider text-ink">
                  {s.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h2 className="font-display text-[21px] leading-snug font-semibold tracking-tight">{s.titulo}</h2>
                <p
                  className="mt-3 text-[16px] leading-relaxed text-muted-foreground"
                  style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic" }}
                >
                  {s.subtitulo}
                </p>
                <p className="label-orange mt-6">{s.label}</p>

                <div className="mt-auto pt-7">
                  <Link
                    to={s.href}
                    className="btn-orange font-display inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold"
                  >
                    {s.botonLabel}
                  </Link>
                  <div className="mt-4 text-center">
                    <a
                      href={DIAGNOSTIC_HREF}
                      className="font-display text-[13.5px] font-semibold text-orange underline-offset-4 hover:underline"
                    >
                      Revisar mi proceso comercial
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolucionesPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Soluciones"
          title={
            <>
              Entras por <span className="hero-hand">tu problema,</span> no por el nombre de un sistema.
            </>
          }
          context="Toda conversación empieza por tu problema, en tus palabras, nunca por el nombre de un sistema. Cada puerta pasa primero por un Revenue Diagnostic y, si encajas en dos, entras por la que tenga la fuga económica mayor."
          ctaLabel="Revisar mi proceso comercial →"
          ctaHref={DIAGNOSTIC_HREF}
        />
        <Cards />
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
