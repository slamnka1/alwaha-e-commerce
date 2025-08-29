import React from 'react'

import Image from 'next/image'

import { ProductHeroImage } from '@/assets'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
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
