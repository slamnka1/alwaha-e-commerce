'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import SizeForm from '@/app/[locale]/profile/size/_components/size-form'
import { SetYourSizeImage, sizeBackground } from '@/assets'

const KnowYourSizeAuth = () => {
  const t = useTranslations('profile.size')

  return (
    <section className="relative mx-auto w-full overflow-hidden">
      <Image
        src={sizeBackground}
        className="absolute h-full w-full object-cover"
        alt="size"
      />
      <div className="absolute inset-0 bg-[#414141B2]" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
          <div className="w-2/3 max-w-lg md:w-full">
            <Image
              alt="women enjoying mental health"
              className="mx-auto"
              src={SetYourSizeImage}
            />
          </div>
          <div className="w-full">
            <SizeForm isHomeScreen />
          </div>
        </div>
      </div>
    </section>
  )
}

export default KnowYourSizeAuth
