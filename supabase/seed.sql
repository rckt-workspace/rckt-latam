-- ============================================================================
-- RCKT LATAM Seed Data
-- ============================================================================
-- Purpose: Initialize safe, recreatable data for RCKT LATAM
--
-- Includes:
-- - Blog categories
-- - Sample vacante (for testing)
--
-- Does NOT include:
-- - Personal data (candidates, leads, applications)
-- - Sensitive information
-- - Third-party credentials
--
-- ============================================================================

-- ============================================================================
-- BLOG CATEGORIES (from src/data/blog/categories.json)
-- ============================================================================

INSERT INTO public.blog_categories (id, name, slug, description, orden, active, created_at, updated_at)
VALUES
  ('00000000-0000-4000-8000-000000000001'::uuid, 'Inteligencia Artificial', 'inteligencia-artificial', 'Aplicaciones y estrategias de IA en la empresa', 1, true, now(), now()),
  ('00000000-0000-4000-8000-000000000002'::uuid, 'Growth', 'growth', 'Crecimiento, adquisición y retención de usuarios', 2, true, now(), now()),
  ('00000000-0000-4000-8000-000000000003'::uuid, 'Performance', 'performance', 'Optimización, velocidad y eficiencia', 3, true, now(), now()),
  ('00000000-0000-4000-8000-000000000004'::uuid, 'Estrategia digital', 'estrategia-digital', 'Transformación digital y estrategia de negocios', 4, true, now(), now()),
  ('00000000-0000-4000-8000-000000000005'::uuid, 'Automatización', 'automatizacion', 'Procesos automatizados y workflows', 5, true, now(), now()),
  ('00000000-0000-4000-8000-000000000006'::uuid, 'Cultura y tecnología', 'cultura-y-tecnologia', 'Cómo la tecnología impacta la cultura organizacional', 6, true, now(), now())
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SAMPLE VACANTE (for testing purposes only - delete before production)
-- ============================================================================

-- Uncomment the following to seed a sample job posting for testing:
--
-- INSERT INTO public.vacantes
--   (slug, titulo, area, modalidad, ubicacion, estado, created_at, updated_at)
-- VALUES
--   ('growth-manager-latam', 'Growth Manager LATAM', 'Growth', 'Remoto', 'LATAM', 'activa', now(), now())
-- ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- END OF SEED DATA
-- ============================================================================
