import { BarChart3, CalendarX, Clock, Gauge, Layout, LineChart, Megaphone, MessageCircle, RefreshCw, Search, Users, Workflow } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import SiteFooter from "@/components/rckt/SiteFooter";
import FaqSection, { faqJsonLd, type FaqItem } from "@/components/rckt/FaqSection";
import FunnelBars from "@/components/rckt/FunnelBars";
import MethodCard, { type MethodField } from "@/components/rckt/MethodCard";
import MilestoneCards from "@/components/rckt/MilestoneCards";
import SignalCards from "@/components/rckt/SignalCards";
import SolutionSystemPanel from "@/components/rckt/SolutionSystemPanel";
import GeneralCta from "@/components/rckt/GeneralCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";
import SiteNav from "@/components/rckt/SiteNav";

import { useLanguage } from "@/i18n/LanguageProvider";
import { es } from "@/i18n/es";
const SITE_URL = "https://rckt.lat";
const SIGNAL_ICONS = [Clock, MessageCircle, BarChart3, CalendarX, Search];
const FEATURE_ICONS = [Megaphone, Workflow, Layout, Gauge, LineChart, Users, RefreshCw, BarChart3];
export const Route = createFileRoute("/soluciones/captacion-y-cierre")({ staticData: { sitemap: true }, head: () => ({ meta: [
  { title: "Captación y cierre — Pagas por leads y no sabes cuáles compran | RCKT" },
  { name: "description", content: "Campañas, WhatsApp y CRM bajo un solo responsable, con medición del clic al cierre para saber qué leads compran." },
  { property: "og:title", content: "Captación y cierre — Saber qué leads compran" },
  { property: "og:description", content: "Dónde se pierde el dinero entre la inversión y la venta, y cómo se cierra cada fuga." },
  { property: "og:type", content: "website" }, { property: "og:url", content: SITE_URL + "/soluciones/captacion-y-cierre" }, { name: "twitter:card", content: "summary_large_image" },
], links: [{ rel: "canonical", href: SITE_URL + "/soluciones/captacion-y-cierre" }], scripts: [faqJsonLd(es.soluciones.captacion.faqs)] }), component: CaptacionPage });
function CaptacionPage() {
  const { t } = useLanguage(); const c = t.soluciones.captacion; const k = t.soluciones.common;
  const signals = c.signals.map((s, i) => ({ ...s, Icono: SIGNAL_ICONS[i] }));
  const features = c.features.map((f, i) => ({ ...f, Icon: FEATURE_ICONS[i] }));
  const methodFields: MethodField[] = c.method;
  const faqs: FaqItem[] = c.faqs;
  const leaks = c.leaks.map((label, i) => ({ stage: c.stages[i + 1], label }));
  return <div className="rckt-site bg-background text-foreground antialiased"><SiteNav /><main>
  <SystemPageHero label={c.label} title={<>{c.titleBefore}<span className="hero-hand">{c.hand}</span></>} descriptor={c.descriptor} context={c.context} ctaLabel={t.shared.reviewCta} />
  <SystemSection id="te-pasa-esto" num="01." label={k.signalsLabel} title={k.signalsTitle}><SignalCards items={signals} /></SystemSection>
  <SystemSection id="fugas" num="02." label={c.funnelLabel} title={c.funnelTitle}><FunnelBars stages={c.stages} leaks={leaks} /></SystemSection>
  <SystemSection id="lo-que-hacemos" num="03." label={k.whatLabel} title={<>{k.whatTitle}<span className="text-orange">Revenue Engine.</span></>}><SolutionSystemPanel features={features} system="Revenue Engine" summary={c.summary} href="/sistemas/revenue-engine" eyebrow={t.shared.systemEyebrow} linkLabel={`${t.shared.seePrefix} Revenue Engine →`}><p className="solution-system-card__meta">{c.meta}</p></SolutionSystemPanel></SystemSection>
  <SystemSection id="noventa-dias" num="04." label={k.ninetyLabel} title={k.ninetyTitle}><MilestoneCards items={c.milestones} kicker={t.shared.dayKicker} /></SystemSection>
  <SystemSection id="metodo" num="05." label={k.proofLabel} title={k.methodTitle}><MethodCard fields={methodFields} /></SystemSection>
  <SystemSection id="para-quien-no-es" num="06." label={k.notForLabel} title={k.notForTitle}><div className="solution-honesty"><p>{c.honesty}</p></div></SystemSection>
  <FaqSection items={faqs} title={t.shared.faqTitle} label={t.shared.faqLabel} /><GeneralCta />
</main><SiteFooter /></div>; }
