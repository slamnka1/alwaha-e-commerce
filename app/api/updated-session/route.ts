import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { Session } from '@/@types/user'
import apiClient from '@/services/axios'

export const GET = async () => {
  // get session from cookie
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  if (!session) return NextResponse.json({})

  // parse session
  const oldSession = JSON.parse(session) as Session

  const {
    data: { data: updatedSession },
  } = await apiClient.get<{ data: Session }>('/account/me', {
    headers: {
      Authorization: `Bearer ${oldSession.access_token}`,
    },
  })
  const expiresAt = new Date(Date.now() + 360 * 24 * 60 * 60 * 1000)
  cookieStore.set(
    'session',
    JSON.stringify({
      ...updatedSession,
      user: {
        id: updatedSession.user.id,
        name: updatedSession.user.name,
        email: updatedSession.user.email,
        phonenumber: updatedSession.user.phonenumber,
        nafath_validated: updatedSession.user.nafath_validated,
        wallet_balance: updatedSession.user.wallet_balance,
        avatar: updatedSession.user.avatar,
      },
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    }
  )

  return NextResponse.json(updatedSession)
}
