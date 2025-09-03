'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

import { sizeBackground } from '@/assets'
import { Button } from '@/components/ui/button'

const KnowYourSize = () => {
  const t = useTranslations('home-page.knowYourSize')

  return (
    <section className="relative mx-auto w-full overflow-hidden">
      <Image
        src={sizeBackground}
        className="absolute h-full w-full object-cover"
        alt="size"
      />
      <div className="absolute inset-0 bg-[#414141B2]" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white lg:text-4xl">
          {t('title')}
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-white lg:text-lg">
          {t('description')}
        </p>
        <Button asChild variant="secondary" className="px-8">
          <Link href="/auth/register">{t('button')}</Link>
        </Button>
      </div>
    </section>
  )
}

export default KnowYourSize
