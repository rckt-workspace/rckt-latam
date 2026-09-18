export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      chat_leads: {
        Row: {
          company: string | null;
          created_at: string;
          email: string | null;
          id: string;
          messages: Json;
          name: string | null;
          phone: string | null;
          session_id: string;
          updated_at: string;
          user_agent: string | null;
        };
        Insert: {
          company?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          messages?: Json;
          name?: string | null;
          phone?: string | null;
          session_id: string;
          updated_at?: string;
          user_agent?: string | null;
        };
        Update: {
          company?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          messages?: Json;
          name?: string | null;
          phone?: string | null;
          session_id?: string;
          updated_at?: string;
          user_agent?: string | null;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          company: string;
          concern: string | null;
          created_at: string;
          email: string;
          id: string;
          name: string;
          source: string | null;
          user_agent: string | null;
          website: string | null;
        };
        Insert: {
          company: string;
          concern?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          name: string;
          source?: string | null;
          user_agent?: string | null;
          website?: string | null;
        };
        Update: {
          company?: string;
          concern?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          name?: string;
          source?: string | null;
          user_agent?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      ai_runtime_config: {
        Row: {
          id: string;
          active_agent_profile: string;
          routing_mode: string;
          primary_provider: string;
          primary_model: string;
          secondary_provider: string;
          secondary_model: string;
          primary_weight: number;
          secondary_weight: number;
          fallback_enabled: boolean;
          max_tokens: number;
          primary_timeout_ms: number;
          fallback_timeout_ms: number;
          daily_budget_usd: number | null;
          monthly_budget_usd: number | null;
          budget_policy: string;
          enabled: boolean;
          version: number;
          updated_at: string;
          updated_by: string;
        };
        Insert: {
          id?: string;
          active_agent_profile?: string;
          routing_mode?: string;
          primary_provider?: string;
          primary_model?: string;
          secondary_provider?: string;
          secondary_model?: string;
          primary_weight?: number;
          secondary_weight?: number;
          fallback_enabled?: boolean;
          max_tokens?: number;
          primary_timeout_ms?: number;
          fallback_timeout_ms?: number;
          daily_budget_usd?: number | null;
          monthly_budget_usd?: number | null;
          budget_policy?: string;
          enabled?: boolean;
          version?: number;
          updated_at?: string;
          updated_by?: string;
        };
        Update: {
          id?: string;
          active_agent_profile?: string;
          routing_mode?: string;
          primary_provider?: string;
          primary_model?: string;
          secondary_provider?: string;
          secondary_model?: string;
          primary_weight?: number;
          secondary_weight?: number;
          fallback_enabled?: boolean;
          max_tokens?: number;
          primary_timeout_ms?: number;
          fallback_timeout_ms?: number;
          daily_budget_usd?: number | null;
          monthly_budget_usd?: number | null;
          budget_policy?: string;
          enabled?: boolean;
          version?: number;
          updated_at?: string;
          updated_by?: string;
        };
        Relationships: [];
      };
      ai_usage_events: {
        Row: {
          id: string;
          request_id: string;
          session_id: string | null;
          agent_profile: string;
          provider: string;
          model: string;
          fallback_used: boolean;
          input_tokens: number;
          output_tokens: number;
          cached_tokens: number;
          cost_usd: number | null;
          cost_type: string | null;
          latency_ms: number | null;
          ttft_ms: number | null;
          status: string;
          error_type: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          request_id?: string;
          session_id?: string | null;
          agent_profile: string;
          provider: string;
          model: string;
          fallback_used?: boolean;
          input_tokens?: number;
          output_tokens?: number;
          cached_tokens?: number;
          cost_usd?: number | null;
          cost_type?: string | null;
          latency_ms?: number | null;
          ttft_ms?: number | null;
          status: string;
          error_type?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          request_id?: string;
          session_id?: string | null;
          agent_profile?: string;
          provider?: string;
          model?: string;
          fallback_used?: boolean;
          input_tokens?: number;
          output_tokens?: number;
          cached_tokens?: number;
          cost_usd?: number | null;
          cost_type?: string | null;
          latency_ms?: number | null;
          ttft_ms?: number | null;
          status?: string;
          error_type?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      ai_config_audit: {
        Row: {
          id: string;
          config_version: number;
          fields_changed: string[];
          previous_values: Json | null;
          new_values: Json | null;
          updated_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          config_version: number;
          fields_changed: string[];
          previous_values?: Json | null;
          new_values?: Json | null;
          updated_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          config_version?: number;
          fields_changed?: string[];
          previous_values?: Json | null;
          new_values?: Json | null;
          updated_by?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
