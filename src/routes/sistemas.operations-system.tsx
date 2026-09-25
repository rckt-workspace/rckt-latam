import { createFileRoute, useRouter } from "@tanstack/react-router";
import { CalendarCheck, LayoutGrid, Target, Users } from "lucide-react";
import { SiteFooter, SiteHeader, useSiteMotion } from "@/components/SiteChrome";
import FaqSection,{faqJsonLd,type FaqItem} from "@/components/rckt/FaqSection";
import SystemFinalCta from "@/components/rckt/SystemFinalCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
const SITE_URL="https://rckt-latam.lovable.app";
const CATALOGO=[
  {proceso:"Cotizaciones desde WhatsApp o correo",agente:"Extrae la solicitud, consulta catálogo y precios, redacta la cotización",humano:"Envío y condiciones especiales"},
  {proceso:"Clasificación y respuesta de solicitudes",agente:"Clasifica, prioriza y responde lo repetitivo",humano:"Casos fuera de patrón"},
  {proceso:"Generación y verificación de documentos",agente:"Genera desde plantillas, verifica campos y coherencia",humano:"Firma y excepciones"},
  {proceso:"Sincronización CRM ↔ ERP",agente:"Mantiene datos consistentes entre sistemas",humano:"Conflictos de datos"},
  {proceso:"Reporting comercial",agente:"Consolida fuentes y publica el reporte en la cadencia acordada",humano:"Interpretación y decisiones"},
  {proceso:"Atención post-venta de primer nivel",agente:"Resuelve consultas frecuentes y escala el resto",humano:"Reclamaciones y devoluciones"},
];
const STATS=[
  {label:"Para quién",detail:"30-250 empleados y procesos manuales de alto volumen",Icon:Users},
  {label:"Formato",detail:"Operations Sprint, 6-8 semanas, más soporte mensual",Icon:LayoutGrid},
  {label:"Compromiso mínimo",detail:"Un proceso, ocho semanas, una línea base",Icon:CalendarCheck},
  {label:"Qué mide el éxito",detail:"Costo, tiempo, excepciones y horas liberadas",Icon:Target},
];
const SPRINT=[
  {range:"Semanas 1–2",title:"Mapa del proceso",text:"Volumen, tiempo, errores y costo."},
  {range:"Semanas 3–6",title:"Construcción e integración",text:"Con pruebas de casos reales."},
  {range:"Semanas 7–8",title:"Piloto controlado",text:"Medición contra línea base y transferencia."},
  {range:"Después",title:"Soporte mensual",text:"Monitoreo, excepciones y mejora."},
];
const FAQS: FaqItem[]=[
  {question:"¿RCKT vende chatbots de inteligencia artificial como producto?",answer:"No. Elegimos un proceso que tu equipo repite muchas veces, medimos cuánto cuesta hoy, y lo dejamos funcionando solo, con una persona aprobando lo que importa."},
  {question:"¿Cuánto dura un Operations Sprint para automatizar un proceso interno?",answer:"6 a 8 semanas, más soporte mensual."},
  {question:"¿Qué tipo de procesos automatiza RCKT?",answer:"Cotizaciones desde WhatsApp o correo, clasificación de solicitudes, generación y verificación de documentos, sincronización CRM-ERP, reporting comercial y atención post-venta de primer nivel."},
  {question:"¿Qué pasa si no sé cuánto me cuesta hoy un proceso manual, igual puedo contratar un Sprint?",answer:"No. Sin línea base no hay sprint — el Revenue Diagnostic la mide primero."},
];
export const Route=createFileRoute("/sistemas/operations-system")({staticData:{sitemap:true},head:()=>({meta:[{title:"Operations System — RCKT"},{name:"description",content:"Procesos que se ejecutan solos, con supervisión: un Operations Sprint de 6-8 semanas y soporte mensual."},{property:"og:title",content:"Operations System — RCKT"},{property:"og:description",content:"Un proceso repetido cien veces por semana, funcionando solo en ocho semanas, con aprobación humana en lo que importa."},{property:"og:type",content:"website"},{property:"og:url",content:SITE_URL+"/sistemas/operations-system"},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:SITE_URL+"/sistemas/operations-system"}],scripts:FAQS.length>0?[faqJsonLd(FAQS)]:[]}),component:OperationsPage,errorComponent:OperationsError,notFoundComponent:()=> <OperationsError/>});
function OperationsPage(){useSiteMotion([]);return <div className="rckt-site tcn-page"><main id="top">
<SystemPageHero label="Operations System" title={<>Procesos que se ejecutan solos, con <em>supervisión</em>.</>} promise="Elegimos un proceso que tu equipo repite cien veces por semana, medimos cuánto cuesta hoy, y en ocho semanas lo dejamos funcionando solo, con una persona aprobando lo que importa."/>
<section className="system-composition system-stats"><div className="container system-stat-grid">{STATS.map(({label,detail,Icon})=><article className="system-stat-card" key={label}><span className="system-icon"><Icon aria-hidden="true"/></span><p className="label-orange">{label}</p><p>{detail}</p></article>)}</div></section>
<section className="system-composition system-warm" id="formato"><div className="container"><div className="system-composition__heading"><span className="label-orange">El sprint</span><h2>Un proceso, ocho semanas, una línea base.</h2><p>Operations Sprint, 6-8 semanas, más soporte mensual.</p></div><div className="operations-timeline">{SPRINT.map((item)=><article key={item.range}><span>{item.range}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><p className="operations-note">Los criterios de aceptación se firman en la semana 2, antes de construir nada.</p></div></section>
<section className="system-composition" id="catalogo"><div className="container"><div className="system-composition__heading"><span className="label-orange">Qué incluye</span><h2>Automatizamos procesos con un humano donde <em className="font-serif-accent">importa</em>.</h2><p>Un catálogo concreto de procesos que hoy consumen tiempo del equipo.</p></div><div className="operations-table" role="table" aria-label="Catálogo de procesos"><div className="operations-table__head" role="row"><span>Proceso</span><span>Qué hace el agente</span><span>Qué aprueba el humano</span></div>{CATALOGO.map((row)=><div className="operations-table__row" role="row" key={row.proceso}><strong>{row.proceso}</strong><span data-label="Agente">{row.agente}</span><span data-label="Humano">{row.humano}</span></div>)}</div><aside className="system-orange-band"><span className="label-on-orange">Qué no incluye</span><h3>No automatizamos lo que todavía no tiene dueño.</h3><p>Sin responsable, acceso y reglas claras, no hay sistema que sostener.</p><small>Procesos sin un dueño nombrado · Automatizaciones sin línea base · Decisiones irreversibles sin aprobación humana · Un chatbot aislado como solución</small></aside></div></section>
<section className="system-composition system-warm"><div className="container"><div className="system-composition__heading"><span className="label-orange">Reglas</span><h2>Sin línea base no hay <em className="font-serif-accent">sprint</em>.</h2><p>El proceso se acepta contra costo, tiempo, excepciones y horas liberadas.</p></div><ol className="system-rule-lines"><li>Medimos el costo actual antes de construir</li><li>Firmamos criterios de aceptación en la semana 2</li><li>Una persona aprueba lo que importa</li><li>Si el piloto no mejora el costo por ejecución, no seguimos</li></ol><p className="system-audience-note" id="para-quien"><strong>Para quién:</strong> Alto volumen, reglas claras y datos accesibles. 30-250 empleados, un dueño de proceso disponible y acceso a sistemas, datos y casos históricos. Habla Operaciones o Tecnología, no Mercadeo.</p></div></section>
<section className="system-composition"><div className="container"><div className="system-composition__heading"><span className="label-orange">Cómo se mide</span><h2>Costo, tiempo, excepciones y horas <em className="font-serif-accent">liberadas</em>.</h2><p>La aceptación compara el piloto contra la línea base firmada.</p></div><span className="system-deadline">Operations Sprint de 6–8 semanas</span><div className="system-step-grid system-step-grid--four">{["Línea base de costo y tiempo","Criterios de aceptación firmados en semana 2","Piloto con casos históricos y reales","Comparación contra la línea base"].map((texto,index)=><article key={texto}><span>{String(index+1).padStart(2,"0")}</span><p>{texto}</p></article>)}</div></div></section>
<FaqSection items={FAQS}/><SystemFinalCta/>
</main><SiteFooter/></div>}
function OperationsError(){const router=useRouter();return <div className="rckt-site tcn-page"><SiteHeader/><main className="band"><div className="container"><div className="form-card" role="alert"><span className="kicker">Operations System</span><h1>No pudimos mostrar esta página.</h1><p>Intenta cargarla nuevamente. Si el problema continúa, puedes volver al inicio.</p><div className="form-actions"><button className="btn btn-primary" type="button" onClick={()=>void router.invalidate()}>Intentar de nuevo</button><a className="btn" href="/">Volver al inicio</a></div></div></div></main><SiteFooter/></div>}
