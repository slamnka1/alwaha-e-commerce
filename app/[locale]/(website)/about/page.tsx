import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { ProductHeroImage } from '@/assets'

export default async function AboutPage() {
  const t = await getTranslations('about')
  return (
    <main className="container mx-auto space-y-12 py-10 pt-38">
      {/* Hero */}
      <section className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="space-y-4 text-center md:text-start">
          <h1 className="text-2xl font-bold lg:text-4xl">{t('hero.title')}</h1>
          <p className="text-sm text-[#1A1A1A] lg:text-base">
            {t('hero.description')}
          </p>
          <div>
            <a
              href="/search"
              className="bg-primary inline-block rounded-md px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              {t('cta')}
            </a>
          </div>
        </div>
        <div className="relative mx-auto aspect-video w-full max-w-xl overflow-hidden rounded-2xl shadow-sm md:max-w-full">
          <Image
            src={ProductHeroImage}
            alt="about-hero"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Content */}
      <section className="space-y-10">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">{t('whoWeAre')}</h2>
          <p>{t('whoWeAreText')}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t('presence')}</h3>
            <p>{t('presenceText')}</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{t('offerings')}</h3>
            <p>{t('offeringsText')}</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src={ProductHeroImage}
              alt="gallery-1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src={ProductHeroImage}
              alt="gallery-2"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src={ProductHeroImage}
              alt="gallery-3"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src={ProductHeroImage}
              alt="gallery-4"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
