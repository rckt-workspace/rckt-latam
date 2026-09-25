# Paso A1 — Paridad visual con RCKT España

## Alcance
Aplicar únicamente cambios de presentación y metadatos. No modificar infraestructura, backend, base de datos, integraciones, lógica administrativa, lógica del Blog, formulario de postulación ni agente de IA.

## Implementación

1. **Limpiar estilos globales con control de uso**
   - Eliminar la justificación global y cualquier otro `text-align: justify`.
   - Corregir los colores puntuales solicitados en Sectores.
   - Auditar clases antiguas contra todos los `.tsx`; retirar solo bloques inequívocamente huérfanos.
   - Conservar expresamente estilos de Blog, legales, administración y operaciones.

2. **Portar los bloques visuales de España**
   - Sustituir las reglas existentes de fotografía y degradado del hero, CTA final, contexto del hero, cápsulas/drawer del menú y pilares.
   - Añadir aliases de tokens visuales (`--paper`, `--ink`, `--ink-soft`, `--orange`) si son necesarios para que el código de España use la paleta actual sin alterar el tema.
   - Mantener el toggle sincronizado con `.dark` y `data-theme`.

3. **Sustituir la navegación pública**
   - Crear `src/components/rckt/SiteNav.tsx` con el código indicado.
   - Hacer que `SiteHeader` delegue en `SiteNav`, preservando `SiteFooter` y las animaciones compartidas.
   - Reemplazar únicamente el header HTML duplicado de Inicio por `SiteNav`, sin reescribir su hero ni tocar su animación.
   - No añadir navegación a `/rckt-equipo`, `/ops/login` o al formulario de postulación si hoy no la renderizan; su lógica y experiencia interna quedan intactas.
   - Mantener los enlaces exactos solicitados, incluidos `/casos/` y `/recursos/`; no crear contenido ni rutas nuevas en este paso.

4. **Actualizar idioma, metadatos y estados globales**
   - Cambiar el idioma raíz a `es-419`.
   - Aplicar el título y descripción globales proporcionados.
   - Traducir las pantallas 404 y de error al texto solicitado.
   - Mantener `AdvisorChatLauncher`, `GlobalSectionBlobs`, `Outlet`, estilos, scripts y manejo de errores actuales.

5. **Validación**
   - Confirmar que no cambió ningún archivo protegido.
   - Verificar compilación actual en el registro automático.
   - Probar menú desktop y móvil, fusión al scroll, apertura/cierre y tema claro/oscuro.
   - Probar Inicio y páginas públicas representativas.
   - Comprobar que Blog, `/rckt-equipo`, `/ops/login` y el formulario de postulación conservan su comportamiento.
   - Revisar consola, errores de ejecución y desbordamiento horizontal.
   - Entregar la lista exacta de archivos modificados.

## Decisiones de seguridad
- La limpieza de CSS será conservadora: una clase detectada solo por análisis textual no se eliminará si puede pertenecer a contenido dinámico o a las áreas protegidas.
- No se tocará ninguna ruta, integración o archivo técnico prohibido aunque eso impida ampliar el cambio visual a una pantalla interna.
