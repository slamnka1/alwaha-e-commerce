export interface ProductFullData {
  id: number
  product_id: number
  product_name: string
  description: string
  product_code: string
  color_name: string
  size_guide: string
  size_predict_ratio: number
  category: Category
  main_image_url: string
  video_url: null
  price: number
  offer_id: null
  discount_percent: null
  discount_amount: null
  price_before_discount: string
  sizes_quantity: string
  is_favorited: boolean
  sizes: Size[]
  other_colors: OtherColor[]
}

export interface Category {
  id: number
  category_name: string
  image: string
}

export interface OtherColor {
  id: number
  color_name: string
  main_image_url: string
  url: string
}

export interface Size {
  id: number
  size_code: string
  quantity: number
  chest_cm: string
  hip_cm: string
  user_size: null
  branches: Branch[]
}

export interface Branch {
  id: number
  code: string
  name_ar: string
  name_en: string
  address_ar: string
  address_en: string
  phone: string
  email: string
}
