import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, FolderOpen, HeartPulse, UsersRound } from "lucide-react";

import ColombiaMap from "@/components/rckt/ColombiaMap";
import GeneralCta from "@/components/rckt/GeneralCta";
import { ContactSection, PageSection, getMarketJsonLd } from "@/components/rckt/MarketLocationPage";
import SectionHeader from "@/components/rckt/SectionHeader";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

const SITE_URL = "https://rckt.lat";

export const Route = createFileRoute("/mercados/colombia")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "RCKT en Colombia | RCKT LATAM" },
      { name: "description", content: "RCKT opera en Colombia con atención en Bogotá, Medellín y Barranquilla." },
      { property: "og:title", content: "RCKT en Colombia | RCKT LATAM" },
      { property: "og:description", content: "Sistemas comerciales de RCKT para empresas en Colombia." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/mercados/colombia` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/mercados/colombia` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(getMarketJsonLd("RCKT Colombia", "Colombia")) }],
  }),
  component: ColombiaPage,
});

function ColombiaPage() {
  return (
    <div className="rckt-site market-page min-h-screen bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero label="COLOMBIA" title={<>RCKT en <span className="hero-hand">Colombia.</span></>} context="Colombia es nuestro mercado activo en Latinoamérica, con equipo y atención en Bogotá, Medellín y Barranquilla." ctaLabel="Revisar mi proceso comercial →" ctaHref="/sistemas/revenue-diagnostic" />
        <PageSection num="01." label="Por qué Colombia" title="Por qué Colombia."><div className="madrid-intro mt-9"><p className="market-copy">[pendiente]</p><ColombiaMap compact /></div></PageSection>
        <PageSection num="02." label="Sectores que atendemos" title="Sectores que atendemos."><div className="mt-10 grid gap-5 md:grid-cols-2"><SectorLink icon={HeartPulse} title="Salud, estética y odontología" href="/sectores/salud-estetica-odontologia" /><SectorLink icon={BriefcaseBusiness} title="Educación" href="/sectores/educacion" /></div><a href="/sectores/" className="mt-7 inline-block font-semibold text-orange hover:underline">Ver todos los sectores →</a></PageSection>
        <section className="page-section"><div className="page-shell grid gap-12 lg:grid-cols-2 lg:gap-7"><div><SectionHeader num="03." label="Casos en Colombia" title="Casos en Colombia." /><div className="market-note mt-9 p-7 md:p-8"><FolderOpen className="h-[22px] w-[22px] text-orange" aria-hidden="true" /><p className="market-copy mt-5">Aquí mostraremos los casos de éxito de clientes en Colombia, siempre con ficha completa: situación inicial, inversión, intervención y método de medición.</p><a href="/casos/" className="mt-6 inline-block text-[15px] font-semibold text-orange hover:underline">Ver cómo presentamos cada caso →</a></div></div><div><SectionHeader num="04." label="Equipo local" title="Equipo local." /><div className="market-note mt-9 p-7 md:p-8"><UsersRound className="h-[22px] w-[22px] text-orange" aria-hidden="true" /><p className="market-copy mt-5">[pendiente]</p></div></div></div></section>
        <PageSection num="05." label="Ciudades" title="Ciudades activas."><div className="market-cities-grid mt-10">{[["Bogotá","bogota"],["Medellín","medellin"],["Barranquilla","barranquilla"]].map(([name,slug]) => <a key={slug} href={`/mercados/${slug}`} className="market-feature-card group block p-7 md:p-8"><span className="label-orange">Ciudad activa</span><h3 className="font-display mt-4 text-[20px] font-semibold">{name}</h3><span className="mt-7 inline-block text-[15px] font-semibold text-orange group-hover:underline">Ver ciudad →</span></a>)}</div></PageSection>
        <ContactSection />
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function SectorLink({ icon: Icon, title, href }: { icon: typeof HeartPulse; title: string; href: string }) {
  return <a href={href} className="market-feature-card group block p-7 md:p-8"><Icon className="h-[22px] w-[22px] text-orange" aria-hidden="true" /><h3 className="font-display mt-5 text-[18px] font-semibold">{title}</h3><span className="mt-6 inline-block text-[15px] font-semibold text-orange group-hover:underline">Ver sector →</span></a>;
}