CREATE TABLE public.leads_diagnostic (
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

GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads_diagnostic TO authenticated;
GRANT ALL ON public.leads_diagnostic TO service_role;

ALTER TABLE public.leads_diagnostic ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can read leads_diagnostic"
ON public.leads_diagnostic FOR SELECT TO authenticated
USING (public.is_rckt_staff());

CREATE POLICY "Staff can delete leads_diagnostic"
ON public.leads_diagnostic FOR DELETE TO authenticated
USING (public.is_rckt_staff());