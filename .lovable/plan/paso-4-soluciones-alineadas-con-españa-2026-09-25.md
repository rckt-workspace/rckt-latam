# Paso 4 — Soluciones alineadas con España

## Cambios

- Portar sin alterar la referencia los componentes propios de Soluciones: tarjetas de señales, embudo visual y tarjetas de hitos.
- Reconstruir `/soluciones/` con el hero compartido, tres tarjetas fotográficas y el CTA final compartido. Las imágenes de referencia se copiarán físicamente al repositorio LATAM.
- Reconstruir Captación y cierre con señales, embudo, Revenue Engine, hitos de 30/60/90 días, la ficha de método LATAM ya existente y el bloque “Para quién no es”.
- Reconstruir Ecommerce rentable con señales, Demand System, los tres cambios de 90 días y “Para quién no es”.
- Reconstruir Operación con señales, Operations System y “Para quién no es”; no se añadirá contenido de España que no exista en LATAM.
- Usar `SectionHeader` en todos los bloques y `SystemPageHero` en las cuatro páginas, conservando literalmente el copy LATAM.
- Usar `SystemFinalCta` en las cuatro páginas, con foto, degradado, glow y “IA supervisada y documentada”.
- Dejar `FaqSection` preparado con una lista vacía en las tres páginas de detalle; no renderizará contenido ni JSON-LD hasta el Paso 9.
- Mantener el sistema global de manchas y la paleta ya instalados, sin manchas dentro de heroes, fondos oscuros ni CTA.

## Títulos editoriales nuevos propuestos

- Índice — Tres puertas de entrada: **“El problema decide por dónde empezamos.”** Apoyo: “Captación y cierre, ecommerce rentable u operación: primero ubicamos la fuga.”
- Captación — Señales: **“La venta se pierde antes de llegar al cierre.”** Apoyo: “WhatsApp, tiempos de respuesta, citas y atribución dejan señales concretas.”
- Captación — Embudo: **“Seis pasos. Seis lugares donde se pierde una venta.”** Apoyo: “Seguimos el recorrido completo desde la inversión hasta el cierre.”
- Captación — Lo que hacemos: **“Un solo sistema del clic al cierre.”** Apoyo: “Revenue Engine une Demand y Sales Flow bajo un responsable y una fuente de verdad.”
- Captación — 90 días: **“Tres cortes para medir el cambio.”** Apoyo: “Día 30, día 60 y día 90 contra la misma línea base.”
- Captación — Prueba: **“El método antes que el titular.”** Apoyo: “La ficha describe cómo medimos esta puerta sin presentar un caso de cliente.”
- Ecommerce — Señales: **“El ROAS no cuenta toda la historia.”** Apoyo: “Creatividad, catálogo, WhatsApp y costo de adquisición muestran dónde se pierde margen.”
- Ecommerce — Lo que hacemos: **“Demanda que se lee en el margen.”** Apoyo: “Demand System, con Sales Flow cuando WhatsApp pesa en la conversión.”
- Ecommerce — 90 días: **“Tres cambios que sí llegan al negocio.”** Apoyo: “Creatividad, margen y conversación dentro del mismo sistema.”
- Operación — Señales: **“Lo repetitivo ya está costando demasiado.”** Apoyo: “Tiempo, datos duplicados, reportes manuales y errores revelan el proceso a intervenir.”
- Operación — Lo que hacemos: **“Un proceso a la vez, con supervisión humana.”** Apoyo: “Un Sprint de 6–8 semanas y aprobación humana en lo que importa.”
- Todas — Para quién no es: **“La base también tiene que estar lista.”** El texto de apoyo seguirá siendo el ya existente en cada página.

## Verificación

- Comparar las cuatro páginas con España sección por sección.
- Probar 1280 px y celular, en claro y oscuro, revisando encuadre, legibilidad, navegación y ausencia de desbordes.
- Confirmar que las FAQ vacías no generen contenido ni marcado estructurado.
- Ejecutar las comprobaciones de tipos y compilación y revisar los errores de la vista previa.

## Detalles técnicos

- No se modificarán APIs, formularios, backend, archivos protegidos ni el proyecto de España.
- Los nuevos componentes serán copias locales adaptadas únicamente a los tokens y convenciones existentes de LATAM.
