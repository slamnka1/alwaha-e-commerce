import { PaginatedApiResponse } from '@/@types'
import { Order } from '@/@types/orders'

import { apiClient } from './axios'

export const ordersService = {
  async getOrders(page = 1) {
    const response = await apiClient.get<PaginatedApiResponse<Order>>(
      `/auth/orders`,
      {
        params: {
          page,
        },
      }
    )
    return response.data
  },
}
