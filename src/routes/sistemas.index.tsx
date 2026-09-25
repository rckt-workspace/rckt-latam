import { createFileRoute,Link,useRouter } from "@tanstack/react-router";
import { Bot, Database, Megaphone, MessageCircle, UserRound, Workflow } from "lucide-react";
import {SiteFooter,SiteHeader,useSiteMotion} from "@/components/SiteChrome";
import {SystemCards,type SystemCardData} from "@/components/rckt/SystemCards";
import SystemFinalCta from "@/components/rckt/SystemFinalCta";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import SystemSection from "@/components/rckt/SystemSection";
import {useInView} from "@/hooks/use-in-view";
const SITE_URL="https://rckt-latam.lovable.app";
const SYSTEMS:SystemCardData[]=[{badge:"S1",kicker:"Sistema 01",title:"Generación de demanda medida hasta la venta",shortName:"Demand System",desc:"Performance Media · Creative Performance · Search & AI Visibility · medición del clic al cierre.",href:"/sistemas/demand-system",art:"demand"},{badge:"S2",kicker:"Sistema 02",title:"De lead a venta sin fugas",shortName:"Sales Flow",desc:"Pauta, WhatsApp y CRM conectados, con respuesta, seguimiento y dueño para cada prospecto.",href:"/sistemas/sales-flow",art:"sales"},{badge:"S3",kicker:"Sistema 03",title:"Procesos que se ejecutan solos, con supervisión",shortName:"Operations System",desc:"Automatización de procesos repetitivos, medidos contra una línea base y con aprobación humana.",href:"/sistemas/operations-system",art:"operations"}];
const DIAGRAM_BOXES=[{title:"Demand System",href:"/sistemas/demand-system" as const,Icon:Megaphone},{title:"Sales Flow",href:"/sistemas/sales-flow" as const,Icon:MessageCircle},{title:"Operations System",href:"/sistemas/operations-system" as const,Icon:Workflow}];
const BASE_COMUN=[{label:"Fuente de verdad",Icon:Database},{label:"IA supervisada",Icon:Bot},{label:"Responsable de cuenta",Icon:UserRound}];

function Arquitectura(){const {ref,inView}=useInView<HTMLDivElement>({fallbackMs:1200});return <SystemSection id="ecuacion" num="01." label="Arquitectura" title={<>Cinco puertas, una sola cadena de <em className="font-serif-accent">ingresos</em>.</>} phrase="Los sistemas se combinan cuando la operación está lista."><div ref={ref} data-in={inView?"true":"false"} data-ready="true" className="arch">
  <div className="arch-layer arch-problem"><span>Tu problema</span></div>
  <span className="arch-line arch-line--long" aria-hidden="true"/>
  <div className="arch-layer arch-diagnostic"><p>Revenue Diagnostic</p><small>Toda cuenta empieza aquí</small></div>
  <div className="arch-layer" aria-hidden="true"><span className="arch-line arch-line--branch"/><div className="arch-branches">{[0,1,2].map(i=><div key={i}><span/></div>)}</div><span className="arch-line arch-line--mobile"/></div>
  <div className="arch-layer arch-systems">{DIAGRAM_BOXES.map(({title,href,Icon})=><Link key={title} to={href} className="arch-box"><Icon aria-hidden="true" strokeWidth={1.5}/><span>{title}</span></Link>)}</div>
  <div className="arch-layer arch-groups"><div className="arch-first-group"><div className="arch-bracket" aria-hidden="true"/></div><div className="arch-group-label arch-group-label--solid">Revenue Engine · Demand + Sales Flow</div><div className="arch-bracket arch-bracket--dashed" aria-hidden="true"/><div className="arch-group-label arch-group-label--outline">Growth OS · los tres sistemas</div></div>
  <div className="arch-layer arch-foundation"><p>La base común</p><div className="arch-base">{BASE_COMUN.map(({label,Icon})=><div key={label}><Icon aria-hidden="true" strokeWidth={1.5}/><span>{label}</span></div>)}</div></div>
</div></SystemSection>}

function Combos(){return <section className="system-combos"><div className="container"><div className="system-combos__kicker"><span/>Los dos combos</div><div className="system-combos__grid">
  <article className="combo-card combo-card--primary"><span className="combo-card__badge">Producto principal</span><h3>Revenue Engine</h3><div className="combo-card__systems"><span>Demand System</span><b aria-hidden="true">+</b><span>Sales Flow</span></div><p>Demand + Sales Flow, combinados, son nuestro producto principal.</p><Link to="/sistemas/revenue-engine" className="combo-card__button">Ver Revenue Engine →</Link></article>
  <article className="combo-card combo-card-light"><span className="combo-card__badge combo-card__badge--outline">Etapa posterior</span><h3>Growth OS</h3><p>El bundle superior, solo para cuentas maduras. No se ofrece de entrada — se llega a él.</p><a href="/sistemas/revenue-engine#escalera" className="combo-card__link">Ver cómo crece una cuenta →</a></article>
</div></div></section>}
export const Route=createFileRoute("/sistemas/")({staticData:{sitemap:true},head:()=>({meta:[{title:"Sistemas — RCKT"},{name:"description",content:"Tres sistemas, no más: Demand System, Sales Flow y Operations System. Combinados son Revenue Engine y Growth OS."},{property:"og:title",content:"Sistemas — RCKT"},{property:"og:description",content:"Si algo no cabe en uno de los tres, no lo vendemos."},{property:"og:type",content:"website"},{property:"og:url",content:SITE_URL+"/sistemas"},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:SITE_URL+"/sistemas"}]}),component:SistemasPage,errorComponent:SistemasError,notFoundComponent:()=> <SistemasError/>});
function SistemasPage(){useSiteMotion([]);return <div className="rckt-site tcn-page"><main id="top">
<SystemPageHero label="Sistemas" title={<>Del clic al cierre, en tres <em>sistemas</em>.</>} promise="Si algo no cabe en uno de los tres, no lo vendemos."/>
<Arquitectura/>
<SystemSection id="sistemas" num="02." label="Los tres sistemas" title="Elige por la fuga, no por el nombre." phrase="Demand, Sales Flow y Operations cubren la cadena completa."><SystemCards systems={SYSTEMS}/></SystemSection>
<Combos/>
<SystemFinalCta title={<>Toda cuenta empieza por el <em className="font-serif-accent">diagnóstico</em>.</>}/>
</main><SiteFooter/></div>}
function SistemasError(){const router=useRouter();return <div className="rckt-site tcn-page"><SiteHeader/><main className="band"><div className="container"><div className="form-card" role="alert"><span className="kicker">Sistemas</span><h1>No pudimos mostrar esta página.</h1><p>Intenta cargarla nuevamente. Si el problema continúa, puedes volver al inicio.</p><div className="form-actions"><button className="btn btn-primary" type="button" onClick={()=>void router.invalidate()}>Intentar de nuevo</button><a className="btn" href="/">Volver al inicio</a></div></div></div></main><SiteFooter/></div>}
