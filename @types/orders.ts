export interface Order {
  id: number
  order_number: string
  subtotal: string
  discount_amount: string
  shipping_amount: string
  tax_amount: string
  total_amount: string
  status: string
  payment_status: string
  shipping_address: string
  billing_address: string
  created_at: string
  items: Item[]
}

export interface Item {
  id: number
  quantity: number
  price: string
  product: Product
  product_color: ProductColor | null
  product_size: ProductSize
}

export interface Product {
  id: number
  name: string
  description: string
  product_code: string
  category: Category
  main_image_url: string
  price: null
}

export interface Category {
  id: number
  category_name: string
}

export interface ProductColor {
  id: number
  color_name: string
  color_image_url: string
}

export interface ProductSize {
  id: number
  size_code: string
  quantity: number
  chest_cm: string
  hip_cm: string
  user_size: null
}
