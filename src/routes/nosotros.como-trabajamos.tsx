import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import { AcceptanceSteps, CapabilityCards, RuleList } from "@/components/rckt/SystemBlocks";
import SystemFinalCta from "@/components/rckt/SystemFinalCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";

const SITE_URL = "https://rckt-latam.lovable.app";

const modalidades = [
  ["01.", "Operar", "Por defecto, responsabilidad sobre el resultado."],
  [
    "02.",
    "Sprint",
    "Implementación acotada de 6-8 semanas, alcance y aceptación cerrados antes de empezar.",
  ],
  [
    "03.",
    "Partner",
    "Advisory, in-housing, capacitación o growth lead fraccional para equipos que quieren nuestro método, no nuestra ejecución.",
  ],
] as const;

const base = [
  "Fuente de verdad",
  "IA supervisada",
  "Un responsable con autoridad",
  "Activos reutilizables",
  "Gobierno y seguridad",
  "Transferencia",
] as const;

const escalera = [
  ["01.", "Revenue Diagnostic", "Semanas 0-3."],
  ["02.", "Demand o Revenue Engine", "Meses 1-6."],
  ["03.", "+ Operations", "Meses 6-12."],
  [
    "04.",
    "Growth OS",
    "Mes 12 en adelante, solo con línea base cumplida y un decisor que patrocina.",
  ],
] as const;

export const Route = createFileRoute("/nosotros/como-trabajamos")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Cómo trabajamos — RCKT" },
      {
        name: "description",
        content:
          "Tres modalidades de trabajo, una base común en toda cuenta y la escalera de cuenta: del Revenue Diagnostic al Growth OS.",
      },
      { property: "og:title", content: "Cómo trabajamos — RCKT" },
      {
        property: "og:description",
        content:
          "Operar, Sprint o Partner. Lo que no se negocia en ninguna cuenta y cómo escala el trabajo en el tiempo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/nosotros/como-trabajamos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/nosotros/como-trabajamos" }],
  }),
  component: ComoTrabajamosPage,
  errorComponent: ComoTrabajamosError,
  notFoundComponent: () => <ComoTrabajamosError />,
});

function ComoTrabajamosPage() {
  useSiteMotion([]);

  return (
    <div className="rckt-site tcn-page">
      <main id="top">
        <SystemPageHero
          label="Nosotros"
          title={
            <>
              Cómo <em>trabajamos</em>.
            </>
          }
          descriptor="Tres modalidades, una base común y una escalera de cuenta que no se salta pasos."
          ctaLabel="Revisar mi proceso comercial →"
        />
        <SystemSection
          id="modalidades"
          num="01."
          label="Tres modalidades"
          title="Tres modalidades."
        >
          <CapabilityCards
            items={modalidades.map(([, titulo, detalle]) => ({ titulo, detalle }))}
          />
        </SystemSection>
        <SystemSection
          id="base-comun"
          num="02."
          label="Base común"
          title="Lo que hacemos siempre, en toda cuenta."
        >
          <RuleList items={[...base]} />
        </SystemSection>
        <SystemSection
          id="escalera"
          num="03."
          label="Escalera de cuenta"
          title="Una escalera de cuenta que no se salta pasos."
        >
          <AcceptanceSteps
            plazo="Escalera de cuenta"
            items={escalera.map(([, label, texto]) => ({ label, texto }))}
          />
        </SystemSection>
        <SystemFinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function ComoTrabajamosError() {
  const router = useRouter();

  return (
    <div className="rckt-site tcn-page">
      <SiteHeader />
      <main className="band">
        <div className="container">
          <div className="form-card" role="alert">
            <span className="kicker">Cómo trabajamos</span>
            <h1>No pudimos mostrar esta página.</h1>
            <p>Intenta cargarla nuevamente. Si el problema continúa, puedes volver al inicio.</p>
            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => void router.invalidate()}
              >
                Intentar de nuevo
              </button>
              <a className="btn" href="/">
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
