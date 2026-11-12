import { Image as ImageIcon, LineChart, Megaphone, MessageCircle, Search, Sparkles, Tag, TrendingUp, Workflow } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import SiteFooter from "@/components/rckt/SiteFooter";
import FaqSection, { faqJsonLd, type FaqItem } from "@/components/rckt/FaqSection";
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
const SIGNAL_ICONS = [ImageIcon, Tag, MessageCircle, TrendingUp];
const FEATURE_ICONS = [Megaphone, Sparkles, Search, LineChart, Workflow];
export const Route = createFileRoute("/soluciones/ecommerce-rentable")({ staticData: { sitemap: true }, head: () => ({ meta: [
  { title: "Ecommerce rentable — Crecer con margen | RCKT" }, { name: "description", content: "Pauta, creatividad y medición por margen de contribución tras adquisición, no solo por ROAS de plataforma." },
  { property: "og:title", content: "Ecommerce rentable — Crecer con margen" }, { property: "og:description", content: "El ROAS sube en la plataforma, el margen no sube en el banco. Así se corrige." },
  { property: "og:type", content: "website" }, { property: "og:url", content: SITE_URL + "/soluciones/ecommerce-rentable" }, { name: "twitter:card", content: "summary_large_image" },
], links: [{ rel: "canonical", href: SITE_URL + "/soluciones/ecommerce-rentable" }], scripts: [faqJsonLd(es.soluciones.ecommerce.faqs)] }), component: EcommercePage });
function EcommercePage() {
  const { t } = useLanguage(); const c = t.soluciones.ecommerce; const k = t.soluciones.common;
  const signals = c.signals.map((s, i) => ({ ...s, Icono: SIGNAL_ICONS[i] }));
  const features = c.features.map((f, i) => ({ ...f, Icon: FEATURE_ICONS[i] }));
  const methodFields: MethodField[] = c.method;
  const faqs: FaqItem[] = c.faqs;
  return <div className="rckt-site bg-background text-foreground antialiased"><SiteNav /><main>
  <SystemPageHero label={c.label} title={<>{c.titleBefore}<span className="hero-hand">{c.hand}</span></>} descriptor={c.descriptor} context={c.context} ctaLabel={t.shared.reviewCta} />
  <SystemSection id="te-pasa-esto" num="01." label={k.signalsLabel} title={k.signalsTitle}><SignalCards items={signals} /></SystemSection>
  <SystemSection id="lo-que-hacemos" num="02." label={k.whatLabel} title={<>{k.whatTitle}<span className="text-orange">Demand System.</span></>}><SolutionSystemPanel features={features} system="Demand System" summary={c.summary} href="/sistemas/demand-system" eyebrow={t.shared.systemEyebrow} linkLabel={`${t.shared.seePrefix} Demand System →`}><p className="solution-system-card__meta">{c.meta}</p></SolutionSystemPanel></SystemSection>
  <SystemSection id="noventa-dias" num="03." label={k.ninetyLabel} title={k.ninetyTitle}><MilestoneCards items={c.milestones} kicker={c.milestoneKicker} /></SystemSection>
  <SystemSection id="metodo" num="04." label={k.proofLabel} title={k.methodTitle}><MethodCard fields={methodFields} /></SystemSection>
  <SystemSection id="para-quien-no-es" num="05." label={k.notForLabel} title={k.notForTitle}><div className="solution-honesty"><p>{c.honesty}</p></div></SystemSection>
  <FaqSection items={faqs} title={t.shared.faqTitle} label={t.shared.faqLabel} /><GeneralCta />
</main><SiteFooter /></div>; }
