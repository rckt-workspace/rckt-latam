-- Helper: only verified RCKT staff accounts (corporate email domain) count as People & Culture
CREATE OR REPLACE FUNCTION public.is_rckt_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(
    (auth.jwt() ->> 'email') ILIKE '%@rckt.es'
    AND coalesce((auth.jwt() ->> 'email_verified')::boolean, true),
    false
  );
$$;

-- postulaciones: only staff may read or delete applications
DROP POLICY IF EXISTS "RH lee postulaciones" ON public.postulaciones;
DROP POLICY IF EXISTS "RH elimina postulaciones" ON public.postulaciones;

CREATE POLICY "Staff lee postulaciones"
ON public.postulaciones FOR SELECT TO authenticated
USING (public.is_rckt_staff());

CREATE POLICY "Staff elimina postulaciones"
ON public.postulaciones FOR DELETE TO authenticated
USING (public.is_rckt_staff());

-- vacantes: only staff may manage vacancies; public keeps read of active ones
DROP POLICY IF EXISTS "RH lee todas las vacantes" ON public.vacantes;
DROP POLICY IF EXISTS "RH crea vacantes" ON public.vacantes;
DROP POLICY IF EXISTS "RH actualiza vacantes" ON public.vacantes;
DROP POLICY IF EXISTS "RH elimina vacantes" ON public.vacantes;

CREATE POLICY "Staff lee todas las vacantes"
ON public.vacantes FOR SELECT TO authenticated
USING (public.is_rckt_staff());

CREATE POLICY "Staff crea vacantes"
ON public.vacantes FOR INSERT TO authenticated
WITH CHECK (public.is_rckt_staff());

CREATE POLICY "Staff actualiza vacantes"
ON public.vacantes FOR UPDATE TO authenticated
USING (public.is_rckt_staff())
WITH CHECK (public.is_rckt_staff());

CREATE POLICY "Staff elimina vacantes"
ON public.vacantes FOR DELETE TO authenticated
USING (public.is_rckt_staff());