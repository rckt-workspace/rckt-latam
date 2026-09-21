# RCKT LATAM Database Security Model

**Última actualización:** 2026-09-21

---

## 📋 Tabla de Contenidos

1. [Visión general](#visión-general)
2. [Autenticación](#autenticación)
3. [Row Level Security (RLS)](#row-level-security-rls)
4. [Storage Security](#storage-security)
5. [Service Role Key](#service-role-key)
6. [Secrets Management](#secrets-management)
7. [Auditoría](#auditoría)

---

## Visión General

### Principios de seguridad

1. **Defensa en profundidad:** Múltiples capas de verificación
2. **Principio de menor privilegio:** Usuarios anónimos pueden hacer lo mínimo
3. **Server-side enforcement:** La seguridad NO depende del cliente
4. **Explicit allow:** Negamos por defecto, permitimos solo lo necesario

### Arquitectura de seguridad

```
Browser (anon)
    ↓ (solo SELECT públicas)
Supabase RLS
    ↓ (permite vacantes activas, blog publicado)
    ✅ Acceso permitido (lectura pública)
    ❌ Acceso denegado (postulaciones, leads)

Nitro Server
    ↓ (con service_role key)
Supabase RLS
    ↓ (service_role bypassa RLS)
    ✅ Acceso completo (INSERT/UPDATE/DELETE en cualquier tabla)
```

---

## Autenticación

### Niveles de acceso

| Rol               | Quién               | Origen  | Permisos                 | Casos de uso                            |
| ----------------- | ------------------- | ------- | ------------------------ | --------------------------------------- |
| **anon**          | Visitante sin login | Browser | SELECT públicas          | Leer vacantes, blog                     |
| **authenticated** | Usuario con sesión  | Browser | (igual que anon en RCKT) | ——                                      |
| **service_role**  | Servidor Nitro      | Backend | TODO                     | Insertar postulaciones, gestionar admin |

### Flujo de autenticación

```
1. Usuario visita rckt.lat
   → Browser obtiene Supabase publishable key (anon)
   → Conecta a Supabase Data API

2. Lee datos públicos
   → SELECT vacantes WHERE estado='activa'
   → SELECT blog_posts WHERE status='published'
   → RLS permite ✅

3. Intenta insertar postulación
   → INSERT INTO postulaciones {...}
   → RLS nega ❌
   → Browser debe usar servidor Nitro

4. Servidor Nitro inserta postulación
   → Usa SUPABASE_SERVICE_ROLE_KEY
   → RLS permit (service_role bypassa)
   → INSERT ejecuta ✅

5. Lovable bridge accede a config
   → Usa header X-RCKT-Internal-Secret
   → Comunica con función Edge de Lovable Cloud
   → NO accede a RCKT Supabase directamente
```

---

## Row Level Security (RLS)

### Tablas públicas (lectura permitida bajo condiciones)

#### `vacantes`

```sql
-- Usuarios anónimos/autenticados pueden ver solo vacantes activas
CREATE POLICY "vacantes_public_select_activa"
  ON public.vacantes
  FOR SELECT
  TO anon, authenticated
  USING (estado = 'activa');

-- Pero no pueden insertar, actualizar ni eliminar
CREATE POLICY "vacantes_deny_write_public"
  ON public.vacantes
  AS RESTRICTIVE
  FOR INSERT, UPDATE, DELETE
  TO anon, authenticated
  WITH CHECK (false);
```

**Consecuencias:**

- ✅ `SELECT * FROM vacantes WHERE estado='activa'` → funciona
- ❌ `SELECT * FROM vacantes WHERE estado='borrador'` → vacío (no visible)
- ❌ `INSERT INTO vacantes ...` → "permission denied"
- ❌ `UPDATE vacantes ...` → "permission denied"

#### `blog_posts`

```sql
-- Solo posts publicados y en el pasado
CREATE POLICY "blog_posts_public_select_published"
  ON public.blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published' AND published_at <= now());
```

#### `blog_categories`

```sql
-- Solo categorías activas
CREATE POLICY "blog_categories_public_select_active"
  ON public.blog_categories
  FOR SELECT
  TO anon, authenticated
  USING (active = true);
```

### Tablas privadas (acceso denegado para públicos)

#### `postulaciones`

```sql
-- Negar SELECT (no pueden ver postulaciones de otros)
CREATE POLICY "postulaciones_deny_select_public"
  ON public.postulaciones
  AS RESTRICTIVE
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- Negar INSERT (deben pasar por servidor)
CREATE POLICY "postulaciones_deny_insert_public"
  ON public.postulaciones
  AS RESTRICTIVE
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

-- Negar UPDATE, DELETE
CREATE POLICY "postulaciones_deny_update_public"
  ON public.postulaciones
  AS RESTRICTIVE
  FOR UPDATE, DELETE
  TO anon, authenticated
  USING (false);
```

**Consecuencias:**

- ❌ `SELECT * FROM postulaciones` → "permission denied"
- ❌ `INSERT INTO postulaciones ...` → "permission denied"
- ✅ Servidor con service_role puede insertar

#### `leads`, `chat_leads`

```sql
-- Completamente denegado para públicos
CREATE POLICY "leads_deny_public"
  ON public.leads
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
```

#### `ai_runtime_config`, `ai_usage_events`, `ai_config_audit`

```sql
-- Completamente privadas
CREATE POLICY "deny_public_access"
  ON public.ai_runtime_config
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false);
```

#### `knowledge_documents`, `knowledge_chunks`

```sql
-- Completamente privadas
CREATE POLICY "knowledge_documents_deny_all_public"
  ON public.knowledge_documents
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
```

#### `postulacion_eventos`

```sql
-- Completamente privada
CREATE POLICY "postulacion_eventos_deny_all_public"
  ON public.postulacion_eventos
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
```

### Service Role Access

El servidor Nitro usa `SUPABASE_SERVICE_ROLE_KEY` para:

- ✅ Leer/escribir en cualquier tabla
- ✅ Hacer operaciones administrativas
- ✅ No es afectado por RLS

```typescript
// Servidor (Nitro) — tiene acceso total
const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
const { error } = await supabaseAdmin
  .from("postulaciones")
  .insert({ nombre: "John", email: "john@example.com" });
// ✅ Funciona, RLS no aplica
```

---

## Storage Security

### Buckets y políticas

#### `cvs` (Curriculum Vitae)

**Configuración:**

- Privado (no acceso público)
- MIME types: `application/pdf`
- Tamaño máximo: 10 MB

**Políticas:**

```sql
-- Solo service_role puede leer
CREATE POLICY "cvs_no_public_read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'cvs' AND auth.role() = 'service_role');

-- Solo service_role puede subir
CREATE POLICY "cvs_no_public_upload"
  ON storage.objects
  FOR INSERT
  USING (bucket_id = 'cvs' AND auth.role() = 'service_role');
```

**Impacto:**

- ❌ Usuario no puede descargar CV de otro
- ❌ Usuario no puede subir directamente (debe pasar por servidor)
- ✅ Servidor puede acceder para cualquier propósito

#### `blog-media` (Imágenes del blog)

**Configuración:**

- Público (lectura permitida)
- MIME types: imágenes (jpeg, png, webp, gif)
- Tamaño máximo: 50 MB

**Políticas:**

```sql
-- Cualquiera puede leer
CREATE POLICY "blog_media_public_read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'blog-media');

-- Solo service_role puede escribir
CREATE POLICY "blog_media_service_role_write"
  ON storage.objects
  FOR INSERT, UPDATE, DELETE
  USING (bucket_id = 'blog-media' AND auth.role() = 'service_role');
```

**Impacto:**

- ✅ Imágenes visibles en web sin autenticación
- ❌ Solo servidor puede agregar/modificar imágenes
- ❌ Usuario no puede subir imágenes maliciosas

#### `knowledge` (Documentos para RAG)

**Configuración:**

- Privado (sin acceso público)
- MIME types: PDF, texto, markdown, JSON
- Tamaño máximo: 100 MB

**Políticas:**

```sql
-- Solo service_role puede acceder
CREATE POLICY "knowledge_no_public_read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'knowledge' AND auth.role() = 'service_role');

CREATE POLICY "knowledge_no_public_write"
  ON storage.objects
  FOR INSERT, UPDATE, DELETE
  USING (bucket_id = 'knowledge' AND auth.role() = 'service_role');
```

**Impacto:**

- ❌ Público no puede ver documentos
- ✅ Servidor puede ingerir documentos para RAG

---

## Service Role Key

### ⚠️ CRÍTICO: Mantener en secreto

El `SUPABASE_SERVICE_ROLE_KEY` es como la contraseña root. Si se expone:

```
❌ Alguien podría:
  - Eliminar todas las tablas
  - Robar todos los datos
  - Modificar vacantes, postulaciones, blog
  - Acceder a CVs, datos personales
```

### Dónde va el Service Role Key

✅ **Server-side only:**

```
- .env.local (desarrollo) — gitignored
- Render environment variables (producción)
- src/integrations/supabase/client.server.ts (cargado desde env)
```

❌ **NUNCA en:**

```
- .env.example
- source code (hardcoded)
- .git history
- VITE_SUPABASE_SERVICE_ROLE_KEY (variable pública)
- Browser console
- Network requests (visible en DevTools)
```

### Validación en código

```typescript
// ❌ MAL — expone el secreto
export const apiKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// ❌ MAL — hardcoded
const client = createClient(url, "eyJ...");

// ✅ BIEN — cargado solo en servidor
const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

// ✅ BIEN — variable server-only
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
```

---

## Secrets Management

### Variables de entorno

| Variable                        | Visibilidad  | Origen     | Propósito                 |
| ------------------------------- | ------------ | ---------- | ------------------------- |
| `VITE_SUPABASE_URL`             | Browser      | .env.local | URL de Supabase (público) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser      | .env.local | Anon key (público)        |
| `SUPABASE_URL`                  | Servidor     | .env.local | URL de Supabase (local)   |
| `SUPABASE_PUBLISHABLE_KEY`      | Servidor     | .env.local | Anon key (local)          |
| `SUPABASE_SERVICE_ROLE_KEY`     | **Servidor** | .env.local | **⚠️ SECRETO**            |
| `ADMIN_CONTROL_SECRET`          | **Servidor** | .env.local | Contraseña admin          |
| `ADMIN_SESSION_SECRET`          | **Servidor** | .env.local | Signing key de sesiones   |

### Scanning de secretos

Antes de hacer commit:

```bash
# Verificar que no hay service_role_key en el código
grep -r "VITE_SUPABASE_SERVICE_ROLE_KEY" src/
# Debe retornar: No files found ✅

grep -r "eyJ" src/ --include="*.ts" --include="*.tsx"
# No debe haber keys hardcodeadas ✅
```

### Git hooks (opcional pero recomendado)

```bash
# Instalar pre-commit hook para detectar secretos
npm install -D husky @commitlint/cli

# Crear hook
cat > .husky/pre-commit << 'EOF'
#!/bin/sh
grep -r "VITE_SUPABASE_SERVICE_ROLE_KEY\|sb_\|eyJ" src/ && exit 1
exit 0
EOF
chmod +x .husky/pre-commit
```

---

## Auditoría

### Tablas de auditoría

#### `ai_config_audit`

```
Registra cambios en ai_runtime_config:
- config_version: versión de configuración
- fields_changed: array de campos modificados
- previous_values: valores anteriores (JSONB)
- new_values: valores nuevos (JSONB)
- updated_by: quién hizo el cambio
- created_at: timestamp
```

#### `postulacion_eventos` (preparado para usar)

```
Registra cambios en postulaciones:
- postulacion_id: a qué postulación
- tipo: tipo de evento (status_change, nota_added, etc.)
- estado_anterior: estado antes
- estado_nuevo: estado después
- nota: descripción del evento
- created_at: timestamp
```

### Cómo auditar

**En Supabase Dashboard → SQL Editor:**

```sql
-- Ver cambios de configuración de AI
SELECT * FROM ai_config_audit
ORDER BY created_at DESC
LIMIT 10;

-- Ver quién cambió qué
SELECT config_version, fields_changed, updated_by, created_at
FROM ai_config_audit
WHERE updated_by = 'admin-user'
ORDER BY created_at DESC;
```

### Logs de acceso

Los logs de Supabase están en:

1. **Supabase Dashboard → Logs → API**
2. **Supabase Dashboard → Logs → Database** (queries ejecutadas)
3. **Render Logs** (stderr de aplicación)

---

## Checklist de Seguridad

- [ ] Service role key NO está en .env.example
- [ ] Service role key NO está en código (grep)
- [ ] Service role key está en .gitignore
- [ ] RLS habilitado en TODAS las tablas
- [ ] Policies RESTRICTIVE denying defaults
- [ ] Storage policies configuradas
- [ ] Blog posts solo públicos si status='published'
- [ ] Vacantes solo públicas si estado='activa'
- [ ] Postulaciones completamente privadas
- [ ] Admin secrets en Render, no en Git
- [ ] Lovable bridge usa header, no service_role
- [ ] Logs monitoreados en producción

---

## Recursos

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Security](https://www.postgresql.org/docs/current/sql-grant.html)
- [OWASP Database Security](https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html)

---

**Fin de guía de seguridad**
