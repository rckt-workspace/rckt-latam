import type { ReactNode } from "react";
import { BriefcaseBusiness, FolderOpen, HeartPulse, UsersRound } from "lucide-react";

import ColombiaMap from "@/components/rckt/ColombiaMap";
import GeneralCta from "@/components/rckt/GeneralCta";
import SectionHeader from "@/components/rckt/SectionHeader";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { contactConfig } from "@/config/contact";

type CityId = "bogota" | "medellin" | "barranquilla";

const isColombiaValue = (value?: string) =>
  Boolean(value && !/to be updated|xxx|por definir|pendiente|mexico/i.test(value));

const CONTACT = {
  whatsapp: "[pendiente]",
  phone: isColombiaValue(contactConfig.headquarters.phone) ? contactConfig.headquarters.phone : "[pendiente]",
  address: isColombiaValue(contactConfig.headquarters.address) ? contactConfig.headquarters.address : "[pendiente]",
  hours: "[pendiente]",
  email: isColombiaValue(contactConfig.headquarters.email) ? contactConfig.headquarters.email : "[pendiente]",
};

export function getMarketJsonLd(name: string, areaServed: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    areaServed,
    ...(CONTACT.address !== "[pendiente]" ? { address: CONTACT.address } : {}),
    ...(CONTACT.phone !== "[pendiente]" ? { telephone: CONTACT.phone } : {}),
    ...(CONTACT.email !== "[pendiente]" ? { email: CONTACT.email } : {}),
  };
}

export default function MarketLocationPage({ city, cityId, context, why }: { city: string; cityId: CityId; context: string; why: string }) {
  return (
    <div className="market-page min-h-screen bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero label={city.toUpperCase()} title={<>RCKT en <span className="hero-hand">{city}.</span></>} context={context} ctaLabel="Revisar mi proceso comercial →" ctaHref="/sistemas/revenue-diagnostic" />

        <PageSection num="01." label={`Por qué ${city}`} title={`Por qué ${city}.`}>
          <div className="madrid-intro mt-9">
            <p className="market-copy">{why}</p>
            <ColombiaMap compact activeCity={cityId} />
          </div>
        </PageSection>

        <PageSection num="02." label="Sectores que atendemos" title="Sectores que atendemos.">
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <SectorLink icon={HeartPulse} title="Salud, estética y odontología" href="/sectores/salud-estetica-odontologia" />
            <SectorLink icon={BriefcaseBusiness} title="Educación" href="/sectores/educacion" />
          </div>
          <a href="/sectores/" className="mt-7 inline-block font-semibold text-orange hover:underline">Ver todos los sectores →</a>
        </PageSection>

        <section className="page-section">
          <div className="page-shell grid gap-12 lg:grid-cols-2 lg:gap-7">
            <div>
              <SectionHeader num="03." label={`Casos en ${city}`} title={`Casos en ${city}.`} />
              <div className="market-note mt-9 p-7 md:p-8"><FolderOpen className="h-[22px] w-[22px] text-orange" aria-hidden="true" /><p className="market-copy mt-5">Aquí mostraremos los casos de éxito de clientes en {city}, siempre con ficha completa: situación inicial, inversión, intervención y método de medición.</p><a href="/casos/" className="mt-6 inline-block text-[15px] font-semibold text-orange hover:underline">Ver cómo presentamos cada caso →</a></div>
            </div>
            <div>
              <SectionHeader num="04." label="Equipo local" title="Equipo local." />
              <div className="market-note mt-9 p-7 md:p-8"><UsersRound className="h-[22px] w-[22px] text-orange" aria-hidden="true" /><p className="market-copy mt-5">[pendiente]</p></div>
            </div>
          </div>
        </section>

        <ContactSection num="05." />
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}

export function ContactSection({ num = "06." }: { num?: string }) {
  return (
    <PageSection num={num} label="Datos de contacto" title="Datos de contacto.">
      <div className="market-feature-card mt-10 p-7 md:p-8">
        <dl className="contact-list">
          <div><dt>WhatsApp</dt><dd>{CONTACT.whatsapp}</dd></div>
          <div><dt>Teléfono</dt><dd>{CONTACT.phone}</dd></div>
          <div><dt>Dirección</dt><dd>{CONTACT.address}</dd></div>
          <div><dt>Horario</dt><dd>{CONTACT.hours}</dd></div>
          <div><dt>Correo</dt><dd>{CONTACT.email}</dd></div>
        </dl>
        <a href="/sistemas/revenue-diagnostic" className="btn-orange font-display mt-8 inline-flex rounded-full px-7 py-3.5 text-[14px] font-semibold">Revisar mi proceso comercial →</a>
      </div>
    </PageSection>
  );
}

export function PageSection({ num, label, title, children }: { num: string; label: string; title: string; children: ReactNode }) {
  return <section className="page-section"><div className="page-shell"><SectionHeader num={num} label={label} title={title} />{children}</div></section>;
}

function SectorLink({ icon: Icon, title, href }: { icon: typeof HeartPulse; title: string; href: string }) {
  return <a href={href} className="market-feature-card group block p-7 md:p-8"><Icon className="h-[22px] w-[22px] text-orange" aria-hidden="true" /><h3 className="font-display mt-5 text-[18px] font-semibold">{title}</h3><span className="mt-6 inline-block text-[15px] font-semibold text-orange group-hover:underline">Ver sector →</span></a>;
}