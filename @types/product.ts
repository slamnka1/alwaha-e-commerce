export interface Product {
  id: number
  product_id: number
  product_code: string
  product_name: string
  category: null
  base_price: string
  description: string
  main_image_url: string
  offer_active_id: null
  discount_percent: string
  discount_amount: string
  sizes: Size[]
  best_fit_size: null
  is_favourite: boolean
  colors: Colors
  available_quantity: string | null
  available_colors_count: number | null
}

export interface Colors {
  id: number
  color_name: string
  color_image_url: string
}

export interface Size {
  id: number
  size_code: string
  quantity: number
}
