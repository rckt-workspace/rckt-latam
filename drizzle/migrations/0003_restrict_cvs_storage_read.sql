REVOKE EXECUTE ON FUNCTION public.is_rckt_staff() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.is_rckt_staff() TO authenticated;

DROP POLICY IF EXISTS "RH lee CVs" ON storage.objects;

CREATE POLICY "Staff lee CVs"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'cvs' AND public.is_rckt_staff());