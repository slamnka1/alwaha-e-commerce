import { ApiResponse, PaginatedApiResponse } from '@/@types'
import { Product, ProductFullData } from '@/@types/product'

import { apiClient } from './axios'

export const productsService = {
  async getProducts(params: URLSearchParams) {
    const response = await apiClient.get<PaginatedApiResponse<Product>>(
      '/products',
      { params }
    )
    return response.data
  },
  async getPlusSizes() {
    const response =
      await apiClient.get<ApiResponse<Product[]>>('/home/plus-sizes')
    return response.data
  },
  async getOffers() {
    const response = await apiClient.get<ApiResponse<Product[]>>('/home/offers')
    return response.data
  },
  async getRecentProducts() {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      '/home/recent-products'
    )
    return response.data
  },
  async getProductFullData(id: number) {
    const response = await apiClient.get<ApiResponse<ProductFullData>>(
      `/products/${id}`
    )
    return response.data.data
  },
}
