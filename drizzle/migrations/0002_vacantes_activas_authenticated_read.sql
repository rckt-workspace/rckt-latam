CREATE POLICY "Vacantes activas visibles autenticados"
ON public.vacantes FOR SELECT TO authenticated
USING (estado = 'activa'::vacante_estado);