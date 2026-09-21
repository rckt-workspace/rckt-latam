# Configuración de Supabase — RCKT LATAM

**Última actualización:** 2026-09-21  
**Versión de Supabase CLI:** 2.48.3+  
**Base de datos:** PostgreSQL 14.5+

---

## 📋 Tabla de Contenidos

1. [Requisitos previos](#requisitos-previos)
2. [Crear proyecto Supabase](#crear-proyecto-supabase)
3. [Configurar variables locales](#configurar-variables-locales)
4. [Enlazar con Supabase CLI](#enlazar-con-supabase-cli)
5. [Aplicar migrations](#aplicar-migrations)
6. [Aplicar datos seed](#aplicar-datos-seed)
7. [Regenerar TypeScript types](#regenerar-typescript-types)
8. [Configurar Render](#configurar-render)
9. [Verificar Storage](#verificar-storage)
10. [Verificar RLS](#verificar-rls)
11. [Validación final](#validación-final)

---

## Requisitos Previos

- Cuenta en [Supabase](https://supabase.com)
- Supabase CLI instalado: `supabase --version` (2.48.3+)
- Node.js 18+ y npm/pnpm
- Git
- Editor de código

---

## Crear Proyecto Supabase

### 1. Crear proyecto en Supabase Cloud

1. Accede a [app.supabase.com](https://app.supabase.com)
2. Haz clic en **"New project"**
3. Completa los campos:
   - **Nombre del proyecto:** `rckt-latam-prod` (o similar)
   - **Región:** Selecciona cercana a tus usuarios (ej: `sa-east-1` para LATAM)
   - **Contraseña de BD:** Genera una fuerte (≥32 caracteres, con mayúsculas, números, símbolos)
4. Haz clic en **"Create new project"** y espera a que finalice (5-10 minutos)

### 2. Obtener credenciales del proyecto

Una vez que el proyecto esté listo:

1. Ve a **Settings → API**
2. Copia y guarda en un lugar seguro:
   - **Project URL:** `https://xxxxxxxxxxxx.supabase.co`
   - **Publishable Key (anon):** `eyJ...` (comienza con `eyJ`)
   - **Service Role Secret:** `eyJ...` (comienza con `eyJ`, MÁS permisivo)

⚠️ **IMPORTANTE:** El Service Role Secret es una credencial sensible. Nunca lo expongas en el navegador.

---

## Configurar Variables Locales

### 1. Crear `.env.local` (desarrollo)

En la raíz del proyecto, crea `.env.local`:

```bash
# Supabase — Cliente (navegador)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...your-anon-key

# Supabase — Servidor Nitro
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_PUBLISHABLE_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key

# Admin
ADMIN_CONTROL_SECRET=tu-contraseña-admin-segura-aqui
ADMIN_SESSION_SECRET=tu-session-secret-aleatorio-de-32-caracteres

# AI Service
AI_SERVICE_URL=http://127.0.0.1:8000

# Lovable Bridge (si aplica)
LOVABLE_DB_BRIDGE_URL=https://your-lovable-function-url
RCKT_INTERNAL_SECRET=your-internal-secret
```

### 2. Verificar que NO expongas secretos

```bash
# ❌ NUNCA en .env.example
VITE_SUPABASE_SERVICE_ROLE_KEY=...

# ✅ Solo en .env.local (desarrollo) o secrets (producción)
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## Enlazar con Supabase CLI

### 1. Inicializar proyecto local

```bash
cd /ruta/a/rckt-latam
supabase init  # Si no está inicializado
```

Esto crea la estructura `supabase/config.toml`.

### 2. Link con proyecto remoto

```bash
supabase link --project-ref your-project-id
```

Esto te pedirá:

- **Database password:** La contraseña que creaste en Supabase Cloud
- Confirmará la conexión

### 3. Verificar enlace

```bash
supabase status
```

Debe mostrar:

```
Supabase API Status: healthy
PostgreSQL Status: healthy
```

---

## Aplicar Migrations

### 1. Ejecutar todas las migrations

```bash
supabase db push
```

Esto ejecutará todas las migrations en orden:

- `20260521145555...` — chat_leads
- `20260521145605...` — set_updated_at helper
- `20260522110255...` — chat_leads RLS
- `20260709092349...` — leads
- `20260709092401...` — leads RLS update 1
- `20260814152509...` — leads RLS update 2
- `20260829000001...` — ai_runtime_config
- `20260829000002...` — ai_usage_events
- `20260829000003...` — ai_config_audit
- `20260921_001...` — **RCKT LATAM Foundation** (nueva)

### 2. Verificar que no haya errores

```bash
supabase migration list
```

Todas las migrations deben mostrar status ✅.

### 3. Verificar tablas creadas

```bash
supabase db remote info
```

Debe listar todas las tablas:

- ✅ chat_leads, leads, ai_* (históricas)
- ✅ vacantes, postulaciones, postulacion_eventos (nuevas)
- ✅ blog_categories, blog_posts (nuevas)
- ✅ knowledge_documents, knowledge_chunks (nuevas)

---

## Aplicar Datos Seed

### 1. Ejecutar seed.sql

```bash
supabase db seed
```

Esto ejecuta `supabase/seed.sql` e inserta:

- 6 categorías de blog
- (Comentado) 1 vacante de ejemplo

### 2. Verificar datos insertados

En [Supabase Dashboard → SQL Editor](https://app.supabase.com/project/your-project-id/sql):

```sql
SELECT COUNT(*) FROM public.blog_categories;
-- Resultado: 6
```

---

## Regenerar TypeScript Types

### 1. Generar tipos desde base remota

```bash
npx supabase gen types typescript \
  --project-id your-project-id \
  --db-url postgresql://postgres:password@your-project-id.supabase.co:6543/postgres \
  > src/integrations/supabase/types.ts
```

O usar el atajo:

```bash
supabase gen types typescript --linked > src/integrations/supabase/types.ts
```

### 2. Verificar tipos generados

```bash
# Abre el archivo y verifica que incluya:
# - Tables: vacantes, postulaciones, blog_posts, etc.
# - Enums: vacante_estado, postulacion_tipo, blog_status, etc.

cat src/integrations/supabase/types.ts | grep "vacante_estado"
# Debe mostrar: postulacion_tipo: "candidato" | "servicio"
```

### 3. Ejecutar TypeScript check

```bash
pnpm run typecheck
# o
npm run typecheck
```

No debe haber errores de tipos.

---

## Configurar Render

### 1. Obtener variables de producción

De tu proyecto Supabase Cloud, ve a **Settings → API** y copia:

- **SUPABASE_URL** (Project URL)
- **SUPABASE_PUBLISHABLE_KEY** (anon key)
- **SUPABASE_SERVICE_ROLE_KEY** (service_role key)

### 2. Añadir a Render Environment Variables

En [Render Dashboard](https://dashboard.render.com):

1. Ve a tu servicio de RCKT LATAM
2. **Settings → Environment**
3. Añade las variables:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_PUBLISHABLE_KEY=eyJ...anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...service-role-key
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...anon-key
ADMIN_CONTROL_SECRET=tu-contraseña-admin
ADMIN_SESSION_SECRET=tu-session-secret
```

### 3. Redeploy

```bash
git push origin main  # Trigger automatizado en Render
# o
# En Render Dashboard: "Manual Deploy" → "Deploy latest commit"
```

---

## Verificar Storage

### 1. Verificar buckets en Supabase Dashboard

Ve a **Storage** en [Supabase Dashboard](https://app.supabase.com):

Deben existir:

- ✅ **cvs** (privado, PDFs, 10 MB max)
- ✅ **blog-media** (público lectura, servidor escritura)
- ✅ **knowledge** (privado)

### 2. Probar upload de CV

En local:

```typescript
// src/components/PostulacionForm.tsx ya implementa esto
const supabase = await getBrowserSupabase();
const { data, error } = await supabase.storage.from("cvs").upload(`test-${Date.now()}.pdf`, file);

if (error) console.error("Upload failed:", error);
else console.log("Upload successful:", data);
```

### 3. Probar lectura pública de blog-media

```bash
# Intenta acceder a una imagen (debe ser público)
curl https://your-project-id.supabase.co/storage/v1/object/public/blog-media/test.jpg

# Intenta sin autenticación (debe fallar para knowledge, funcionar para blog-media)
curl https://your-project-id.supabase.co/storage/v1/object/public/knowledge/test.pdf
# → "Access denied" ✅
```

---

## Verificar RLS

### 1. Probar SELECT público en vacantes

```sql
-- Como anon (sin autenticación)
SELECT * FROM vacantes WHERE estado = 'activa';
-- ✅ Debe retornar filas donde estado='activa'

SELECT * FROM vacantes WHERE estado = 'borrador';
-- ❌ Debe retornar 0 filas
```

### 2. Probar SELECT bloqueado en postulaciones

```sql
-- Como anon (sin autenticación)
SELECT * FROM postulaciones;
-- ❌ Debe retornar error "permission denied"
```

### 3. Probar INSERT bloqueado en postulaciones

```sql
-- Como anon (sin autenticación)
INSERT INTO postulaciones (nombre, email, tipo) VALUES ('Test', 'test@test.com', 'candidato');
-- ❌ Debe retornar error "permission denied"
```

### 4. Probar INSERT desde service_role

```typescript
// Desde servidor (Nitro) — usa supabaseAdmin
const { data, error } = await supabaseAdmin.from("postulaciones").insert({
  nombre: "John Doe",
  email: "john@example.com",
  tipo: "candidato",
});

// ✅ Debe insertar correctamente
```

---

## Validación Final

### 1. Ejecutar tests

```bash
pnpm run test
# o
npm run test
```

Todos los tests deben pasar.

### 2. Ejecutar build

```bash
pnpm run build
# o
npm run build
```

No debe haber errores de compilación.

### 3. Ejecutar en desarrollo local

```bash
pnpm run dev
# o
npm run dev
```

Accede a `http://localhost:5173`:

- ✅ `/trabaja-con-nosotros` debe cargar vacantes
- ✅ Hacer clic en una vacante debe abrir formulario
- ✅ Subir PDF debe funcionar
- ✅ Ver blog debe funcionar

### 4. Verificar en producción (Render)

```bash
curl https://rckt.lat/api/admin/debug
# Debe retornar información del status
```

---

## Troubleshooting

### Error: "Supabase CLI not found"

```bash
npm install -g @supabase/cli
supabase --version  # Debe mostrar versión
```

### Error: "Database connection refused"

```bash
# Verificar que el proyecto Supabase está activo
supabase status

# Si falla, relinkear:
supabase unlink
supabase link --project-ref your-project-id
```

### Error: "permission denied for schema public"

La cuenta que ejecuta migrations no tiene permisos suficientes.

```bash
# En Supabase Cloud → SQL Editor → ejecuta como postgres:
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres;
```

### Error: "types.ts out of sync"

Si aparecen errores de tipos después de migrations:

```bash
# Regenerar tipos
supabase gen types typescript --linked > src/integrations/supabase/types.ts
pnpm run typecheck
```

---

## Checklist de Validación

- [ ] Supabase CLI instalado (v2.48.3+)
- [ ] Proyecto Supabase Cloud creado
- [ ] Credenciales copiadas de Settings → API
- [ ] `.env.local` configurado (sin secretos en git)
- [ ] Proyecto enlazado: `supabase status` ✅
- [ ] Migrations aplicadas: `supabase migration list` ✅
- [ ] Datos seed insertados: `SELECT COUNT(*) FROM blog_categories` → 6
- [ ] Tipos regenerados: `src/integrations/supabase/types.ts` actualizado
- [ ] Build exitoso: `pnpm run build` ✅
- [ ] Tests pasando: `pnpm run test` ✅
- [ ] Dev local funciona: `pnpm run dev` ✅
- [ ] RLS verificado (vacantes públicas, postulaciones privadas)
- [ ] Storage funcionando (CVs uploadables)
- [ ] Render configurado con variables de ambiente

---

## Pasos Siguientes

1. **Importar posts de blog:** Ver `IMPORT_BLOG_POSTS.md`
2. **Configurar Lovable Bridge:** Ver `LOVABLE_BRIDGE_SETUP.md`
3. **Monitorear en producción:** Ver `MONITORING.md`

---

**Fin de guía de configuración**
