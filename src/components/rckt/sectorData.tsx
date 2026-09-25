import type { SectorPageData } from "@/components/rckt/SectorPage";
import salud from "@/assets/sector-salud.jpg";
import educacion from "@/assets/sector-educacion.jpg";
import construccion from "@/assets/sector-construccion.jpg";
import b2b from "@/assets/sector-b2b.jpg";
import ecommerce from "@/assets/sector-ecommerce.jpg";
import industria from "@/assets/sector-industria.jpg";

const CTA = "Revisar mi proceso comercial →";
const PASOS_RE = [
  {
    hito: "1",
    label: "Revenue Diagnostic",
    texto: "2 a 3 semanas para medir dónde se pierde el dinero y fijar la línea base",
  },
  {
    hito: "2",
    label: "Puesta en marcha",
    texto: "Sistema operativo con fuente de verdad el día 30",
  },
  { hito: "3", label: "Revisión", texto: "Línea base frente a resultado el día 90" },
];
const MEDICION_INV =
  "La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros.";
const PERIODO =
  "Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90.";

export const SALUD_FAQS = [
  { question: "¿Funciona si atendemos a los pacientes por WhatsApp?", answer: "Sí. Sales Flow conecta tus campañas, WhatsApp Business API y tu CRM para que cada paciente tenga respuesta, seguimiento y dueño." },
  { question: "¿Cómo reducen las inasistencias?", answer: "Con recordatorios de cita y secuencias de seguimiento y recuperación dentro de Sales Flow." },
  { question: "¿Cómo sé qué campaña me trae pacientes?", answer: "Cada paciente entra al CRM con su origen, y las etapas vuelven a Meta y Google como conversiones offline." },
  { question: "¿Un agente de IA responde a mis pacientes?", answer: "Puede hacer la primera respuesta, la calificación, la agenda y las preguntas frecuentes, siempre con aprobación humana en las decisiones de venta." },
  { question: "¿Qué indicadores miden?", answer: "Costo por paciente que compra y porcentaje de citas realizadas." },
];

export const EDUCACION_FAQS = [
  { question: "¿Funciona si atendemos a los interesados por WhatsApp?", answer: "Sí. Sales Flow conecta tus campañas, WhatsApp Business API y tu CRM para que cada lead tenga respuesta, seguimiento y dueño." },
  { question: "¿Cómo manejan los picos de temporada de matrículas?", answer: "Con secuencias de seguimiento por temporada dentro de Sales Flow, para que ninguna solicitud se quede sin respuesta en los picos." },
  { question: "¿Qué indicadores se miden?", answer: "Costo por matrícula y la tasa de lead a matrícula." },
  { question: "¿Un agente de IA responde a los interesados?", answer: "Puede hacer la primera respuesta, la calificación, la agenda y las preguntas frecuentes, siempre con aprobación humana en las decisiones de venta." },
  { question: "¿Cuál es el compromiso mínimo?", answer: "6 meses de Revenue Engine, porque el sistema necesita un ciclo completo para demostrar." },
];

export const SECTORS: Record<string, SectorPageData> = {
  salud: {
    variant: "full",
    label: "Salud, estética y odontología",
    title: (
      <>
        Revenue Systems para <span className="text-orange">clínicas y centros de <span className="hero-hand">estética.</span></span>
      </>
    ),
    context: "Clínicas y centros donde la venta pasa por WhatsApp, una asesora y una cita. El dinero se pierde entre la respuesta, la agenda y la inasistencia, y lo medimos por paciente que compra.",
    ctaLabel: CTA,
    sectorImage: salud,
    sectorImageAlt: "Especialista atendiendo a una paciente en una clínica",
    funnelStages: ["Meta/Google", "WhatsApp", "Asesora", "Cita", "Venta"],
    funnelLeaks: [
      { afterStage: 2, label: "Respuesta lenta" },
      { afterStage: 3, label: "Seguimiento inconsistente" },
      { afterStage: 4, label: "Inasistencia" },
      { afterStage: 5, label: "Sin saber qué campaña trajo al paciente" },
    ],
    doloresDetalle: [
      {
        titulo: "Seguimiento inconsistente",
        descripcion: "Seguimiento inconsistente entre asesoras.",
        resuelve: "Secuencias de seguimiento",
      },
      {
        titulo: "Inasistencia",
        descripcion: "Inasistencia alta, sin recordatorio ni reprogramación.",
        resuelve: "Recordatorios y reprogramación",
      },
      {
        titulo: "Sin atribución",
        descripcion: "No saber qué campaña trajo al paciente que sí compró.",
        resuelve: "Atribución de vuelta a Meta y Google",
      },
      {
        titulo: "Respuesta lenta",
        descripcion: "La paciente escribe por WhatsApp y la respuesta llega cuando ya agendó cita en otra clínica.",
        resuelve: "Respuesta supervisada por WhatsApp",
      },
    ],
    sistemaTitle: (
      <>
        Lo que hacemos: <em className="font-serif-accent">Revenue Engine.</em>
      </>
    ),
    sistemaTexto:
      "Sistema recomendado: Revenue Engine, con Sales Flow como componente que más pesa (respuesta, agenda y gestión de inasistencia).",
    sistemaFilas: [
      {
        nombre: "Campañas conectadas",
        detalle: "Cada paciente vinculado a la campaña que lo trajo",
      },
      {
        nombre: "Respuesta por WhatsApp",
        detalle: "Atención rápida y trazable desde el primer contacto",
      },
      {
        nombre: "Agenda y recordatorios",
        detalle: "Confirmación de citas y seguimiento antes de la visita",
      },
      {
        nombre: "Gestión de inasistencia",
        detalle: "Reprogramación de citas perdidas sin perder contexto",
      },
      {
        nombre: "Medición hasta la compra",
        detalle: "Costo por paciente que compra, no solo por prospecto",
      },
    ],
    sectorFacts: [
      { label: "Sistema recomendado", value: "Revenue Engine" },
      { label: "Componente que más pesa", value: "Sales Flow: respuesta, agenda e inasistencia" },
      {
        label: "Indicador principal",
        value: "Costo por paciente que compra y porcentaje de citas realizadas",
      },
    ],
    acceptanceSteps: PASOS_RE,
    primaryLink: { label: "Ver Revenue Engine →", href: "/sistemas/revenue-engine" },
    secondaryLink: { label: "Ver Sales Flow →", href: "/sistemas/sales-flow" },
    methodFields: [
      {
        k: "Situación inicial",
        v: "Seguimiento inconsistente, respuesta lenta, inasistencia y falta de atribución entre la campaña y el paciente que compra.",
      },
      { k: "Período", v: PERIODO },
      {
        k: "Alcance",
        v: "Revenue Engine, con Sales Flow como el componente que más pesa: respuesta, agenda y gestión de inasistencia.",
      },
      { k: "Inversión", v: MEDICION_INV },
      {
        k: "Intervención",
        v: "Campañas, WhatsApp y CRM conectados; recordatorios de cita y recuperación de inasistencia; cada paciente conectado a la campaña que lo trajo.",
      },
      {
        k: "Resultado",
        v: "Costo por paciente que compra y porcentaje de citas realizadas, frente a la línea base.",
      },
      {
        k: "Método de medición",
        v: "Una sola fuente de verdad: pauta → prospecto → contacto → cita → asistencia → venta, con definiciones que firmas tú.",
      },
      {
        k: "Limitaciones",
        v: "No garantizamos ventas ni asistencia, porque no controlamos la decisión del paciente ni la disponibilidad de agenda. Garantizamos visibilidad del recorrido y medición contra una línea base acordada.",
      },
    ],
    faqItems: SALUD_FAQS,
  },
  educacion: {
    variant: "full",
    label: "Educación privada",
    title: (
      <>
        Revenue Systems para <span className="text-orange">colegios, universidades e <span className="hero-hand">institutos.</span></span>
      </>
    ),
    context: "Colegios, universidades, institutos y educación continua con picos de demanda en temporada de matrículas. Calificamos ese volumen y lo seguimos hasta la matrícula.",
    ctaLabel: CTA,
    sectorImage: educacion,
    sectorImageAlt: "Asesor conversando con un estudiante en una biblioteca",
    funnelStages: [
      "Google/Meta",
      "Prospecto",
      "WhatsApp o llamada",
      "Asesor de admisiones",
      "Matrícula",
    ],
    funnelLeaks: [
      { afterStage: 2, label: "Volumen sin calificación" },
      { afterStage: 4, label: "Picos de temporada" },
      { afterStage: 5, label: "Sin medición hasta la matrícula" },
    ],
    doloresDetalle: [
      {
        titulo: "Volumen sin calificación",
        descripcion: "Volumen alto de leads sin calificación real.",
        resuelve: "Respuesta y calificación",
      },
      {
        titulo: "Picos de temporada",
        descripcion: "Picos de temporada que saturan al equipo de admisiones.",
        resuelve: "Secuencias por temporada",
      },
      {
        titulo: "Seguimiento perdido",
        descripcion: "Seguimiento que se pierde entre el primer contacto y la matrícula.",
        resuelve: "CRM de admisiones",
      },
      {
        titulo: "Campañas sin matrícula",
        descripcion: "Dificultad para medir qué campaña trae familias que sí matriculan.",
        resuelve: "Medición hasta la matrícula",
      },
    ],
    sistemaTitle: (
      <>
        Lo que hacemos: <em className="font-serif-accent">Revenue Engine.</em>
      </>
    ),
    sistemaTexto:
      "Sistema recomendado: Revenue Engine, con Sales Flow ajustado a secuencias por temporada.",
    sistemaFilas: [
      {
        nombre: "Respuesta y calificación",
        detalle: "Cada solicitud respondida y calificada, también en los picos",
      },
      {
        nombre: "Secuencias por temporada",
        detalle: "Seguimiento pensado para cada campaña de matrícula",
      },
      {
        nombre: "CRM de admisiones",
        detalle: "Pipeline, etapas y tableros del proceso de admisión",
      },
      {
        nombre: "Medición hasta la matrícula",
        detalle: "Conversión de prospecto a matrícula frente a la línea base",
      },
    ],
    sectorFacts: [
      { label: "Sistema recomendado", value: "Revenue Engine" },
      { label: "Componente que más pesa", value: "Sales Flow con secuencias por temporada" },
      {
        label: "Indicador principal",
        value: "Costo por matrícula y conversión de lead a matrícula",
      },
    ],
    acceptanceSteps: PASOS_RE,
    primaryLink: { label: "Ver Revenue Engine →", href: "/sistemas/revenue-engine" },
    secondaryLink: { label: "Ver Sales Flow →", href: "/sistemas/sales-flow" },
    methodFields: [
      {
        k: "Situación inicial",
        v: "Volumen sin calificación, picos por temporada de matrículas y sin medición hasta la matrícula.",
      },
      { k: "Período", v: PERIODO },
      {
        k: "Alcance",
        v: "Revenue Engine, con Sales Flow y secuencias por temporada como el componente que más pesa.",
      },
      { k: "Inversión", v: MEDICION_INV },
      {
        k: "Intervención",
        v: "Respuesta y calificación de cada solicitud por WhatsApp o llamada, secuencias por temporada y cada matrícula conectada a la campaña que la trajo.",
      },
      {
        k: "Resultado",
        v: "Costo por matrícula y tasa de lead a matrícula, frente a la línea base.",
      },
      {
        k: "Método de medición",
        v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú.",
      },
      {
        k: "Limitaciones",
        v: "No garantizamos matrículas, porque no controlamos tu oferta académica, tus precios ni tu proceso de admisión. Garantizamos que en 30 días verás tu embudo completo con datos reales.",
      },
    ],
    faqItems: EDUCACION_FAQS,
  },
  construccion: {
    variant: "short",
    label: "Construcción e inmobiliario",
    title: (
      <>
        Revenue Systems para <span className="text-orange">constructoras e <span className="hero-hand">inmobiliarias.</span></span>
      </>
    ),
    context: "Constructoras e inmobiliarias con varios asesores, ciclos largos y cotizaciones hechas a mano. Ordenamos la captación y automatizamos lo repetitivo, medido por visita realizada.",
    ctaLabel: CTA,
    sectorImage: construccion,
    sectorImageAlt: "Dos personas revisando un proyecto en obra",
    funnelStages: ["Anuncios", "Landing", "Asesor", "Visita", "Cotización", "Cierre"],
    funnelLeaks: [
      { afterStage: 2, label: "Leads de baja calidad" },
      { afterStage: 3, label: "Varios asesores, el mismo contacto" },
      { afterStage: 5, label: "Cotizaciones manuales" },
      { afterStage: 6, label: "Ciclos largos" },
    ],
    doloresDetalle: [
      {
        titulo: "Leads de baja calidad",
        descripcion: "Muchos contactos sin presupuesto ni intención real de compra.",
        resuelve: "Lead scoring",
      },
      {
        titulo: "Varios asesores compitiendo por el mismo contacto",
        descripcion: "El mismo prospecto recibe llamadas de dos asesores y ninguno es su dueño.",
        resuelve: "Asignación multi-asesor",
      },
      {
        titulo: "Ciclos largos",
        descripcion: "Ciclos de venta largos sin seguimiento estructurado.",
        resuelve: "CRM para ciclos largos",
      },
      {
        titulo: "Cotizaciones hechas a mano",
        descripcion: "Cada cotización tarda días y depende de una sola persona.",
        resuelve: "Cotizaciones automáticas con aprobación humana",
      },
    ],
    sistemaTitle: (
      <>
        Lo que hacemos: <em className="font-serif-accent">Revenue Engine + Operations.</em>
      </>
    ),
    sistemaTexto:
      "Scoring y asignación multi-asesor, y cotizaciones automatizadas.",
    sistemaFilas: [
      {
        nombre: "Lead scoring",
        detalle: "Cada contacto calificado antes de llegar a un asesor",
      },
      { nombre: "Asignación multi-asesor", detalle: "Cada lead con un solo dueño, sin asesores compitiendo por él" },
      {
        nombre: "CRM para ciclos largos",
        detalle: "Seguimiento de cada oportunidad hasta la visita y el cierre",
      },
      {
        nombre: "Cotizaciones automatizadas",
        detalle: "El agente las redacta; una persona las aprueba antes de enviarlas",
      },
      { nombre: "Medición por visita", detalle: "Costo por visita realizada, no por lead" },
    ],
    sectorFacts: [
      { label: "Sistema recomendado", value: "Revenue Engine + Operations System" },
      {
        label: "Componente que más pesa",
        value: "Scoring, routing multi-asesor y cotizaciones automáticas",
      },
      { label: "Indicador principal", value: "Costo por visita realizada; ciclo de cierre" },
      {
        label: "Flujo actual",
        value: "Anuncios → Landing → Asesor → Visita → Cotización → Cierre",
      },
    ],
    acceptanceSteps: PASOS_RE,
    primaryLink: { label: "Ver Revenue Engine →", href: "/sistemas/revenue-engine" },
    secondaryLink: { label: "Ver Operations System →", href: "/sistemas/operations-system" },
  },
  b2b: {
    variant: "short",
    label: "Servicios B2B",
    title: (
      <>
        Revenue Systems para <span className="text-orange">servicios profesionales <span className="hero-hand">B2B.</span></span>
      </>
    ),
    context: "Firmas de servicios profesionales que dependen de referidos y de un pipeline corto. Captamos demanda en Google y LinkedIn y medimos por oportunidad aceptada por ventas, no por lead.",
    ctaLabel: CTA,
    sectorImage: b2b,
    sectorImageAlt: "Reunión de consultoría revisando indicadores",
    funnelStages: ["Google/LinkedIn", "Lead", "Reunión", "Propuesta", "Cierre"],
    funnelLeaks: [
      { afterStage: 1, label: "Depende de referidos" },
      { afterStage: 2, label: "Pipeline corto" },
      { afterStage: 3, label: "CRM mal usado" },
    ],
    doloresDetalle: [
      {
        titulo: "Pipeline corto",
        descripcion: "Pocas oportunidades nuevas cada mes y un equipo comercial que espera a que lleguen.",
        resuelve: "Demand en Google y LinkedIn",
      },
      {
        titulo: "Depende de referidos",
        descripcion: "Cuando los referidos bajan, la facturación baja con ellos.",
        resuelve: "Captación propia medida hasta la venta",
      },
      {
        titulo: "CRM mal usado",
        descripcion: "El CRM existe, pero nadie lo actualiza ni sabe en qué etapa está cada oportunidad.",
        resuelve: "CRM & RevOps con scoring",
      },
    ],
    sistemaTitle: (
      <>
        Lo que hacemos: <em className="font-serif-accent">Revenue Engine.</em>
      </>
    ),
    sistemaTexto: "Revenue Engine, con Demand (Google, LinkedIn) y CRM con scoring como el componente que más pesa.",
    sistemaFilas: [
      { nombre: "Google Search", detalle: "Captura de la demanda que ya busca tu servicio" },
      { nombre: "LinkedIn selectivo B2B", detalle: "Llegar a quien decide, no solo a quien hace clic" },
      {
        nombre: "Calificación",
        detalle: "Cada lead calificado antes de llegar al equipo comercial",
      },
      { nombre: "CRM & RevOps", detalle: "Pipeline, etapas y seguimiento que el equipo sí usa" },
      { nombre: "Medición hasta la venta", detalle: "Costo por oportunidad aceptada por ventas, no por lead" },
    ],
    sectorFacts: [
      { label: "Sistema recomendado", value: "Revenue Engine" },
      { label: "Componente que más pesa", value: "Demand (Google, LinkedIn) + CRM y scoring" },
      { label: "Indicador principal", value: "Costo por SQL; conversión de reunión a propuesta" },
      { label: "Flujo actual", value: "Google/LinkedIn → Lead → Reunión → Propuesta → Cierre" },
    ],
    acceptanceSteps: PASOS_RE,
    primaryLink: { label: "Ver Revenue Engine →", href: "/sistemas/revenue-engine" },
    secondaryLink: { label: "Ver Demand System →", href: "/sistemas/demand-system" },
  },
  ecommerce: {
    variant: "short",
    label: "Ecommerce",
    title: (
      <>
        Revenue Systems para <span className="text-orange">ecommerce con <span className="hero-hand">volumen.</span></span>
      </>
    ),
    context: "Tiendas con volumen donde el costo de adquisición sube más rápido que el ticket promedio. Medimos por margen de contribución tras adquisición.",
    ctaLabel: CTA,
    sectorImage: ecommerce,
    sectorImageAlt: "Equipo preparando pedidos de una tienda online",
    funnelStages: ["Anuncios", "Tienda", "Compra", "Recompra"],
    funnelLeaks: [
      { afterStage: 1, label: "CAC alto" },
      { afterStage: 2, label: "Conversión baja" },
      { afterStage: 3, label: "WhatsApp sin medir" },
    ],
    doloresDetalle: [
      {
        titulo: "CAC alto",
        descripcion: "Cada cliente nuevo cuesta más que el del mes anterior.",
        resuelve: "Medios optimizados por margen",
      },
      {
        titulo: "Conversión baja",
        descripcion: "El tráfico llega a la tienda, pero no compra.",
        resuelve: "CRO de la tienda",
      },
      {
        titulo: "Creatividad agotada",
        descripcion: "Los mismos anuncios desde hace meses y un rendimiento que va a la baja.",
        resuelve: "Creative Performance",
      },
      { titulo: "WhatsApp sin medir dentro del embudo", descripcion: "Parte de la venta pasa por WhatsApp y nadie la atribuye.", resuelve: "WhatsApp integrado y medido" },
    ],
    sistemaTitle: (
      <>
        Lo que hacemos: <em className="font-serif-accent">Demand System.</em>
      </>
    ),
    sistemaTexto: "Demand System, con Sales Flow si WhatsApp pesa en la conversión.",
    sistemaFilas: [
      { nombre: "Creative Performance", detalle: "Producción y testing creativo con IA, con iteración semanal" },
      { nombre: "Medios por margen", detalle: "Meta, Google y PMax optimizados por margen, no solo por ROAS" },
      { nombre: "CRO", detalle: "Mejoras de conversión en la tienda, siempre con tracking conectado" },
      {
        nombre: "WhatsApp medido",
        detalle: "Atención integrada al embudo cuando WhatsApp pesa en la venta",
      },
      { nombre: "Medición por margen", detalle: "Margen de contribución tras adquisición, cada semana" },
    ],
    sectorFacts: [
      { label: "Sistema recomendado", value: "Demand System (+ Sales Flow si WhatsApp pesa)" },
      { label: "Componente que más pesa", value: "Creative Performance, CRO y atención con IA" },
      { label: "Indicador principal", value: "Margen de contribución tras adquisición" },
      { label: "Flujo actual", value: "Anuncios → Tienda → Compra → Recompra" },
    ],
    acceptanceSteps: PASOS_RE,
    primaryLink: { label: "Ver Demand System →", href: "/sistemas/demand-system" },
    secondaryLink: { label: "Ver Sales Flow →", href: "/sistemas/sales-flow" },
  },
  industria: {
    variant: "short",
    label: "Industria y distribución",
    title: (
      <>
        Revenue Systems para <span className="text-orange">industria y <span className="hero-hand">distribución.</span></span>
      </>
    ),
    context: "Empresas con cotizaciones, documentos y datos que se mueven a mano entre CRM y ERP. Automatizamos un proceso a la vez, con aprobación humana.",
    ctaLabel: CTA,
    ctaFinalLabel: "Revisar mi proceso comercial →",
    sectorImage: industria,
    sectorImageAlt: "Operarios revisando pedidos en una bodega",
    funnelStages: ["Cotización", "Pedido", "Documento", "Entrega", "Soporte"],
    funnelLeaks: [
      { afterStage: 1, label: "Cotizaciones manuales" },
      { afterStage: 2, label: "CRM y ERP desconectados" },
      { afterStage: 3, label: "Documentos manuales" },
    ],
    doloresDetalle: [
      {
        titulo: "Cotizaciones manuales",
        descripcion: "Cada cotización se prepara a mano y tarda horas.",
        resuelve: "Cotizaciones desde WhatsApp o correo",
      },
      {
        titulo: "Documentos manuales",
        descripcion: "Datos que se copian de un sistema a otro, con errores y retrabajo.",
        resuelve: "Documentos generados y verificados",
      },
      {
        titulo: "CRM y ERP desconectados",
        descripcion: "Comercial y operación trabajan con datos distintos.",
        resuelve: "Sincronización CRM ↔ ERP",
      },
    ],
    sistemaTitle: (
      <>
        Lo que hacemos: <em className="font-serif-accent">Operations System.</em>
      </>
    ),
    sistemaTexto:
      "Operations System: cotizaciones, documentos y sincronización CRM ↔ ERP.",
    sistemaFilas: [
      {
        nombre: "Cotizaciones desde WhatsApp o correo",
        detalle: "El agente extrae la solicitud y la redacta; una persona aprueba el envío",
      },
      { nombre: "Documentos", detalle: "Generados desde plantillas y verificados antes de firmar" },
      { nombre: "Sincronización CRM ↔ ERP", detalle: "Datos consistentes entre sistemas; los conflictos los resuelve una persona" },
      { nombre: "Postventa de primer nivel", detalle: "Consultas frecuentes resueltas; reclamaciones escaladas a una persona" },
      { nombre: "Costo por ejecución correcta", detalle: "Medido frente a la línea base del proceso" },
    ],
    sectorFacts: [
      { label: "Sistema recomendado", value: "Operations System" },
      { label: "Componente que más pesa", value: "Cotizaciones, documentos y CRM ↔ ERP" },
      { label: "Indicador principal", value: "Costo por ejecución correcta; tiempo de ciclo" },
      { label: "Flujo actual", value: "Cotización → Pedido → Documento → Entrega → Soporte" },
    ],
    acceptanceSteps: [
      {
        hito: "1",
        label: "Revenue Diagnostic",
        texto: "Mapa del proceso: volumen, tiempo, errores y costo",
      },
      {
        hito: "2",
        label: "Sprint",
        texto: "Criterios de aceptación firmados y construcción con casos reales",
      },
      { hito: "3", label: "Piloto y soporte", texto: "Piloto controlado y soporte mensual" },
    ],
    primaryLink: { label: "Ver Operations System →", href: "/sistemas/operations-system" },
  },
};
