import type { ComponentType, ReactNode } from "react";
import {
  BarChart3,
  Bot,
  ClipboardCheck,
  Gauge,
  GitBranch,
  Megaphone,
  MessageSquareText,
  RefreshCw,
  Target,
  UsersRound,
} from "lucide-react";
import { SiteFooter, useSiteMotion } from "@/components/SiteChrome";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SectorJourney, { type JourneyLeak } from "@/components/rckt/SectorJourney";
import SectorPains, { type SectorPain } from "@/components/rckt/SectorPains";
import SectionHeader from "@/components/rckt/SectionHeader";
import MethodCard, { type MethodField } from "@/components/rckt/MethodCard";
import { AcceptanceSteps, type AcceptanceStep } from "@/components/rckt/SystemBlocks";
import FaqSection, { type FaqItem } from "@/components/rckt/FaqSection";
import GeneralCta from "@/components/rckt/GeneralCta";

export const DIAGNOSTIC_HREF = "/sistemas/revenue-diagnostic";

export type SectorPageData = {
  label: string;
  title: ReactNode;
  descriptor?: string;
  context: string;
  ctaLabel: string;
  funnelStages: string[];
  funnelLeaks: JourneyLeak[];
  sectorImage: string;
  sectorImageAlt: string;
  doloresDetalle: SectorPain[];
  sistemaTitle: ReactNode;
  sistemaTexto: string;
  sistemaFilas: { nombre: string; detalle: string }[];
  sectorFacts: { label: string; value: string }[];
  acceptanceSteps: AcceptanceStep[];
  acceptanceNote?: string;
  primaryLink: { label: string; href: string };
  secondaryLink?: { label: string; href: string };
  /** "full" muestra método y FAQ; "short" los oculta. */
  variant?: "full" | "short";
  ctaFinalLabel?: string;
  methodFields?: MethodField[];
  faqItems?: FaqItem[];
};

const ROW_ICONS: ComponentType<{
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean | "true";
}>[] = [
  Target,
  UsersRound,
  GitBranch,
  Bot,
  BarChart3,
  MessageSquareText,
  Gauge,
  RefreshCw,
  Megaphone,
  ClipboardCheck,
];

export default function SectorPage(data: SectorPageData) {
  useSiteMotion([]);
  const isShort = data.variant === "short";
  return (
    <div className="rckt-site tcn-page">
      <main id="top">
        <SystemPageHero
          label={data.label}
          title={data.title}
          descriptor={data.descriptor}
          context={data.descriptor ? undefined : data.context}
          ctaLabel={data.ctaLabel}
          ctaHref={DIAGNOSTIC_HREF}
        />

        <section className="sector-section sector-journey-section" id="como-vende">
          <div className="container">
            <div className="sector-journey-layout">
              <div className="sector-journey-photo-wrap">
                <img
                  className="sector-journey-photo"
                  src={data.sectorImage}
                  alt={data.sectorImageAlt}
                  style={data.sectorImagePosition ? { objectPosition: data.sectorImagePosition } : undefined}
                />
              </div>
              <div>
                <SectionHeader
                  num="01."
                  label="Cómo vende hoy"
                   title="El recorrido de venta de tu sector."
                />
                <SectorJourney stages={data.funnelStages} leaks={data.funnelLeaks} />
              </div>
            </div>
          </div>
        </section>

        <section className="sector-section sector-pains-section" id="que-le-duele">
          <div className="container">
            <div className="sector-pains-layout">
              <SectionHeader
                num="02."
                label="Qué le duele"
                title={
                  <>
                     Dónde se pierden tus <em className="font-serif-accent">clientes</em>.
                  </>
                }
                 phrase="Lo que más encontramos cuando medimos este sector con números reales."
              />
              <SectorPains items={data.doloresDetalle} />
            </div>
          </div>
        </section>

        <section className="sector-section sector-work-section" id="lo-que-hacemos">
          <div className="container">
            <div className="sector-work-grid">
              <div>
                <SectionHeader num="03." label="Lo que hacemos" title={data.sistemaTitle} />
                <p className="sector-work-intro">{data.sistemaTexto}</p>
                <ul className="sector-service-list">
                  {data.sistemaFilas.map((f, idx) => {
                    const RowIcon = ROW_ICONS[idx % ROW_ICONS.length];
                    return (
                      <li key={f.nombre} className="sector-service-row">
                        <RowIcon
                          className="sector-service-icon"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                        <div>
                          <h3>{f.nombre}</h3>
                          <p>{f.detalle}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <aside className="sector-fact-wrap">
                <div className="sector-fact-card">
                  <p className="label-orange">Ficha del sector</p>
                  <dl className="sector-facts">
                    {data.sectorFacts.map((fact) => (
                      <div key={fact.label} className="sector-fact-row">
                        <dt>{fact.label}</dt>
                        <dd>{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href={data.primaryLink.href} className="btn btn-primary sector-fact-primary">
                    {data.primaryLink.label}
                  </a>
                  {data.secondaryLink ? (
                    <div className="sector-fact-secondary-wrap">
                      <a href={data.secondaryLink.href} className="sector-fact-secondary">
                        {data.secondaryLink.label}
                      </a>
                    </div>
                  ) : null}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="sector-section" id="como-empezamos">
          <div className="container">
             <SectionHeader num="04." label="Cómo empezamos" title="Así arrancamos." />
            <AcceptanceSteps items={data.acceptanceSteps} />
            {data.acceptanceNote ? (
              <p className="sector-acceptance-note">{data.acceptanceNote}</p>
            ) : null}
          </div>
        </section>

        {!isShort && data.methodFields ? (
          <section className="sector-section" id="metodo">
            <div className="container">
              <SectionHeader num="05." label="Prueba" title="El método." />
              <MethodCard fields={data.methodFields} className="sector-method-card" />
            </div>
          </section>
        ) : null}

        {!isShort && data.faqItems ? <FaqSection items={data.faqItems} /> : null}

        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}
