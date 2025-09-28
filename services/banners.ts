import type { ApiResponse } from '@/@types'
import type { Banner } from '@/@types/types'

import apiClient from './axios'

export const bannersServices = {
  getBanners: async () => {
    const response = await apiClient.get<ApiResponse<Banner[]>>('/home/banners')
    return response.data
  },
}
