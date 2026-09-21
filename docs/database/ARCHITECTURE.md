# RCKT LATAM Database Architecture

**Última actualización:** 2026-09-21  
**Versión de Schema:** 20260921_001

---

## 📊 Diagrama General

```
┌─────────────────────────────────────────────────────────────┐
│                   RCKT LATAM Stack                          │
└─────────────────────────────────────────────────────────────┘

Browser (Frontend React)
    ↓ (JavaScript/Fetch)

Supabase Data API (REST/RealtimePostgres)
    ├─ Anon: SELECT vacantes, blog_posts
    ├─ Anon: Bloqueado para inserts/updates
    └─ RLS enforced

Nitro Server (Node.js)
    ↓ (Server-side Fetch + service_role)

Supabase Database (PostgreSQL)
    ├─ Tables: vacantes, postulaciones, blog, RAG, admin
    ├─ RLS: Enforced on all tables
    ├─ Storage: cvs, blog-media, knowledge
    └─ Service role: Full access

Lovable Cloud (External)
    ↓ (Edge Function + X-RCKT-Internal-Secret)

Lovable Database (Optional Sync)
    └─ NOT the source of truth
```

---

## 1. Tablas de Recursos Humanos (HR)

### `vacantes` — Job Postings

**Propósito:** Gestionar ofertas de trabajo

**Campos:**

| Campo               | Tipo        | Default           | Índice | Notas                                 |
| ------------------- | ----------- | ----------------- | ------ | ------------------------------------- |
| `id`                | UUID        | gen_random_uuid() | PK     | Generado automáticamente              |
| `slug`              | TEXT        | —                 | UNIQUE | URL-safe: `growth-manager-latam`      |
| `titulo`            | TEXT        | —                 | —      | Ej: "Growth Manager LATAM"            |
| `area`              | TEXT        | NULL              | —      | Ej: "Growth", "Ingeniería", "Diseño"  |
| `modalidad`         | TEXT        | NULL              | —      | Ej: "Remoto", "Híbrido", "Presencial" |
| `ubicacion`         | TEXT        | NULL              | —      | Ej: "LATAM", "Buenos Aires", "México" |
| `descripcion`       | TEXT        | NULL              | —      | HTML o Markdown                       |
| `requisitos`        | TEXT        | NULL              | —      | HTML o Markdown                       |
| `responsabilidades` | TEXT        | NULL              | —      | HTML o Markdown                       |
| `estado`            | enum        | 'borrador'        | SÍ     | borrador, activa, cerrada             |
| `destacada`         | BOOLEAN     | false             | —      | Pin en la lista                       |
| `orden`             | INTEGER     | 0                 | SÍ     | Posición en la UI                     |
| `fecha_publicacion` | TIMESTAMPTZ | NULL              | SÍ     | Cuándo se activa                      |
| `fecha_cierre`      | TIMESTAMPTZ | NULL              | —      | Cuándo cierra                         |
| `created_at`        | TIMESTAMPTZ | now()             | —      | Auditoría                             |
| `updated_at`        | TIMESTAMPTZ | now()             | —      | Auditoría                             |

**Índices:**

- `vacantes_estado_idx` — filtra por estado
- `vacantes_fecha_publicacion_idx` — ordena por fecha
- `vacantes_slug_idx` — lookup por slug
- `vacantes_orden_idx` — ordenamiento visual
- `vacantes_estado_publicacion_idx` (composite) — combo común

**RLS:**

- SELECT: `estado = 'activa'` (público)
- INSERT/UPDATE/DELETE: Denegado (público), service_role solo

**Relaciones:**

- 1 vacante → N postulaciones (vacante_id FK)

---

### `postulaciones` — Applications

**Propósito:** Registrar candidatos que aplican a vacantes

**Campos:**

| Campo            | Tipo        | Default           | Índice | Notas                                                             |
| ---------------- | ----------- | ----------------- | ------ | ----------------------------------------------------------------- |
| `id`             | UUID        | gen_random_uuid() | PK     | —                                                                 |
| `vacante_id`     | UUID        | NULL              | SÍ     | FK → vacantes.id (ON DELETE SET NULL)                             |
| `tipo`           | enum        | 'candidato'       | —      | candidato, servicio                                               |
| `nombre`         | TEXT        | —                 | —      | Nombre del candidato                                              |
| `email`          | TEXT        | —                 | SÍ     | Para contacto                                                     |
| `telefono`       | TEXT        | NULL              | —      | Opcional                                                          |
| `portafolio_url` | TEXT        | NULL              | —      | Link a portfolio/GitHub                                           |
| `mensaje`        | TEXT        | NULL              | —      | Mensaje personalisado                                             |
| `cv_path`        | TEXT        | NULL              | —      | Path en storage.cvs                                               |
| `estado`         | enum        | 'nueva'           | SÍ     | Nueva, revisión, contactado, entrevista, descartado, seleccionado |
| `notas_internas` | TEXT        | NULL              | —      | Notas del equipo HR                                               |
| `source`         | TEXT        | NULL              | —      | Origen: website, referral, etc                                    |
| `consent_at`     | TIMESTAMPTZ | now()             | —      | Consentimiento GDPR                                               |
| `created_at`     | TIMESTAMPTZ | now()             | SÍ     | Timestamp                                                         |
| `updated_at`     | TIMESTAMPTZ | now()             | —      | Auditoría                                                         |

**Índices:**

- `postulaciones_vacante_id_idx` — filtra por vacante
- `postulaciones_estado_idx` — filtra por estado
- `postulaciones_email_idx` — lookup por email
- `postulaciones_created_at_idx` — ordena por fecha
- `postulaciones_vacante_estado_idx` (composite) — vacante + estado

**RLS:**

- SELECT: Denegado (público)
- INSERT: Denegado (público) — debe usar servidor
- UPDATE/DELETE: Denegado (público)

**Relaciones:**

- FK vacante_id → vacantes.id
- 1 postulación → N postulacion_eventos (auditoría)

---

### `postulacion_eventos` — Application Audit Trail

**Propósito:** Registrar cambios de estado en postulaciones

**Campos:**

| Campo             | Tipo        | Default           | Notas                                          |
| ----------------- | ----------- | ----------------- | ---------------------------------------------- |
| `id`              | UUID        | gen_random_uuid() | PK                                             |
| `postulacion_id`  | UUID        | —                 | FK → postulaciones.id (ON DELETE CASCADE)      |
| `tipo`            | TEXT        | —                 | Tipo de evento: status_change, note_added, etc |
| `estado_anterior` | enum        | NULL              | Estado antes                                   |
| `estado_nuevo`    | enum        | NULL              | Estado después                                 |
| `nota`            | TEXT        | NULL              | Descripción del evento                         |
| `created_at`      | TIMESTAMPTZ | now()             | Timestamp                                      |

**Índices:**

- `postulacion_eventos_postulacion_id_idx` — filtra por postulación
- `postulacion_eventos_created_at_idx` — timeline de eventos

**RLS:**

- Completamente privado (service_role solo)

**Uso futuro:**

```typescript
// Cuando cambio de estado de postulación
await supabaseAdmin.from("postulacion_eventos").insert({
  postulacion_id: postulacion.id,
  tipo: "status_change",
  estado_anterior: "nueva",
  estado_nuevo: "contactado",
  nota: "Llamada confirmada para mañana",
});
```

---

## 2. Tablas de Blog

### `blog_categories` — Blog Categories

**Propósito:** Categorizar artículos de blog

**Campos:**

| Campo         | Tipo        | Default           | Índice | RLS                         |
| ------------- | ----------- | ----------------- | ------ | --------------------------- |
| `id`          | UUID        | gen_random_uuid() | PK     | —                           |
| `name`        | TEXT        | —                 | —      | "Inteligencia Artificial"   |
| `slug`        | TEXT        | —                 | UNIQUE | "inteligencia-artificial"   |
| `description` | TEXT        | NULL              | —      | Descripción de la categoría |
| `orden`       | INTEGER     | 0                 | SÍ     | Posición en menu            |
| `active`      | BOOLEAN     | true              | SÍ     | Mostrar/ocultar             |
| `created_at`  | TIMESTAMPTZ | now()             | —      | Auditoría                   |
| `updated_at`  | TIMESTAMPTZ | now()             | —      | Auditoría                   |

**RLS:**

- SELECT: `active = true` (público)
- INSERT/UPDATE/DELETE: Denegado (público)

**Relaciones:**

- 1 categoría → N blog_posts

**Datos seed:** 6 categorías iniciales

---

### `blog_posts` — Blog Articles

**Propósito:** Artículos del blog público

**Campos:**

| Campo              | Tipo        | Default           | Índice | Notas                         |
| ------------------ | ----------- | ----------------- | ------ | ----------------------------- |
| `id`               | UUID        | gen_random_uuid() | PK     | —                             |
| `slug`             | TEXT        | —                 | UNIQUE | URL: `/blog/cómo-integrar-ia` |
| `title`            | TEXT        | —                 | —      | Título visible                |
| `excerpt`          | TEXT        | NULL              | —      | Preview en listados           |
| `content`          | TEXT        | —                 | —      | Markdown o HTML               |
| `cover_image_path` | TEXT        | NULL              | —      | Path en blog-media storage    |
| `category_id`      | UUID        | NULL              | SÍ     | FK → blog_categories.id       |
| `author_name`      | TEXT        | NULL              | —      | "Equipo RCKT"                 |
| `tags`             | TEXT[]      | {}                | —      | Array de tags                 |
| `status`           | enum        | 'draft'           | SÍ     | draft, published, archived    |
| `featured`         | BOOLEAN     | false             | —      | Mostrar en homepage           |
| `published_at`     | TIMESTAMPTZ | NULL              | SÍ     | Fecha de publicación          |
| `seo_title`        | TEXT        | NULL              | —      | Para <title>                  |
| `seo_description`  | TEXT        | NULL              | —      | Para <meta>                   |
| `created_at`       | TIMESTAMPTZ | now()             | —      | Auditoría                     |
| `updated_at`       | TIMESTAMPTZ | now()             | —      | Auditoría                     |

**Índices:**

- `blog_posts_slug_idx` — lookup por URL
- `blog_posts_status_idx` — filtra por estado
- `blog_posts_published_at_idx` — ordena por fecha
- `blog_posts_category_id_idx` — filtro por categoría
- `blog_posts_featured_idx` — destaca en homepage
- `blog_posts_status_published_at_idx` (composite) — published + fecha

**RLS:**

- SELECT: `status = 'published' AND published_at <= now()` (público)
- INSERT/UPDATE/DELETE: Denegado (público)

**Relaciones:**

- FK category_id → blog_categories.id

**Transición:**

```
Actual: JSON (src/data/blog/posts.json) + localStorage
Futuro: Supabase blog_posts (migration script disponible)
```

---

## 3. Tablas de Conocimiento / RAG

### `knowledge_documents` — Knowledge Base Sources

**Propósito:** Documentos para inyectar en contexto de LLM

**Campos:**

| Campo          | Tipo        | Default           | Índice | Notas                              |
| -------------- | ----------- | ----------------- | ------ | ---------------------------------- |
| `id`           | UUID        | gen_random_uuid() | PK     | —                                  |
| `title`        | TEXT        | —                 | —      | "Guía de Onboarding RCKT"          |
| `source_type`  | TEXT        | NULL              | —      | pdf, markdown, url, etc            |
| `source_url`   | TEXT        | NULL              | —      | URL original si aplica             |
| `storage_path` | TEXT        | NULL              | —      | Path en storage.knowledge          |
| `mime_type`    | TEXT        | NULL              | —      | application/pdf, text/plain        |
| `status`       | enum        | 'pending'         | SÍ     | pending, processing, ready, failed |
| `metadata`     | JSONB       | {}                | —      | {chunks_count, token_count, ...}   |
| `created_at`   | TIMESTAMPTZ | now()             | SÍ     | —                                  |
| `updated_at`   | TIMESTAMPTZ | now()             | —      | —                                  |

**Índices:**

- `knowledge_documents_status_idx` — filtra por estado
- `knowledge_documents_created_at_idx` — timeline

**RLS:**

- Completamente privado (service_role solo)

**Relaciones:**

- 1 documento → N knowledge_chunks

---

### `knowledge_chunks` — Knowledge Chunks (with Embeddings)

**Propósito:** Fragmentos de texto con embeddings para búsqueda semántica

**Campos:**

| Campo         | Tipo        | Default           | Índice | Notas                            |
| ------------- | ----------- | ----------------- | ------ | -------------------------------- |
| `id`          | UUID        | gen_random_uuid() | PK     | —                                |
| `document_id` | UUID        | —                 | SÍ     | FK → knowledge_documents.id      |
| `chunk_index` | INTEGER     | —                 | SÍ     | 0, 1, 2... orden en doc          |
| `content`     | TEXT        | —                 | —      | Texto del fragmento              |
| `metadata`    | JSONB       | {}                | —      | {start_pos, end_pos, ...}        |
| `embedding`   | vector      | NULL              | —      | **pg_vector sin dimensión fija** |
| `created_at`  | TIMESTAMPTZ | now()             | SÍ     | —                                |

**Índices:**

- `knowledge_chunks_document_chunk_idx` (unique composite) — (doc_id, chunk_index)
- `knowledge_chunks_document_id_idx` — filtra por documento
- `knowledge_chunks_created_at_idx` — timeline

**Índices de búsqueda semántica (crear después):**

```sql
-- Una vez definida dimensión de embedding (ej: 1536 para OpenAI):
CREATE INDEX knowledge_chunks_embedding_hnsw_idx
  ON knowledge_chunks
  USING hnsw (embedding vector_cosine_ops)
  WITH (m=16, ef_construction=64);

-- O IVFFLAT si es más eficiente:
CREATE INDEX knowledge_chunks_embedding_ivfflat_idx
  ON knowledge_chunks
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists=100);
```

**RLS:**

- Completamente privado (service_role solo)

**Relaciones:**

- FK document_id → knowledge_documents.id (ON DELETE CASCADE)

---

## 4. Enums (Tipos)

```sql
-- Vacante states
vacante_estado: borrador, activa, cerrada

-- Application types
postulacion_tipo: candidato, servicio

-- Application states (detailed tracking)
postulacion_estado: nueva, revision, contactado, entrevista, descartado, seleccionado

-- Blog publication states
blog_status: draft, published, archived

-- Knowledge processing states
knowledge_status: pending, processing, ready, failed
```

---

## 5. Storage Buckets

| Bucket         | Privacidad        | MIME types                 | Límite | Política                          |
| -------------- | ----------------- | -------------------------- | ------ | --------------------------------- |
| **cvs**        | Privado           | application/pdf            | 10 MB  | Service role solo                 |
| **blog-media** | Público (lectura) | Imágenes                   | 50 MB  | Público lee, service role escribe |
| **knowledge**  | Privado           | PDF, texto, markdown, JSON | 100 MB | Service role solo                 |

**Configuración:**

```sql
-- En migrations se crean via storage.buckets:
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('cvs', 'cvs', false, 10485760, ARRAY['application/pdf']),
  ('blog-media', 'blog-media', true, 52428800, ARRAY['image/jpeg', ...]),
  ('knowledge', 'knowledge', false, 104857600, ARRAY['application/pdf', ...]);

-- Políticas RLS en storage.objects:
CREATE POLICY "cvs_no_public_read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'cvs' AND auth.role() = 'service_role');
```

---

## 6. Relaciones (ER Diagram)

```
vacantes (1)
    ↓
postulaciones (N)
    ↓
postulacion_eventos (auditoría)

blog_categories (1)
    ↓
blog_posts (N)

knowledge_documents (1)
    ↓
knowledge_chunks (N, con embeddings)
```

---

## 7. Funciones y Triggers

### Función: `set_updated_at()`

```sql
CREATE FUNCTION public.set_updated_at()
RETURNS TRIGGER
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
```

**Aplicada a:**

- vacantes
- postulaciones
- blog_categories
- blog_posts
- knowledge_documents

**Efecto:** Cada UPDATE automáticamente actualiza `updated_at` timestamp.

---

## 8. Escalabilidad y Performance

### Índices de Consultas Comunes

```sql
-- Listar vacantes activas ordenadas
SELECT * FROM vacantes
WHERE estado = 'activa'
ORDER BY orden, fecha_publicacion DESC;
-- Índice: vacantes_estado_publicacion_idx ✅

-- Listar blog posts publicados
SELECT * FROM blog_posts
WHERE status = 'published' AND published_at <= now()
ORDER BY published_at DESC;
-- Índice: blog_posts_status_published_at_idx ✅

-- Postulaciones de una vacante por estado
SELECT * FROM postulaciones
WHERE vacante_id = $1 AND estado = $2;
-- Índice: postulaciones_vacante_estado_idx ✅
```

### Búsqueda Semántica (futuro)

```sql
-- Buscar chunks similares
SELECT id, content, embedding <-> $1 AS distance
FROM knowledge_chunks
WHERE embedding <-> $1 < 0.8  -- similitud cosine
ORDER BY distance
LIMIT 5;
-- Índice: knowledge_chunks_embedding_hnsw_idx (crear después)
```

---

## 9. Estrategia de Migración

### Fase actual (20260921_001)

```
Crear:
✅ ENUMs
✅ Tablas HR (vacantes, postulaciones, postulacion_eventos)
✅ Tablas Blog (blog_categories, blog_posts)
✅ Tablas RAG (knowledge_documents, knowledge_chunks)
✅ Storage buckets
✅ RLS policies
✅ Índices
✅ Triggers
✅ Seed data (categorías de blog)
```

### Fase próxima (Future)

```
Crear scripts para:
□ Importar blog.json → blog_posts
□ Sincronizar con Lovable Cloud (opcional)
□ Backup y restore procedures
□ Índices HNSW/IVFFLAT para RAG
```

---

## 10. Licencia de Datos

### Datos públicos (RLS permite SELECT)

- Vacantes activas
- Blog posts publicados

### Datos privados (RLS deniega)

- Postulaciones (personal + sensible)
- Leads (personal)
- Chat leads (conversaciones)
- CVs (storage privado)
- Conocimiento/RAG (propiedad intelectual)
- Config AI (secretos)

---

## Recursos

- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL RLS](https://www.postgresql.org/docs/current/sql-createpolicy.html)
- [Vector Search](https://supabase.com/docs/guides/database/extensions/vector)

---

**Fin de arquitectura de base de datos**
