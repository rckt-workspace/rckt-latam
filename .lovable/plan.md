# Paso A3 — Inicio idéntico a RCKT.es con contenido LATAM

## Alcance

- Reemplazar el montaje HTML antiguo del Inicio por la estructura React real de la referencia de España.
- Mantener sin cambios funcionales `SiteNav`, `SiteFooter`, `GeneralCta`, SEO/JSON-LD, AdvisorChat e integraciones.
- Usar exclusivamente las imágenes locales indicadas y conservar `@import "tailwindcss"`.
- No modificar archivos técnicos, secretos ni variables de entorno.

## Implementación

1. **Tipografía de héroes**
   - Igualar las reglas compartidas de títulos de héroe con España: Inter Tight 600, tracking `-0.045em`.
   - Mantener Homemade Apple únicamente en la palabra destacada, con las medidas y giro de la referencia.

2. **Héroe del Inicio**
   - Sustituir `dangerouslySetInnerHTML`, `useMemo` y listeners heredados por el `Hero` React de España.
   - Conservar el titular LATAM actual: “Un sistema más humano / para lo que ya está aquí.”
   - Aplicar el nuevo párrafo, dos botones, frase de esquina y `rckt-hero.jpg`; sin terminal.
   - Mantener la animación de escritura de España y respetar `prefers-reduced-motion`.

3. **Tres problemas**
   - Copiar la composición exacta de España con `SectionHeader`, tres columnas y acciones.
   - Incorporar literalmente los tres problemas, señales y enlaces LATAM proporcionados.

4. **Tres sistemas**
   - Homologar `SystemCards` y sus estilos con España usando las tres fotos locales.
   - Incorporar las descripciones LATAM y la línea adicional de Sales Flow.
   - Reproducir la banda naranja de Revenue Engine con el texto y botón indicados.

5. **Prueba**
   - Usar la estructura editorial de España con la cita solicitada.
   - Homologar `MethodCard` visualmente sin alterar sus usos existentes y cargar los ocho campos LATAM exactos en Inicio.

6. **Limpieza visual limitada**
   - Retirar únicamente reglas antiguas del Inicio que choquen con la estructura copiada.
   - Copiar las reglas necesarias de héroe, encabezados, tarjetas y ficha desde España.
   - Conservar las manchas globales permitidas y excluir héroe, banda naranja y CTA final.

## Validación

- TypeScript y build correctos.
- Comparación lado a lado con España a 1280, 1024 y 390 px, en claro y oscuro.
- Verificar tamaños, fondos, manchas, componentes, navegación, CTA y footer.
- Confirmar ausencia de scroll horizontal y errores de consola.
- Confirmar que ningún archivo protegido cambió y enumerar los archivos copiados/adaptados desde España.
