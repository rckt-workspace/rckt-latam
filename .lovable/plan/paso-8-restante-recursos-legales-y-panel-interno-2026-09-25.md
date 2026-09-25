# Paso 8 restante: Recursos, legales y panel interno

## Alcance

- Crear `/recursos` con la estructura funcional de España, adaptada a la terminología LATAM.
- Mover las tres páginas legales a `/legal/*`, conservar redirecciones permanentes y actualizar el pie.
- Realinear visualmente `/rckt-equipo` mediante estilos, sin cambiar autenticación, datos, acciones ni integraciones.
- No tocar Casos ni Mercados.

## 1. Recursos

Se portarán el buscador, los cinco filtros, la tarjeta destacada, la grilla de recursos próximos y el CTA final compartido. La página usará `SystemPageHero`, la paleta global, las manchas puntuales y metadatos propios.

### Catálogo propuesto para aprobación

**01. Del lead a la venta · Revenue Engine**  
Pregunta: “¿Por qué tengo prospectos y no ventas?”

- **Más prospectos no significa más ventas** — Guía · Destacado
- **Cómo medir de prospecto a venta** — Guía
- **Cómo saber si te falta inversión o seguimiento** — Artículo
- **Atribución frente a causalidad** — Artículo

**02. WhatsApp y CRM · Sales Flow**  
Pregunta: “¿Cómo dejo de perder prospectos en WhatsApp?”

- **Pagaste por el prospecto: ¿cuánto tardas en responderlo?** — Artículo
- **Qué automatizar primero** — Guía
- **Cómo conectar WhatsApp con el CRM sin perder contexto** — Guía

La tercera pieza es el único título redactado que no existe en el catálogo genérico de España.

**03. Web y conversión · Sales Flow**  
Pregunta: “¿Por qué mi web no genera oportunidades?”

- **Diseño web no es decoración** — Artículo
- **Rediseño o CRO** — Comparativa
- **Cómo conectar la web al CRM** — Guía

**04. Medios con medición · Demand System**  
Pregunta: “¿Meta o Google? ¿Por qué mi agencia me da prospectos baratos que no compran?”

- **Meta frente a Google según intención** — Comparativa
- **Google Ads genera prospectos pero no ventas** — Artículo
- **Por qué no optimizar por costo por prospecto** — Artículo
- **Qué es una conversión offline y por qué importa** — Guía

**05. IA que se paga sola · Operations System**  
Pregunta: “¿Dónde me da retorno la IA?”

- **IA para ventas sin humo** — Guía
- **Automatización de cotizaciones** — Caso
- **Cuánto cuesta automatizar un proceso** — Plantilla
- **Cómo medir la IA** — Artículo

Todas las piezas mostrarán “· Próximamente”. Los extractos se adaptarán literalmente desde España cambiando únicamente vocabulario regional, sin añadir promesas nuevas.

## 2. Páginas legales

- Crear `/legal/aviso-legal`, `/legal/privacidad` y `/legal/cookies` con el contenido actual palabra por palabra.
- Actualizar metadatos y URL canónica para cada nueva dirección.
- Mantener `/aviso-legal`, `/privacidad` y `/cookies` como redirecciones HTTP 301 hacia sus nuevas rutas.
- Actualizar los enlaces del pie para que apunten a las páginas HTML nuevas; la Política de Tratamiento de Datos seguirá como descarga existente.
- Rediseñar solamente el contenedor compartido: cabecera editorial clara, lectura estrecha, tarjetas/superficies y tipografía globales.

## 3. Panel `/rckt-equipo`

- Mantener intactos inicio de sesión, sesión, vacantes, postulaciones, blog, carga de datos y todas sus acciones.
- Ajustar exclusivamente estilos globales del panel: fondo, superficies translúcidas, bordes, tipografía, botones, pestañas, formularios, estados, listas y modales.
- Usar solo los cuatro colores y tokens compartidos; eliminar visualmente la apariencia aislada anterior.
- Incluir adaptación móvil y contraste correcto en claro y oscuro. El acceso seguirá redirigiendo al login existente cuando no haya sesión.

## Verificación

- Comprobar búsqueda, filtros, estado vacío y CTA en Recursos.
- Confirmar las tres nuevas URLs legales, sus tres redirecciones 301 y los enlaces del pie.
- Confirmar que el panel conserva su comportamiento; si no hay sesión disponible, validar el estado público/redirección y todos los estados accesibles por código y estilos.
- Revisar Recursos, legales y panel en escritorio y celular, claro y oscuro, sin desbordamiento lateral ni errores de consola.
- Ejecutar comprobación de tipos y compilación, y revisar el registro final de compilación.
