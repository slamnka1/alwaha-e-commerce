import React from 'react'

import { getLocale } from 'next-intl/server'

import { redirect } from '@/lib/i18n/navigation'
import { getServerSession } from '@/utils/get-server-session'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession()
  console.log('🚀 ~ AuthLayout ~ session:', session)
  const locale = await getLocale()
  if (session) {
    redirect({ href: '/', locale: locale })
  }
  return (
    <section className="flex min-h-screen items-center justify-center py-8">
      {children}
    </section>
  )
}

export default AuthLayout
