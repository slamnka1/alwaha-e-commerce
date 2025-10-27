import { MapPin } from 'lucide-react'

import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import {
  ProductHeroImage,
  aboutUsImage,
  aboutUsImage1,
  aboutUsImage2,
  aboutUsImage3,
} from '@/assets'

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
            src={aboutUsImage}
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="relative aspect-[4/5.5] overflow-hidden rounded-xl">
            <Image
              src={aboutUsImage1}
              alt="gallery-1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5.5] overflow-hidden rounded-xl">
            <Image
              src={aboutUsImage2}
              alt="gallery-2"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5.5] overflow-hidden rounded-xl">
            <Image
              src={aboutUsImage3}
              alt="gallery-3"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{t('contact.title')}</h2>
          <p className="mt-2 text-gray-600">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Sharjah Branch */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">
              {t('contact.sharjah.title')}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-700">
                  {t('contact.phonesTitle')}
                </p>
                <a
                  href={`tel:${t('contact.sharjah.phone1')}`}
                  className="text-primary block hover:underline"
                >
                  {t('contact.sharjah.phone1')}
                </a>
                <a
                  href={`tel:${t('contact.sharjah.phone2')}`}
                  className="text-primary block hover:underline"
                >
                  {t('contact.sharjah.phone2')}
                </a>
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  {t('contact.addressTitle')}
                </p>
                <p className="text-gray-600">{t('contact.sharjah.address')}</p>
              </div>
              <a
                href={t('contact.sharjah.locationUrl')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-white"
              >
                <MapPin className="size-4" />
                {t('contact.locationLabel')}
              </a>
            </div>
          </div>

          {/* Abu Dhabi Branch */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">
              {t('contact.abudhabi.title')}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-700">
                  {t('contact.phonesTitle')}
                </p>
                <a
                  href={`tel:${t('contact.abudhabi.phone1')}`}
                  className="text-primary block hover:underline"
                >
                  {t('contact.abudhabi.phone1')}
                </a>
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  {t('contact.addressTitle')}
                </p>
                <p className="text-gray-600">{t('contact.abudhabi.address')}</p>
              </div>
              <a
                href={t('contact.abudhabi.locationUrl')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-white"
              >
                <MapPin className="size-4" />
                {t('contact.locationLabel')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
