import { ApiResponse } from '@/@types'
import { CartResponse } from '@/@types/cart'
import { CartSummary } from '@/@types/cart-summary'
import { apiClient } from '@/services/axios'

export type AddToCartParams = {
  product_id: number
  product_color_id: number
  product_size_id: number
  quantity: number
}
export const cart = {
  async addToCart(params: AddToCartParams) {
    const response = await apiClient.post('/cart', params)
    return response.data
  },

  async getCart() {
    const response = await apiClient.get<CartResponse>('/cart')
    return response.data.data
  },

  async removeFromCart(itemId: number) {
    const response = await apiClient.delete(`/cart/${itemId}`)
    return response.data
  },
  async updateCartItemQuantity(itemId: number, quantity: number) {
    const response = await apiClient.put(`/cart/${itemId}`, {
      quantity: quantity,
    })
    return response.data
  },
  async getCartSummary(params?: {
    shipping_address: string
    region_id: string
    fast_shipping: boolean
  }) {
    const response = await apiClient.get<ApiResponse<CartSummary>>(
      '/checkout/summary',
      {
        params,
      }
    )
    return response.data.data
  },
}
