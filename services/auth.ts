import axios from 'axios'

import { Session, UserResponse } from '@/@types/user'
import { useSession } from '@/store/session-store'

import { BASE_RUL, apiClient } from './axios'

export interface RegisterResponse {
  message: string
  user: User
  authorization: Authorization
}

export interface Authorization {
  token: string
  type: string
}

export interface User {
  name: string
  phone_number: string
  email: string
  emirate_id: string
  region_id: string
  address: string
  updated_at: string
  created_at: string
  id: number
}
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
  async signup(data: SignupData) {
    const response = await axios.post<RegisterResponse>(
      BASE_RUL + '/auth/register',
      data
    )
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
  async login({
    username,
    password,
  }: {
    username: string
    password: number
  }): Promise<Session> {
    const response = await apiClient.post<UserResponse>('/auth/login', {
      username,
      password,
    })
    return {
      ...response.data.user,
      access_token: response.data.authorization.token,
    }
  },

  async logout(): Promise<void> {
    try {
      await axios.post('/api/logout')
      useSession.getState().clearSession()
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },
  async forgotPassword({
    phone_number,
  }: {
    phone_number: string
  }): Promise<void> {
    await apiClient.post('/auth/forgot-password', { phone_number })
  },

  async resetPassword({
    phone_number,
    otp,
    password,
    confirm_password,
  }: {
    phone_number: string
    otp: string
    password: string
    confirm_password: string
  }): Promise<void> {
    await apiClient.post('/auth/forgot-password/check-otp', {
      phone_number,
      otp,
      password,
      confirm_password,
    })
  },

  async updateAddress({
    emirate_id,
    region_id,
    address,
  }: {
    emirate_id: string
    region_id: string
    address: string
  }): Promise<void> {
    await apiClient.put('/auth/address/update', {
      emirate_id,
      region_id,
      address,
    })
  },
}
