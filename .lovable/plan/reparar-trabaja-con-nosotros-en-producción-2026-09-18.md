# Reparar Trabaja con nosotros en producción

## Cambios
- Reproducir la ruta publicada en navegador y capturar el error exacto de consola y red.
- Sustituir la carga frágil de vacantes por una función controlada con estados de carga, error y reintento.
- Validar y normalizar los registros antes de mostrarlos para tolerar campos nulos o inesperados.
- Añadir un límite de tiempo para que una consulta lenta no deje la sección bloqueada.
- Añadir un límite de error propio de la ruta, conservando el resto de la página y ofreciendo reintento.
- Corregir cualquier causa raíz adicional encontrada sin cambiar diseño, formularios ni datos.

## Validación
- Abrir `/trabaja-con-nosotros` en escritorio y móvil.
- Confirmar los tres textos solicitados, la lista o estado controlado de vacantes y ausencia de errores en consola.
- Revisar el estado de compilación y los registros de producción disponibles.
