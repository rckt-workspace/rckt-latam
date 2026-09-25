# Toggle y estructura visual de Inicio alineados con rckt.es

## Alcance

- Sustituir los controles de texto “Claro / Oscuro” del nav de escritorio, drawer móvil y footer por el switch ovalado de España: 52 × 28 px, círculo móvil de 24 px, iconos lineales de sol/luna, transición suave y preferencia persistente.
- Mantener la aplicación actual del tema mediante `data-theme`, sincronizando todos los switches visibles sin alterar navegación ni contenido.
- No modificar el hero de Inicio.

## Inicio

- **Tres problemas:** conservar exactamente títulos, señales y enlaces LATAM; presentar cada entrada con línea vertical, número naranja, título entre comillas, señales corridas separadas por “ · ” y enlace naranja, sin tarjetas, sombras, checks ni decoración propia.
- **Los tres sistemas:** conservar introducción, nombres, descripciones, enlaces y cierre Revenue Engine; convertir el bloque sticky en encabezado superior y grilla de tres tarjetas estilo España, con foto de 160 px, badge S1/S2/S3, flecha circular, nombre corto editorial, kicker, contenido y enlace separado.
- **Prueba:** conservar el contenido LATAM y los ocho campos, simplificándolo a una composición editorial limpia con “Ficha de caso” como cita destacada seguida por la ficha lineal, sin textura ni grilla de dos columnas.
- **CTA final:** conservarlo sin cambios de copy y verificar que mantenga foto, degradado, contenido centrado, botón y línea inferior.

## Detalles técnicos

- Crear el control compartido antes de importarlo en el encabezado y footer.
- Adaptar la versión de Inicio embebida en su marcado actual sin reescribir la ruta completa.
- Cambiar únicamente los selectores de estas secciones; conservar animaciones de entrada compatibles y dejar que `GlobalSectionBlobs` recalcule cantidades por altura.
- Verificar compilación, errores de navegador y capturas a 1280 px y 390 px en ambos temas.
