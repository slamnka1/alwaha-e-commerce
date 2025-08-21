import React from 'react'

import { getProduct } from '@/lib/api/products'

import Hero from './_components/hero'
import { ProductSlider } from './_components/product-slider'

type Props = {
  params: Promise<{
    slug: string
  }>
}

const SearchPage = async (props: Props) => {
  const { slug } = await props.params
  const product = await getProduct(Number(slug))
  return (
    <React.Fragment>
      <Hero />
      <div className="container mx-auto py-12">
        <div className="flex gap-8">
          <div className="w-full max-w-xl">
            <ProductSlider images={product?.images || []} />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{product?.name}</h1>
            <p className="text-sm text-gray-500">{product?.description}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SearchPage
