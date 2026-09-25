# Paso A6 — páginas corporativas y editoriales con diseño de España

## Alcance

Reconstruir únicamente la presentación pública de las páginas indicadas, usando como referencia literal el proyecto local de España y conservando intactas todas las integraciones, formularios y áreas protegidas de LATAM.

## Implementación

1. **Nosotros**
   - Sustituir la composición actual por la estructura de España: hero, manifiesto premium, “En una frase”, doble bloque “Lo que somos / Lo que no somos”, cinco pilares en fila con “En la práctica”, principios, “A quién servimos” y dos enlaces finales.
   - Aplicar exactamente los textos LATAM entregados y conservar “prospecto”.
   - Añadir la tarjeta de Mercados con el enlace solicitado.

2. **Cómo trabajamos**
   - Portar la composición de España: tres modalidades, seis condiciones, escalera de cinco niveles con plazos, línea ascendente y triggers.
   - Excluir “Cadencia” y “Cómo medimos”.
   - Adaptar únicamente el vocabulario regional y el botón del diagnóstico.

3. **Trabaja con nosotros**
   - Mantener sin cambios la consulta de vacantes, sus estados, modal, navegación a la postulación y `PostulacionForm`.
   - Aplicar alrededor la presentación de España: hero, tarjetas de cultura, listado/estado de vacantes y ficha visual del formulario de aliados.
   - No modificar campos, validación, carga de PDF ni envío.

4. **Casos**
   - Crear `/casos/` con la estructura de España: hero, manifiesto con cifra tachada, anatomía de ocho campos con índice fijo, filtros y dossiers sellados.
   - Aplicar las ciudades, sectores, regla regional y textos LATAM indicados.
   - Mantener el catálogo vacío hasta disponer de casos reales; no inventar resultados.

5. **Recursos sobre el Blog real**
   - Crear `/recursos/` con hero, buscador, chips, artículo destacado y grilla de España.
   - Reutilizar en modo lectura el repositorio y tipos actuales del Blog, sin modificarlos.
   - Usar categorías reales, destacar el artículo publicado más reciente y enlazar cada tarjeta a `/blog/$slug`.
   - Manejar carga, fallo y ausencia con el estado vacío aprobado, sin alterar `/blog`, sus artículos ni el panel.

6. **Contacto**
   - Portar el hero y la composición de dos columnas de España.
   - Mantener `DiagnosticForm` y su envío intactos; solo cambiar su contenedor visual y la etiqueta enviada mediante su prop existente.
   - Ordenar canales como WhatsApp, Formulario de calificación y Llamada; usar `#whatsapp` como destino pendiente y mostrar `[pendiente]` donde la configuración protegida no tenga datos válidos.

7. **Legales**
   - Igualar la presentación de las tres páginas legales con España mediante el componente visual compartido, sin alterar el contenido jurídico LATAM.
   - Cambiar únicamente el título visible de Privacidad a “Aviso de privacidad”.
   - Conservar los redireccionamientos 301 antiguos y los PDF públicos.

8. **Navegación, pie y estilos**
   - Confirmar “Recursos” hacia `/recursos/` en navegación y pie, sin cambiar otros enlaces ni contenidos.
   - Portar solo los bloques CSS necesarios de España, eliminando conflictos equivalentes y conservando `@import "tailwindcss"` como primera regla.
   - Mantener los componentes globales actuales, incluido el agente.

## Validación

- Comparar las **nueve rutas nombradas** (seis páginas principales y tres legales; el pedido dice ocho, pero enumera nueve) en 1280, 1024 y 390 px, claro y oscuro.
- Probar filtros de Casos y Recursos, enlace de cada recurso, estados vacío/error y navegación.
- Verificar `/blog`, un artículo real, `/rckt-equipo`, `/ops/login`, postulación y diagnóstico sin cambios funcionales.
- Confirmar compilación, ausencia de errores de consola y scroll horizontal.
- Auditar que ningún archivo protegido, secreto o variable de entorno cambió y reportar archivos portados y cualquier `[PENDIENTE]`.

## Decisión necesaria detectada

`/mercados/` no existe actualmente en LATAM y crear su contenido no forma parte de A6. Mantendré la tarjeta solicitada, pero no inventaré esa página. Además, mientras `rckt.lat` siga sin estar activo, los canonicals deben apuntar al dominio publicado `https://rckt-latam.lovable.app`; se podrán cambiar a `https://rckt.lat` cuando el dominio esté operativo.
