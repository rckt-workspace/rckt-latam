# FASE 2.5 — Validación Real en Supabase Cloud

**Estado:** Listo para ejecutar contra Supabase Cloud vacío  
**Fecha:** 2026-09-21

---

## 📋 Checklist Pre-Ejecución

### Verificación Estática (COMPLETADA ✅)

- ✅ Migration SQL revisada línea por línea
- ✅ 7 tablas nuevas creadas (no 8)
- ✅ 5 ENUMs creados
- ✅ 3 Storage buckets definidos
- ✅ RLS políticas completas
- ✅ Índices optimizados
- ✅ FK y triggers correctos
- ✅ .env.example limpiado

### Verificación a Ejecutar (PENDIENTE)

- ⏳ Crear proyecto Supabase Cloud NUEVO y VACÍO
- ⏳ Ejecutar `supabase db push`
- ⏳ Verificar tablas, ENUMs, buckets en Supabase Dashboard
- ⏳ Verificar RLS funcionando (anon vs service_role)
- ⏳ Ejecutar seed.sql
- ⏳ Regenerar types TypeScript
- ⏳ Build exitoso

---

## 🚀 Comandos a Ejecutar (en orden)

### PASO 1: Crear Proyecto Supabase Cloud

**Acción manual en [app.supabase.com](https://app.supabase.com):**

1. Haz clic en "New Project"
2. Completa:
   - **Name:** `rckt-latam-validation` (o similar)
   - **Database Password:** Genera una segura (32+ caracteres)
   - **Region:** Selecciona cercana a LATAM (ej: `sa-east-1`)
3. Espera a que se cree (5-10 minutos)
4. Copia el **Project Reference ID** (ej: `abcdefghijklmnop`)
5. Ve a **Settings → API** y copia:
   - **Project URL**
   - **anon/public key**
   - **service_role / secret key**

**⚠️ IMPORTANTE:** Este será un proyecto NEW/EMPTY. Usa solo para validación.

---

### PASO 2: Login en Supabase CLI

```bash
supabase login
```

Se abrirá un navegador. Autentica con tu cuenta Supabase.

---

### PASO 3: Enlazar con el Proyecto

```bash
supabase link --project-ref abcdefghijklmnop
```

Sustituye `abcdefghijklmnop` por tu Project Reference ID.

Te pedirá:
- **Database password:** La contraseña que creaste en Paso 1

Confirma que dice "✔ Linked to project..."

---

### PASO 4: Verificar Enlace

```bash
supabase status
```

**Esperado:**
```
Supabase API Status: healthy
PostgreSQL Status: healthy
```

---

### PASO 5: Aplicar Todas las Migrations

```bash
supabase db push
```

Este comando ejecutará en orden:
1. Históricas (chat_leads, leads, ai_*)
2. **Nueva:** 20260921_001_rckt_latam_foundation.sql

**Esperado:** Sin errores, todas las migrations aplicadas.

---

### PASO 6: Verificar Migrations Aplicadas

```bash
supabase migration list
```

**Esperado:** Todas con estado ✅

---

### PASO 7: Listar Tablas Creadas

```bash
supabase db remote info
```

**Esperado:** Debe mostrar estas 13 tablas:

```
chat_leads (histórica)
leads (histórica)
ai_runtime_config (histórica)
ai_usage_events (histórica)
ai_config_audit (histórica)
vacantes (NUEVA)
postulaciones (NUEVA)
postulacion_eventos (NUEVA)
blog_categories (NUEVA)
blog_posts (NUEVA)
knowledge_documents (NUEVA)
knowledge_chunks (NUEVA)
```

---

## 🔍 Verificaciones en Supabase Dashboard

### Verificación 1: Extensiones

Ve a **SQL Editor** y ejecuta:

```sql
SELECT extname FROM pg_extension WHERE extname IN ('vector', 'pgcrypto');
```

**Esperado:**
```
vector
pgcrypto
```

---

### Verificación 2: ENUMs

```sql
SELECT typname FROM pg_type WHERE typname IN (
  'vacante_estado',
  'postulacion_tipo',
  'postulacion_estado',
  'blog_status',
  'knowledge_status'
);
```

**Esperado:** 5 filas (todos los ENUMs)

---

### Verificación 3: Tablas Nuevas

```sql
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN (
  'vacantes',
  'postulaciones',
  'postulacion_eventos',
  'blog_categories',
  'blog_posts',
  'knowledge_documents',
  'knowledge_chunks'
);
```

**Esperado:** 7 filas (todas las tablas nuevas)

---

### Verificación 4: Storage Buckets

Ve a **Storage** en el panel lateral.

**Esperado:** 3 buckets
- `cvs` (privado)
- `blog-media` (público)
- `knowledge` (privado)

---

### Verificación 5: RLS - Acceso Público a Vacantes

En **SQL Editor**, ejecuta como `anon` role:

```sql
-- Para simular anon, usa:
-- SET ROLE anon;

SELECT COUNT(*) FROM vacantes WHERE estado = 'activa';
```

**Esperado:** 0 (tabla vacía, pero accesible si tuviera datos activos)

```sql
-- Intentar ver borradores (debe fallar)
SELECT COUNT(*) FROM vacantes WHERE estado = 'borrador';
```

**Esperado:** Error o 0 filas (RLS filtra)

---

### Verificación 6: RLS - Acceso Bloqueado a Postulaciones

```sql
SELECT COUNT(*) FROM postulaciones;
```

**Esperado:** Error "permission denied" (anon no puede acceder)

---

### Verificación 7: RLS - Acceso Bloqueado a Blog Drafts

```sql
SELECT COUNT(*) FROM blog_posts WHERE status = 'draft';
```

**Esperado:** Error o 0 filas (RLS deniega drafts para anon)

---

### Verificación 8: RLS - Acceso a Categorías Activas

```sql
SELECT COUNT(*) FROM blog_categories WHERE active = true;
```

**Esperado:** 0 (tabla vacía, pero accesible para anon)

---

## 📦 Aplicar Seed Data

### PASO 8: Ejecutar Seed

```bash
supabase db seed
```

Esto ejecuta `supabase/seed.sql` e inserta:
- 6 categorías de blog

**Esperado:** Sin errores

---

### PASO 9: Verificar Seed

En **SQL Editor:**

```sql
SELECT COUNT(*) FROM public.blog_categories;
```

**Esperado:** 6

```sql
SELECT name, slug FROM public.blog_categories ORDER BY orden;
```

**Esperado:**
```
Inteligencia Artificial | inteligencia-artificial
Growth | growth
Performance | performance
Estrategia digital | estrategia-digital
Automatización | automatizacion
Cultura y tecnología | cultura-y-tecnologia
```

---

## 🔄 Regenerar TypeScript Types

### PASO 10: Generar Types desde Supabase Real

```bash
supabase gen types typescript --linked > src/integrations/supabase/types.ts
```

Este comando:
1. Se conecta a Supabase remoto (linked)
2. Descarga el schema real (incluyendo las 7 nuevas tablas)
3. Genera tipos TypeScript

**Esperado:** Archivo `src/integrations/supabase/types.ts` actualizado con:
- 13 Tables (chat_leads, leads, ai_*, vacantes, postulaciones, blog_*, knowledge_*)
- 5 Enums (vacante_estado, postulacion_tipo, postulacion_estado, blog_status, knowledge_status)
- Types correctos para Insert/Update/Row

---

### PASO 11: Verificar Tipos Generados

```bash
grep -n "vacante_estado\|postulacion_tipo\|blog_status\|knowledge_status" src/integrations/supabase/types.ts | head -10
```

**Esperado:** Líneas mostrando los tipos están definidos

---

## 🏗️ Build Final

### PASO 12: Build Exitoso

```bash
npm run build
```

**Esperado:**
```
✓ built in X.XXs
✓ [nitro] ✔ You can preview this build
```

---

## 📋 Resumen de Verificaciones

### ✅ Tablas (7 nuevas)
- [ ] vacantes
- [ ] postulaciones
- [ ] postulacion_eventos
- [ ] blog_categories
- [ ] blog_posts
- [ ] knowledge_documents
- [ ] knowledge_chunks

### ✅ ENUMs (5)
- [ ] vacante_estado (borrador, activa, cerrada)
- [ ] postulacion_tipo (candidato, servicio)
- [ ] postulacion_estado (nueva, revision, contactado, entrevista, descartado, seleccionado)
- [ ] blog_status (draft, published, archived)
- [ ] knowledge_status (pending, processing, ready, failed)

### ✅ Storage (3 buckets)
- [ ] cvs (privado, 10 MB, PDF)
- [ ] blog-media (público, 50 MB, imágenes)
- [ ] knowledge (privado, 100 MB, documentos)

### ✅ RLS
- [ ] Anon puede leer vacantes activas
- [ ] Anon NO puede leer borradores
- [ ] Anon puede leer posts publicados
- [ ] Anon NO puede leer drafts
- [ ] Anon NO puede consultar postulaciones
- [ ] Anon NO puede consultar knowledge
- [ ] Anon NO puede consultar leads/chat_leads
- [ ] service_role tiene acceso completo

### ✅ Seed
- [ ] 6 categorías de blog insertadas
- [ ] Datos verificables

### ✅ Types
- [ ] TypeScript types regenerados
- [ ] Incluyen todas las tablas nuevas
- [ ] Incluyen todos los ENUMs

### ✅ Build
- [ ] npm run build exitoso
- [ ] Sin errores de compilación

---

## 🛑 Parar Aquí

Una vez completadas todas las verificaciones:

**Entrega a coordinador:**
1. Resultado de `supabase db push` (output completo)
2. Resultado de `supabase migration list`
3. Resultado de verificaciones en SQL Editor (5 screenshots o outputs)
4. Resultado de `supabase db seed`
5. Resultado de `supabase gen types typescript --linked`
6. Resultado de `npm run build`
7. **Cualquier error encontrado y cómo se corrigió**

**NO CONTINÚES CON FASE 3 hasta que coordinador apruebe.**

---

## 📌 Notas Importantes

- Este es un proyecto **VALIDACIÓN** (puede borrarse después)
- Usa solo para verificar que la infrastructure funciona
- Una vez validado, crearemos el proyecto **PRODUCCIÓN** real
- No modifiques código frontend todavía
- Solo infraestructura BD en esta fase
