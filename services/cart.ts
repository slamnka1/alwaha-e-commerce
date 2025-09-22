import { CartResponse } from '@/@types/cart'
import { apiClient } from '@/services/axios'

export type AddToCartParams = {
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
}
