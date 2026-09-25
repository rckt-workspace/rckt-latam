# Paso A2 — Paridad visual de pie, héroes interiores y CTA final

## Alcance
- Crear `GeneralCta` con la foto local confirmada, dos acciones y el texto LATAM indicado.
- Sustituir los CTA finales públicos existentes y añadir el mismo cierre a las páginas públicas permitidas que hoy terminan directamente en el pie.
- Rehacer `SystemPageHero` con la composición clara de España, conservando el contenido actual y normalizando únicamente los botones que apuntan al diagnóstico.
- Crear `SiteFooter` con las cuatro columnas, enlaces y línea final especificados; `SiteChrome` seguirá siendo el punto compatible de importación para las páginas actuales.

## Datos de contacto
- Importar `contactConfig` sin modificarlo.
- Usar solo valores completos y válidos; los campos ausentes o marcados como provisionales se mostrarán como `[pendiente]`.
- Mantener `#whatsapp` en el CTA porque no existe un enlace colombiano válido en la configuración actual.

## Límites
- No tocar backend, base de datos, integraciones, rutas administrativas, lógica del Blog o del panel, postulación, agente IA, configuración, secretos ni variables de entorno.
- No borrar `@import "tailwindcss"`.
- No crear las rutas actualmente inexistentes de Casos, Recursos o Mercados; solo conservar los enlaces pedidos.

## Verificación
- Confirmar compilación y estado del preview.
- Revisar Home, dos páginas de Sistemas, Soluciones y Nosotros a 1280 y 390 px, en claro y oscuro.
- Confirmar foto/degradado, contraste del CTA, nuevo pie, ausencia de bola gigante y scroll horizontal.
- Comprobar Blog, `/rckt-equipo`, `/ops/login` y el formulario de postulación sin alterar su lógica.
