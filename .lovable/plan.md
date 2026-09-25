# Corrección de textos faltantes en tarjetas

## Alcance
- Igualar en Inicio la sección “Tres problemas” con la estructura de España, usando literalmente los textos LATAM aprobados.
- Comparar por código los componentes y datos de tarjetas, filas y bloques públicos con sus equivalentes de España.
- Verificar en pantalla que cada elemento con título también muestre su texto, señales y enlaces cuando correspondan.
- Corregir solo frontend y contenido público permitido; no tocar archivos protegidos, formularios ni integraciones.

## Implementación
1. Ajustar los datos de “Tres problemas” sin cambiar su composición ni enlaces.
2. Inventariar componentes equivalentes de España y LATAM: sistemas, soluciones, sectores, fugas, capacidades, reglas, aceptación, principios, pilares, “Lo que hacemos”, fichas, FAQ, casos, recursos y mercados.
3. Corregir los lugares donde el texto exista pero no se renderice o esté oculto.
4. Cuando falte copy LATAM, adaptar literalmente el texto español con vocabulario LATAM y registrarlo en el informe.

## Verificación
- Playwright a 1280 y 390 px, en claro y oscuro.
- Confirmar texto visible, ausencia de recortes, scroll horizontal y errores de consola.
- Confirmar compilación correcta y formularios de postulación y diagnóstico intactos.
