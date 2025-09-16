import { apiClient } from './axios'

export interface EmiratesResponse {
  status: string
  message: string
  data: Emirate[]
}

export interface Emirate {
  id: number
  name_ar: string
  name_en: string
  image: string | null
  flag: string | null
  latitude: string
  longitude: string
  shipping_price: string
  created_at: string
  updated_at: string
}

export interface RegionsResponse {
  status: string
  message: string
  data: Region[]
}

export interface Region {
  id: number
  name: string
  emirate: {
    id: number
    name_ar?: string
    name_en?: string
    image?: string | null
    flag?: string | null
    latitude?: string | null
    longitude?: string | null
    shipping_price?: number | string | null
  }
}

export const listsService = {
  async getEmirates(): Promise<EmiratesResponse> {
    const response = await apiClient.get('/lists/emirates')
    return response.data
  },
  async getRegionsByEmirate(
    emirateId: number | string
  ): Promise<RegionsResponse> {
    const response = await apiClient.get('/lists/regions', {
      params: { emirate_id: emirateId },
    })
    return response.data
  },
}
