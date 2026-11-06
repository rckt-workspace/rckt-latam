import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const DOMINIO = "@rckt.es";

const schema = z.object({
  nombre: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(128),
});

export const registrarEquipo = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const email = data.email.toLowerCase();
    if (!email.endsWith(DOMINIO)) {
      return { ok: false as const, error: "El registro está restringido al equipo de RCKT." };
    }

    const { getDbConfig, dbFetch } = await import("@/lib/db-config.server");
          const { createClient } = await import("@supabase/supabase-js");
          const { url, serviceRoleKey } = getDbConfig();
          const supabaseAdmin = createClient(url, serviceRoleKey, {
            auth: { persistSession: false, autoRefreshToken: false },
            global: { fetch: dbFetch(serviceRoleKey) },
          });
    const { error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: data.password,
      email_confirm: true,
      user_metadata: { nombre: data.nombre },
    });

    if (error) {
      const msg = /already|registered|exists/i.test(error.message)
        ? "Ya existe una cuenta con ese correo."
        : "No pudimos crear la cuenta. Inténtalo de nuevo.";
      return { ok: false as const, error: msg };
    }

    return { ok: true as const };
  });
