'use client'

import { MapPin } from 'lucide-react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { Category } from '@/@types/categories'
import { LogoWithText } from '@/assets'
import { Link } from '@/lib/i18n/navigation'

// Social Media Icons
const TikTokIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
      fill="currentColor"
    />
  </svg>
)

const InstagramIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      fill="currentColor"
    />
  </svg>
)

const FacebookIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      fill="currentColor"
    />
  </svg>
)

type Props = {
  categories: Category[]
}

const Footer = (props: Props) => {
  const t = useTranslations('footer')

  return (
    <footer className="bg-[#EADDCB] py-12">
      <div className="container mx-auto">
        <div className="flex gap-8 max-lg:flex-wrap lg:gap-16">
          {/* Brand Information - Rightmost Column */}
          <div className="flex h-full flex-col justify-between max-md:w-full max-md:text-center md:max-w-[300]">
            <Link href="/" className="flex flex-col gap-4">
              <Image src={LogoWithText} alt="logo" className="max-md:mx-auto" />
              <p className="leading-relaxed font-medium">{t('description')}</p>
            </Link>
          </div>

          {/* Sections/Categories - Second Column */}
          <div className="relative z-10 mt-10 flex grow flex-col lg:mt-16">
            <h4 className="mb-4 font-bold">{t('sections')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/about`}>{t('about-us')}</Link>
              </li>

              {props.categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/search?=${category.slug}`}>
                    {category.category_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information - Third Column */}
          <div className="relative z-10 mt-10 flex grow flex-col lg:mt-16">
            {/* Branch Locations */}
            <div className="space-y-4">
              <h5 className="font-bold">{t('branches')}</h5>
              <div className="space-y-1">
                <p className="font-bold">{t('sharjah')}</p>
                <p>{t('phonesTitle')}</p>
                <a
                  href={`tel:${t('sharjahPhone1')}`}
                  className="block hover:underline"
                >
                  {t('sharjahPhone1')}
                </a>
                <a
                  href={`tel:${t('sharjahPhone2')}`}
                  className="block hover:underline"
                >
                  {t('sharjahPhone2')}
                </a>
                <div className="flex items-center justify-between gap-6">
                  <p>
                    {t('addressTitle')} {t('sharjahAddress')}
                  </p>
                  <a
                    href={t('sharjahLocationUrl')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary flex w-fit items-center gap-2 rounded-md bg-white px-4 py-1.5 hover:underline"
                  >
                    <MapPin className="size-5" /> {t('locationLabel')}
                  </a>
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-bold">{t('abudhabi')}</p>
                <p>{t('phonesTitle')}</p>
                <a
                  href={`tel:${t('abudhabiPhone1')}`}
                  className="block hover:underline"
                >
                  {t('abudhabiPhone1')}
                </a>
                <div className="flex items-center justify-between gap-6">
                  <p>
                    {t('addressTitle')} {t('abudhabiAddress')}
                  </p>
                  <a
                    href={t('abudhabiLocationUrl')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary flex w-fit items-center gap-2 rounded-md bg-white px-4 py-1.5 hover:underline"
                  >
                    <MapPin className="size-5" /> {t('locationLabel')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Icons - Leftmost Column */}
          <div className="mt-10 flex grow max-lg:w-full max-lg:justify-center lg:mt-16">
            <div className="flex w-fit gap-4">
              <a target="_blank" href="https://www.tiktok.com/@wahatalzain">
                <TikTokIcon />
              </a>
              <a target="_blank" href="https://www.instagram.com/wahatalzain/">
                <InstagramIcon />
              </a>
              <a target="_blank" href="https://www.facebook.com/wahatalzain/">
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <p className="font-medium">
            {t('copyright', { value: new Date().getFullYear() })}
          </p>
          <div className="flex flex-wrap gap-2 max-md:text-sm">
            <Link className="hover:underline" href="/privacy-policy">
              {t('privacyPolicy')}
            </Link>
            .
            <Link className="hover:underline" href="/change-policy">
              {t('changePolicy')}
            </Link>
            .
            <Link className="hover:underline" href="/payment-policy">
              {t('paymentPolicy')}
            </Link>
            .
            <Link className="hover:underline" href="/shipping-policy">
              {t('shippingPolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
