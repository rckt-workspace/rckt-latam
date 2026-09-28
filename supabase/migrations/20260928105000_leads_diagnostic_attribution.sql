-- ============================================================================
-- Leads Diagnostic: Attribution & Scoring
-- ============================================================================
-- Timestamp: 20260928105000
-- Purpose: Create leads_diagnostic table baseline if missing, then extend
--          with campaign tracking, lead scoring, consent tracking, and status.
--
-- Changes:
-- - Creates leads_diagnostic table if missing (reproducible from supabase/migrations)
-- - Adds attribution columns (source, landing_path, referrer)
-- - Adds campaign params (utm_*, fbclid, gclid, wbraid)
-- - Adds lead scoring (lead_score, lead_level)
-- - Adds consent tracking (consent_at, consent_version)
-- - Adds lead status and metadata
-- - Adds updated_at with trigger for automatic updates
-- - Enables RLS with appropriate policies
--
-- IMPORTANT: Uses CREATE TABLE IF NOT EXISTS + ALTER TABLE for safety.
--            In production, where table already exists, the CREATE is a NO-OP
--            and ALTER TABLE skips existing columns. All existing records preserved.
--
-- ============================================================================

-- ============================================================================
-- 1. CREATE TABLE (Baseline from drizzle/migrations/0004)
-- ============================================================================
-- Reproduces the historical table definition. In production, this is a NO-OP.
-- Matches exactly with drizzle/migrations/0004_create_leads_diagnostic.sql

CREATE TABLE IF NOT EXISTS public.leads_diagnostic (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  empresa text NOT NULL,
  sitio_web text,
  pais text,
  ciudad text,
  cargo text,
  empleados text,
  sector text,
  problema_principal text,
  inversion_pauta text,
  volumen_leads text,
  crm_actual text,
  whatsapp_ventas text,
  fecha_inicio text,
  nombre text,
  email text,
  telefono text
);

-- ============================================================================
-- 2. ADD COLUMNS (Idempotent, preserves existing data)
-- ============================================================================

-- Attribution columns
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS source text;
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS landing_path text;
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS referrer text;

-- Add campaign parameter columns
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS utm_source text;
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS utm_medium text;
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS utm_campaign text;
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS utm_content text;
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS utm_term text;

-- Add click ID columns
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS fbclid text;
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS gclid text;
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS wbraid text;

-- Add lead scoring columns
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS lead_score integer;
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS lead_level text;

-- Add consent tracking columns
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS consent_at timestamptz;
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS consent_version text;

-- Add status and metadata for lead management
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'nuevo';
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS metadata jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Add automatic update timestamp
ALTER TABLE public.leads_diagnostic ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- ============================================================================
-- 3. ROW LEVEL SECURITY
-- ============================================================================
-- Enable RLS on the table. saveDiagnosticLead writes via supabaseAdmin/service_role.
-- Flow: browser -> server function -> supabaseAdmin/service_role -> database
--
-- Permissions:
-- - anon: no access
-- - authenticated: SELECT and DELETE only (governed by existing RLS policies for staff)
-- - service_role: full access for saveDiagnosticLead

ALTER TABLE public.leads_diagnostic ENABLE ROW LEVEL SECURITY;

-- Revoke all access from anon
REVOKE ALL ON TABLE public.leads_diagnostic FROM anon;

-- Grant SELECT and DELETE to authenticated (policies restrict to staff)
REVOKE ALL ON TABLE public.leads_diagnostic FROM authenticated;
GRANT SELECT, DELETE ON TABLE public.leads_diagnostic TO authenticated;

-- Grant full access to service_role (used by saveDiagnosticLead)
GRANT ALL ON TABLE public.leads_diagnostic TO service_role;

-- ============================================================================
-- 4. CONSTRAINTS: lead_score
-- ============================================================================
-- lead_score must be >= 0 when present (NULL is allowed for legacy/incomplete leads).

ALTER TABLE public.leads_diagnostic
DROP CONSTRAINT IF EXISTS leads_diagnostic_lead_score_check;

ALTER TABLE public.leads_diagnostic
ADD CONSTRAINT leads_diagnostic_lead_score_check
CHECK (lead_score IS NULL OR lead_score >= 0);

-- ============================================================================
-- 5. CONSTRAINTS: lead_level
-- ============================================================================
-- lead_level must be one of: sql, mql, recurso (NULL is allowed).

ALTER TABLE public.leads_diagnostic
DROP CONSTRAINT IF EXISTS leads_diagnostic_lead_level_check;

ALTER TABLE public.leads_diagnostic
ADD CONSTRAINT leads_diagnostic_lead_level_check
CHECK (
  lead_level IS NULL
  OR lead_level IN ('sql', 'mql', 'recurso')
);

-- ============================================================================
-- 6. CONSTRAINTS: status
-- ============================================================================
-- status values: nuevo, contactado, calificado, descartado, convertido.

ALTER TABLE public.leads_diagnostic
DROP CONSTRAINT IF EXISTS leads_diagnostic_status_check;

ALTER TABLE public.leads_diagnostic
ADD CONSTRAINT leads_diagnostic_status_check
CHECK (
  status IN (
    'nuevo',
    'contactado',
    'calificado',
    'descartado',
    'convertido'
  )
);

-- ============================================================================
-- 7. TRIGGER: Automatic updated_at on UPDATE
-- ============================================================================
-- Reuses existing public.set_updated_at() function (from 20260521145605).
-- Fires BEFORE UPDATE to set NEW.updated_at = now().

DROP TRIGGER IF EXISTS leads_diagnostic_set_updated_at ON public.leads_diagnostic;

CREATE TRIGGER leads_diagnostic_set_updated_at
BEFORE UPDATE ON public.leads_diagnostic
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 8. INDEXES (Performance optimization for common queries)
-- ============================================================================

-- Timeline queries
CREATE INDEX IF NOT EXISTS idx_leads_diagnostic_created_at
  ON public.leads_diagnostic (created_at DESC);

-- Filtering by lead level (MQL/SQL/recurso)
CREATE INDEX IF NOT EXISTS idx_leads_diagnostic_lead_level
  ON public.leads_diagnostic (lead_level);

-- Lead pipeline status queries
CREATE INDEX IF NOT EXISTS idx_leads_diagnostic_status
  ON public.leads_diagnostic (status);

-- Duplicate detection / email lookups
CREATE INDEX IF NOT EXISTS idx_leads_diagnostic_email
  ON public.leads_diagnostic (email) WHERE email IS NOT NULL;

-- Campaign analysis and attribution
CREATE INDEX IF NOT EXISTS idx_leads_diagnostic_source
  ON public.leads_diagnostic (source) WHERE source IS NOT NULL;

-- ============================================================================
-- END MIGRATION
-- ============================================================================
