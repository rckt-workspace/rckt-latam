# Plan: Los 5 pilares en una sola fila

## Objetivo

Que la sección "Los 5 pilares" se muestre en una sola fila de 5 columnas en escritorio, conservando el diseño responsive en tabletas y móviles.

## Cambios propuestos

1. **Grid de 5 columnas en escritorio**
   - En `src/styles.css`, cambiar `.rckt-site .pilares-grid` de:
     ```css
     grid-template-columns: repeat(3, 1fr);
     ```
     a:
     ```css
     grid-template-columns: repeat(5, 1fr);
     ```

2. **Breakpoints responsive**
   - Entre 561 px y 980 px: mantener 2 o 3 columnas según lo que se vea más equilibrado.
   - Hasta 560 px: 1 columna.

3. **Ajustes finos opcionales**
   - Revisar el espaciado interno (`gap`) y el tamaño de la tipografía dentro de cada tarjeta para que 5 columnas no se sientan apretadas en viewports intermedios (por ejemplo, 1024 px).

## Archivos a modificar

- `src/styles.css`

## Verificación

- Previsualizar en escritorio ancho: 5 tarjetas en una fila.
- Previsualizar en ~1024 px: legible y sin saltos de línea forzados.
- Previsualizar en móvil: apiladas en 1 columna.
