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

export const listsService = {
  async getEmirates(): Promise<EmiratesResponse> {
    const response = await apiClient.get('/lists/emirates')
    return response.data
  },
}
