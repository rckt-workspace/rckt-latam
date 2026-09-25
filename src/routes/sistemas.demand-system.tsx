import { createFileRoute, useRouter } from "@tanstack/react-router";
import { BarChart3, Calendar, CalendarCheck, Layout, Megaphone, Search, Target, Users, Wand2 } from "lucide-react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import FaqSection, { faqJsonLd, type FaqItem } from "@/components/rckt/FaqSection";
import GeneralCta from "@/components/rckt/GeneralCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";

const SITE_URL = "https://rckt-latam.lovable.app";
const INCLUYE = [
  { titulo: "Performance Media", detalle: "Meta, Google Search, PMax cuando aplique, LinkedIn selectivo para B2B, retargeting." },
  { titulo: "Creative Performance", detalle: "Testing continuo de piezas y mensajes." },
  { titulo: "Search & AI Visibility", detalle: "Presencia en buscadores y en respuestas generadas con IA." },
  { titulo: "Medición completa", detalle: "Lectura por etapa, del clic a la venta." },
];
const TIERS = [
  { titulo: "Core", detalle: "Según canales e inversión en pauta." },
  { titulo: "Growth", detalle: "Según canales e inversión en pauta." },
  { titulo: "Scale", detalle: "Según canales e inversión en pauta." },
];
const ACEPTACION = ["Tracking validado de extremo a extremo", "Estructura de campañas activa", "Primer reporte por etapa entregado"];
const STATS = [
  { label: "Para quién", detail: "Oferta probada, proceso comercial y CRM funcionando", Icon: Users },
  { label: "Cadencia", detail: "Cada semana debes poder ver el embudo completo, no solo los clics", Icon: Calendar },
  { label: "Compromiso mínimo", value: "3 meses", detail: "Core, Growth o Scale", Icon: CalendarCheck },
  { label: "Qué mide el éxito", detail: "La unidad es SQL o venta", Icon: Target },
];
const INCLUDE_ICONS = [Megaphone, Wand2, Search, BarChart3, Layout];
const FAQS: FaqItem[] = [
  { question: "¿RCKT maneja pauta en Meta y Google aunque no tenga CRM todavía?", answer: "Demand System solo se vende suelto si ya tienes proceso comercial y CRM funcionando. Si no los tienes, lo que necesitas es Revenue Engine, y te lo decimos con datos en el Diagnostic." },
  { question: "¿Por qué mi agencia me da prospectos más baratos pero igual no aumentan las ventas?", answer: "Porque el prospecto barato suele ser el que no compra. Nosotros nunca optimizamos por costo por prospecto: la unidad es SQL o venta, aunque cueste más por unidad." },
  { question: "¿Cuál es el compromiso mínimo de tiempo para contratar Demand System?", answer: "3 meses." },
  { question: "¿Qué NO incluye el manejo de pauta de RCKT?", answer: "El gasto en pauta (lo pagas tú, en tus propias cuentas), desarrollo web, CRM y RevOps, ni agentes conversacionales — eso vive en Sales Flow." },
  { question: "¿Cómo mide RCKT si la pauta está funcionando, por costo por lead o por venta?", answer: "Por costo por oportunidad aceptada por ventas (SQL) y por venta, nunca por costo por prospecto." },
  { question: "¿Qué porcentaje de prospectos deben calificar para considerar que la pauta está bien optimizada?", answer: "Al menos 45% deben calificar como MQL." },
];

export const Route = createFileRoute("/sistemas/demand-system")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Demand System — RCKT" },
      { name: "description", content: "Generación de demanda medida hasta la venta: performance media, creatividad con testing continuo, visibilidad en IA y medición por etapa." },
      { property: "og:title", content: "Demand System — RCKT" },
      { property: "og:description", content: "Nunca optimizamos por costo por lead; la unidad es SQL o venta." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/sistemas/demand-system" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/sistemas/demand-system" }],
    scripts: FAQS.length > 0 ? [faqJsonLd(FAQS)] : [],
  }), component: DemandPage, errorComponent: DemandError, notFoundComponent: () => <DemandError />,
});

function DemandPage() {
  useSiteMotion([]);
  return <div className="rckt-site tcn-page"><main id="top">
    <SystemPageHero label="Demand System" title={<>Generación de demanda medida hasta la <em>venta</em>.</>} context="Manejamos tu pauta, pero no la optimizamos por leads baratos: la optimizamos por las oportunidades que tu equipo comercial acepta y por las que terminan en venta." />
    <section className="system-orange-statement"><div className="container"><span className="label-on-orange">El problema</span><p>Los leads baratos pueden salir muy caros. Cada semana debes poder ver el embudo completo, no solo los clics.</p></div></section>
    <section className="system-composition system-stats"><div className="container system-stat-grid">{STATS.map(({label,value,detail,Icon})=><article className="system-stat-card" key={label}><span className="system-icon"><Icon aria-hidden="true"/></span><p className="label-orange">{label}</p>{value?<strong>{value}</strong>:null}<p>{detail}</p></article>)}</div></section>
    <section className="system-composition system-warm" id="que-incluye"><div className="container"><div className="system-composition__heading"><span className="label-orange">Qué incluye</span><h2>Demanda medida hasta la <em className="font-serif-accent">venta</em>.</h2><p>Medios, creatividad, visibilidad y medición por etapa.</p></div><div className="system-feature-grid system-feature-grid--four">{INCLUYE.map((item,index)=>{const Icon=INCLUDE_ICONS[index];return <article className="system-feature-card" key={item.titulo}>{Icon?<span className="system-icon"><Icon aria-hidden="true"/></span>:null}<h3>{item.titulo}</h3><p>{item.detalle}</p></article>})}</div></div></section>
    <section className="system-composition" id="tiers"><div className="container"><div className="system-composition__heading"><span className="label-orange">Niveles</span><h2>La intensidad cambia; la regla no.</h2><p>Core, Growth y Scale se definen según canales e inversión en pauta.</p></div><div className="system-tier-grid">{TIERS.map((item,index)=><article className={index===1?"system-tier system-tier--featured":"system-tier"} key={item.titulo}><span>{String(index+1).padStart(2,"0")}</span><h3>{item.titulo}</h3><p>{item.detalle}</p></article>)}</div><aside className="system-orange-band" id="no-incluye"><span className="label-on-orange">Qué no incluye</span><h3>La pauta no arregla lo que pasa después.</h3><p>Estos elementos pertenecen a otros sistemas o los paga directamente tu empresa.</p><small>El gasto en pauta · Desarrollo web · CRM y RevOps · Agentes conversacionales</small></aside></div></section>
    <section className="system-composition system-warm" id="condicion"><div className="container"><div className="system-composition__heading"><span className="label-orange">Reglas</span><h2>Nunca optimizamos por costo por <em className="font-serif-accent">lead</em>.</h2><p>La unidad es SQL o venta.</p></div><ol className="system-rule-lines"><li>Nunca optimizamos por costo por lead; la unidad es SQL o venta.</li><li>Cuentas con oferta probada</li><li>Proceso comercial funcionando</li><li>CRM funcionando</li><li>Si no los tienes, la recomendación es Revenue Engine</li></ol><p className="system-audience-note" id="para-quien"><strong>Para quién:</strong> Oferta probada, proceso comercial y CRM funcionando. Si esa base no existe, la recomendación es Revenue Engine.</p></div></section>
    <section className="system-composition"><div className="container"><div className="system-composition__heading"><span className="label-orange">Cómo empieza</span><h2>Primero conectamos la medición de extremo a <em className="font-serif-accent">extremo</em>.</h2><p>El sistema se acepta cuando ya puede leerse por etapa.</p></div><span className="system-deadline">Sistema aceptado en máximo 21 días</span><div className="system-step-grid">{ACEPTACION.map((texto,index)=><article key={texto}><span>{String(index+1).padStart(2,"0")}</span><p>{texto}</p></article>)}</div></div></section>
    <FaqSection items={FAQS} /><GeneralCta />
  </main><SiteFooter /></div>;
}

function DemandError() { const router = useRouter(); return <div className="rckt-site tcn-page"><SiteHeader /><main className="band"><div className="container"><div className="form-card" role="alert"><span className="kicker">Demand System</span><h1>No pudimos mostrar esta página.</h1><p>Intenta cargarla nuevamente. Si el problema continúa, puedes volver al inicio.</p><div className="form-actions"><button className="btn btn-primary" type="button" onClick={() => void router.invalidate()}>Intentar de nuevo</button><a className="btn" href="/">Volver al inicio</a></div></div></div></main><SiteFooter /></div>; }
