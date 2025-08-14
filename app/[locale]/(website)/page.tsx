import React from 'react'

import { getTypeCategories } from '@/lib/api/types'

import Hero from './_components/hero'
import KnowYourSize from './_components/know-your-size'
import PreviewCarousel from './_components/preview'
import TypeSlider from './_components/type'

export default async function HomePage() {
  const typeData = await getTypeCategories()
  return (
    <React.Fragment>
      <Hero />
      <TypeSlider typeData={typeData} />
      <PreviewCarousel />
      <KnowYourSize />
    </React.Fragment>
  )
}
