export interface Item {
  icon: string
  title: string | any
  to: string
  name: string

  submenu?: SubmenuItem[]
}

interface SubmenuItem {
  icon: string
  title: string
  to: string
  name: string
}

export interface Cliente {
  id: number | null
  nombres: string
  apellidos: string | null
  tipo_documento: string | null
  nro_documento: string | null
  celular: string | null
}

export interface Categoria {
  id?: number
  nombre?: string
}

export interface Producto {
  id: number
  id_categoria?: number
  categoria?: Categoria
  nombre?: string
  descripcion?: string
  imagen?: string
  precio_venta?: string
  unidades_disponibles?: string
  imagenes: string[]
}

export interface Pagination {
  descending: boolean
  page: number
  rowsNumber: number
  rowsPerPage: number
  skip: number
  sortBy?: any
  total: number
}

export interface Compra {
  id: number;
  id_proveedor: number; 
  id_empleado: number; 
  referencia: string;
  fecha_compra: string;
  total: number;
  estado: string;
}
  
export interface DetalleCompra {
  id: number;
  id_compra: number;
  id_proveedor: number; 
  id_empleado: number; 
  id_producto: number; 
  cantidad: number;
  precio: number;
  total: number;
  referencia: string;
}

