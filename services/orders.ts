import { ApiResponse } from '@/@types'
import { Order } from '@/@types/orders'

import { apiClient } from './axios'

export const ordersService = {
  async getOrders() {
    const response = await apiClient.get<ApiResponse<Order[]>>('/auth/orders')
    return response.data
  },
}
