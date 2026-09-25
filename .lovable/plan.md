# Navegación LATAM alineada con España

## Cambios
- Sustituir el drawer móvil por un panel compacto en el flujo, colocado debajo de la píldora y con la misma superficie translúcida, borde y desenfoque.
- Convertir el control móvil en un único botón circular de hamburguesa/X, con tamaños de 36 px y 32 px al hacer scroll.
- Mantener los enlaces, el selector de tema y “Pedir diagnóstico”; marcar en naranja la ruta activa y cerrar al pulsar el control o un enlace.
- Eliminar el overlay, el bloqueo de scroll y el botón X separado.
- Ajustar escritorio al patrón de dos segmentos que se unen al hacer scroll, incluyendo divisor y transición de 600 ms con `cubic-bezier(0.16,1,0.3,1)`.
- Aplicar el mismo encabezado compartido al Inicio sin cambiar el contenido de la página.

## Verificación
- Probar Inicio y una página de Sistemas a 375 px y 414 px, en claro y oscuro.
- Confirmar que el panel desplaza el contenido, cambia hamburguesa/X y cierra desde el control y los enlaces.
- Probar escritorio antes y después de scroll, en ambos temas, y revisar capturas y errores.

## Detalles técnicos
- Mantener intactos el comportamiento del tema, las rutas y las integraciones existentes.
- Hacer cambios quirúrgicos en el encabezado compartido, el marcado embebido de Inicio y sus estilos de navegación.
