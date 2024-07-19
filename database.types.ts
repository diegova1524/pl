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
      categorias: {
        Row: {
          id: number
          nombre: string | null
        }
        Insert: {
          id?: number
          nombre?: string | null
        }
        Update: {
          id?: number
          nombre?: string | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          apellidos: string | null
          celular: string | null
          id: number
          id_direccion: number
          nombres: string
          nro_documento: string | null
          tipo_documento: string | null
        }
        Insert: {
          apellidos?: string | null
          celular?: string | null
          id: number
          id_direccion: number
          nombres: string
          nro_documento?: string | null
          tipo_documento?: string | null
        }
        Update: {
          apellidos?: string | null
          celular?: string | null
          id?: number
          id_direccion?: number
          nombres?: string
          nro_documento?: string | null
          tipo_documento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clientes_id_direccion_fkey"
            columns: ["id_direccion"]
            isOneToOne: false
            referencedRelation: "direcciones"
            referencedColumns: ["id"]
          },
        ]
      }
      compras: {
        Row: {
          estado: string | null
          fecha_compra: string | null
          id: number
          id_empleado: number
          id_proveedor: number
          referencia: string | null
          total: number | null
        }
        Insert: {
          estado?: string | null
          fecha_compra?: string | null
          id?: number
          id_empleado: number
          id_proveedor: number
          referencia?: string | null
          total?: number | null
        }
        Update: {
          estado?: string | null
          fecha_compra?: string | null
          id?: number
          id_empleado?: number
          id_proveedor?: number
          referencia?: string | null
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "compras_id_empleado_fkey"
            columns: ["id_empleado"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_id_proveedor_fkey"
            columns: ["id_proveedor"]
            isOneToOne: false
            referencedRelation: "proveedores"
            referencedColumns: ["id"]
          },
        ]
      }
      detalle_compras: {
        Row: {
          cantidad: number | null
          id: number
          id_compra: number
          id_empleado: number
          id_producto: number
          id_proveedor: number
          precio: number | null
          referencia: string | null
          total: number | null
        }
        Insert: {
          cantidad?: number | null
          id?: number
          id_compra: number
          id_empleado: number
          id_producto: number
          id_proveedor: number
          precio?: number | null
          referencia?: string | null
          total?: number | null
        }
        Update: {
          cantidad?: number | null
          id?: number
          id_compra?: number
          id_empleado?: number
          id_producto?: number
          id_proveedor?: number
          precio?: number | null
          referencia?: string | null
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "detalle_compras_id_compra_fkey"
            columns: ["id_compra"]
            isOneToOne: false
            referencedRelation: "compras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "detalle_compras_id_empleado_fkey"
            columns: ["id_empleado"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "detalle_compras_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "detalle_compras_id_proveedor_fkey"
            columns: ["id_proveedor"]
            isOneToOne: false
            referencedRelation: "proveedores"
            referencedColumns: ["id"]
          },
        ]
      }
      detalle_ventas: {
        Row: {
          cantidad: number | null
          descuento: number | null
          id: number
          id_producto: number
          id_venta: number
          igv: number | null
          precio: number | null
          total: number | null
        }
        Insert: {
          cantidad?: number | null
          descuento?: number | null
          id?: number
          id_producto: number
          id_venta: number
          igv?: number | null
          precio?: number | null
          total?: number | null
        }
        Update: {
          cantidad?: number | null
          descuento?: number | null
          id?: number
          id_producto?: number
          id_venta?: number
          igv?: number | null
          precio?: number | null
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "detalle_ventas_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "detalle_ventas_id_venta_fkey"
            columns: ["id_venta"]
            isOneToOne: false
            referencedRelation: "ventas"
            referencedColumns: ["id"]
          },
        ]
      }
      direcciones: {
        Row: {
          celular: string | null
          contacto: string | null
          departamento: string | null
          direccion: string | null
          distrito: string | null
          id: number
          nombre: string | null
          provincia: string | null
          referencia: string | null
        }
        Insert: {
          celular?: string | null
          contacto?: string | null
          departamento?: string | null
          direccion?: string | null
          distrito?: string | null
          id?: number
          nombre?: string | null
          provincia?: string | null
          referencia?: string | null
        }
        Update: {
          celular?: string | null
          contacto?: string | null
          departamento?: string | null
          direccion?: string | null
          distrito?: string | null
          id?: number
          nombre?: string | null
          provincia?: string | null
          referencia?: string | null
        }
        Relationships: []
      }
      empleados: {
        Row: {
          apellido: string
          dni: string | null
          id: number
          id_usuario: number
          nombre: string
          posicion: string
          turno: string | null
        }
        Insert: {
          apellido: string
          dni?: string | null
          id?: number
          id_usuario: number
          nombre: string
          posicion: string
          turno?: string | null
        }
        Update: {
          apellido?: string
          dni?: string | null
          id?: number
          id_usuario?: number
          nombre?: string
          posicion?: string
          turno?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empleados_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      productos: {
        Row: {
          costo: number | null
          descripcion: string | null
          embedded: number[] | null
          id: number
          id_categoria: number
          igv: number | null
          imagen: string | null
          imagenes: string[] | null
          nombre: string
          precio_venta: number | null
          unidades_disponibles: number | null
          website: boolean | null
        }
        Insert: {
          costo?: number | null
          descripcion?: string | null
          embedded?: number[] | null
          id?: number
          id_categoria: number
          igv?: number | null
          imagen?: string | null
          imagenes?: string[] | null
          nombre: string
          precio_venta?: number | null
          unidades_disponibles?: number | null
          website?: boolean | null
        }
        Update: {
          costo?: number | null
          descripcion?: string | null
          embedded?: number[] | null
          id?: number
          id_categoria?: number
          igv?: number | null
          imagen?: string | null
          imagenes?: string[] | null
          nombre?: string
          precio_venta?: number | null
          unidades_disponibles?: number | null
          website?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "productos_id_categoria_fkey"
            columns: ["id_categoria"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      proveedores: {
        Row: {
          apellido: string
          celular: string | null
          departamento: string | null
          direccion: string | null
          distrito: string | null
          email: string | null
          id: number
          nombre: string
          nro_documento: string
          provincia: string | null
          razon_social: string | null
          tipo_documento: string
        }
        Insert: {
          apellido: string
          celular?: string | null
          departamento?: string | null
          direccion?: string | null
          distrito?: string | null
          email?: string | null
          id?: number
          nombre: string
          nro_documento: string
          provincia?: string | null
          razon_social?: string | null
          tipo_documento: string
        }
        Update: {
          apellido?: string
          celular?: string | null
          departamento?: string | null
          direccion?: string | null
          distrito?: string | null
          email?: string | null
          id?: number
          nombre?: string
          nro_documento?: string
          provincia?: string | null
          razon_social?: string | null
          tipo_documento?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          apellidos: string | null
          email: string | null
          id: number
          nombre: string | null
          rol: string | null
        }
        Insert: {
          apellidos?: string | null
          email?: string | null
          id?: number
          nombre?: string | null
          rol?: string | null
        }
        Update: {
          apellidos?: string | null
          email?: string | null
          id?: number
          nombre?: string | null
          rol?: string | null
        }
        Relationships: []
      }
      ventas: {
        Row: {
          fecha: string | null
          forma_pago: string | null
          id: number
          id_cliente: number
          id_empleado: number
          observaciones: string | null
          total: number | null
          website: boolean | null
        }
        Insert: {
          fecha?: string | null
          forma_pago?: string | null
          id?: number
          id_cliente: number
          id_empleado: number
          observaciones?: string | null
          total?: number | null
          website?: boolean | null
        }
        Update: {
          fecha?: string | null
          forma_pago?: string | null
          id?: number
          id_cliente?: number
          id_empleado?: number
          observaciones?: string | null
          total?: number | null
          website?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ventas_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ventas_id_empleado_fkey"
            columns: ["id_empleado"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cantidad_personas_por_region: {
        Args: Record<PropertyKey, never>
        Returns: {
          region: string
          cantidad_personas: number
        }[]
      }
      crear_venta: {
        Args: {
          fecha: string
          id_cliente: number
          total: number
          forma_pago: string
          observaciones: string
          detalles: Json
        }
        Returns: undefined
      }
      get_personas_region: {
        Args: Record<PropertyKey, never>
        Returns: {
          region: string
          cantidad_personas: number
        }[]
      }
      get_productos_mas_vendidos: {
        Args: Record<PropertyKey, never>
        Returns: {
          nombre_producto: string
          total_vendido: number
        }[]
      }
      get_top_clients: {
        Args: Record<PropertyKey, never>
        Returns: {
          nombres_razonsocial: string
          total_compras: number
        }[]
      }
      get_total_clientes: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_clientes: number
        }[]
      }
      get_total_productos: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_productos: number
        }[]
      }
      get_total_ventas: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_ventas: number
        }[]
      }
      get_ventas_mes: {
        Args: Record<PropertyKey, never>
        Returns: {
          year: number
          month: number
          total: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
