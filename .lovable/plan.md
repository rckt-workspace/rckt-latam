# Paso 6 — Nosotros, Cómo trabajamos y Trabaja con nosotros

## /nosotros/ (reconstrucción completa)
Orden, con componentes ya portados (SystemPageHero, SectionHeader, SystemSection, SystemFinalCta, manchas globales):
1. Hero — copy actual de LATAM + extra grande "Del clic al cierre." (patrón España).
2. Manifiesto — tarjeta de cita destacada con el texto de marca aprobado.
3. En una frase — solo SectionHeader. Texto propuesto (con vocabulario LATAM): "No vendemos pauta suelta, webs ni chatbots. Diseñamos y operamos el sistema entre la inversión en marketing y la venta."
4. Grid 2 columnas — "Lo que somos" (banda naranja, 4 puntos literales del manual) / "Lo que no somos" (contenido actual).
5. Los 5 pilares + "En la práctica" — mismo copy, layout pillar-grid de España.
6. Principios — 6 tarjetas con ícono (Database, ShieldCheck, UserRoundCheck, Layers, Lock, PackageOpen), texto literal que enviaste.
7. A quién servimos — párrafo que enviaste.
8. Tarjetas de enlace — **propuesta: solo "Cómo trabajamos"** a ancho completo; la de "Mercados" se agrega en el Paso 7.
9. CTA final compartido.

Títulos con acento para los SectionHeader (nuevos, para aprobar):
- 02 Manifiesto: "Lo que *creemos*."
- 03 En una frase: "Qué hacemos, en una *frase*."
- 04 Identidad: "Lo que somos y lo que *no*."
- 05 Pilares: "Cinco *pilares*."
- 06 Principios: "Seis *principios* que no negociamos."
- 07 A quién servimos: "A quién *servimos*."

## /nosotros/como-trabajamos
Hoy está en formato viejo (subpage-hero, three-grid, metodo-grid). Se reconstruye con:
- SystemPageHero con el copy actual.
- 01 Tres modalidades (Operar / Sprint / Partner) → tarjetas CapabilityCards.
- 02 Base común → RuleList.
- 03 Escalera de cuenta (hasta Growth OS) → AcceptanceSteps (pasos conectados).
- CTA final compartido.
Solo se usa copy existente. Si al comparar con España aparece una sección que LATAM no tiene, te la muestro antes de redactarla (no se rellena por defecto).

## /trabaja-con-nosotros
Sin cambios de estructura ni contenido. Solo se revisa paleta, tipografías y manchas; se corrigen colores o fuentes fuera de la base del Paso 1 si aparecen.

## Verificación
Las tres páginas en escritorio (1280) y celular (390), claro y oscuro; TypeScript y compilación limpios.

## Detalles técnicos
- Archivos: src/routes/nosotros.index.tsx, src/routes/nosotros.como-trabajamos.tsx, src/styles.css (bloques pillar-grid, principles, identity grid, manifesto portados de España). head(), JSON-LD y errorComponent se conservan.
- Sin cambios en backend, API ni formularios.
