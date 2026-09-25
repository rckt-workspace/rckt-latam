# Reconstrucción de Arquitectura y Combos en Sistemas

## Objetivo
Alinear únicamente las secciones **Arquitectura** y **Los dos combos** de `/sistemas/` con la implementación real de RCKT España, conservando el Hero, las tarjetas de sistemas, el CTA final y todo el copy LATAM ya aprobado.

## Cambios
- Sustituir el diagrama simplificado por la arquitectura de cinco capas:
  1. entrada “Tu problema”;
  2. bloque Revenue Diagnostic;
  3. tres sistemas enlazados con iconos;
  4. agrupaciones Revenue Engine y Growth OS mediante brackets;
  5. base común con Fuente de verdad, IA supervisada y Responsable de cuenta.
- Portar las clases visuales y animaciones exactas necesarias: `arch-layer`, `arch-line`, `arch-box`, `arch-bracket`, `arch-bracket--dashed` y `arch-base`, incluyendo móvil, tema oscuro y movimiento reducido.
- Eliminar “Cinco accesos” y su lista.
- Añadir “Los dos combos” con las tarjetas Revenue Engine y Growth OS, sus badges, píldoras, textos y enlaces indicados.
- Mantener intactos Hero, `SystemCards`, CTA final, navegación, SEO e integraciones.

## Validación
- Comparar Arquitectura y Combos contra España sección por sección.
- Verificar `/sistemas/` en escritorio y celular, tema claro y oscuro.
- Confirmar enlaces, adaptación móvil, ausencia de desbordes y compilación limpia.

## Detalles técnicos
- Cambios limitados a `src/routes/sistemas.index.tsx` y las reglas específicas necesarias en `src/styles.css`.
- Se reutilizará el observador de entrada existente en LATAM para conservar la animación sin introducir otra implementación.
