import React from 'react'

import { getTranslations } from 'next-intl/server'

import { ApiResponse } from '@/@types'
import { Category } from '@/@types/categories'
import { Product } from '@/@types/product'
import { apiClient } from '@/services/axios'
import { getProducts } from '@/services/products'
import { getTypeCategories } from '@/services/types'
import { getServerSession } from '@/utils/get-server-session'
import { safeExtract, safeExtractNested } from '@/utils/promise-helpers'

import Hero from './_components/hero'
import KnowYourSizeAuth from './_components/know-you-size-auth'
import KnowYourSize from './_components/know-your-size'
import PreviewCarousel from './_components/preview'
import ProductsSlider from './_components/products-silder'
import TypeSlider from './_components/type'

export const dynamic = 'force-dynamic'
export default async function HomePage() {
  const session = await getServerSession()
  const t = await getTranslations('home-page')
  // Group all API calls to run in parallel with proper error handling
  const [
    typeDataResult,
    plusSizesResult,
    offersResult,
    newProductsResult,
    categoriesResult,
  ] = await Promise.allSettled([
    getTypeCategories(),
    apiClient.get<ApiResponse<Product[]>>('/home/plus-sizes'),
    apiClient.get<ApiResponse<Product[]>>('/home/offers'),
    apiClient.get<ApiResponse<Product[]>>('/home/recent-products'),
    apiClient.get<ApiResponse<Category[]>>('/categories'),
  ])

  // Handle each result with appropriate fallbacks using helper functions
  const typeData = safeExtract(typeDataResult, [])
  const pluseSizes = safeExtractNested(
    plusSizesResult,
    (response) => response.data.data,
    []
  )
  const offers = safeExtractNested(
    offersResult,
    (response) => response.data.data,
    []
  )
  const newProducts = safeExtractNested(
    newProductsResult,
    (response) => response.data.data,
    []
  )
  const categories = safeExtractNested(
    categoriesResult,
    (response) => response.data.data,
    []
  )

  return (
    <React.Fragment>
      <Hero />
      <TypeSlider typeData={categories} />
      <PreviewCarousel />
      {!session ? <KnowYourSize /> : <KnowYourSizeAuth />}
      <ProductsSlider products={newProducts} title={t('new-products')} />
      {offers.length > 0 && (
        <ProductsSlider products={offers} title={t('offers')} />
      )}
      <ProductsSlider products={pluseSizes} title={t('pluse-size')} />
    </React.Fragment>
  )
}
