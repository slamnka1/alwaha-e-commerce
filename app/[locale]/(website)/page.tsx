import React from 'react'

import { getTranslations } from 'next-intl/server'

import { bannersServices } from '@/services/banners'
import { listsService } from '@/services/lists'
import { productsService } from '@/services/products'
import { getServerSession } from '@/utils/get-server-session'
import { safeExtractNested } from '@/utils/promise-helpers'

import Hero from './_components/hero'
import KnowYourSize from './_components/know-your-size'
import PreviewCarousel from './_components/preview'
import ProductsSlider from './_components/products-slider'
import TypeSlider from './_components/type'

export const dynamic = 'force-dynamic'
export default async function HomePage() {
  const session = await getServerSession()
  const t = await getTranslations('home-page')
  // Group all API calls to run in parallel with proper error handling
  const [
    plusSizesResult,
    offersResult,
    newProductsResult,
    categoriesResult,
    specialProductsResult,
    bannersResult,
  ] = await Promise.allSettled([
    productsService.getPlusSizes(),
    productsService.getOffers(),
    productsService.getRecentProducts(),
    listsService.getCategories(),
    productsService.getSpecialProducts(),
    bannersServices.getBanners(),
  ])

  // Handle each result with appropriate fallbacks using helper functions
  const plusSizes = safeExtractNested(
    plusSizesResult,
    (response) => response.data,
    []
  )
  const offers = safeExtractNested(
    offersResult,
    (response) => response.data,
    []
  )
  const newProducts = safeExtractNested(
    newProductsResult,
    (response) => response.data,
    []
  )
  const categories = safeExtractNested(
    categoriesResult,
    (response) => response.data,
    []
  )
  const specialProducts = safeExtractNested(
    specialProductsResult,
    (response) => response.data,
    []
  )
  const specialProductsData = safeExtractNested(
    specialProductsResult,
    (response) => ({
      heading: response.heading,
      subheading: response.subheading,
      data: response.data,
    }),
    { heading: '', subheading: '', data: [] }
  )
  const banners = safeExtractNested(
    bannersResult,
    (response) => response.data,
    []
  )
  return (
    <React.Fragment>
      <Hero banners={banners} />
      <TypeSlider typeData={categories} />
      <PreviewCarousel products={specialProductsData} />
      {plusSizes.length > 0 && (
        <ProductsSlider
          more="/search?plus_sizes=true"
          products={plusSizes}
          title={t('plus-size')}
        />
      )}
      <ProductsSlider products={newProducts} title={t('new-products')} />
      {offers.length > 0 && (
        <ProductsSlider
          more="/search?offers=true"
          products={offers}
          title={t('offers')}
          classNames={{
            header: 'bg-primary text-white py-2 px-4 rounded-md',
            more: 'text-white',
          }}
        />
      )}
      <KnowYourSize />
    </React.Fragment>
  )
}
