# Plan de implementación — Paridad visual total con RCKT España

## Objetivo

Alinear RCKT LATAM visualmente con la referencia RCKT España en colores, tipografías, tamaños, espaciados, animaciones, manchas, navegación, heroes, tarjetas y estructura de secciones.

Se conservarán sin cambios:

- Todo el copy aprobado de LATAM.
- La lógica y los datos reales del Blog.
- Contacto sin “Llamada agendada”.
- Nosotros sin la tarjeta “Mercados”.
- Formularios, autenticación, APIs, base de datos, panel, agente y demás integraciones.

## Orden de implementación

### 1. Estabilizar la base global

- Corregir la máquina de escribir de Inicio con una marca de inicialización que impida vaciar dos veces la palabra destacada.
- Consolidar `hero-hand` en una única regla equivalente a España: Homemade Apple, `.98em`, línea `1`, rotación `-2deg`, origen centrado y `padding-inline`.
- Eliminar únicamente las reglas heredadas que fuerzan Switzer sobre esa palabra.
- Añadir la inicialización temprana del tema en el documento para aplicar claro/oscuro antes del primer render.
- Unificar tokens compartidos de superficie, borde, sombra, tipografía y transición con los valores de España, sin reemplazar colores ni requisitos regionales de LATAM.

### 2. Navegación y footer

- Sustituir `NosotrosDropdown` por un enlace directo “Nosotros”.
- Eliminar su marcado, estado, estilos de submenu y listeners imperativos asociados.
- Dejar un único controlador del menú móvil y una limpieza correcta de listeners.
- Igualar desktop y móvil con España: breakpoints, umbral de scroll, dos cápsulas que se fusionan, posición fija, tamaños, blur y easing.
- Ajustar el footer al grid `1.4fr 1fr 1.2fr 1fr`, separación de 48 px, padding 64/80 px e interlineado de 24 px.
- Mantener los enlaces, correo y política de tratamiento propios de LATAM; no añadir teléfono, dirección ni horario.

### 3. Heroes y cierre fotográfico compartidos

- Portar la estructura real de `SystemPageHero` de España.
- Aplicar fondo oscuro, texto claro, Inter Tight, máximo aproximado de 52 px, tracking, padding superior de 140 px y padding inferior de 80 px.
- Incorporar soporte visual para contexto, cita y divisor, conservando las props necesarias para el copy LATAM.
- Mantener el Blog conectado a sus datos; solo heredará el hero visual compartido.
- Homologar `SystemFinalCta` con el CTA español: mismo overlay, línea superior, glow de 900×650 px en `top:-80px; right:-120px`, espaciado, tipografía y pie “IA supervisada y documentada”.
- Reutilizar este CTA en todas las páginas que hoy usan el cierre compartido, sin modificar destinos ni lógica.

### 4. Inicio

- Sustituir el hero HTML heredado por JSX equivalente al componente real de España.
- Mantener palabra por palabra el copy LATAM, sus destinos y la imagen aprobada.
- Igualar H1 a 58 px en escritorio y 34 px en móvil, tracking `-0.045em`, ancho máximo de 896 px y ritmo vertical español.
- Implementar la escritura de la palabra destacada desde React, protegida contra doble inicialización y compatible con reducción de movimiento.
- Igualar las secciones Tres problemas, Tres sistemas, Prueba y CTA en padding, grid, radios, bordes, sombras y animaciones.
- Retirar solo el JavaScript imperativo que quede sustituido por componentes/efectos controlados.

### 5. Cinco páginas de Sistemas

Reconstruir cada ruta con la composición de su equivalente español, manteniendo el contenido LATAM ya aprobado:

- **Revenue Diagnostic:** hero con contexto/cita; bloques, tarjetas estadísticas, bandas y formulario en el mismo orden visual de España.
- **Demand System:** banda naranja, stat cards, secciones de medición y condiciones con la geometría española.
- **Sales Flow:** composición específica de flujo, cards y bandas en lugar de la plantilla genérica.
- **Operations System:** portar la tabla real de tres columnas, además de sus bandas y tarjetas específicas.
- **Revenue Engine:** reproducir la composición condensada y los bloques propios de España.

En las cinco rutas:

- Conservar las 24 FAQ y su JSON-LD.
- Conservar formularios, enlaces y lógica.
- Sustituir solamente la presentación genérica que no exista en España.
- Mantener el copy LATAM dentro de los componentes visuales equivalentes.

### 6. Soluciones

- Mantener la estructura ya equivalente de Captación y cierre, corrigiendo solo valores visuales divergentes.
- Completar Ecommerce rentable hasta las mismas siete secciones visuales de España.
- Completar Operación hasta las mismas siete secciones visuales de España.
- Reubicar el copy LATAM existente dentro de los bloques equivalentes; no inventar mensajes comerciales nuevos.
- Igualar paneles sticky, columnas, cards, hitos, bandas, radios, paddings y transiciones.

### 7. Cómo trabajamos

- Portar los componentes reales de España para:
  - tarjetas con aparición escalonada;
  - chips de condiciones;
  - escalera ascendente;
  - línea diagonal a `-7deg`;
  - peldaños con desplazamiento progresivo;
  - tabla de triggers;
  - flechas entre estados.
- Mantener el contenido y enlaces de LATAM.
- Respetar `prefers-reduced-motion` y retirar los bloques genéricos que estas piezas sustituyen.

### 8. Nosotros

- Rehacer únicamente “Lo que somos / no somos” con la estructura española:
  - banda naranja sólida;
  - tarjeta neutra;
  - iconos Check/X;
  - padding 32 px móvil y 40 px escritorio;
  - radio 8 px.
- Mantener el copy LATAM.
- Mantener omitida la tarjeta Mercados.
- Conservar el resto de la página, corrigiendo solo valores globales de paridad.

### 9. Legales

- Reemplazar el hero y bloque separado por un único contenedor `max-w-3xl` como España.
- Aplicar padding superior 128/160 px, H1 36/52 px y cuerpo de 15.5 px.
- Quitar “Volver al inicio”.
- Añadir al final `> sistema activo · 2026`.
- Conservar literalmente todo el contenido legal de LATAM y las rutas `/legal/*`.
- Mantener las redirecciones 301 existentes sin tocar sus endpoints.

### 10. Espaciados, tarjetas y manchas

- Normalizar por familia de página:
  - secciones amplias: 128 px escritorio / 80 px móvil;
  - secciones estándar: 96 px escritorio / 64 px móvil;
  - tarjetas de sistemas: radio 20 px;
  - excepciones de España: radio 8 px donde su componente original lo use.
- Igualar bordes, transparencias, sombras, anchos de contenedor y gutters con la referencia.
- Homologar `GlobalSectionBlobs` con las exclusiones de España: `.system-page-hero`, `#top`, `.general-cta`, `.band--orange` y fondos fotográficos/oscuros.
- Mantener una sola instancia global, `ResizeObserver`, alternancia de layouts y umbrales 450/1100 y 360/880.
- Verificar conteo de 1/2/3 manchas y posiciones strong/soft/muted por sección y tamaño de pantalla.

## Límites técnicos

- No modificar `src/routes/api/**`, `services/ai/**`, `supabase/**`, Docker, configuración de despliegue ni integraciones protegidas.
- No cambiar repositorios, consultas, búsqueda, categorías ni destacados del Blog.
- No añadir el canal “Llamada agendada”.
- No añadir Mercados.
- No cambiar endpoints, payloads, formularios, autenticación ni datos.
- La referencia España se mantendrá estrictamente en solo lectura.
- Los cambios serán quirúrgicos por componente; no se regenerará el proyecto.

## Validación por fases

Después de cada bloque principal:

1. Revisar la ruta en 1280 px y 390 px.
2. Revisar tema claro y oscuro.
3. Comparar captura LATAM contra España para estructura, tamaño, espaciado y estados de scroll.
4. Confirmar ausencia de desbordamiento horizontal y solapamientos.
5. Probar menú móvil, fusión del nav y preferencia de tema persistida.
6. Probar máquina de escribir con montaje y remontaje repetidos.
7. Probar acordeones FAQ y confirmar JSON-LD en las cinco páginas de Sistemas.
8. Probar formularios sin enviar datos reales y verificar que sus handlers no cambien.
9. Comprobar Blog con estados de carga, vacío y datos disponibles sin modificar su repositorio.
10. Ejecutar la validación TypeScript y la compilación requeridas por el proyecto.
11. Revisar los logs de compilación, consola, ejecución y red antes de cerrar.

## Criterio de finalización

El trabajo se considerará terminado cuando las páginas solicitadas reproduzcan la composición de España en escritorio y móvil, claro y oscuro, conservando únicamente las excepciones regionales indicadas y sin regresiones funcionales ni cambios de backend.
