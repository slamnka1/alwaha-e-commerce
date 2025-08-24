import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { ProductHeroImage } from '@/assets'

type Props = {}

const Hero = (props: Props) => {
  const t = useTranslations('search.hero')

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
        <div className="pt-12 pb-6 text-center lg:pt-16 lg:pb-12">
          <h1 className="mb-4 text-2xl font-bold lg:text-4xl">{t('title')}</h1>
          <p className="mx-auto max-w-3xl text-lg font-semibold lg:text-xl">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
