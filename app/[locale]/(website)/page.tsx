import React from 'react'

import { getTranslations } from 'next-intl/server'

import { getProducts } from '@/services/products'
import { getTypeCategories } from '@/services/types'

import Hero from './_components/hero'
import KnowYourSizeAuth from './_components/know-you-size-auth'
import KnowYourSize from './_components/know-your-size'
import PreviewCarousel from './_components/preview'
import ProductsSlider from './_components/products-silder'
import TypeSlider from './_components/type'

export default async function HomePage() {
  const typeData = await getTypeCategories()
  const products = await getProducts()
  const t = await getTranslations('home-page')
  return (
    <React.Fragment>
      <Hero />
      <TypeSlider typeData={typeData} />
      <PreviewCarousel />
      <KnowYourSize />
      <KnowYourSizeAuth />
      <ProductsSlider products={products} title={t('new-products')} />
      <ProductsSlider products={products} title={t('offers')} />
      <ProductsSlider products={products} title={t('pluse-size')} />
    </React.Fragment>
  )
}
