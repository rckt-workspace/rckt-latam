# Paso 9 — FAQ de Sistemas

## Alcance
- Ampliar las tres preguntas actuales de Revenue Diagnostic con las dos aprobadas.
- Reemplazar los arrays vacíos de Demand System, Sales Flow, Operations System y Revenue Engine por las preguntas y respuestas entregadas.
- Mantener el componente `FaqSection` y su acordeón sin cambios de lógica.
- Mantener la generación existente de datos estructurados `FAQPage` en las cinco páginas.
- Marcar el Paso 9 como completado en el roadmap.

## Validación
- Confirmar que cada página emite un bloque JSON-LD válido con todas sus preguntas.
- Probar apertura y cierre del acordeón en escritorio y celular, en temas claro y oscuro.
- Revisar que no existan errores, desbordamientos ni regresiones de compilación.

## Detalles técnicos
- El contenido común del diagnóstico seguirá centralizado en `systemFaqs.ts`.
- Las demás FAQ permanecerán locales a cada página, siguiendo la estructura ya instalada.
- No se modificarán APIs, formularios, datos, estilos compartidos ni archivos protegidos.
