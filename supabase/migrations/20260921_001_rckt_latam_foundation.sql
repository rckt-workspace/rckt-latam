-- ============================================================================
-- RCKT LATAM Foundation Migration
-- ============================================================================
-- Timestamp: 20260921_001
-- Purpose: Create reproducible baseline for RCKT LATAM Supabase infrastructure
--
-- This migration:
-- - Creates all missing ENUMs (vacante_estado, postulacion_tipo, etc.)
-- - Creates all missing tables (vacantes, postulaciones, blog, knowledge/RAG)
-- - Creates Storage buckets for CVs, blog media, and knowledge
-- - Sets up complete RLS policies for security
-- - Adds indexes and triggers for performance
--
-- IMPORTANT: Run after all historical migrations. Does not duplicate:
--   - chat_leads (from 20260521145555)
--   - leads (from 20260709092349)
--   - ai_runtime_config, ai_usage_events, ai_config_audit (from 202608xx)
--
-- ============================================================================

-- ============================================================================
-- 1. EXTENSIONS
-- ============================================================================

-- pgcrypto: Already enabled by default in Supabase, kept for clarity
-- vector: Required for RAG embeddings (no specific dimension yet)
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================================
-- 2. ENUMS
-- ============================================================================

-- Vacante job posting states
CREATE TYPE vacante_estado AS ENUM ('borrador', 'activa', 'cerrada');

-- Application submission type
CREATE TYPE postulacion_tipo AS ENUM ('candidato', 'servicio');

-- Application status tracking
CREATE TYPE postulacion_estado AS ENUM (
  'nueva',
  'revision',
  'contactado',
  'entrevista',
  'descartado',
  'seleccionado'
);

-- Blog post publication status
CREATE TYPE blog_status AS ENUM ('draft', 'published', 'archived');

-- Knowledge document processing status
CREATE TYPE knowledge_status AS ENUM ('pending', 'processing', 'ready', 'failed');

-- ============================================================================
-- 3. FUNCTIONS
-- ============================================================================

-- Note: set_updated_at() already created in 20260521145605
-- Verify it exists; if migrations are run independently, this ensures availability
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- 4. HR TABLES (Vacancies & Applications)
-- ============================================================================

-- Vacantes: Job postings
CREATE TABLE public.vacantes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  area TEXT,
  modalidad TEXT,
  ubicacion TEXT,
  descripcion TEXT,
  requisitos TEXT,
  responsabilidades TEXT,
  estado vacante_estado NOT NULL DEFAULT 'borrador',
  destacada BOOLEAN NOT NULL DEFAULT false,
  orden INTEGER NOT NULL DEFAULT 0,
  fecha_publicacion TIMESTAMPTZ,
  fecha_cierre TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.vacantes ENABLE ROW LEVEL SECURITY;

CREATE INDEX vacantes_estado_idx ON public.vacantes (estado);
CREATE INDEX vacantes_fecha_publicacion_idx ON public.vacantes (fecha_publicacion DESC);
CREATE INDEX vacantes_slug_idx ON public.vacantes (slug);
CREATE INDEX vacantes_orden_idx ON public.vacantes (orden);

CREATE TRIGGER vacantes_set_updated_at
BEFORE UPDATE ON public.vacantes
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Postulaciones: Applications
CREATE TABLE public.postulaciones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vacante_id UUID REFERENCES public.vacantes(id) ON DELETE SET NULL,
  tipo postulacion_tipo NOT NULL DEFAULT 'candidato',
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  portafolio_url TEXT,
  mensaje TEXT,
  cv_path TEXT,
  estado postulacion_estado NOT NULL DEFAULT 'nueva',
  notas_internas TEXT,
  source TEXT,
  consent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.postulaciones ENABLE ROW LEVEL SECURITY;

CREATE INDEX postulaciones_vacante_id_idx ON public.postulaciones (vacante_id);
CREATE INDEX postulaciones_estado_idx ON public.postulaciones (estado);
CREATE INDEX postulaciones_email_idx ON public.postulaciones (email);
CREATE INDEX postulaciones_created_at_idx ON public.postulaciones (created_at DESC);

CREATE TRIGGER postulaciones_set_updated_at
BEFORE UPDATE ON public.postulaciones
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Postulacion Eventos: Application status audit trail
CREATE TABLE public.postulacion_eventos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  postulacion_id UUID NOT NULL REFERENCES public.postulaciones(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  estado_anterior postulacion_estado,
  estado_nuevo postulacion_estado,
  nota TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.postulacion_eventos ENABLE ROW LEVEL SECURITY;

CREATE INDEX postulacion_eventos_postulacion_id_idx ON public.postulacion_eventos (postulacion_id);
CREATE INDEX postulacion_eventos_created_at_idx ON public.postulacion_eventos (created_at DESC);

-- ============================================================================
-- 5. BLOG TABLES
-- ============================================================================

-- Blog Categories
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  orden INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

CREATE INDEX blog_categories_slug_idx ON public.blog_categories (slug);
CREATE INDEX blog_categories_active_idx ON public.blog_categories (active);
CREATE INDEX blog_categories_orden_idx ON public.blog_categories (orden);

CREATE TRIGGER blog_categories_set_updated_at
BEFORE UPDATE ON public.blog_categories
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Blog Posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_path TEXT,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  author_name TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  status blog_status NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE INDEX blog_posts_slug_idx ON public.blog_posts (slug);
CREATE INDEX blog_posts_status_idx ON public.blog_posts (status);
CREATE INDEX blog_posts_published_at_idx ON public.blog_posts (published_at DESC);
CREATE INDEX blog_posts_category_id_idx ON public.blog_posts (category_id);
CREATE INDEX blog_posts_featured_idx ON public.blog_posts (featured);

CREATE TRIGGER blog_posts_set_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 6. KNOWLEDGE / RAG TABLES
-- ============================================================================

-- Knowledge Documents (source files for RAG)
CREATE TABLE public.knowledge_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  source_type TEXT,
  source_url TEXT,
  storage_path TEXT,
  mime_type TEXT,
  status knowledge_status DEFAULT 'pending',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.knowledge_documents ENABLE ROW LEVEL SECURITY;

CREATE INDEX knowledge_documents_status_idx ON public.knowledge_documents (status);
CREATE INDEX knowledge_documents_created_at_idx ON public.knowledge_documents (created_at DESC);

CREATE TRIGGER knowledge_documents_set_updated_at
BEFORE UPDATE ON public.knowledge_documents
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Knowledge Chunks (text chunks with embeddings)
CREATE TABLE public.knowledge_chunks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID NOT NULL REFERENCES public.knowledge_documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  embedding vector,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.knowledge_chunks ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX knowledge_chunks_document_chunk_idx
  ON public.knowledge_chunks (document_id, chunk_index);
CREATE INDEX knowledge_chunks_document_id_idx ON public.knowledge_chunks (document_id);
CREATE INDEX knowledge_chunks_created_at_idx ON public.knowledge_chunks (created_at DESC);

-- Note: HNSW or IVFFLAT indexes will be created later once embedding dimension is finalized

-- ============================================================================
-- 7. STORAGE BUCKETS
-- ============================================================================

-- CVs bucket (private, PDF only, 10 MB max)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cvs',
  'cvs',
  false,
  10485760, -- 10 MB in bytes
  ARRAY['application/pdf']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Blog media bucket (public read, server-side write only)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-media',
  'blog-media',
  true,
  52428800, -- 50 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Knowledge bucket (private, various formats)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'knowledge',
  'knowledge',
  false,
  104857600, -- 100 MB
  ARRAY['application/pdf', 'text/plain', 'text/markdown', 'application/json']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 8. ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Vacantes: Public SELECT only where activa
CREATE POLICY "vacantes_public_select_activa"
  ON public.vacantes
  FOR SELECT
  TO anon, authenticated
  USING (estado = 'activa');

-- Vacantes: Deny insert for public users
CREATE POLICY "vacantes_deny_insert_public"
  ON public.vacantes
  AS RESTRICTIVE
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

-- Vacantes: Deny update for public users
CREATE POLICY "vacantes_deny_update_public"
  ON public.vacantes
  AS RESTRICTIVE
  FOR UPDATE
  TO anon, authenticated
  WITH CHECK (false);

-- Vacantes: Deny delete for public users
CREATE POLICY "vacantes_deny_delete_public"
  ON public.vacantes
  AS RESTRICTIVE
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- Postulaciones: No public SELECT
CREATE POLICY "postulaciones_deny_select_public"
  ON public.postulaciones
  AS RESTRICTIVE
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- Postulaciones: No public INSERT (will use service_role from Nitro)
CREATE POLICY "postulaciones_deny_insert_public"
  ON public.postulaciones
  AS RESTRICTIVE
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

-- Postulaciones: No public UPDATE
CREATE POLICY "postulaciones_deny_update_public"
  ON public.postulaciones
  AS RESTRICTIVE
  FOR UPDATE
  TO anon, authenticated
  USING (false);

-- Postulaciones: No public DELETE
CREATE POLICY "postulaciones_deny_delete_public"
  ON public.postulaciones
  AS RESTRICTIVE
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- Postulacion Eventos: No public access
CREATE POLICY "postulacion_eventos_deny_all_public"
  ON public.postulacion_eventos
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Blog Categories: Public SELECT only where active
CREATE POLICY "blog_categories_public_select_active"
  ON public.blog_categories
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- Blog Categories: Deny insert for public
CREATE POLICY "blog_categories_deny_insert_public"
  ON public.blog_categories
  AS RESTRICTIVE
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

-- Blog Categories: Deny update for public
CREATE POLICY "blog_categories_deny_update_public"
  ON public.blog_categories
  AS RESTRICTIVE
  FOR UPDATE
  TO anon, authenticated
  WITH CHECK (false);

-- Blog Categories: Deny delete for public
CREATE POLICY "blog_categories_deny_delete_public"
  ON public.blog_categories
  AS RESTRICTIVE
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- Blog Posts: Public SELECT only where published and published_at <= now()
CREATE POLICY "blog_posts_public_select_published"
  ON public.blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published' AND published_at <= now());

-- Blog Posts: Deny insert for public
CREATE POLICY "blog_posts_deny_insert_public"
  ON public.blog_posts
  AS RESTRICTIVE
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

-- Blog Posts: Deny update for public
CREATE POLICY "blog_posts_deny_update_public"
  ON public.blog_posts
  AS RESTRICTIVE
  FOR UPDATE
  TO anon, authenticated
  WITH CHECK (false);

-- Blog Posts: Deny delete for public
CREATE POLICY "blog_posts_deny_delete_public"
  ON public.blog_posts
  AS RESTRICTIVE
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- Knowledge Documents: No public access
CREATE POLICY "knowledge_documents_deny_all_public"
  ON public.knowledge_documents
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Knowledge Chunks: No public access
CREATE POLICY "knowledge_chunks_deny_all_public"
  ON public.knowledge_chunks
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- ============================================================================
-- 9. STORAGE POLICIES
-- ============================================================================

-- CVs: No public access
CREATE POLICY "cvs_no_public_read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'cvs' AND auth.role() = 'service_role');

CREATE POLICY "cvs_no_public_upload"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'cvs' AND auth.role() = 'service_role');

-- Blog Media: Public read, service_role write
CREATE POLICY "blog_media_public_read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'blog-media');

CREATE POLICY "blog_media_service_role_insert"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'blog-media' AND auth.role() = 'service_role');

CREATE POLICY "blog_media_service_role_update"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'blog-media' AND auth.role() = 'service_role');

CREATE POLICY "blog_media_service_role_delete"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'blog-media' AND auth.role() = 'service_role');

-- Knowledge: No public access
CREATE POLICY "knowledge_no_public_read"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'knowledge' AND auth.role() = 'service_role');

CREATE POLICY "knowledge_no_public_insert"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'knowledge' AND auth.role() = 'service_role');

CREATE POLICY "knowledge_no_public_update"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'knowledge' AND auth.role() = 'service_role');

CREATE POLICY "knowledge_no_public_delete"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'knowledge' AND auth.role() = 'service_role');

-- ============================================================================
-- 10. GRANTS (Service Role Access)
-- ============================================================================

-- Grant service_role full access to new tables
GRANT ALL ON public.vacantes TO service_role;
GRANT ALL ON public.postulaciones TO service_role;
GRANT ALL ON public.postulacion_eventos TO service_role;
GRANT ALL ON public.blog_categories TO service_role;
GRANT ALL ON public.blog_posts TO service_role;
GRANT ALL ON public.knowledge_documents TO service_role;
GRANT ALL ON public.knowledge_chunks TO service_role;

-- Grant service_role access to sequences
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================================
-- 11. FINAL INDEXES & OPTIMIZATIONS
-- ============================================================================

-- Composite indexes for common queries
CREATE INDEX vacantes_estado_publicacion_idx
  ON public.vacantes (estado, fecha_publicacion DESC)
  WHERE estado = 'activa';

CREATE INDEX blog_posts_status_published_at_idx
  ON public.blog_posts (status, published_at DESC)
  WHERE status = 'published';

CREATE INDEX postulaciones_vacante_estado_idx
  ON public.postulaciones (vacante_id, estado);

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
