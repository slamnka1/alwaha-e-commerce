import React from 'react'

import { getLocale } from 'next-intl/server'
import Image from 'next/image'

import { ProductHeroImage } from '@/assets'
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
        query: { callbackUrl: '/user/profile' },
      },
      locale: locale,
    })
  }
  return (
    <React.Fragment>
      <div className="relative h-20 lg:h-65">
        <Image
          src={ProductHeroImage}
          alt="hero"
          fill
          className="object-cover"
        />
      </div>
      {children}
    </React.Fragment>
  )
}
