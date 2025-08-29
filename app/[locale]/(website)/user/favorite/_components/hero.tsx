import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { ProductHeroImage } from '@/assets'

type Props = {}

const Hero = (props: Props) => {
  const t = useTranslations('favorite.hero')

  return (
    <section>
      <div className="relative h-20 lg:h-65">
        <Image
          src={ProductHeroImage}
          alt="hero"
          fill
          className="object-cover"
        />
      </div>
      <div className="container">
        <div className="pt-12 pb-4 text-center lg:pt-16 lg:pb-12">
          <h1 className="mb-2 text-xl font-medium lg:mb-4 lg:text-4xl lg:font-bold">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-3xl text-sm lg:text-xl lg:font-semibold">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
