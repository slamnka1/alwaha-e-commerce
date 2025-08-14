import React from 'react'

import { getProducts } from '@/lib/api/products'
import { getTypeCategories } from '@/lib/api/types'

import Hero from './_components/hero'
import KnowYourSize from './_components/know-your-size'
import PreviewCarousel from './_components/preview'
import ProductsSlider from './_components/products-silder'
import TypeSlider from './_components/type'

export default async function HomePage() {
  const typeData = await getTypeCategories()
  const products = await getProducts()
  return (
    <React.Fragment>
      <Hero />
      <TypeSlider typeData={typeData} />
      <PreviewCarousel />
      <KnowYourSize />
      <ProductsSlider products={products} title="Products" />
    </React.Fragment>
  )
}
