import React from 'react'

import { useTranslations } from 'next-intl'

import { Link } from '@/lib/i18n/navigation'

import Hero from '../_components/hero'

export default function HomePage() {
  const t = useTranslations('home-page')
  return (
    <React.Fragment>
      <Hero />
    </React.Fragment>
  )
}
