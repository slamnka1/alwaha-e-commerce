import { Category } from './categories'

export interface Product {
  id: number
  product_id: number
  product_code: string
  product_name: string
  category: Category
  base_price: string
  description: string
  main_image_url: string
  offer_active_id: null
  price: string
  has_plus_size: boolean
  sizes: Size[]
  best_fit_size: null
  is_favourite: boolean
  is_favorited: boolean
  offer_id: number | null
  discount_percent: string | null
  discount_amount: string | null
  price_before_discount: string

  colors: Colors
  available_quantity: string | null
  available_colors_count: number | null
}

export interface Colors {
  id: number
  color_name: string
  color_image_url: string
}

export interface ProductFullData {
  id: number
  product_id: number
  product_name: string
  description: string
  product_code: string
  color_name: string
  main_image_url: string
  video_url?: string | null
  price: number
  product_base_price: string
  offer_active: null
  discounted_price: null
  sizes_quantity: string
  is_favorited: boolean
  offer_id: number | null
  discount_percent: string | null
  discount_amount: string | null
  price_before_discount: string
  sizes: Size[]
  other_colors: {
    id: number
    color_name: string
    main_image_url: string
    url: string
  }[]
}

export interface Size {
  id: number
  size_code: string
  quantity: number
  chest_cm: string
  hip_cm: string
  user_size: {
    id: number
    name: string
    hip_cm: string
    chest_cm: string
    color: string
  } | null
}
