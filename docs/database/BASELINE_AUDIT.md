# RCKT LATAM Database Baseline Audit

**Fecha de auditoría:** 2026-09-21  
**Etapa:** FASE 1 — Auditoría completa del estado actual de Supabase

---

## 1. Resumen Ejecutivo

Existe una **inconsistencia crítica** en el proyecto:

- **Tipos TypeScript** (`src/integrations/supabase/types.ts`) definen 7 tablas
- **Migraciones SQL** (`supabase/migrations/`) solo crean 4 tablas
- **3 tablas están documentadas pero no existen en las migrations:**
  - `vacantes` (usado en `/trabaja-con-nosotros`)
  - `postulaciones` (usado en `PostulacionForm`)
  - `postulacion_eventos` (referenciado en tipos pero no usado en código)

Esta inconsistencia significa que:

1. Código depende de tablas que no existen en las migrations
2. No es posible recrear la base desde cero usando solo `supabase/migrations/`
3. Supabase Cloud podría divergir de lo que el código espera

---

## 2. Tablas en Tipos TypeScript Generados

### Tablas documentadas en `src/integrations/supabase/types.ts`

| Tabla               | Enums              | Campos clave                                | Relaciones             | Existe en migrations |
| ------------------- | ------------------ | ------------------------------------------- | ---------------------- | -------------------- |
| `vacantes`          | `vacante_estado`   | id, slug, titulo, estado, fecha_publicacion | posts postulaciones FK | ❌ NO                |
| `postulaciones`     | `postulacion_tipo` | id, vacante_id, tipo, email, estado         | FK a vacantes          | ❌ NO                |
| `chat_leads`        | —                  | id, session_id, name, email, messages       | —                      | ✅ SÍ                |
| `leads`             | —                  | id, name, email, company, concern           | —                      | ✅ SÍ                |
| `ai_runtime_config` | —                  | id, active_agent_profile, routing_mode      | —                      | ✅ SÍ                |
| `ai_usage_events`   | —                  | id, request_id, agent_profile, provider     | —                      | ✅ SÍ                |
| `ai_config_audit`   | —                  | id, config_version, fields_changed          | —                      | ✅ SÍ                |

### Enums documentados

```
vacante_estado: "activa" | "cerrada"
postulacion_tipo: "candidato" | "servicio"
```

---

## 3. Migraciones Existentes

### Timeline de migraciones

| Timestamp        | Descripción                   | Tablas creadas    | RLS           |
| ---------------- | ----------------------------- | ----------------- | ------------- |
| `20260521145555` | chat_leads init               | chat_leads        | ✅ habilitado |
| `20260521145605` | set_updated_at helper         | (función)         | —             |
| `20260522110255` | chat_leads RLS policy         | —                 | restrictiva   |
| `20260709092349` | leads init                    | leads             | ✅ habilitado |
| `20260709092401` | leads: denegar acceso público | —                 | restrictiva   |
| `20260814152509` | leads: security lockdown      | —                 | restrictiva   |
| `20260829000001` | ai_runtime_config             | ai_runtime_config | ✅ habilitado |
| `20260829000002` | ai_usage_events               | ai_usage_events   | ✅ habilitado |
| `20260829000003` | ai_config_audit               | ai_config_audit   | ✅ habilitado |

### Tablas realmente creadas por migrations

1. **chat_leads** (mayo 2026)
   - Campos: id, session_id, name, company, email, phone, messages (JSONB), user_agent, timestamps
   - Índices: email, created_at DESC
   - RLS: RESTRICTIVE (deny_all_public_access)
   - Trigger: set_updated_at

2. **leads** (julio 2026)
   - Campos: id, created_at, name, email, company, website, concern, source, user_agent
   - RLS: RESTRICTIVE (leads_deny_public)
   - Evolucionó: originalmente permitía INSERT público → actualmente service_role only

3. **ai_runtime_config** (agosto 2026)
   - Configuración del runtime de LLM
   - Solo 1 registro: DEFAULT VALUES
   - RLS: RESTRICTIVE (deny_public_access)
   - Campos: routing_mode, providers, budgets, timeouts, version, updated_at, updated_by

4. **ai_usage_events** (agosto 2026)
   - Registro de llamadas a LLM
   - Índices: created_at DESC, agent_profile, provider
   - RLS: RESTRICTIVE

5. **ai_config_audit** (agosto 2026)
   - Auditoría de cambios en ai_runtime_config
   - RLS: RESTRICTIVE

---

## 4. Inconsistencias Detectadas

### 🔴 CRÍTICA: Tablas faltantes

Las tablas más importantes del producto NO tienen migrations:

#### `vacantes`

**Dependencia directa:** `/trabaja-con-nosotros` → `getActiveVacancies()` → SELECT de vacantes  
**Usar en código:** `src/lib/vacantes.functions.ts` líneas 58-100  
**Campos en tipos:** id, slug, titulo, area, modalidad, ubicacion, descripcion, requisitos, estado, fecha_publicacion, created_at

#### `postulaciones`

**Dependencia directa:** `PostulacionForm.tsx` → supabase.from("postulaciones").insert()  
**Usar en código:** `src/components/PostulacionForm.tsx` líneas 93-100  
**Campos en tipos:** id, vacante_id, tipo, nombre, email, telefono, portafolio_url, mensaje, cv_url, fecha  
**Falta en el código pero está en tipos:** estado, notas_internas, source, consent_at

**Enums en tipos:** `postulacion_tipo` (candidato | servicio) — usado pero no creado en SQL

#### `postulacion_eventos`

**Referenciado:** Tipos los mencionan pero NO hay uso en código  
**Campos:** id, postulacion_id, tipo, estado_anterior, estado_nuevo, nota, created_at  
**Propósito:** Auditoría de cambios de estado de postulaciones (NO implementado)

### ⚠️ PROBLEMAS SECUNDARIOS

**Enums faltantes:**

- `vacante_estado`: En tipos pero no creada en SQL
- `postulacion_tipo`: En tipos pero no creada en SQL

**RLS ineficiente en leads:**

- Evolucionó en 3 migrations (52349, 52401, 52509)
- Cambios cruzados: insert público → deny → service_role only
- Podría consolidarse en una única migration base

**Sin documentación de Storage:**

- `PostulacionForm` sube CVs a bucket `cvs`
- No existen migrations que creen los buckets
- Sin politicas de RLS explícitas para Storage
- No hay bucket para blog-media ni conocimiento

**Sin blog tables:**

- Código usa `blogRepository` (JSON-based + localStorage)
- No hay tablas blog_posts, blog_categories, blog_tags
- No está documentado cómo migrar post.json a Supabase en el futuro

**Sin RAG/Knowledge tables:**

- No hay knowledge_documents ni knowledge_chunks
- Sin tablas de embeddings (pgvector)
- El bridge Lovable podría depender de esto pero no está en migrations

### 🟡 CONFIGURACIÓN INCOMPLETA

**Extensiones:**

- `pgcrypto` instalada por defecto en Supabase ✅
- `vector` NO está creada (necesaria para RAG) ❌

**Función helper:**

- `set_updated_at()` existe y funciona ✅

**Service role security:**

- Service role KEY no está expuesto en .env.example ✅
- Service role usado correctamente en server-side ✅
- Browser nunca recibe service role ✅

---

## 5. Row Level Security (RLS) Actual

### Tabla: `chat_leads`

```
RESTRICTIVE policy: deny_all_public_access
  → anon, authenticated: DENY ALL (false, false)
```

**Acceso real:** Únicamente service_role desde servidor Nitro

### Tabla: `leads`

```
RESTRICTIVE policy: leads_deny_public
  → anon, authenticated: DENY ALL (false, false)
```

**Acceso real:** Únicamente service_role  
**Nota:** Originalmentepermitía INSERT público, ahora completamente cerrado

### Tabla: `ai_runtime_config`

```
RESTRICTIVE policy: deny_public_access
  → anon, authenticated: DENY ALL (false, false)
```

**Acceso real:** Únicamente service_role

### Tabla: `ai_usage_events`

```
RESTRICTIVE policy: deny_public_access
  → anon, authenticated: DENY ALL (false, false)
```

**Acceso real:** Únicamente service_role

### Tabla: `ai_config_audit`

```
RESTRICTIVE policy: deny_public_access
  → anon, authenticated: DENY ALL (false, false)
```

**Acceso real:** Únicamente service_role

### Policy Pattern Actual

✅ Todas las tablas usan RESTRICTIVE + (anon, authenticated) → DENY ALL  
✅ Correcto: el acceso público es explícitamente negado  
⚠️ Incompleto: No hay SELECT permitido para vacantes/blog públicas

---

## 6. Storage Actual (Esperado)

### Buckets usados en código:

| Bucket       | Ubicado en código                   | Tipo                         | Privacidad | Límites   | Estado       |
| ------------ | ----------------------------------- | ---------------------------- | ---------- | --------- | ------------ |
| `cvs`        | PostulacionForm.tsx:77              | storage.from("cvs").upload() | Private    | 10 MB PDF | ❌ NO CREADO |
| `blog-media` | blogRepository (referencia teórica) | —                            | Public     | —         | ❌ NO CREADO |
| `knowledge`  | Lovable bridge (teórico)            | —                            | Private    | —         | ❌ NO CREADO |

### Buckets faltantes en migrations

No existen migrations que creen Storage buckets. El código espera `cvs` pero:

- No está declarado en SQL
- No tiene politicas RLS
- No tiene límites de tamaño

---

## 7. Variables de Entorno

### Definidas en `.env.example`

```
# Browser (Vite)
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=

# Nitro Server
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=

# Admin auth
ADMIN_SESSION_SECRET=
RCKT_INTERNAL_SECRET=

# AI Service
AI_SERVICE_URL=http://127.0.0.1:8000

# Observability (opcional)
LANGFUSE_PUBLIC_KEY=
LANGFUSE_SECRET_KEY=
SENTRY_DSN=
```

### Variables que FALTAN documentar

```
SUPABASE_SERVICE_ROLE_KEY=  # ← server-side only, nunca en browser
```

### Variables que NO deben existir

```
VITE_SUPABASE_SERVICE_ROLE_KEY=  # ← NUNCA en browser
```

**Validación:** `client.server.ts` busca `SUPABASE_SERVICE_ROLE_KEY` ✅  
**Seguridad:** Service role no está en .env.example (correcto) ✅

---

## 8. Dependencias del Frontend hacia Supabase

### Lectura de datos (GET)

1. **`vacantes.functions.ts`** → `getActiveVacancies()`
   - Endpoint: GET `/trabaja-con-nosotros`
   - Query: `SELECT id,titulo,area,modalidad,ubicacion,descripcion,requisitos FROM vacantes WHERE estado='activa'`
   - Esperado: tabla `vacantes` con enum `vacante_estado`

2. **`vacantes.functions.ts`** → `getVacancyById(id)`
   - Endpoint: GET `/trabaja-con-nosotros_/aplicar/$id`
   - Query: `SELECT ... FROM vacantes WHERE id=$id`
   - RLS: Requiere SELECT donde estado='activa'

### Escritura de datos (INSERT)

1. **`PostulacionForm.tsx`**
   - Operación: `supabase.from("postulaciones").insert({...})`
   - Campos: vacante_id, tipo, nombre, email, telefono, portafolio_url, mensaje, cv_url
   - Storage: Sube CV a bucket `cvs` primero
   - Problema: No existe política RLS permitiendo INSERT desde browser a postulaciones

---

## 9. Dependencias Server-side hacia Supabase

### Lectura/Escritura con service_role

1. **`/api/leads`** → POST
   - Insert en tabla `leads`
   - Campos: name, email, company, website, concern, source, user_agent
   - Validación: Zod schema
   - Usuario: Anónimo (public)
   - Usa: `supabaseAdmin` (service_role)

2. **Lovable Bridge** (`lovable-db-bridge.server.ts`)
   - No accede directamente a Supabase RCKT
   - Comunica con función Edge en Supabase Lovable Cloud (diferente proyecto)
   - Métodos: getConfig, updateConfig, recordUsage, saveChatLead, saveLead, getUsage
   - Autenticación: Header `X-RCKT-Internal-Secret`

3. **Admin routes** (`/api/admin/ai/*`)
   - Lee/escribe en ai_runtime_config, ai_usage_events, ai_config_audit
   - Usa: `supabaseAdmin` (service_role)
   - Autenticación: Admin session cookie (HMAC-SHA256)

---

## 10. Diseño del Blog (Estado Actual)

### Implementación actual

- **Repositorio:** `src/lib/blog.repository.ts` implementa JsonBlogRepository
- **Fuente de datos:** `src/data/blog/posts.json` + `src/data/blog/categories.json`
- **Persistencia:** localStorage (cambios locales en browser)
- **Interfaz:** `BlogRepository` (abstracta, preparada para Supabase)

### Datos seed existentes

**Categorías** (`src/data/blog/categories.json`):

- AI / Inteligencia Artificial
- Growth
- Performance
- Estrategia digital
- Automatización
- Cultura y tecnología

**Posts** (`src/data/blog/posts.json`):

- 5 posts de ejemplo
- Campos: id, slug, title, excerpt, content, author, category, tags, status, featured, publishedAt
- Status actual: "published"

### Transición planeada

1. JSON → localStorage (actual, temporal)
2. localStorage → Supabase blog_posts (fase siguiente)
3. BLOB/markdown → blog_posts.content

---

## 11. Puente Lovable (State Actual)

### Arquitectura

```
RCKT Nitro Server
    ↓ (X-RCKT-Internal-Secret)
Lovable Cloud / Supabase Edge Function (rckt-ai-db)
    ↓ (posiblemente a Lovable Cloud Supabase)
Lovable Cloud Database
```

### Métodos bridge implementados

| Método                                         | Dirección | Tabla esperada    |
| ---------------------------------------------- | --------- | ----------------- |
| `getConfig()`                                  | ←         | ai_runtime_config |
| `updateConfig(config_id, updates)`             | ← →       | ai_runtime_config |
| `recordUsage({provider, model, tokens, cost})` | →         | ai_usage_events   |
| `getUsage(period)`                             | ←         | ai_usage_events   |
| `saveChatLead({...})`                          | →         | chat_leads        |
| `saveLead({...})`                              | →         | leads             |

### Restricción importante

✅ Bridge **NO sincroniza** RCKT Supabase → Lovable Cloud  
✅ Bridge solo comunica operaciones puntales  
✅ RCKT Supabase es la fuente de verdad (no Lovable)

---

## 12. Resumen de Incompletitudes

### 🔴 BLOQUEADORES (impiden deploy/uso)

1. **Tablas vacantes/postulaciones no existen**
   - Código intenta crear/leer pero migrations no crean tablas
   - `/trabaja-con-nosotros` fallará al cargar vacantes
   - `PostulacionForm` no puede insertar postulaciones

2. **Enums no creados en SQL**
   - Types.ts define pero SQL no crea
   - Supabase CLI regenerará types sin these si se reinicia

3. **Storage buckets no existen**
   - CV upload fallará (bucket `cvs` no existe)

### ⚠️ INCOMPLETOS (no afectan funcionalidad actual pero necesarios)

4. **Sin blog tables** (JSON actualmente, pero sin Supabase backend)
5. **Sin RAG/knowledge tables** (pgvector no creada)
6. **Sin postulacion_eventos** (auditoría de estados)
7. **RLS para vacantes públicas no existe**

### 📝 DOCUMENTACIÓN

8. **No hay instrucciones** de cómo reconstruir base desde cero
9. **No hay seed.sql**
10. **No hay migration script de blog.json → Supabase**

---

## 13. Impacto en Reproducibilidad

### ¿Se puede recrear la base desde cero?

```
$ supabase db reset  # Ejecuta migrations/
```

**Resultado:**

- ✅ Crearía chat_leads, leads, AI tables
- ❌ NO crearía vacantes, postulaciones
- ❌ NO crearía Storage buckets
- ❌ Supabase types serían incorrectos

**Conclusión:** La base actual es **NO reproducible** desde código. Depende del estado manual en Supabase Cloud.

---

## 14. Recomendaciones para Fase 2

1. **Crear migration baseline** con:
   - Extensiones: pgcrypto ✅, vector ➕
   - ENUMs: vacante_estado, postulacion_tipo, blog_status, knowledge_status
   - Tablas: vacantes, postulaciones, postulacion_eventos, blog_posts, blog_categories, knowledge_documents, knowledge_chunks
   - Storage buckets: cvs, blog-media, knowledge
   - RLS completo: permitir SELECT vacantes/blog públicas
   - Triggers: set_updated_at en todas las tablas

2. **Crear seed.sql** con:
   - Categorías de blog (desde categories.json)
   - SIN posts, leads, postulaciones (datos personales)
   - SIN secrets

3. **Actualizar .env.example** con SUPABASE_SERVICE_ROLE_KEY (documentación)

4. **Crear docs/database/SETUP_SUPABASE.md** con pasos exactos

---

## Anexo A: Script SQL Actual (Resumen)

```sql
-- Extensiones actuales
-- pgcrypto: ✅ automático en Supabase

-- Funciones actuales
CREATE FUNCTION public.set_updated_at() TRIGGER

-- Enums actuales
-- (NINGUNO creado en migrations, solo en types.ts)

-- Tablas actuales
CREATE TABLE chat_leads {...}
CREATE TABLE leads {...}
CREATE TABLE ai_runtime_config {...}
CREATE TABLE ai_usage_events {...}
CREATE TABLE ai_config_audit {...}

-- Políticas RLS actuales
-- RESTRICTIVE deny_all_public_access / leads_deny_public / deny_public_access
-- (Todas cierran completamente el acceso)

-- Storage
-- (NO EXISTE en migrations)
```

---

**Fin de auditoría FASE 1**

Próximo: FASE 2 — Crear migration baseline reproducible
