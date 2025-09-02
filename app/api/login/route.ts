import axios from 'axios'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { Session, UserResponse } from '@/@types/user'
import apiClient from '@/services/axios'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await apiClient.post<UserResponse>(
      '/auth/verify-otp',
      body
    )
    const session: Session = {
      ...response.data.user,
      access_token: response.data.authorization.token,
    }
    const cookieStore = await cookies()
    const expiresAt = new Date(Date.now() + 360 * 24 * 60 * 60 * 1000)

    cookieStore.set('session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    })

    return NextResponse.json(session)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.status === 403 ? 'invalid-OTP' : 'server-error',
          errors: [
            error.response?.status === 403 ? 'invalid-OTP' : 'server-error',
          ],
        },
        { status: error.response?.status }
      )
    }
    return NextResponse.json({ error: error }, { status: 400 })
  }
}
