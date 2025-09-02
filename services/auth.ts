import { Session, UserResponse } from '@/@types/user'

import { apiClient } from './axios'

export interface SignupData {
  name: string
  phone_number: string
  email: string
  password: string
  password_confirmation: string
  emirate_id: string
}

export interface SignupResponse {
  message: string
  user?: {
    id: number
    name: string
    email: string
    phone_number: string
    emirate_id: number
  }
  token?: string
}

export const authService = {
  async signup(data: SignupData): Promise<Session> {
    const response = await apiClient.post<UserResponse>('/auth/register', data)
    return {
      ...response.data.user,
      access_token: response.data.authorization.token,
    }
  },

  async login(phone: string, password: string): Promise<SignupResponse> {
    const response = await apiClient.post('/auth/login', {
      phone_number: phone,
      password,
    })
    return response.data
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },
}
