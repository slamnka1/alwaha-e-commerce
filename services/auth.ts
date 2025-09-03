import { Session, UserResponse } from '@/@types/user'

import { apiClient } from './axios'

interface SignupData {
  name: string
  phone_number: string
  email: string
  password: string
  password_confirmation: string
  emirate_id: string
}

interface LoginData {
  phone_number: string
  password: string
}

export const authService = {
  async signup(data: SignupData): Promise<Session> {
    const response = await apiClient.post<UserResponse>('/auth/register', data)
    return {
      ...response.data.user,
      access_token: response.data.authorization.token,
    }
  },

  async login(phone: string, password: string): Promise<Session> {
    const response = await apiClient.post<UserResponse>('/auth/login', {
      phone_number: phone,
      password,
    })
    return {
      ...response.data.user,
      access_token: response.data.authorization.token,
    }
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },
}
