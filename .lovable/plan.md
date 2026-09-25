# Paso 5 — Reconstrucción de Sectores

## Alcance
- Portar los componentes reales `SectorPage`, `SectorJourney` y `SectorPains` desde la referencia de España, adaptándolos al nav, footer, CTA final, tokens y rutas ya existentes en LATAM.
- Reconstruir `/sectores/` y sus seis páginas sin tocar APIs, formularios, backend ni infraestructura.
- Conservar metadatos, URLs y copy regional existente; usar componentes compartidos ya portados para hero, encabezados, método, pasos, FAQ y CTA.

## Imágenes
Asignación inequívoca de las fotos subidas:
- Salud: `image-18.png`
- Industria y distribución: `image-19.png`
- Ecommerce: `image-20.png`
- Educación: `image-21.png`
- Construcción e inmobiliario: `image-22.png`
- Servicios B2B: `image-23.png`
- `image-24.png` e `image-25.png` quedan sin usar.

Las seis imágenes se copiarán físicamente al repositorio como `src/assets/sector-*.jpg` y se usarán tanto en el índice como en cada detalle.

## Índice `/sectores/`
- Reemplazar el formato viejo por `SystemPageHero` y una grilla de seis tarjetas fotográficas como España.
- Cada tarjeta conservará nombre, flujo y enlace LATAM, y añadirá el sistema recomendado usando información ya aprobada en Sistemas/Soluciones.
- Usar `Link` para navegación y `SystemFinalCta` para el cierre compartido.

## Páginas de detalle
- Salud y Educación: `variant="full"`, con recorrido, fugas, dolores, sistema recomendado, ficha lateral, pasos de inicio, MethodCard y sus FAQ LATAM existentes mediante `FaqSection` y JSON-LD.
- Construcción, Servicios B2B, Ecommerce e Industria: `variant="short"`, sin MethodCard ni FAQ en esta fase.
- El texto operativo necesario para filas, ficha lateral y pasos se reutilizará del contenido LATAM ya aprobado en Sistemas/Soluciones; no se copiarán FAQ de España ni se añadirán promesas comerciales nuevas.
- Los bullets actuales de dolores se conservarán literalmente como descripción; los títulos cortos y “Lo resuelve” serán etiquetas funcionales derivadas de esos mismos bullets y de los sistemas ya publicados.

## Contenido faltante que requiere aprobación
Las dos páginas `full` tienen hoy una ficha de caso marcada como pendiente; no existe una ficha de método real. Para no publicar el placeholder, propongo estas dos fichas, basadas exclusivamente en el método y vocabulario LATAM ya aprobados:

### Salud — Ficha del método
1. **Situación inicial:** “Seguimiento inconsistente, respuesta lenta, inasistencia y falta de atribución entre la campaña y el paciente que compra.”
2. **Período:** “Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90.”
3. **Alcance:** “Revenue Engine, con Sales Flow como el componente que más pesa: respuesta, agenda y gestión de inasistencia.”
4. **Inversión:** “La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros.”
5. **Intervención:** “Campañas, WhatsApp y CRM conectados; recordatorios de cita y recuperación de inasistencia; cada paciente conectado a la campaña que lo trajo.”
6. **Resultado:** “Costo por paciente que compra y porcentaje de citas realizadas, frente a la línea base.”
7. **Método de medición:** “Una sola fuente de verdad: pauta → prospecto → contacto → cita → asistencia → venta, con definiciones que firmas tú.”
8. **Limitaciones:** “No garantizamos ventas ni asistencia, porque no controlamos la decisión del paciente ni la disponibilidad de agenda. Garantizamos visibilidad del recorrido y medición contra una línea base acordada.”

### Educación — Ficha del método
1. **Situación inicial:** “Volumen alto sin calificación, picos de temporada, seguimiento fragmentado y campañas medidas por prospecto en lugar de matrícula.”
2. **Período:** “Revenue Diagnostic de 2 a 3 semanas; sistema operativo con fuente de verdad el día 30; revisión de línea base frente a resultado el día 90.”
3. **Alcance:** “Revenue Engine, con Sales Flow y secuencias ajustadas a cada temporada de matrículas.”
4. **Inversión:** “La pauta la pagas tú, en tus propias cuentas. Lo que pagas por el Diagnostic se descuenta del sistema si sigues con nosotros.”
5. **Intervención:** “Campañas, WhatsApp o llamadas y CRM conectados; calificación, priorización y seguimiento de cada prospecto hasta la matrícula.”
6. **Resultado:** “Costo por matrícula y conversión de prospecto a matrícula, frente a la línea base.”
7. **Método de medición:** “Una sola fuente de verdad: pauta → prospecto → contacto → admisión → matrícula, con definiciones que firmas tú.”
8. **Limitaciones:** “No garantizamos matrículas, porque no controlamos la decisión de la familia, la oferta académica ni los cupos. Garantizamos trazabilidad y medición contra una línea base acordada.”

No se detectaron FAQ faltantes en Educación: ya existen tres preguntas LATAM y se conservarán. Salud también conserva sus tres preguntas actuales.

## Validación
- Revisar las siete páginas en 1280 px y 390 px, tema claro y oscuro.
- Confirmar encuadre de las seis fotos, ausencia de desbordes, contenido `short/full`, FAQ y JSON-LD solo donde corresponde, y CTA compartido.
- Ejecutar la comprobación de tipos permitida por el entorno y revisar el estado final de compilación del preview.
