import { PaginatedApiResponse } from '@/@types'
import { Product } from '@/@types/product'

import apiClient from './axios'

// Get favorite items with pagination
export async function getFavoriteItems(page: number = 1) {
  const response = await apiClient.get<PaginatedApiResponse<Product>>(
    `/auth/favorites`,
    {
      params: {
        page,
      },
    }
  )

  return response.data
}
