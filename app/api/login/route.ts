import axios from 'axios'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { authService } from '@/services/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('🚀 ~ POST ~ body:', body)
    const session = await authService.login(body)

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
    console.log('🚀 ~ POST ~ error:', error)
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { ...error.response?.data },
        { status: error.response?.status }
      )
    }
    return NextResponse.json({ error: error }, { status: 400 })
  }
}
