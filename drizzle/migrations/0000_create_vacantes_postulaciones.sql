CREATE TYPE public.vacante_estado AS ENUM ('activa','cerrada');
CREATE TYPE public.postulacion_tipo AS ENUM ('candidato','servicio');

CREATE TABLE public.vacantes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  area text,
  modalidad text,
  ubicacion text,
  descripcion text,
  requisitos text,
  estado public.vacante_estado NOT NULL DEFAULT 'activa',
  fecha_publicacion timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.vacantes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vacantes TO authenticated;
GRANT ALL ON public.vacantes TO service_role;
ALTER TABLE public.vacantes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vacantes activas visibles para todos"
ON public.vacantes FOR SELECT TO anon
USING (estado = 'activa');
CREATE POLICY "RH lee todas las vacantes"
ON public.vacantes FOR SELECT TO authenticated USING (true);
CREATE POLICY "RH crea vacantes"
ON public.vacantes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "RH actualiza vacantes"
ON public.vacantes FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "RH elimina vacantes"
ON public.vacantes FOR DELETE TO authenticated USING (true);

CREATE TABLE public.postulaciones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vacante_id uuid REFERENCES public.vacantes(id) ON DELETE SET NULL,
  nombre text NOT NULL,
  email text NOT NULL,
  telefono text,
  cv_url text,
  portafolio_url text,
  mensaje text,
  tipo public.postulacion_tipo NOT NULL DEFAULT 'candidato',
  fecha timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.postulaciones TO anon;
GRANT SELECT, INSERT, DELETE ON public.postulaciones TO authenticated;
GRANT ALL ON public.postulaciones TO service_role;
ALTER TABLE public.postulaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede postularse"
ON public.postulaciones FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Autenticados pueden postularse"
ON public.postulaciones FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "RH lee postulaciones"
ON public.postulaciones FOR SELECT TO authenticated USING (true);
CREATE POLICY "RH elimina postulaciones"
ON public.postulaciones FOR DELETE TO authenticated USING (true);

CREATE INDEX idx_postulaciones_vacante ON public.postulaciones(vacante_id);

CREATE POLICY "Subida publica de CVs"
ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'cvs');
CREATE POLICY "Subida autenticada de CVs"
ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cvs');
CREATE POLICY "RH lee CVs"
ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'cvs');