import React from 'react'

import { getLocale } from 'next-intl/server'

import { redirect } from '@/lib/i18n/navigation'
import { getServerSession } from '@/utils/get-server-session'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  const locale = await getLocale()
  if (!session) {
    redirect({
      href: {
        pathname: '/auth/login',
        query: { callbackUrl: '/user/cart' },
      },
      locale: locale,
    })
  }
  return <React.Fragment>{children}</React.Fragment>
}
