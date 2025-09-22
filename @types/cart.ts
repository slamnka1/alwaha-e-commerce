export interface CartResponse {
  status: string
  message: string
  data: Data
}

export interface Data {
  items: Item[]
  subtotal: number
  discount_amount: number
  shipping_amount: number
  tax_amount: number
  total_amount: number
  coupon: null
}

export interface Item {
  id: number
  cart_id: number
  product_id: number
  quantity: number
  created_at: string
  updated_at: string
  product_size_id: number
  product: Product
  product_size: Size
}

export interface Product {
  id: number
  color_image_url: string
  created_at: string
  updated_at: string
  product_id: number
  price: number
  name_ar: string
  name_en: string
  sizes: Size[]
}

export interface Size {
  id: number
  size_code: string
  category: null
  waist_cm: null
  length_cm: null
  shoulder_cm: null
  quantity: number
  custom_chest_cm: string
  custom_hip_cm: string
  sort_order: number
  is_active: number
  created_at: string
  updated_at: string
  product_color_id: number
  size_id: number
}
