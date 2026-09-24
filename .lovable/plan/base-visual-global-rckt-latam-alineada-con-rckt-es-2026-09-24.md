# Base visual global RCKT LATAM alineada con rckt.es

## Objetivo

Aplicar en LATAM la capa visual aprobada de RCKT España sin modificar textos existentes, rutas, estructura de contenido, formularios, navegación funcional ni integraciones.

## Implementación

- Sustituir los tokens visuales globales por la paleta cerrada `#f5f2ed`, `#212121`, `#fc5c1f` y `#f7ebe1`; sombras, transparencias y degradados usarán únicamente mezclas de esos cuatro colores.
- Normalizar colores literales en la interfaz pública, estados, SVG y estilos inline. No se tocarán archivos protegidos de backend, APIs, infraestructura, base de datos ni el agente conversacional.
- Establecer Switzer como tipografía general; limitar Newsreader a acentos editoriales; limitar Inter Tight a títulos de hero y Homemade Apple a destacados dentro de esos títulos. Retirar Homemade Apple del CTA final y cualquier uso no permitido, además de Caveat si aparece.
- Eliminar el grano global y la constelación continua. Incorporar el sistema de manchas puntuales de España, calculado por altura de sección y excluyendo heroes, cierres fotográficos y bandas naranjas.
- Alternar automáticamente los fondos de secciones de contenido entre Warm White y el fondo alterno claro, con la variante oscura aprobada.
- Unificar tarjetas y superficies con el tratamiento translúcido, borde charcoal y sombra suave de `card-kraft`, eliminando texturas y bordes cromáticos decorativos.
- Ajustar visualmente heroes, CTA finales, navegación y footer al patrón de España, conservando el marcado, copy y destinos actuales. La línea explícitamente solicitada “IA supervisada y documentada” se añadirá a los CTA finales que no la tengan; no se inventará ningún otro texto ni botón.
- Mantener intactas la lógica del menú, el selector de tema, formularios, API calls y `AdvisorChatLauncher`.

## Alcance técnico

- Cambios concentrados en estilos globales y, solo donde sea necesario, en componentes visuales compartidos y marcado decorativo de rutas públicas.
- El proyecto de España se usa únicamente como referencia de lectura; no se modifica.
- No se tocarán `package.json`, lockfiles, configuración de despliegue, `src/routes/api/**`, `src/integrations/supabase/**`, `services/ai/**`, `supabase/**` ni otros archivos protegidos.

## Validación

- Auditoría automatizada para confirmar que los colores visibles proceden exclusivamente de los cuatro tonos permitidos o sus transparencias/mezclas.
- Comprobación de fuentes para asegurar que Inter Tight y Homemade Apple solo aparezcan en heroes y que no exista Caveat.
- Revisión visual de Inicio, Demand System, Salud/Estética/Odontología y Nosotros a 1280 px y 390 px, en claro y oscuro.
- Comprobación del nav, alternancia de fondos, manchas por sección, tarjetas, heroes y CTA finales, además de compilación sin errores.
