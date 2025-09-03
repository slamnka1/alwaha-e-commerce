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

interface SendOTPResponse {
  status: 'success'
  message: 'OTP sent successfully.'
  otp: number
}

export const authService = {
  async signup(data: SignupData): Promise<Session> {
    const response = await apiClient.post<UserResponse>('/auth/register', data)
    return {
      ...response.data.user,
      access_token: response.data.authorization.token,
    }
  },

  async sendOTP({
    phone_number,
  }: {
    phone_number: string
  }): Promise<SendOTPResponse> {
    const response = await apiClient.post<SendOTPResponse>('/auth/login', {
      phone_number,
    })
    return response.data
  },
  async verifyOTP({
    phone_number,
    otp,
  }: {
    phone_number: string
    otp: number
  }): Promise<Session> {
    const response = await apiClient.post<UserResponse>('/auth/verify-otp', {
      phone_number,
      otp,
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
