import React from 'react'

import { getProduct } from '@/lib/api/products'

import Hero from './_components/hero'
import ProductDescription from './_components/product-description'
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
        <div className="flex gap-9">
          <div className="w-full max-w-2xl">
            <ProductSlider images={product?.images || []} />
          </div>
          {product ? <ProductDescription product={product} /> : null}
        </div>
      </div>
    </React.Fragment>
  )
}

export default SearchPage
