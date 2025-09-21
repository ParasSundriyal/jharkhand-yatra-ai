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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      events: {
        Row: {
          category: string
          contact_info: string | null
          created_at: string
          description: string | null
          event_date: string
          event_time: string | null
          id: string
          image_url: string | null
          latitude: number | null
          location: string
          longitude: number | null
          organizer: string | null
          price: number | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          contact_info?: string | null
          created_at?: string
          description?: string | null
          event_date: string
          event_time?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          organizer?: string | null
          price?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          contact_info?: string | null
          created_at?: string
          description?: string | null
          event_date?: string
          event_time?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          organizer?: string | null
          price?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      photos: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string
          is_featured: boolean | null
          latitude: number | null
          likes_count: number | null
          location: string
          longitude: number | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          is_featured?: boolean | null
          latitude?: number | null
          likes_count?: number | null
          location: string
          longitude?: number | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          is_featured?: boolean | null
          latitude?: number | null
          likes_count?: number | null
          location?: string
          longitude?: number | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          preferences: Json | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          preferences?: Json | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          preferences?: Json | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      shop_items: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_available: boolean | null
          item_images: string[] | null
          item_name: string
          latitude: number | null
          longitude: number | null
          price: number
          rating: number | null
          shop_address: string
          shop_name: string
          shop_owner_id: string
          shop_phone: string
          total_orders: number | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_available?: boolean | null
          item_images?: string[] | null
          item_name: string
          latitude?: number | null
          longitude?: number | null
          price: number
          rating?: number | null
          shop_address: string
          shop_name: string
          shop_owner_id: string
          shop_phone: string
          total_orders?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_available?: boolean | null
          item_images?: string[] | null
          item_name?: string
          latitude?: number | null
          longitude?: number | null
          price?: number
          rating?: number | null
          shop_address?: string
          shop_name?: string
          shop_owner_id?: string
          shop_phone?: string
          total_orders?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tour_packages: {
        Row: {
          contact_phone: string
          created_at: string | null
          description: string | null
          duration_hours: number
          guide_id: string
          id: string
          included_features: string[] | null
          is_active: boolean | null
          max_people: number | null
          meeting_point: string
          package_images: string[] | null
          package_name: string
          price_per_person: number
          rating: number | null
          total_bookings: number | null
          updated_at: string | null
        }
        Insert: {
          contact_phone: string
          created_at?: string | null
          description?: string | null
          duration_hours: number
          guide_id: string
          id?: string
          included_features?: string[] | null
          is_active?: boolean | null
          max_people?: number | null
          meeting_point: string
          package_images?: string[] | null
          package_name: string
          price_per_person: number
          rating?: number | null
          total_bookings?: number | null
          updated_at?: string | null
        }
        Update: {
          contact_phone?: string
          created_at?: string | null
          description?: string | null
          duration_hours?: number
          guide_id?: string
          id?: string
          included_features?: string[] | null
          is_active?: boolean | null
          max_people?: number | null
          meeting_point?: string
          package_images?: string[] | null
          package_name?: string
          price_per_person?: number
          rating?: number | null
          total_bookings?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      transport_services: {
        Row: {
          available_locations: string[] | null
          contact_email: string | null
          contact_phone: string
          created_at: string | null
          description: string | null
          fixed_price: number | null
          id: string
          is_active: boolean | null
          price_per_km: number | null
          provider_id: string
          rating: number | null
          service_name: string
          total_rides: number | null
          updated_at: string | null
          vehicle_images: string[] | null
          vehicle_type: string
        }
        Insert: {
          available_locations?: string[] | null
          contact_email?: string | null
          contact_phone: string
          created_at?: string | null
          description?: string | null
          fixed_price?: number | null
          id?: string
          is_active?: boolean | null
          price_per_km?: number | null
          provider_id: string
          rating?: number | null
          service_name: string
          total_rides?: number | null
          updated_at?: string | null
          vehicle_images?: string[] | null
          vehicle_type: string
        }
        Update: {
          available_locations?: string[] | null
          contact_email?: string | null
          contact_phone?: string
          created_at?: string | null
          description?: string | null
          fixed_price?: number | null
          id?: string
          is_active?: boolean | null
          price_per_km?: number | null
          provider_id?: string
          rating?: number | null
          service_name?: string
          total_rides?: number | null
          updated_at?: string | null
          vehicle_images?: string[] | null
          vehicle_type?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          is_verified: boolean | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      weather_locations: {
        Row: {
          created_at: string
          id: string
          is_tourist_spot: boolean | null
          latitude: number
          longitude: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_tourist_spot?: boolean | null
          latitude: number
          longitude: number
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          is_tourist_spot?: boolean | null
          latitude?: number
          longitude?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"][]
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
      app_role:
        | "tourist"
        | "transport_provider"
        | "shop_owner"
        | "hotel_owner"
        | "tour_guide"
        | "admin"
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
      app_role: [
        "tourist",
        "transport_provider",
        "shop_owner",
        "hotel_owner",
        "tour_guide",
        "admin",
      ],
    },
  },
} as const
