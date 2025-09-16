import axios from 'axios'

import React from 'react'

import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { productsService } from '@/services'

import ProductsSlider from '../../_components/products-slider'
import Hero from './_components/hero'
import ProductDescription from './_components/product-description'
import { ProductSlider } from './_components/product-slider'

type Props = {
  params: Promise<{
    slug: string
  }>
}

const SearchPage = async (props: Props) => {
  try {
    const { slug } = await props.params
    const product = await productsService.getProductFullData(Number(slug))
    console.log('🚀 ~ SearchPage ~ product:', product)
    const products = await productsService.getProducts(new URLSearchParams())
    const t = await getTranslations()
    return (
      <React.Fragment>
        <Hero />
        <div className="container">
          <h3 className="flex flex-nowrap items-center gap-4 font-bold lg:text-xl 2xl:text-2xl rtl:flex-row-reverse">
            <span className="text-foreground/50 font-medium">{t('home')}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="16"
              viewBox="0 0 64 16"
              fill="none"
            >
              <path
                d="M62.9556 8.70711C63.3462 8.31658 63.3462 7.68342 62.9556 7.29289L56.5917 0.928932C56.2012 0.538408 55.568 0.538408 55.1775 0.928932C54.7869 1.31946 54.7869 1.95262 55.1775 2.34315L60.8343 8L55.1775 13.6569C54.7869 14.0474 54.7869 14.6805 55.1775 15.0711C55.568 15.4616 56.2012 15.4616 56.5917 15.0711L62.9556 8.70711ZM0.751465 8V9H62.2485V8V7H0.751465V8Z"
                fill="black"
              />
            </svg>

            {t('product')}
          </h3>
        </div>

        <div className="container mx-auto pt-6 pb-12 lg:py-12">
          <div className="flex flex-col gap-9 lg:flex-row">
            <div className="w-full max-w-2xl">
              <ProductSlider product={product} />
            </div>
            <ProductDescription product={product} />
          </div>
        </div>
        <ProductsSlider
          products={products.data}
          title={t('more-products')}
          imageOnly
          titleClassName="font-medium"
        />
      </React.Fragment>
    )
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound()
    }
    return <div>Error: {(error as Error).message}</div>
  }
}

export default SearchPage
