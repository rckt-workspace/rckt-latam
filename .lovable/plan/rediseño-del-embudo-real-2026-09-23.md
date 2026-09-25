# Rediseño del embudo real

## Objetivo

Convertir la sección “Dónde se pierde el dinero” del inicio en un flujo visual conectado, conservando exactamente el copy y los seis placeholders actuales.

## Cambios

- Añadir tres círculos naranjas difuminados y moderados detrás de la sección.
- Reestructurar únicamente el marcado de los seis pasos para incorporar conectores y un indicador visual de pérdida progresiva.
- Presentar el flujo horizontalmente en escritorio y verticalmente en móvil.
- Dar a cada paso un número grande naranja, jerarquía editorial y tratamiento elegante para el dato pendiente.
- Escalonar la aparición de los pasos al entrar en pantalla, respetando la preferencia de movimiento reducido.

## Detalles técnicos

- Cambios limitados a `src/routes/index.tsx` y `src/styles.css`.
- Se reutilizarán los tokens, tipografías y clases de animación existentes.
- No se tocarán navegación, formularios, llamadas a servicios ni otras páginas.
- Se comprobará el resultado visual a 1280 px y 390 px, además del estado de compilación.
