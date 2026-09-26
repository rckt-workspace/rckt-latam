import { createFileRoute } from "@tanstack/react-router";
import { Check, Database, Layers, Lock, PackageOpen, ShieldCheck, UserRoundCheck, X } from "lucide-react";
import GeneralCta from "@/components/rckt/GeneralCta";
import SectionHeader from "@/components/rckt/SectionHeader";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";
const SITE_URL = "https://rckt.lat";

const SOMOS = [
  "Nos hacemos responsables del resultado comercial, no de una tarea.",
  "Conectamos lo que hoy tienes separado: pauta, WhatsApp, web, CRM, ventas y operación.",
  "Medimos todo hasta la venta, con una sola fuente de verdad que tú firmas.",
  "Usamos IA en cada sistema, siempre supervisada y con un documento que dice qué hace sola y qué no.",
];
const NO_SOMOS = [
  "No somos una agencia de pauta que optimiza por costo por lead.",
  "No hacemos webs sueltas, community management ni diseño gráfico por encargo.",
  "No vendemos chatbots ni «IA» como producto: vendemos un proceso que mejora y se mide.",
  "No prometemos lo que no depende de nosotros: stock, precios, cierre o atención.",
];
const PILARES = [
  ["01", "SELL BETTER", "Haz que cada oportunidad cuente."],
  ["02", "THINK BETTER", "Mejores decisiones, mejores resultados."],
  ["03", "WORK SMARTER", "La tecnología trabaja. El criterio dirige."],
  ["04", "MOVE FIRST", "Detecta antes. Actúa antes."],
  ["05", "PROOF > PROMISES", "Resultados que hablan por sí solos."],
] as const;
const PRINCIPIOS = [
  ["01", Database, "Una fuente de verdad", "Un solo modelo de datos, de la inversión al margen, con definiciones que tú firmas."],
  ["02", ShieldCheck, "IA supervisada", "Por cuenta, un documento de una página: qué se automatiza, qué aprueba una persona, cómo se detectan fallos y quién interviene."],
  ["03", UserRoundCheck, "Un responsable con autoridad", "Una persona decide prioridades entre pauta, creatividad, conversión y operación, y responde por el resultado."],
  ["04", Layers, "Activos reutilizables", "Conectores, tracking, playbooks y creatividades que se documentan y se reutilizan."],
  ["05", Lock, "Gobierno y seguridad", "Accesos, datos personales, consentimiento y normativa local bajo control, con apoyo jurídico cuando se necesita."],
  ["06", PackageOpen, "Transferencia", "Desde el primer día tienes la documentación y los accesos; si te vas, te llevas tu sistema."],
] as const;

export const Route = createFileRoute("/nosotros/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Nosotros — Sistemas que convierten demanda en ventas | RCKT" },
      { name: "description", content: "RCKT diseña y opera sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso." },
      { property: "og:title", content: "Nosotros — RCKT LATAM" },
      { property: "og:description", content: "RCKT diseña y opera sistemas que convierten demanda en ventas en Latinoamérica." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/nosotros` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/nosotros` }],
  }),
  component: NosotrosPage,
});

function NosotrosPage() {
  return (
    <div className="rckt-site min-h-screen bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Nosotros"
          title={<>RCKT diseña y opera sistemas que convierten <span className="text-orange">demanda en <span className="hero-hand">ventas.</span></span></>}
          context="Campañas, conversaciones de WhatsApp, CRM e IA supervisada, medidos hasta el ingreso. Trabajamos con empresas que ya venden e invierten en mercadeo, y pierden dinero entre la pauta y el cierre. Operamos en Latinoamérica desde Colombia: Bogotá, Medellín y Barranquilla."
          extra={<p className="font-display mt-5 text-[26px] font-semibold text-orange md:text-[30px]">Del clic al cierre.</p>}
          ctaLabel="Revisar mi proceso comercial"
          ctaHref={DIAGNOSTIC_HREF}
        />
        <section className="page-section"><div className="page-shell">
          <SectionHeader num="01." label="Manifiesto" title="Manifiesto." />
          <article className="manifest-card"><div className="manifest-card__glow" aria-hidden="true" /><p>Hacemos crecer lo que importa, aplicamos inteligencia con precisión, medimos lo que hacemos y construimos relaciones que perduran, porque el verdadero crecimiento no se persigue: <span>se diseña, se demuestra y se sostiene.</span></p><footer><i aria-hidden="true" /><span>RCKT · Manifiesto</span></footer></article>
        </div></section>
        <section className="page-section"><div className="page-shell"><SectionHeader num="02." label="En una frase" title="En una frase." phrase="No vendemos pauta, ni webs, ni chatbots. Diseñamos y operamos el sistema que hay entre la inversión en mercadeo de un cliente y su venta, y respondemos por lo que pasa en el medio." /></div></section>
        <section className="page-section"><div className="page-shell grid items-stretch gap-6 md:grid-cols-2">
          <div className="band--orange rounded-[8px] p-8 md:p-10"><h2 className="font-display text-[28px] font-semibold">Lo que somos</h2><ul className="mt-6 space-y-4">{SOMOS.map((text) => <li key={text} className="flex gap-3 leading-relaxed"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" /><span>{text}</span></li>)}</ul></div>
          <div className="content-card p-8 md:p-10"><h2 className="font-display text-[28px] font-semibold">Lo que no somos</h2><ul className="mt-6 space-y-4">{NO_SOMOS.map((text) => <li key={text} className="flex gap-3 leading-relaxed text-muted-foreground"><X aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-orange" /><span>{text}</span></li>)}</ul></div>
        </div></section>
        <section className="page-section"><div className="page-shell"><SectionHeader num="03." label="Los 5 pilares" title="Los 5 pilares." /><div className="pillar-grid mt-10">{PILARES.map(([n,title,text]) => <article key={n} className="pillar-item"><span className="pillar-item__number">{n}.</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="pillar-practice"><span className="section-pill">En la práctica</span><p>Vender mejor es decirle que no al prospecto que no encaja, aunque duela el mes. Pensar mejor es medir antes de tocar nada. Trabajar más inteligente es un proceso a la vez, con supervisión, no un chatbot suelto. Movernos primero es que el Diagnostic dure semanas, no trimestres. Y la prueba por encima de la promesa es que ningún resultado se menciona sin ficha de caso.</p></div></div></section>
        <section className="page-section"><div className="page-shell"><SectionHeader num="04." label="Principios" title="Las seis condiciones de toda cuenta." /><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{PRINCIPIOS.map(([n,Icon,title,text]) => <article key={n} className="content-card p-7"><div className="flex items-center gap-3"><Icon className="h-6 w-6 text-orange" /><span className="font-hero text-[28px] font-semibold text-orange">{n}</span></div><h3 className="font-display mt-4 text-[19px] font-semibold">{title}</h3><p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{text}</p></article>)}</div></div></section>
        <section className="page-section"><div className="page-shell"><SectionHeader num="05." label="A quién servimos" title="A quién servimos." /><p className="mt-8 max-w-[900px] text-[18px] leading-[1.7] text-muted-foreground">Nuestro cliente ya vende, ya invierte en mercadeo o ventas y recibe leads, pero pierde dinero entre la pauta y el cierre. El tamaño no es un filtro absoluto: una empresa de 12 personas con ticket alto y margen es mejor cliente que una de 80 con márgenes bajos.</p></div></section>
        <section className="page-section"><div className="page-shell grid items-stretch gap-6 md:grid-cols-2"><LinkCard title="Cómo trabajamos" text="Operar, Sprint o Partner: la misma cabeza, tres formas de contratarla." href="/nosotros/como-trabajamos" /><LinkCard title="Mercados" text="Dónde operamos: Colombia, desde Bogotá, Medellín y Barranquilla." href="/mercados/" /></div></section>
        <GeneralCta />
      </main><SiteFooter />
    </div>
  );
}
function LinkCard({title,text,href}:{title:string;text:string;href:string}) { return <a href={href} className="content-card group flex min-h-[210px] flex-col p-8"><span className="label-orange">Siguiente</span><h2 className="font-display mt-4 text-[28px] font-semibold">{title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p><span className="mt-auto pt-7 font-semibold text-orange group-hover:underline">Ver más →</span></a>; }
