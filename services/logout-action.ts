'use server'

import { redirect } from 'next/navigation'

export const logoutAction = async () => {
  const { cookies } = await import('next/headers')

  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect('/')
}
