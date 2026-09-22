export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_config_audit: {
        Row: {
          config_version: number
          created_at: string
          fields_changed: string[]
          id: string
          new_values: Json | null
          previous_values: Json | null
          updated_by: string
        }
        Insert: {
          config_version: number
          created_at?: string
          fields_changed: string[]
          id?: string
          new_values?: Json | null
          previous_values?: Json | null
          updated_by: string
        }
        Update: {
          config_version?: number
          created_at?: string
          fields_changed?: string[]
          id?: string
          new_values?: Json | null
          previous_values?: Json | null
          updated_by?: string
        }
        Relationships: []
      }
      ai_runtime_config: {
        Row: {
          active_agent_profile: string
          budget_policy: string
          daily_budget_usd: number | null
          enabled: boolean
          fallback_enabled: boolean
          fallback_timeout_ms: number
          id: string
          max_tokens: number
          monthly_budget_usd: number | null
          primary_model: string
          primary_provider: string
          primary_timeout_ms: number
          primary_weight: number
          routing_mode: string
          secondary_model: string
          secondary_provider: string
          secondary_weight: number | null
          updated_at: string
          updated_by: string
          version: number
        }
        Insert: {
          active_agent_profile?: string
          budget_policy?: string
          daily_budget_usd?: number | null
          enabled?: boolean
          fallback_enabled?: boolean
          fallback_timeout_ms?: number
          id?: string
          max_tokens?: number
          monthly_budget_usd?: number | null
          primary_model?: string
          primary_provider?: string
          primary_timeout_ms?: number
          primary_weight?: number
          routing_mode?: string
          secondary_model?: string
          secondary_provider?: string
          secondary_weight?: number | null
          updated_at?: string
          updated_by?: string
          version?: number
        }
        Update: {
          active_agent_profile?: string
          budget_policy?: string
          daily_budget_usd?: number | null
          enabled?: boolean
          fallback_enabled?: boolean
          fallback_timeout_ms?: number
          id?: string
          max_tokens?: number
          monthly_budget_usd?: number | null
          primary_model?: string
          primary_provider?: string
          primary_timeout_ms?: number
          primary_weight?: number
          routing_mode?: string
          secondary_model?: string
          secondary_provider?: string
          secondary_weight?: number | null
          updated_at?: string
          updated_by?: string
          version?: number
        }
        Relationships: []
      }
      ai_usage_events: {
        Row: {
          agent_profile: string
          cached_tokens: number
          cost_type: string | null
          cost_usd: number | null
          created_at: string
          error_type: string | null
          fallback_used: boolean
          id: string
          input_tokens: number
          latency_ms: number | null
          model: string
          output_tokens: number
          provider: string
          request_id: string
          session_id: string | null
          status: string
          ttft_ms: number | null
        }
        Insert: {
          agent_profile: string
          cached_tokens?: number
          cost_type?: string | null
          cost_usd?: number | null
          created_at?: string
          error_type?: string | null
          fallback_used?: boolean
          id?: string
          input_tokens?: number
          latency_ms?: number | null
          model: string
          output_tokens?: number
          provider: string
          request_id?: string
          session_id?: string | null
          status: string
          ttft_ms?: number | null
        }
        Update: {
          agent_profile?: string
          cached_tokens?: number
          cost_type?: string | null
          cost_usd?: number | null
          created_at?: string
          error_type?: string | null
          fallback_used?: boolean
          id?: string
          input_tokens?: number
          latency_ms?: number | null
          model?: string
          output_tokens?: number
          provider?: string
          request_id?: string
          session_id?: string | null
          status?: string
          ttft_ms?: number | null
        }
        Relationships: []
      }
      chat_leads: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          id: string
          messages: Json
          name: string | null
          phone: string | null
          session_id: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          messages?: Json
          name?: string | null
          phone?: string | null
          session_id: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          messages?: Json
          name?: string | null
          phone?: string | null
          session_id?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          company: string
          concern: string | null
          created_at: string
          email: string
          id: string
          name: string
          source: string | null
          user_agent: string | null
          website: string | null
        }
        Insert: {
          company: string
          concern?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          source?: string | null
          user_agent?: string | null
          website?: string | null
        }
        Update: {
          company?: string
          concern?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          source?: string | null
          user_agent?: string | null
          website?: string | null
        }
        Relationships: []
      }
      leads_diagnostic: {
        Row: {
          cargo: string | null
          ciudad: string | null
          created_at: string
          crm_actual: string | null
          email: string | null
          empleados: string | null
          empresa: string
          fecha_inicio: string | null
          id: string
          inversion_pauta: string | null
          nombre: string | null
          pais: string | null
          problema_principal: string | null
          sector: string | null
          sitio_web: string | null
          telefono: string | null
          volumen_leads: string | null
          whatsapp_ventas: string | null
        }
        Insert: {
          cargo?: string | null
          ciudad?: string | null
          created_at?: string
          crm_actual?: string | null
          email?: string | null
          empleados?: string | null
          empresa: string
          fecha_inicio?: string | null
          id?: string
          inversion_pauta?: string | null
          nombre?: string | null
          pais?: string | null
          problema_principal?: string | null
          sector?: string | null
          sitio_web?: string | null
          telefono?: string | null
          volumen_leads?: string | null
          whatsapp_ventas?: string | null
        }
        Update: {
          cargo?: string | null
          ciudad?: string | null
          created_at?: string
          crm_actual?: string | null
          email?: string | null
          empleados?: string | null
          empresa?: string
          fecha_inicio?: string | null
          id?: string
          inversion_pauta?: string | null
          nombre?: string | null
          pais?: string | null
          problema_principal?: string | null
          sector?: string | null
          sitio_web?: string | null
          telefono?: string | null
          volumen_leads?: string | null
          whatsapp_ventas?: string | null
        }
        Relationships: []
      }
      postulaciones: {
        Row: {
          cv_url: string | null
          email: string
          fecha: string
          id: string
          mensaje: string | null
          nombre: string
          portafolio_url: string | null
          telefono: string | null
          tipo: Database["public"]["Enums"]["postulacion_tipo"]
          vacante_id: string | null
        }
        Insert: {
          cv_url?: string | null
          email: string
          fecha?: string
          id?: string
          mensaje?: string | null
          nombre: string
          portafolio_url?: string | null
          telefono?: string | null
          tipo?: Database["public"]["Enums"]["postulacion_tipo"]
          vacante_id?: string | null
        }
        Update: {
          cv_url?: string | null
          email?: string
          fecha?: string
          id?: string
          mensaje?: string | null
          nombre?: string
          portafolio_url?: string | null
          telefono?: string | null
          tipo?: Database["public"]["Enums"]["postulacion_tipo"]
          vacante_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "postulaciones_vacante_id_fkey"
            columns: ["vacante_id"]
            isOneToOne: false
            referencedRelation: "vacantes"
            referencedColumns: ["id"]
          },
        ]
      }
      vacantes: {
        Row: {
          area: string | null
          created_at: string
          descripcion: string | null
          estado: Database["public"]["Enums"]["vacante_estado"]
          fecha_publicacion: string
          id: string
          modalidad: string | null
          requisitos: string | null
          titulo: string
          ubicacion: string | null
        }
        Insert: {
          area?: string | null
          created_at?: string
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["vacante_estado"]
          fecha_publicacion?: string
          id?: string
          modalidad?: string | null
          requisitos?: string | null
          titulo: string
          ubicacion?: string | null
        }
        Update: {
          area?: string | null
          created_at?: string
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["vacante_estado"]
          fecha_publicacion?: string
          id?: string
          modalidad?: string | null
          requisitos?: string | null
          titulo?: string
          ubicacion?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_rckt_staff: { Args: never; Returns: boolean }
    }
    Enums: {
      postulacion_tipo: "candidato" | "servicio"
      vacante_estado: "activa" | "cerrada"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      postulacion_tipo: ["candidato", "servicio"],
      vacante_estado: ["activa", "cerrada"],
    },
  },
} as const
