# Paso 3: reconstrucción de Sistemas

## Objetivo
Reconstruir `/sistemas` y sus cinco páginas con los componentes reales y el tratamiento visual de RCKT España, manteniendo el contenido, metadatos, formulario e integraciones actuales de RCKT LATAM.

## Componentes compartidos
- Portar `SystemPageHero`, `CapabilityCards`, `RuleList`, `AcceptanceSteps` y `FaqSection` desde la referencia de España.
- Adaptarlos a la estructura global existente de LATAM: `SiteHeader`, `SiteFooter`, paleta de cuatro colores, tipografías y sistema único de manchas.
- Crear un CTA final compartido basado en el cierre ya aprobado de Inicio, usando `rckt-cta.jpg`, degradado oscuro, glow, línea naranja superior y “IA SUPERVISADA Y DOCUMENTADA”.
- Incorporar los estilos exactos necesarios de España sin sustituir ni reorganizar estilos ajenos.

## Orden de reconstrucción
1. **Revenue Diagnostic**
   - Hero con su copy LATAM y CTA al formulario de la misma página.
   - Convertir alcance a `CapabilityCards`, límites/requisitos a `RuleList` y proceso a `AcceptanceSteps`.
   - Conservar intactos `DiagnosticForm`, WhatsApp, confirmación y envío a `leads_diagnostic`.
   - Migrar sus tres preguntas existentes a `FaqSection` y añadir su JSON-LD.

2. **Demand System**
   - Hero, resumen, capacidades, niveles, exclusiones, regla, perfil adecuado, aceptación y FAQ.
   - Conservar literalmente el copy LATAM existente; usar los criterios y FAQ de España solo para los huecos actuales, con vocabulario LATAM.

3. **Sales Flow**
   - Hero, problema, componentes, exclusiones, reglas, perfil adecuado, aceptación y FAQ.
   - Mantener “La web nunca se vende sola” y el texto específico de prospectos/WhatsApp de LATAM.

4. **Operations System**
   - Hero, problema, sprint, catálogo, exclusiones, reglas, perfil adecuado, aceptación y FAQ.
   - Mantener “Mercadeo”, el rango de 6–8 semanas y el catálogo actual.

5. **Revenue Engine**
   - Hero, problema, capacidades, compromiso, medición, escalera, aceptación y FAQ.
   - Mantener los ocho elementos actuales, el compromiso de seis meses y la escalera de cuenta.

6. **Índice `/sistemas`**
   - Hero con el copy actual.
   - Diagrama visual: Demand + Sales Flow = Revenue Engine; Revenue Engine + Operations = Growth OS.
   - Cinco accesos: tres tarjetas fotográficas con `SystemCards` y dos tarjetas para Revenue Diagnostic y Revenue Engine.
   - CTA final compartido.

## Títulos editoriales nuevos propuestos
Estos títulos completan el patrón de cuatro partes de `SectionHeader`; no reemplazan el contenido explicativo existente.

### Revenue Diagnostic
- El problema: **“Sin línea base, cualquier decisión es una *apuesta*.”**
- Qué incluye: **“Primero encontramos la *fuga*.”**
- Qué no incluye: **“Diagnosticar no es *implementar*.”**
- Requisitos: **“Para medir, necesitamos ver el sistema *completo*.”**
- Cómo empieza: **“Medimos antes de mover una *pieza*.”**
- Formulario: **“Cuéntanos cómo está hoy tu *operación*.”**

### Demand System
- El problema: **“Los leads baratos pueden salir muy *caros*.”**
- Qué incluye: **“Demanda medida hasta la *venta*.”**
- Niveles: **“La intensidad cambia; la regla no.”**
- Qué no incluye: **“La pauta no arregla lo que pasa *después*.”**
- Reglas: **“Nunca optimizamos por costo por *lead*.”**
- Para quién: **“Oferta probada, proceso comercial y CRM *funcionando*.”**
- Cómo empieza: **“Primero conectamos la medición de extremo a *extremo*.”**

### Sales Flow
- El problema: **“El prospecto llega. La fuga empieza *después*.”**
- Qué incluye: **“Cada prospecto con respuesta, seguimiento y *dueño*.”**
- Qué no incluye: **“Conectar la venta no significa hacerlo *todo*.”**
- Reglas: **“La web nunca se vende *sola*.”**
- Para quién: **“Cuando vender exige una conversación *humana*.”**
- Cómo empieza: **“Probamos el flujo completo con prospectos *reales*.”**

### Operations System
- El problema: **“Repetir cien veces no debería costar cien *veces*.”**
- Cómo empieza: **“Un proceso, ocho semanas, una línea base.”**
- Qué incluye: **“Automatizamos procesos con un humano donde *importa*.”**
- Qué no incluye: **“No automatizamos lo que todavía no tiene *dueño*.”**
- Reglas: **“Sin línea base no hay *sprint*.”**
- Para quién: **“Alto volumen, reglas claras y datos *accesibles*.”**
- Cómo se mide: **“Costo, tiempo, excepciones y horas *liberadas*.”**

### Revenue Engine
- El problema: **“Tres herramientas separadas producen tres versiones de la *verdad*.”**
- Qué incluye: **“Todo el sistema, un solo *responsable*.”**
- Compromiso: **“Seis meses para demostrar un ciclo *completo*.”**
- Cómo se mide: **“Una cifra: cuánto cuesta cada cliente *nuevo*.”**
- Cómo empieza: **“La cuenta crece por etapas, no de golpe.”**
- Aceptación: **“Día 30: sistema operativo. Día 90: resultado contra línea base.”**

### Índice
- Arquitectura: **“Cinco puertas, una sola cadena de *ingresos*.”**
- Sistemas: **“Elige por la fuga, no por el nombre.”**
- Combinaciones: **“Los sistemas crecen cuando la cuenta está *lista*.”**

`FaqSection` conservará su encabezado propio de España: **“Lo que nos preguntan.”**

## Contenido faltante y criterio
- Las FAQ completas de Demand, Sales Flow, Operations y Revenue Engine no existen hoy en LATAM. Se tomarán de la referencia de España y solo se localizarán términos: “coste”→“costo”, “stock”→“inventario”, “marketing”→“mercadeo” y “lead”→“prospecto” cuando el copy LATAM ya usa ese término.
- Los criterios de aceptación que faltan en LATAM se portarán de España porque son necesarios para `AcceptanceSteps`; no se agregarán promesas comerciales distintas a las ya documentadas en el proyecto.
- No se tocarán archivos protegidos, APIs, base de datos, autenticación ni servicio de IA.

## Verificación
- Revisar las seis páginas en 1280 px y 390 px, en tema claro y oscuro.
- Capturar cada página completa por tramos, comprobando hero, todos los bloques, FAQ, CTA, encuadre y ausencia de desbordes.
- Probar apertura/cierre de FAQ, enlaces y envío visual del formulario sin crear registros de prueba.
- Comprobar metadatos únicos, JSON-LD FAQ y que no queden referencias a RCKT.es/España.
- Confirmar compilación limpia y ausencia de errores en la vista previa.
