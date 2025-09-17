import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { Session, UserResponse } from '@/@types/user'
import apiClient from '@/services/axios'

export const GET = async () => {
  // get session from cookie
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  if (!session) return NextResponse.json({})

  // parse session
  const oldSession = JSON.parse(session) as Session
  try {
    const updatedSessionResponse = await apiClient.get<{
      user: UserResponse['user']
    }>('/account/me', {
      headers: {
        Authorization: `Bearer ${oldSession.access_token}`,
      },
    })
    const expiresAt = new Date(Date.now() + 360 * 24 * 60 * 60 * 1000)
    cookieStore.set(
      'session',
      JSON.stringify({
        access_token: oldSession.access_token,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: expiresAt,
      }
    )

    return NextResponse.json(updatedSessionResponse.data.user)
  } catch (error) {
    const cookieStore = await cookies()
    cookieStore.delete('session')
    return NextResponse.json(null)
  }
}
