import type { ApiResponse } from '@/@types'
import type { Banner } from '@/@types/types'

import apiClient from './axios'

export const bannersServices = {
  getBanners: async () => {
    const response = await apiClient.get<{
      data: {
        heading: string
        subheading: string
        banners: Banner[]
      }
    }>('/home/banners-with-headings')
    return response.data
  },
}
