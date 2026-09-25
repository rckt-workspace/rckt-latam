# Ajustes visuales de Inicio: imágenes, CTA y ficha de caso

## Objetivo

Reemplazar los gráficos temporales de Inicio por la foto existente del hero, convertir el CTA final en una sección fotográfica de ancho completo y presentar “Prueba” como una ficha de caso estructurada.

## Cambios

- Reutilizar la imagen local actual del hero en las tres tarjetas de “Los tres sistemas”, con recortes diferenciados mediante `object-fit: cover` y `object-position`.
- Sustituir el gráfico temporal de “Prueba” por la misma fotografía y conservar el tratamiento de tarjeta con borde, sombra y acento naranja.
- Convertir el CTA final en una sección amplia con la fotografía como fondo, overlay oscuro para contraste y texto/botón superpuestos; eliminar el bloque visual adicional.
- Rehacer el contenido de “Prueba” como una ficha con ocho campos visibles: Situación inicial, Período, Alcance, Inversión, Intervención, Resultado, Método de medición y Limitaciones. Añadir referencias visibles de filtro por sector, sistema y ciudad.
- Mantener intactos el contenido y comportamiento del resto de Inicio.

## Detalles técnicos

- Cambios quirúrgicos únicamente en `src/routes/index.tsx` y los estilos exclusivos de estas secciones en `src/styles.css`.
- No se crearán ni externalizarán imágenes nuevas: se reutilizará `src/assets/rckt-hero.jpg`, conforme a la arquitectura del repositorio.
- Se conservarán las animaciones existentes y se adaptarán recortes, espaciado y disposición para escritorio y móvil.

## Verificación

- Revisar Inicio en 1280 px y 390 px mediante capturas.
- Comprobar legibilidad del CTA, encuadre de todas las fotografías, ausencia de desbordes y presencia de los ocho campos de la ficha.
- Confirmar que la compilación automática quede sin errores.
