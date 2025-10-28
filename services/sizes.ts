import { ApiResponse } from '@/@types'
import { FitSize, UserSize } from '@/@types/sizes'

import apiClient from './axios'

export const sizes = {
  async getSizes() {
    const response =
      await apiClient.get<ApiResponse<UserSize[]>>('/auth/user-sizes')
    return response.data.data
  },

  async createSize(
    size: Omit<UserSize, 'id' | 'user_id' | 'created_at' | 'updated_at'>
  ) {
    const response = await apiClient.post<ApiResponse<UserSize>>(
      '/auth/user-sizes',
      size
    )
    return response.data.data
  },

  async updateSize(
    id: number,
    size: Omit<UserSize, 'id' | 'user_id' | 'created_at' | 'updated_at'>
  ) {
    const response = await apiClient.put<ApiResponse<UserSize>>(
      `/auth/user-sizes/${id}`,
      size
    )
    return response.data.data
  },

  async deleteSize(id: number) {
    const response = await apiClient.delete<ApiResponse<UserSize>>(
      `/auth/user-sizes/${id}`
    )
    return response.data.data
  },
  async getFitSize(id: string | number) {
    const response = await apiClient.get<ApiResponse<FitSize[]>>(
      `/products/${id}/sizes`
    )
    return response.data.data
  },
}
