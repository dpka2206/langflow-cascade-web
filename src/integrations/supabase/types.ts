export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      central_government_schemes: {
        Row: {
          application_process: string | null
          benefits: string | null
          category: string | null
          created_at: string
          department: string | null
          description: string | null
          eligibility_criteria: string | null
          funding_pattern: string | null
          id: string
          implementation_agency: string | null
          launch_date: string | null
          ministry: string | null
          objectives: string | null
          required_documents: string | null
          scheme_code: string | null
          scheme_name: string
          scheme_url: string | null
          scraped_at: string | null
          status: string | null
          target_beneficiaries: string | null
          updated_at: string
        }
        Insert: {
          application_process?: string | null
          benefits?: string | null
          category?: string | null
          created_at?: string
          department?: string | null
          description?: string | null
          eligibility_criteria?: string | null
          funding_pattern?: string | null
          id?: string
          implementation_agency?: string | null
          launch_date?: string | null
          ministry?: string | null
          objectives?: string | null
          required_documents?: string | null
          scheme_code?: string | null
          scheme_name: string
          scheme_url?: string | null
          scraped_at?: string | null
          status?: string | null
          target_beneficiaries?: string | null
          updated_at?: string
        }
        Update: {
          application_process?: string | null
          benefits?: string | null
          category?: string | null
          created_at?: string
          department?: string | null
          description?: string | null
          eligibility_criteria?: string | null
          funding_pattern?: string | null
          id?: string
          implementation_agency?: string | null
          launch_date?: string | null
          ministry?: string | null
          objectives?: string | null
          required_documents?: string | null
          scheme_code?: string | null
          scheme_name?: string
          scheme_url?: string | null
          scraped_at?: string | null
          status?: string | null
          target_beneficiaries?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      external_schemes: {
        Row: {
          application_process: string | null
          benefits: Json | null
          category: string | null
          created_at: string
          description: string | null
          eligibility_criteria: Json | null
          id: string
          required_documents: Json | null
          scheme_name: string
          scheme_type: string | null
          source_url: string | null
          status: string | null
          target_age_range: string | null
          target_caste: string[] | null
          target_gender: string[] | null
          target_income_range: string | null
          target_occupation: string[] | null
          target_state: string[] | null
          updated_at: string
        }
        Insert: {
          application_process?: string | null
          benefits?: Json | null
          category?: string | null
          created_at?: string
          description?: string | null
          eligibility_criteria?: Json | null
          id?: string
          required_documents?: Json | null
          scheme_name: string
          scheme_type?: string | null
          source_url?: string | null
          status?: string | null
          target_age_range?: string | null
          target_caste?: string[] | null
          target_gender?: string[] | null
          target_income_range?: string | null
          target_occupation?: string[] | null
          target_state?: string[] | null
          updated_at?: string
        }
        Update: {
          application_process?: string | null
          benefits?: Json | null
          category?: string | null
          created_at?: string
          description?: string | null
          eligibility_criteria?: Json | null
          id?: string
          required_documents?: Json | null
          scheme_name?: string
          scheme_type?: string | null
          source_url?: string | null
          status?: string | null
          target_age_range?: string | null
          target_caste?: string[] | null
          target_gender?: string[] | null
          target_income_range?: string | null
          target_occupation?: string[] | null
          target_state?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      government_services: {
        Row: {
          category: string
          created_at: string
          department: string | null
          description: string | null
          eligibility_criteria: string[] | null
          fees: string | null
          icon_name: string | null
          id: string
          is_featured: boolean | null
          ministry: string | null
          priority_order: number | null
          processing_time: string | null
          required_documents: string[] | null
          service_code: string | null
          service_name: string
          service_type: string | null
          service_url: string
          status: string | null
          sub_category: string | null
          target_audience: string[] | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          department?: string | null
          description?: string | null
          eligibility_criteria?: string[] | null
          fees?: string | null
          icon_name?: string | null
          id?: string
          is_featured?: boolean | null
          ministry?: string | null
          priority_order?: number | null
          processing_time?: string | null
          required_documents?: string[] | null
          service_code?: string | null
          service_name: string
          service_type?: string | null
          service_url: string
          status?: string | null
          sub_category?: string | null
          target_audience?: string[] | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          department?: string | null
          description?: string | null
          eligibility_criteria?: string[] | null
          fees?: string | null
          icon_name?: string | null
          id?: string
          is_featured?: boolean | null
          ministry?: string | null
          priority_order?: number | null
          processing_time?: string | null
          required_documents?: string[] | null
          service_code?: string | null
          service_name?: string
          service_type?: string | null
          service_url?: string
          status?: string | null
          sub_category?: string | null
          target_audience?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          channel: string
          error_details: string | null
          id: string
          message: string | null
          notification_type: string
          sent_at: string
          status: string
          user_id: string
        }
        Insert: {
          channel: string
          error_details?: string | null
          id?: string
          message?: string | null
          notification_type: string
          sent_at?: string
          status: string
          user_id: string
        }
        Update: {
          channel?: string
          error_details?: string | null
          id?: string
          message?: string | null
          notification_type?: string
          sent_at?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string
          email_enabled: boolean | null
          id: string
          phone_number: string | null
          sms_enabled: boolean | null
          updated_at: string
          user_id: string
          whatsapp_enabled: boolean | null
          whatsapp_number: string | null
        }
        Insert: {
          created_at?: string
          email_enabled?: boolean | null
          id?: string
          phone_number?: string | null
          sms_enabled?: boolean | null
          updated_at?: string
          user_id: string
          whatsapp_enabled?: boolean | null
          whatsapp_number?: string | null
        }
        Update: {
          created_at?: string
          email_enabled?: boolean | null
          id?: string
          phone_number?: string | null
          sms_enabled?: boolean | null
          updated_at?: string
          user_id?: string
          whatsapp_enabled?: boolean | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      scheme_applications: {
        Row: {
          application_data: Json | null
          created_at: string
          id: string
          personal_info: Json | null
          scheme_id: string
          status: string
          submitted_at: string | null
          updated_at: string
          uploaded_documents: Json | null
          user_id: string
        }
        Insert: {
          application_data?: Json | null
          created_at?: string
          id?: string
          personal_info?: Json | null
          scheme_id: string
          status?: string
          submitted_at?: string | null
          updated_at?: string
          uploaded_documents?: Json | null
          user_id: string
        }
        Update: {
          application_data?: Json | null
          created_at?: string
          id?: string
          personal_info?: Json | null
          scheme_id?: string
          status?: string
          submitted_at?: string | null
          updated_at?: string
          uploaded_documents?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scheme_applications_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      scheme_beneficiaries: {
        Row: {
          age_group: string | null
          beneficiary_type: string
          caste_criteria: string | null
          created_at: string
          gender: string | null
          id: string
          income_criteria: string | null
          location_criteria: string | null
          scheme_id: string | null
        }
        Insert: {
          age_group?: string | null
          beneficiary_type: string
          caste_criteria?: string | null
          created_at?: string
          gender?: string | null
          id?: string
          income_criteria?: string | null
          location_criteria?: string | null
          scheme_id?: string | null
        }
        Update: {
          age_group?: string | null
          beneficiary_type?: string
          caste_criteria?: string | null
          created_at?: string
          gender?: string | null
          id?: string
          income_criteria?: string | null
          location_criteria?: string | null
          scheme_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheme_beneficiaries_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "central_government_schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      scheme_categories: {
        Row: {
          category_name: string
          created_at: string
          id: string
          scheme_id: string | null
          sub_category: string | null
        }
        Insert: {
          category_name: string
          created_at?: string
          id?: string
          scheme_id?: string | null
          sub_category?: string | null
        }
        Update: {
          category_name?: string
          created_at?: string
          id?: string
          scheme_id?: string | null
          sub_category?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheme_categories_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "central_government_schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      scheme_documents: {
        Row: {
          created_at: string
          document_name: string
          document_type: string | null
          id: string
          is_mandatory: boolean | null
          scheme_id: string | null
        }
        Insert: {
          created_at?: string
          document_name: string
          document_type?: string | null
          id?: string
          is_mandatory?: boolean | null
          scheme_id?: string | null
        }
        Update: {
          created_at?: string
          document_name?: string
          document_type?: string | null
          id?: string
          is_mandatory?: boolean | null
          scheme_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheme_documents_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "central_government_schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      scheme_translations: {
        Row: {
          benefits: string[] | null
          created_at: string | null
          description: string | null
          documents: string[] | null
          eligibility: string[] | null
          id: string
          language: string
          scheme_id: string | null
          title: string
        }
        Insert: {
          benefits?: string[] | null
          created_at?: string | null
          description?: string | null
          documents?: string[] | null
          eligibility?: string[] | null
          id?: string
          language: string
          scheme_id?: string | null
          title: string
        }
        Update: {
          benefits?: string[] | null
          created_at?: string | null
          description?: string | null
          documents?: string[] | null
          eligibility?: string[] | null
          id?: string
          language?: string
          scheme_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "scheme_translations_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
        ]
      }
      schemes: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          id: string
          key: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          key: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          key?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          category_code: string | null
          category_name: string
          created_at: string
          description: string | null
          display_order: number | null
          icon_name: string | null
          id: string
          is_active: boolean | null
        }
        Insert: {
          category_code?: string | null
          category_name: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
        }
        Update: {
          category_code?: string | null
          category_name?: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
        }
        Relationships: []
      }
      service_usage_stats: {
        Row: {
          clicked_at: string | null
          id: string
          ip_address: unknown | null
          service_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          clicked_at?: string | null
          id?: string
          ip_address?: unknown | null
          service_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          clicked_at?: string | null
          id?: string
          ip_address?: unknown | null
          service_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_usage_stats_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "government_services"
            referencedColumns: ["id"]
          },
        ]
      }
      user_personalized_criteria: {
        Row: {
          age: string | null
          caste: string | null
          created_at: string
          gender: string | null
          id: string
          income: string | null
          occupation: string | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: string | null
          caste?: string | null
          created_at?: string
          gender?: string | null
          id?: string
          income?: string | null
          occupation?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: string | null
          caste?: string | null
          created_at?: string
          gender?: string | null
          id?: string
          income?: string | null
          occupation?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_scheme_interactions: {
        Row: {
          created_at: string | null
          id: string
          interaction_type: string
          scheme_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interaction_type: string
          scheme_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interaction_type?: string
          scheme_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_scheme_interactions_scheme_id_fkey"
            columns: ["scheme_id"]
            isOneToOne: false
            referencedRelation: "schemes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_personalized_schemes: {
        Args: { user_criteria: Json }
        Returns: {
          id: string
          scheme_name: string
          description: string
          category: string
          scheme_type: string
          eligibility_criteria: Json
          benefits: Json
          match_score: number
        }[]
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      user_role: "citizen" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["citizen", "admin"],
    },
  },
} as const
