export interface CartSummary {
  items: CartSummaryItem[]
  subtotal: number
  discount_amount: number
  shipping_amount: number
  tax_amount: number
  total_amount: number
  coupon: null
  shipping_address: null
  region: Region
}

export interface CartSummaryItem {
  item_id: number
  cart_id: number
  product_size_id: number
  quantity: number
  product: Product
}

export interface Product {
  id: number
  product_code: string
  image_url: string
  name: string
  price: number
  offer_id: null
  discount_percent: null
  discount_amount: null
  price_before_discount: null
  description: string
  selected_size: SelectedSize
  selected_color: Color
  sizes: Size[]
  colors: Color[]
}

export interface Color {
  id: number
  color_name: null | string
  color_image_url: string
}

export interface SelectedSize {
  id: number
  size_code: string
  quantity: number
  chest_size: string
  hip_size: string
}

export interface Size {
  id: number
  size_code: string
  quantity: number
  chest_cm: string
  hip_cm: string
}

export interface Region {
  id: number
  name_ar: string
  name_en: string
  shipping_price: string
  emirate_id: number
  created_at: null
  updated_at: string
  emirate: Emirate
}

export interface Emirate {
  id: number
  name_ar: string
  name_en: string
  image: null
  flag: null
  latitude: string
  longitude: string
  shipping_price: string
  created_at: string
  updated_at: string
}
