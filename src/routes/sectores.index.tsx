import { createFileRoute } from "@tanstack/react-router";

import GeneralCta from "@/components/rckt/GeneralCta";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { SECTORS } from "@/components/rckt/sectorData";

const SITE_URL = "https://rckt.lat";
const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

// Orden LATAM: Salud, Educación, Construcción, Servicios B2B, Ecommerce, Industria.
const CARDS = [
  ["01", "Salud, estética y odontología", "/sectores/salud-estetica-odontologia", "salud", "Revenue Engine"],
  ["02", "Educación privada", "/sectores/educacion", "educacion", "Revenue Engine"],
  ["03", "Construcción e inmobiliario", "/sectores/construccion-inmobiliario", "construccion", "Revenue Engine + Operations"],
  ["04", "Servicios B2B", "/sectores/servicios-b2b", "b2b", "Revenue Engine"],
  ["05", "Ecommerce", "/sectores/ecommerce", "ecommerce", "Demand System"],
  ["06", "Industria y distribución", "/sectores/industria-distribucion", "industria", "Operations System"],
] as const;

export const Route = createFileRoute("/sectores/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Sectores — RCKT" },
      {
        name: "description",
        content:
          "Vendemos distinto según cómo vende cada sector: salud, educación, construcción, servicios B2B, ecommerce e industria.",
      },
      { property: "og:title", content: "Sectores — RCKT" },
      {
        property: "og:description",
        content: "Revenue Systems adaptados a la forma real de vender de cada sector.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sectores" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sectores" }],
  }),
  component: SectoresPage,
});

const IMAGE_POSITION: Partial<Record<string, string>> = { salud: "30% center", educacion: "72% 35%", b2b: "30% center" };

function Cards() {
  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "var(--kraft)" }}>
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(([n, nombre, href, key, label]) => {
            const d = SECTORS[key];
            return (
              <article key={n} className="card-kraft flex flex-col overflow-hidden p-0">
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={d.sectorImage}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ objectPosition: IMAGE_POSITION[key] ?? "center" }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(33,33,33,0.45), transparent 72%)" }}
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <span className="font-mono text-[11px] tracking-wider text-orange">{n}</span>
                  <h2 className="font-display mt-2 text-[20px] leading-snug font-semibold tracking-tight">{nombre}</h2>

                  <div className="mt-4">
                    <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-muted-foreground">
                      Cómo vende hoy
                    </p>
                    <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] leading-relaxed">
                      {d.funnelStages.map((p, i) => (
                        <span key={p} className="inline-flex items-center gap-1.5">
                          {i > 0 ? <span className="text-orange/60">→</span> : null}
                          <span>{p}</span>
                        </span>
                      ))}
                    </p>
                  </div>

                  <p className="label-orange mt-6">Sistema recomendado · {label}</p>

                  <div className="mt-auto pt-7">
                    <a
                      href={href}
                      className="btn-orange font-display inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold"
                    >
                      Ver sector →
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectoresPage() {
  return (
    <div className="rckt-site bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Sectores"
          title={<>Vendemos distinto según cómo vende cada <span className="hero-hand">sector.</span></>}
          context="Una clínica no vende como un colegio ni como una constructora. Elige tu sector y mira su recorrido real, del anuncio a la venta, dónde se pierde el dinero y qué indicador usamos para medirlo."
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
