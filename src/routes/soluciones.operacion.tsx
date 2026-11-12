import { AlertCircle, Copy, FileCheck2, FileClock, Inbox, LifeBuoy, MessageSquareQuote, RefreshCw, Table2 } from "lucide-react";
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
const SIGNAL_ICONS = [FileClock, Copy, Table2, AlertCircle];
const FEATURE_ICONS = [MessageSquareQuote, Inbox, FileCheck2, RefreshCw, Table2, LifeBuoy];
export const Route = createFileRoute("/soluciones/operacion")({ staticData: { sitemap: true }, head: () => ({ meta: [
  { title: "Operación — Automatización supervisada | RCKT" }, { name: "description", content: "Operations System automatiza un proceso repetitivo a la vez, con aprobación humana en lo que importa." },
  { property: "og:title", content: "Operación — Un proceso a la vez" }, { property: "og:description", content: "Cotizaciones, documentos y sincronización de sistemas con supervisión humana." },
  { property: "og:type", content: "website" }, { property: "og:url", content: SITE_URL + "/soluciones/operacion" }, { name: "twitter:card", content: "summary_large_image" },
], links: [{ rel: "canonical", href: SITE_URL + "/soluciones/operacion" }], scripts: [faqJsonLd(es.soluciones.operacion.faqs)] }), component: OperacionPage });
function OperacionPage() {
  const { t } = useLanguage(); const c = t.soluciones.operacion; const k = t.soluciones.common;
  const signals = c.signals.map((s, i) => ({ ...s, Icono: SIGNAL_ICONS[i] }));
  const features = c.features.map((f, i) => ({ ...f, Icon: FEATURE_ICONS[i] }));
  const methodFields: MethodField[] = c.method;
  const faqs: FaqItem[] = c.faqs;
  return <div className="rckt-site bg-background text-foreground antialiased"><SiteNav /><main>
  <SystemPageHero label={c.label} title={<>{c.titleBefore}<span className="hero-hand">{c.hand}</span></>} descriptor={c.descriptor} context={c.context} ctaLabel={t.shared.reviewCta} />
  <SystemSection id="te-pasa-esto" num="01." label={k.signalsLabel} title={k.signalsTitle}><SignalCards items={signals} /></SystemSection>
  <SystemSection id="lo-que-hacemos" num="02." label={k.whatLabel} title={<>{k.whatTitle}<span className="text-orange">Operations System.</span></>}><SolutionSystemPanel features={features} system="Operations System" summary={c.summary} href="/sistemas/operations-system" eyebrow={t.shared.systemEyebrow} linkLabel={`${t.shared.seePrefix} Operations System →`} /></SystemSection>
  <SystemSection id="noventa-dias" num="03." label={c.sprintLabel} title={k.ninetyTitle}><MilestoneCards items={c.milestones} kicker={t.shared.dayKicker} /></SystemSection>
  <SystemSection id="metodo" num="04." label={k.proofLabel} title={k.methodTitle}><MethodCard fields={methodFields} /></SystemSection>
  <SystemSection id="para-quien-no-es" num="05." label={k.notForLabel} title={k.notForTitle}><div className="solution-honesty"><p>{c.honesty}</p></div></SystemSection>
  <FaqSection items={faqs} title={t.shared.faqTitle} label={t.shared.faqLabel} /><GeneralCta />
</main><SiteFooter /></div>; }
