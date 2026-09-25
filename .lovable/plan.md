# Paso A5 — Soluciones, Sectores y correcciones de Sistemas

## Alcance

- Mantener intactos backend, APIs, autenticación, Lovable Cloud, formularios, servicios de IA, infraestructura, secretos y archivos protegidos.
- Conservar `@import "tailwindcss";` como primera línea de `src/styles.css`.
- Usar exclusivamente la referencia local de España en modo lectura y los assets físicos ya presentes en LATAM.
- Mantener URLs existentes y establecer canonical/`og:url` bajo `https://rckt.lat`.
- Aplicar vocabulario LATAM y el CTA uniforme “Revisar mi proceso comercial”.
- No inventar contenido: cualquier texto realmente ausente quedará como `[PENDIENTE]` y se reportará.

## 1. Correcciones puntuales de Sistemas

- Sustituir las cuatro respuestas indicadas de Revenue Diagnostic por las respuestas literales de España, adaptando únicamente vocabulario regional.
- Corregir el título y la frase de la escalera de Revenue Engine, eliminando las dos frases reemplazadas.
- Reemplazar las descripciones de las tres tarjetas del índice por el glosario literal entregado.
- Preservar las demás secciones, FAQ, JSON-LD y formulario real.

## 2. Soluciones

- Reconstruir `/soluciones/` con el hero y las tres tarjetas fotográficas de España, usando los tres assets LATAM y el orden/copy aprobado.
- Reconstruir Captación y cierre, Ecommerce rentable y Operación con la composición española: hero, señales, embudo cuando corresponda, panel “Lo que hacemos” con columna fija, hitos de 90 días, ficha del método, exclusiones, FAQ y CTA final compartido.
- Portar o alinear solo los componentes y estilos visuales que falten; reutilizar `SystemPageHero`, `GeneralCta`, `MethodCard`, `FunnelBars`, `MilestoneCards`, `SignalCards` y `FaqSection` compatibles con LATAM.
- Integrar literalmente los textos entregados y tomar de España únicamente el contenido que el encargo identifica como “igual a España”, con cambios regionales mínimos.

## 3. Sectores

- Reconstruir `/sectores/` con las seis tarjetas fotográficas españolas en el orden LATAM aprobado.
- Alinear `SectorPage`, `SectorJourney` y `SectorPains` con la plantilla española: foto fija y recorrido, bloques de fuga, cinco componentes con ficha fija, inicio, método y FAQ según variante.
- Centralizar los datos en `sectorData` usando los contextos, vocabulario, método y FAQ entregados.
- Mantener Salud y Educación como páginas completas; Construcción, Servicios B2B, Ecommerce e Industria como páginas cortas sin método ni FAQ.
- Conservar los seis assets `sector-*.jpg` físicos del proyecto.

## 4. SEO, contenido y validación

- Revisar las 11 rutas para título, descripción, `og:title`, `og:description`, `og:type`, `og:url`, `twitter:card`, canonical y JSON-LD FAQ solo donde corresponda.
- Buscar términos españoles prohibidos, CTAs antiguos y placeholders en toda la superficie modificada.
- Ejecutar TypeScript y confirmar el build automático.
- Verificar las 11 páginas en 1280, 1024 y 390 px, claro y oscuro: 66 vistas sin scroll horizontal ni errores de consola.
- Probar acordeones y confirmar estructura completa/corta, fotos, tarjetas, columnas fijas y navegación.
- Revisar `git diff --stat` y confirmar diff vacío en todos los archivos protegidos.
- Entregar la lista exacta de archivos adaptados desde España y cualquier `[PENDIENTE]` restante.

## Archivos previstos

- Rutas públicas: tres correcciones de `sistemas.*`, cuatro `soluciones.*` y siete `sectores.*`.
- Componentes visuales permitidos: `SectorPage`, `SectorJourney`, `SectorPains`, `sectorData` y, solo si la comparación lo exige, componentes compartidos de señales, embudo, hitos, método y FAQ.
- `src/styles.css`: únicamente estilos locales requeridos para fidelidad visual.
- Sin cambios en rutas API, integraciones, librerías protegidas, base de datos, servicios, infraestructura o configuración.