# Blog "RCKT Insights"

Primera versión completa del blog, con los artículos en archivos locales y una capa de datos preparada para migrar a base de datos más adelante, sin tocar nada de lo que ya funciona.

## Lo que verás al terminar

- **/blog** — portada editorial con título "RCKT Insights", subtítulo, buscador, filtros por categoría (píldoras "Todas" + categorías reales), artículo destacado con mayor jerarquía y grilla de artículos (portada, categoría, título, extracto, fecha, tiempo de lectura, "Leer artículo"). Mensaje "No encontramos artículos con esos criterios." cuando no hay resultados.
- **/blog/[artículo]** — página de lectura con categoría, título, fecha, autor, tiempo de lectura, imagen principal, contenido con títulos/listas/citas/enlaces/imágenes, índice lateral automático (H2/H3) con anclas y espacio para el encabezado fijo, y hasta 3 artículos relacionados.
- **Menú y pie de página** — "Blog" entre "Método" y "Trabaja con nosotros", y también en el pie, usando el mismo encabezado compartido.
- **Panel interno /rckt-equipo** — nueva pestaña "Blog" junto a Vacantes y Postulaciones, con la misma apariencia actual: listado (título, categoría, estado, fecha, acciones), acciones Editar / Duplicar / Publicar-borrador / Archivar / Eliminar, formulario "+ Nuevo artículo" con validaciones y editor Markdown con conmutador Editar / Vista previa, botón "Exportar JSON" (descarga `blog-posts-export.json` con todos los artículos y el mismo formato) y "Restaurar datos originales" con confirmación.
- 6 artículos demo realistas (IA en marketing, growth, performance, estrategia digital, automatización, cultura y tecnología) con fechas y categorías distintas, uno destacado.

## Cómo funciona por dentro

- `src/types/blog.ts` — modelo de post y categoría, con los mismos campos que tendría la futura tabla `blog_posts`.
- `src/data/blog/posts.json` y `categories.json` — contenido semilla (Markdown en `content`).
- `src/lib/blog.repository.ts` — interfaz `BlogRepository` + implementación JSON/localStorage: `getPublishedPosts`, `getAllPosts`, `getPostBySlug`, `getPostsByCategory`, `searchPosts`, `getRelatedPosts`, `savePost`, `deletePost`, `exportPosts`, `resetToSeed`. Ninguna parte de la interfaz importa el JSON ni toca localStorage directamente; se sustituye por una implementación Supabase más adelante sin tocar la UI.
- `src/lib/blog.utils.ts` — slug, formato de fecha, tiempo de lectura, extracción de índice.
- `src/components/blog/` — `BlogHero`, `BlogSearch`, `BlogCategories`, `BlogCard`, `BlogFeatured`, `BlogArticle`, `BlogToc`, `BlogRelated`, `Markdown`, `BlogAdmin`, `BlogEditor`.
- **Markdown seguro**: intérprete propio y pequeño que genera elementos React (H2/H3, párrafos, negritas, listas, enlaces, citas, imágenes). Sin `dangerouslySetInnerHTML` y sin añadir dependencias nuevas.
- **Rutas**: `src/routes/blog.tsx` (listado) y `src/routes/blog.$slug.tsx` (artículo), con `staticData.sitemap` y metadatos propios: título, descripción, canónica, og:title/description/image, `og:type=article`, tarjeta de Twitter y JSON-LD `BlogPosting`.
- **Estilos**: bloque nuevo al final de `src/styles.css` con clases `blog-*`, reutilizando tokens, tipografía, tarjetas y modo claro/oscuro existentes.

## Archivos existentes que se modifican

- `src/components/SiteChrome.tsx` — un enlace "Blog" en el menú y otro en el pie.
- `src/routes/index.tsx` — mismo enlace en el encabezado/pie del home (que tiene su propio marcado).
- `src/routes/rckt-equipo.tsx` — se añade la tercera pestaña "Blog"; Vacantes y Postulaciones quedan intactas.
- `src/styles.css` — solo se añaden estilos nuevos.

## Riesgos y cómo se controlan

- El home duplica el encabezado en su propio marcado: el enlace se añade en ambos sitios para que coincidan.
- El panel es un archivo grande y sensible: la pestaña Blog se añade como componente aparte, sin reescribir el existente.
- Los datos del panel viven solo en el navegador de cada persona hasta que se migre a base de datos; por eso el botón de exportar.
- Sin nuevas tablas, funciones de servidor ni cambios de IA, tal como pediste.

## Validación

`bunx tsc --noEmit`, build, y revisión con navegador real de /blog, /blog/[artículo], home, /trabaja-con-nosotros y /rckt-equipo en claro/oscuro, escritorio y móvil.
