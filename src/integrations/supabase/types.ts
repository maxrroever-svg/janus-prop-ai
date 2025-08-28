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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      agent_runs: {
        Row: {
          created_at: string
          deal_id: string
          finished_at: string | null
          id: string
          log: Json | null
          started_at: string | null
          status: string
          type: Database["public"]["Enums"]["agent_type"]
        }
        Insert: {
          created_at?: string
          deal_id: string
          finished_at?: string | null
          id?: string
          log?: Json | null
          started_at?: string | null
          status?: string
          type: Database["public"]["Enums"]["agent_type"]
        }
        Update: {
          created_at?: string
          deal_id?: string
          finished_at?: string | null
          id?: string
          log?: Json | null
          started_at?: string | null
          status?: string
          type?: Database["public"]["Enums"]["agent_type"]
        }
        Relationships: [
          {
            foreignKeyName: "agent_runs_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          id: string
          meta: Json | null
          organization_id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          id?: string
          meta?: Json | null
          organization_id: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          id?: string
          meta?: Json | null
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      comps: {
        Row: {
          address: string
          baths: number | null
          beds: number | null
          cap_rate: number | null
          created_at: string
          deal_id: string
          distance_km: number | null
          id: string
          price: number | null
          sold_at: string | null
          sqft: number | null
        }
        Insert: {
          address: string
          baths?: number | null
          beds?: number | null
          cap_rate?: number | null
          created_at?: string
          deal_id: string
          distance_km?: number | null
          id?: string
          price?: number | null
          sold_at?: string | null
          sqft?: number | null
        }
        Update: {
          address?: string
          baths?: number | null
          beds?: number | null
          cap_rate?: number | null
          created_at?: string
          deal_id?: string
          distance_km?: number | null
          id?: string
          price?: number | null
          sold_at?: string | null
          sqft?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comps_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          address: string
          city: string
          created_at: string
          distress_signals: string[] | null
          id: string
          lat: number | null
          lon: number | null
          organization_id: string
          property_type: string
          score: number | null
          state: string
          status: Database["public"]["Enums"]["deal_status"] | null
          units: number | null
          updated_at: string
          zip: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          distress_signals?: string[] | null
          id?: string
          lat?: number | null
          lon?: number | null
          organization_id: string
          property_type: string
          score?: number | null
          state: string
          status?: Database["public"]["Enums"]["deal_status"] | null
          units?: number | null
          updated_at?: string
          zip: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          distress_signals?: string[] | null
          id?: string
          lat?: number | null
          lon?: number | null
          organization_id?: string
          property_type?: string
          score?: number | null
          state?: string
          status?: Database["public"]["Enums"]["deal_status"] | null
          units?: number | null
          updated_at?: string
          zip?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ic_memos: {
        Row: {
          created_at: string
          deal_id: string
          decision: string
          id: string
          pdf_url: string | null
          risks: string
          summary: string
        }
        Insert: {
          created_at?: string
          deal_id: string
          decision: string
          id?: string
          pdf_url?: string | null
          risks: string
          summary: string
        }
        Update: {
          created_at?: string
          deal_id?: string
          decision?: string
          id?: string
          pdf_url?: string | null
          risks?: string
          summary?: string
        }
        Relationships: [
          {
            foreignKeyName: "ic_memos_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      owner_info: {
        Row: {
          created_at: string
          deal_id: string
          email: string | null
          id: string
          mailing_address: string | null
          name: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string
          deal_id: string
          email?: string | null
          id?: string
          mailing_address?: string | null
          name?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string
          deal_id?: string
          email?: string | null
          id?: string
          mailing_address?: string | null
          name?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "owner_info_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: true
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          name: string | null
          organization_id: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          organization_id?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          organization_id?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      underwriting: {
        Row: {
          arv: number | null
          coc: number | null
          created_at: string
          deal_id: string
          dscr: number | null
          id: string
          irr: number | null
          ltv: number | null
          noi: number | null
          rate: number | null
          rehab: number | null
          scenarios: Json | null
          updated_at: string
        }
        Insert: {
          arv?: number | null
          coc?: number | null
          created_at?: string
          deal_id: string
          dscr?: number | null
          id?: string
          irr?: number | null
          ltv?: number | null
          noi?: number | null
          rate?: number | null
          rehab?: number | null
          scenarios?: Json | null
          updated_at?: string
        }
        Update: {
          arv?: number | null
          coc?: number | null
          created_at?: string
          deal_id?: string
          dscr?: number | null
          id?: string
          irr?: number | null
          ltv?: number | null
          noi?: number | null
          rate?: number | null
          rehab?: number | null
          scenarios?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "underwriting_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: true
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_organization: {
        Args: { _user_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      agent_type:
        | "THEME_SCOUT"
        | "UNDERWRITER"
        | "LEGAL"
        | "CAPITAL"
        | "OUTREACH"
      app_role: "OWNER" | "ADMIN" | "ANALYST" | "VIEWER"
      deal_status:
        | "NEW"
        | "REVIEWING"
        | "APPROVED"
        | "REJECTED"
        | "OUTREACH"
        | "IN_PROGRESS"
        | "CLOSED"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      agent_type: [
        "THEME_SCOUT",
        "UNDERWRITER",
        "LEGAL",
        "CAPITAL",
        "OUTREACH",
      ],
      app_role: ["OWNER", "ADMIN", "ANALYST", "VIEWER"],
      deal_status: [
        "NEW",
        "REVIEWING",
        "APPROVED",
        "REJECTED",
        "OUTREACH",
        "IN_PROGRESS",
        "CLOSED",
      ],
    },
  },
} as const
