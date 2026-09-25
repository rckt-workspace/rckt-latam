# Paso A7 — Mercados LATAM

## Alcance

Crear las cinco rutas públicas de Mercados con la composición de España y contenido LATAM:

- `/mercados/`
- `/mercados/colombia`
- `/mercados/bogota`
- `/mercados/medellin`
- `/mercados/barranquilla`

## Implementación

1. **Mapa de Colombia**
   - Crear `ColombiaMap` a partir del contorno público de Natural Earth, simplificado y convertido a un SVG estático.
   - Mantener tamaño, clases, accesibilidad, variante compacta y animación de España.
   - Ubicar Bogotá, Medellín y Barranquilla según las coordenadas indicadas, con punto naranja, halo y etiqueta `activo`.
   - Permitir resaltar una ciudad en las páginas locales sin añadir librerías ni peticiones externas.

2. **Índice de Mercados**
   - Adaptar literalmente la estructura de `/mercados/` de España.
   - Incluir hero, mapa, ficha de Colombia, enlaces a las tres ciudades y tarjeta externa hacia `rckt.es`.
   - Usar el CTA y vocabulario LATAM aprobados.

3. **Colombia y ciudades**
   - Adaptar la plantilla de Madrid para Colombia y las tres ciudades.
   - Colombia incluirá las seis secciones solicitadas; las ciudades compartirán la misma composición visual con su contenido específico.
   - Los sectores enlazarán a Salud y Educación; los casos enlazarán a `/casos/`.
   - Los datos de contacto inválidos para Colombia se mostrarán como `[pendiente]`; no se modificará `src/config/contact.ts`.
   - El JSON-LD de cada ciudad omitirá `address` mientras no exista una dirección válida en la configuración.

4. **Estilos y enlaces**
   - Copiar las reglas `market-*` de España y adaptar únicamente lo necesario para tres puntos y etiquetas del mapa.
   - Confirmar que la card de Nosotros y el footer resuelvan `/mercados/` sin cambiar su contenido.
   - Añadir metadata única, canonical y `og:url` bajo `https://rckt.lat`.

## Límites

No se modificarán archivos protegidos, integraciones, datos, servicios, formularios, secretos ni variables de entorno. Se conservará `@import "tailwindcss"` como primera regla de estilos.

## Validación

- Compilación automática sin errores.
- Las cinco rutas en 1280 px y 390 px, claro y oscuro: 20 vistas.
- Sin desplazamiento horizontal ni errores de consola.
- Verificación de enlaces, metadata, JSON-LD, mapa, halos y preferencia de movimiento reducido.
- Revisión final de archivos modificados para confirmar que ninguno es protegido.
