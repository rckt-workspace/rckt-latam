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
    texto: "2 a 3 semanas para ver dónde se pierden tus clientes y fijar la línea base",
  },
  {
    hito: "2",
    label: "Puesta en marcha",
    texto: "El día 30, cada conversación entra al CRM con su origen",
  },
  { hito: "3", label: "Revisión", texto: "El día 90, línea base frente a resultado" },
];
const MEDICION_INV =
  "La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros.";
const PERIODO =
  "Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90.";

export const SALUD_FAQS = [
  { question: "¿Un sistema automático va a atender a mis pacientes?", answer: "Responde a las 2 a. m., pero no decide el tratamiento: contesta lo que se repite mil veces y entrega la conversación a tu asesora en cuanto hay intención de agendar o una duda clínica. Lo que hace y lo que no, queda por escrito." },
  { question: "¿Cuánto me cuesta una inasistencia?", answer: "Dos veces: lo que pagaste por traer a esa persona y la hora de agenda que nadie ocupó. La mayoría se evita con un recordatorio a tiempo y un mensaje de recuperación." },
  { question: "¿Meta sabe qué pacientes se trataron?", answer: "No. Mientras el tratamiento aceptado viva solo en tu software de agenda, las plataformas buscan gente parecida a la que escribe, no a la que se trata. Ese dato se puede devolver." },
  { question: "¿Por qué importa tanto responder primero?", answer: "Tu paciente escribió a tres clínicas y agenda con la que responde primero y hace seguimiento." },
  { question: "¿Qué indicadores se miden?", answer: "Costo por paciente que compra y porcentaje de citas realizadas." },
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
        Revenue Systems para clínicas estéticas y <span className="hero-hand">odontológicas</span>.
      </>
    ),
    context: "En estética y odontología casi nadie pide una sola cotización: la decisión se toma con la clínica que contesta antes y hace seguimiento. Esa ventaja no se compra con más pauta.",
    ctaLabel: CTA,
    sectorImage: salud,
    sectorImageAlt: "Especialista atendiendo a una paciente en una clínica",
    funnelStages: ["Meta / Google", "WhatsApp", "Asesora", "Valoración", "Cita", "Tratamiento"],
    funnelLeaks: [
      { afterStage: 2, label: "respuesta al día siguiente" },
      { afterStage: 5, label: "inasistencia" },
      { afterStage: 6, label: "la venta nunca vuelve a Meta" },
    ],
    doloresDetalle: [
      {
        titulo: "Entre el anuncio y la respuesta",
        descripcion: "La asesora está en consulta. Un mensaje de las 9:47 p. m. se responde a las 10:20 a. m. del día siguiente.",
        resuelve: "Primera respuesta que no depende de quién esté libre",
      },
      {
        titulo: "Entre la conversación y la valoración",
        descripcion: "Mandaste el precio y nadie volvió a escribir.",
        resuelve: "Secuencias de seguimiento",
      },
      {
        titulo: "Entre la cita y la asistencia",
        descripcion: "Sin recordatorio, la agenda se queda con huecos. La inasistencia cuesta dos veces: lo que pagaste por traer al paciente y la hora que nadie ocupó.",
        resuelve: "Recordatorios y mensaje de recuperación",
      },
      {
        titulo: "Entre el tratamiento y la pauta",
        descripcion: "Meta sabe quién hizo clic, no sabe quién se trató.",
        resuelve: "El tratamiento aceptado vuelve a Meta y Google",
      },
    ],
    sistemaTitle: (
      <>
        Lo que hacemos: <em className="font-serif-accent">Revenue Engine.</em>
      </>
    ),
    sistemaTexto:
       "Revenue Engine, con Sales Flow como lo que más pesa: primera respuesta, agenda e inasistencias.",
    sistemaFilas: [
      {
        nombre: "Pauta conectada",
        detalle: "cada paciente con la campaña que lo trajo",
      },
      {
        nombre: "Respuesta a cualquier hora",
        detalle: "lo repetitivo (horarios, sedes, disponibilidad) se responde solo",
      },
      {
        nombre: "Paso a tu asesora",
        detalle: "en cuanto hay intención de agendar o una duda clínica",
      },
      {
        nombre: "Recordatorios y recuperación",
        detalle: "menos huecos en la agenda",
      },
      {
        nombre: "Medición hasta el tratamiento",
        detalle: "costo por paciente que se trata",
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
        v: "Mensajes que llegan de noche y se responden al día siguiente, precios enviados sin seguimiento, inasistencias sin recordatorio y tratamientos que nunca vuelven a Meta.",
      },
      { k: "Período", v: PERIODO },
      {
        k: "Alcance",
        v: "Revenue Engine, con Sales Flow como el componente que más pesa: respuesta, agenda y gestión de inasistencia.",
      },
      { k: "Inversión", v: MEDICION_INV },
      {
        k: "Intervención",
        v: "Primera respuesta automática con paso a la asesora, seguimiento tras enviar el precio, recordatorios de cita y el tratamiento aceptado de vuelta a Meta y Google.",
      },
      {
        k: "Resultado",
        v: "Costo por paciente que compra y porcentaje de citas realizadas, frente a la línea base.",
      },
      {
        k: "Método de medición",
        v: "Una sola fuente de verdad: inversión → lead → MQL → SQL → reunión → oportunidad → venta → margen, con definiciones que firmas tú.",
      },
      {
        k: "Limitaciones",
        v: "No garantizamos ventas porque no controlamos tu cierre, tu stock ni tus precios. Garantizamos que en 30 días vas a ver tu embudo completo con datos reales.",
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
    context: "Universidades, institutos y educación continua que reciben cientos de solicitudes en temporada de matrículas y no saben cuáles terminan matriculadas. Calificamos ese volumen y lo seguimos hasta la matrícula.",
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
      { afterStage: 2, label: "El volumen tapa a los interesados" },
      { afterStage: 4, label: "Seguimiento que se corta" },
      { afterStage: 5, label: "La matrícula no vuelve a la pauta" },
    ],
    doloresDetalle: [
      {
        titulo: "En temporada, el volumen tapa a los interesados",
        descripcion: "Cientos de solicitudes y ninguna forma de saber cuáles están listas para matricularse.",
        resuelve: "Respuesta y calificación",
      },
      {
        titulo: "El seguimiento se corta después del primer mensaje",
        descripcion: "En los picos, a quien no contesta no se le vuelve a escribir.",
        resuelve: "Secuencias por temporada",
      },
      {
        titulo: "La matrícula no vuelve a la pauta",
        descripcion: "Se mide la solicitud, no la matrícula, y las plataformas siguen buscando a quien pregunta.",
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
        nombre: "Campañas medidas por matrícula",
        detalle: "Demand optimizado por la matrícula, no por el lead",
      },
      {
        nombre: "Medición hasta la matrícula",
        detalle: "Tasa de lead a matrícula frente a la línea base",
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
    context: "Cuando varios asesores atienden los mismos prospectos y cada cotización se arma a mano, el ciclo se alarga y nadie sabe qué campaña trajo la visita. Ordenamos la captación, automatizamos lo repetitivo y medimos por visita realizada.",
    ctaLabel: CTA,
    sectorImage: construccion,
    sectorImageAlt: "Dos personas revisando un proyecto en obra",
    funnelStages: ["Pauta", "landing", "asesor", "visita", "cotización", "cierre"],
    funnelLeaks: [
      { afterStage: 2, label: "Prospectos sin intención real" },
      { afterStage: 3, label: "Dos asesores, el mismo prospecto" },
      { afterStage: 5, label: "Cotizaciones que tardan días" },
      { afterStage: 6, label: "Meses sin seguimiento" },
    ],
    doloresDetalle: [
      {
        titulo: "Prospectos sin intención real",
        descripcion: "Muchos contactos sin presupuesto ni intención real de compra.",
        resuelve: "Lead scoring",
      },
      {
        titulo: "Dos asesores llamando al mismo prospecto",
        descripcion: "El mismo prospecto recibe llamadas de dos asesores y ninguno es su dueño.",
        resuelve: "Asignación multi-asesor",
      },
      {
        titulo: "Meses entre la visita y la firma sin seguimiento",
        descripcion: "Ciclos de venta largos sin seguimiento estructurado.",
        resuelve: "CRM para ciclos largos",
      },
      {
        titulo: "Cotizaciones que tardan días",
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
        value: "Pauta → Landing → Asesor → Visita → Cotización → Cierre",
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
    context: "Si tu firma vive de referidos, el mes que no llegan se nota en la facturación. Construimos demanda propia en Google y LinkedIn y la medimos por reuniones que terminan en propuesta, no por leads.",
    ctaLabel: CTA,
    sectorImage: b2b,
    sectorImageAlt: "Reunión de consultoría revisando indicadores",
    funnelStages: ["Google/LinkedIn", "Lead", "Reunión", "Propuesta", "Cierre"],
    funnelLeaks: [
      { afterStage: 1, label: "Todo llega por referidos" },
      { afterStage: 2, label: "Pocas oportunidades al mes" },
      { afterStage: 3, label: "Un CRM que nadie actualiza" },
    ],
    doloresDetalle: [
      {
        titulo: "Pocas oportunidades nuevas cada mes",
        descripcion: "Pocas oportunidades nuevas cada mes y un equipo comercial que espera a que lleguen.",
        resuelve: "Demand en Google y LinkedIn",
      },
      {
        titulo: "Facturación atada a los referidos",
        descripcion: "Cuando los referidos bajan, la facturación baja con ellos.",
        resuelve: "Captación propia medida hasta la venta",
      },
      {
        titulo: "Un CRM que el equipo no actualiza",
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
    context: "Tiendas que ya venden con volumen, pero cada cliente nuevo cuesta más que el anterior y parte de los pedidos se cierra por WhatsApp sin atribuirse. Medimos por lo que queda después de pagar la adquisición.",
    ctaLabel: CTA,
    sectorImage: ecommerce,
    sectorImageAlt: "Equipo preparando pedidos de una tienda online",
    funnelStages: ["Pauta", "Tienda (a veces WhatsApp)", "Compra", "Recompra"],
    funnelLeaks: [
      { afterStage: 1, label: "CAC alto" },
      { afterStage: 2, label: "Conversión baja" },
      { afterStage: 3, label: "WhatsApp sin medir" },
    ],
    doloresDetalle: [
      {
        titulo: "Cada cliente cuesta más",
        descripcion: "Cada cliente nuevo cuesta más que el del mes anterior.",
        resuelve: "Pauta optimizada por margen",
      },
      {
        titulo: "Tráfico que no compra",
        descripcion: "El tráfico llega a la tienda, pero no compra.",
        resuelve: "CRO de la tienda",
      },
      {
        titulo: "Anuncios cansados",
        descripcion: "Los mismos anuncios desde hace meses y un rendimiento que va a la baja.",
        resuelve: "Creative Performance",
      },
      { titulo: "Pedidos por WhatsApp sin dueño", descripcion: "Parte de la venta pasa por WhatsApp y nadie la atribuye.", resuelve: "WhatsApp integrado y medido" },
    ],
    sistemaTitle: (
      <>
        Lo que hacemos: <em className="font-serif-accent">Demand System.</em>
      </>
    ),
    sistemaTexto: "Demand System, con Sales Flow si WhatsApp pesa en la conversión.",
    sistemaFilas: [
      { nombre: "Creative Performance", detalle: "Producción y testing creativo con IA, con iteración semanal" },
      { nombre: "Pauta por margen", detalle: "Meta, Google y PMax optimizados por margen, no solo por ROAS" },
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
      { label: "Flujo actual", value: "Pauta → Tienda → Compra → Recompra" },
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
    context: "Distribuidores e industrias donde cada pedido empieza con una cotización armada a mano y los datos viajan entre CRM, ERP y hojas de cálculo. Automatizamos un proceso a la vez y medimos el costo por ejecución correcta.",
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
        titulo: "Cotizaciones que tardan horas",
        descripcion: "Cada cotización se prepara a mano y tarda horas.",
        resuelve: "Cotizaciones desde WhatsApp o correo",
      },
      {
        titulo: "Documentos que se copian con errores",
        descripcion: "Datos que se copian de un sistema a otro, con errores y retrabajo.",
        resuelve: "Documentos generados y verificados",
      },
      {
        titulo: "Comercial y operación con datos distintos",
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
