# Paso A4 — Sistemas con diseño de RCKT España y contenido LATAM

## Alcance
Reconstruir las seis páginas de Sistemas con la estructura y los componentes de la copia local de RCKT España, manteniendo las rutas actuales, la navegación, el footer, el CTA final, el hero compartido y toda la lógica existente del formulario de diagnóstico.

## Implementación
1. **Corregir Inicio**
   - Cambiar `SITE_URL` a `https://rckt.lat`.
   - Aplicar exactamente el título, la descripción y sus equivalentes Open Graph indicados.
   - Limpiar el JSON-LD: retirar los dos servicios antiguos, usar la nueva descripción, `Latinoamérica` y `es-419`.
   - Comprobar que la frase prohibida no permanezca en el Inicio.

2. **Reconstruir `/sistemas/`**
   - Portar la composición de España: hero, arquitectura de cinco capas, tarjetas de los tres sistemas y dos combos.
   - Mantener `GeneralCta`, `SiteNav`, `SiteFooter` y las URLs LATAM.
   - Aplicar el título y contexto solicitados, con CTA al diagnóstico.

3. **Reconstruir Revenue Diagnostic**
   - Portar stats, “Qué incluye”, banda integrada, requisitos, regla y disposición del formulario.
   - Conservar `DiagnosticForm` sin modificar su lógica, sus llamadas ni el guardado real; mantener su contrato actual y añadir debajo el enlace de WhatsApp solicitado.
   - Integrar las seis FAQ aprobadas y su JSON-LD.

4. **Reconstruir Demand System y Sales Flow**
   - Portar stats, capacidades/componentes, tiers, bandas naranjas, reglas y criterios de aceptación en el orden de España.
   - Aplicar el vocabulario LATAM y las cinco FAQ exactas de cada página, con JSON-LD.

5. **Reconstruir Operations System y Revenue Engine**
   - Portar timeline del sprint, catálogo real de procesos, reglas y aceptación para Operations.
   - Portar composición, capacidades y escalera/criterios de evolución para Revenue Engine conforme a la fuente española disponible.
   - Aplicar las cinco FAQ exactas de cada página, con JSON-LD.

6. **Componentes y estilos compartidos**
   - Igualar `SystemBlocks` y `FaqSection` con las versiones de España, adaptando solamente los enlaces tipados y tokens ya existentes.
   - Portar o sustituir únicamente las reglas CSS necesarias para arquitectura, stats, capacidades, reglas, aceptación, tiers, catálogo, escalera, bandas y FAQ.
   - Conservar intacta la primera línea `@import "tailwindcss";`.

7. **Metadatos y revisión de contenido**
   - Usar los metadatos de España adaptados a `costo`, al dominio `https://rckt.lat` y al vocabulario LATAM.
   - Añadir `og:url`, canonical propio, `og:type` y `twitter:card` en las seis rutas.
   - Buscar globalmente en Inicio y Sistemas términos no permitidos, CTAs antiguos y la frase prohibida.

## Validación
- TypeScript y build correctos.
- Las seis páginas en 1280, 1024 y 390 px, claro y oscuro: 36 combinaciones sin errores de consola ni scroll horizontal.
- Comparación estructural contra los archivos locales de España, no contra el sitio publicado.
- Acordeones y JSON-LD presentes con la misma colección de FAQ visible.
- Formulario de Revenue Diagnostic conserva sus campos, función de envío y estados; se valida sin enviar datos reales.
- Confirmación final de que ningún archivo protegido, secreto ni variable de entorno cambió.
- Resumen de archivos copiados/adaptados desde España y archivos modificados.
