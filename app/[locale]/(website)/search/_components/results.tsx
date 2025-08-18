'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import React from 'react'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DynamicPagination } from '@/components/ui/dynamic-pagination'
import { searchProducts } from '@/lib/api/products'

import { ProductCard } from '../../_components/product-card'

type Props = {}

const Results = (props: Props) => {
  const t = useTranslations('search')
  const searchParams = useSearchParams()
  const { status, data, error } = useQuery({
    queryKey: ['search', searchParams.toString()],
    queryFn: () => {
      return searchProducts(searchParams)
    },
  })

  if (status === 'pending')
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="text-primary size-10 animate-spin" />
      </div>
    )

  if (status === 'error')
    return (
      <Alert variant={'destructive'}>
        <AlertTitle>{t('error')}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )

  return (
    <div className="container py-16">
      <h2 className="pb-4 text-3xl font-bold">{t('results.title')}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
        {data.map((product, index) => {
          return <ProductCard {...product} key={index} />
        })}
      </div>
      <div className="flex justify-center">
        <DynamicPagination totalPageCount={10} />
      </div>
    </div>
  )
}

export default Results
