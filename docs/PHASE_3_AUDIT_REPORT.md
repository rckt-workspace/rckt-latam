# FASE 3 — Reporte de Auditoría

**Fecha:** 2026-09-21  
**Estado:** Auditoría completada, listos para integración

---

## 📊 Análisis de Módulos Actuales

### ✅ SUPABASE CLIENTS (Correcto)

#### `src/integrations/supabase/client.ts`

```typescript
// Browser client - CORRECTO
- Usa VITE_SUPABASE_URL ✅
- Usa VITE_SUPABASE_PUBLISHABLE_KEY ✅
- No expone service role ✅
- Storage: brokeredPreviewStorage() ✅
```

#### `src/integrations/supabase/client.server.ts`

```typescript
// Server client - CORRECTO
- Usa process.env.SUPABASE_URL ✅
- Usa process.env.SUPABASE_SERVICE_ROLE_KEY ✅
- Solo en server-side ✅
```

---

### 🟢 VACANTES (Estado: Funcional, sin cambios necesarios)

#### `src/lib/vacantes.functions.ts`

```typescript
export const getActiveVacancies = createServerFn({ method: "GET" })
  .inputValidator((data: {...}) => {...})  // ⚠️ Deprecated API?
  .handler(async () => {...})
```

**Análisis:**

- ✅ Consulta Supabase correctamente
- ✅ Filtra `estado = 'activa'` (RLS public)
- ✅ Ordena por fecha_publicacion
- ⚠️ Usa `inputValidator()` — verificar si es deprecated
- ✅ NO expone service role

**Acción:** Revisar si `inputValidator()` → `validator()` es compatible

---

### 🔴 BLOG (Estado: JSON/localStorage, necesita migración)

#### `src/lib/blog.repository.ts`

```typescript
class JsonBlogRepository implements BlogRepository {
  // Implementa BlogRepository usando:
  // - localStorage: "rckt.blog.posts.v1"
  // - JSON seed: src/data/blog/posts.json
  // - JSON seed: src/data/blog/categories.json
}

export const blogRepository = new JsonBlogRepository();
```

**Problemas:**

- ❌ No usa Supabase blog_posts
- ❌ No usa Supabase blog_categories
- ❌ Datos en localStorage (no reproducible en servidor)
- ❌ Cambios locales no persisten en Supabase

**Necesario:**

- ✅ Crear `SupabaseBlogRepository` implementando `BlogRepository`
- ✅ Usar blog_posts y blog_categories reales
- ✅ RLS: SELECT donde status='published' AND published_at <= now()
- ✅ RLS: SELECT blog_categories donde active=true
- ✅ NO permitir INSERT/UPDATE/DELETE público

---

### 🔴 POSTULACIONES (Estado: Inseguro, necesita refactor)

#### `src/components/PostulacionForm.tsx`

```typescript
async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  // Línea 85-87: Sube directamente a Storage desde browser ❌
  const { data: upData, error: upErr } = await supabase.storage
    .from("cvs")
    .upload(path, archivoFinal, {...})

  // Línea 101-110: Inserta directamente en postulaciones ❌
  const { error: insErr } = await supabase.from("postulaciones").insert({
    vacante_id: vacanteId,
    tipo, nombre, email, telefono, portafolio_url, mensaje,
    cv_url: cvUrl,
  })
}
```

**Problemas:**

- ❌ Storage CVS está RLS bloqueado (upload fallará)
- ❌ Tabla postulaciones está RLS bloqueada (insert fallará)
- ❌ CV pública en Storage (riesgo de seguridad)
- ❌ Sin validación server-side
- ❌ Sin consentimiento GDPR (consent_at)

**Necesario:**

1. Crear endpoint server: `/api/aplicaciones/enviar`
2. Validar formulario server-side
3. Validar PDF server-side (máximo 10MB)
4. Subir CV usando supabaseAdmin (service role)
5. Insertar postulacion usando supabaseAdmin (service role)
6. Registrar consent_at = now()
7. NO generar URL pública permanente

---

### ✅ ADMIN (Estado: Correcto, arquitectura lista)

#### `src/lib/admin-auth.ts`

```typescript
// Session management - CORRECTO
- HMAC-SHA256 signing ✅
- HttpOnly cookies ✅
- Rate limiting ✅
- Timing-safe comparison ✅
```

#### `src/routes/api/admin/login.ts`

```typescript
// Login endpoint - CORRECTO
- POST /api/admin/login ✅
- Valida ADMIN_CONTROL_SECRET ✅
- Crea sesión HMAC signed ✅
- Set-Cookie header ✅
```

**Rutas existentes:**

- `/api/admin/login` — ✅ Funciona
- `/api/admin/logout` — ✅ Existe
- `/api/admin/ai/*` — ✅ Endpoints AI
- `/ops/` — ⏳ Dashboard (estructura lista, datos pendientes)

**Arquitectura para conectar en FASE 3:**

```
/ops/vacantes     → Supabase vacantes
/ops/postulaciones → Supabase postulaciones
/ops/blog         → Supabase blog_posts
/ops/dashboard    → Agregados de Supabase
```

---

### ⚠️ POSTULACION FORM DIRECT INSERT (Fallará)

**Flujo actual:**

```
Browser
  → FormData
  → supabase.storage.upload("cvs") ❌ RLS bloquea
  → supabase.from("postulaciones").insert() ❌ RLS bloquea
```

**Flujo requerido:**

```
Browser
  → FormData
  → POST /api/aplicaciones/enviar
  → [Server] Valida
  → [Server] supabaseAdmin.storage.upload("cvs") ✅
  → [Server] supabaseAdmin.from("postulaciones").insert() ✅
  → Response JSON {ok: true}
```

---

### 📋 SEGURIDAD (Estado: Verificado)

| Item                    | Status             | Notas                   |
| ----------------------- | ------------------ | ----------------------- |
| Service role en browser | ✅ No              | client.ts no lo expone  |
| Service role en server  | ✅ Sí              | client.server.ts lo usa |
| VITE_ en .env.example   | ✅ Correcto        | Sin secretos reales     |
| RLS habilitado          | ✅ Sí              | Todas las tablas        |
| Blog público            | ✅ RLS restrictiva | Solo published          |
| Vacantes públicas       | ✅ RLS restrictiva | Solo activa             |
| Postulaciones           | ✅ RLS privada     | service_role only       |

---

### 📁 ARCHIVOS QUE NECESITAN CAMBIOS

#### TIER 1 (Crítico)

1. **`src/components/PostulacionForm.tsx`**
   - Cambiar flujo a server-side
   - Usar `/api/aplicaciones/enviar`

2. **`src/routes/api/aplicaciones/enviar.ts`** (CREAR)
   - POST handler
   - Validar formulario
   - Subir CV con service role
   - Insertar postulacion con service role
   - Registrar consent_at

3. **`src/lib/blog.repository.ts` (REFACTOR)**
   - Crear SupabaseBlogRepository
   - Usar blog_posts real
   - Usar blog_categories real
   - Mantener interfaz BlogRepository

#### TIER 2 (Mejora)

4. **`src/lib/vacantes.functions.ts`**
   - Verificar `inputValidator()` vs `validator()`
   - Si es deprecated, actualizar

5. **`.env.example`**
   - Revisar duplicados
   - Documentar claramente

#### TIER 3 (Admin)

6. **`src/routes/ops/vacantes.tsx`** (si existe)
   - Conectar a Supabase vacantes (CRUD)

7. **`src/routes/ops/blog.tsx`** (si existe)
   - Conectar a SupabaseBlogRepository

---

### 🔧 VALIDACIONES TECNOLÓGICAS

| Check               | Estado                                  | Acción             |
| ------------------- | --------------------------------------- | ------------------ |
| npm run build       | ⏳ Después de cambios                   | Verificar          |
| TypeScript types    | ✅ Actualizados (types.ts)              | Usar directamente  |
| RLS en Supabase     | ✅ Implementado                         | Respetar           |
| Storage buckets     | ✅ Creados (cvs, blog-media, knowledge) | Usar correctamente |
| Service role access | ✅ Disponible                           | Solo server-side   |

---

## 📌 Resumen de Accionesenumeradas

### CREAR

- [ ] `src/routes/api/aplicaciones/enviar.ts` — Server-side aplicaciones endpoint

### REFACTOR

- [ ] `src/components/PostulacionForm.tsx` — Usar endpoint en lugar de direct insert
- [ ] `src/lib/blog.repository.ts` → Crear `SupabaseBlogRepository`
- [ ] `src/lib/vacantes.functions.ts` — Revisar API deprecation

### VERIFICAR

- [ ] `.env.example` — Sin duplicados, bien documentado
- [ ] API Routes de admin — Conectar con Supabase

### NO TOCAR (por ahora)

- ✅ Lovable bridge
- ✅ AI runtime
- ✅ Diseño visual
- ✅ Knowledge tables (RAG pendiente)

---

## ✅ Estado Final para FASE 3

- [x] Supabase RCKT LATAM validado
- [x] Migrations aplicadas
- [x] Seed insertado
- [x] Types generados
- [x] Build exitoso
- [ ] Blog migrando a Supabase
- [ ] Postulaciones usando server-side
- [ ] Admin panel conectado

---

**Próximo paso:** Comenzar FASE 3 IMPLEMENTACIÓN
