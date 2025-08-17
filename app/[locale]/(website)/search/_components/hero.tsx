'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { SearchBackground } from '@/assets'

type Props = {}

const HeroSection = (props: Props) => {
  const t = useTranslations('search')

  return (
    <section className="max-md relative">
      <Image
        src={SearchBackground}
        alt="Search Background"
        fill
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#85858580]" />
      <div className="relative container">
        <div className="flex h-[35vh] items-center justify-center py-16 text-white md:min-h-[70vh]">
          <div className="mx-auto flex max-w-4xl flex-col items-center space-y-8 text-center max-md:hidden">
            <div className="mt-36 space-y-4">
              <h1 className="text-4xl leading-tight font-[900] lg:text-5xl">
                {t('title')}
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed lg:text-xl">
                {t('description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
