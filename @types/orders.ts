export interface Order {
  id: number
  user_id: number
  user_name: string
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
  updated_at: string
}
