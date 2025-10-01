'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DynamicPagination } from '@/components/ui/dynamic-pagination'
import { productsService } from '@/services'

import { ProductCard } from '../../_components/product-card'

type Props = {}

const Results = (props: Props) => {
  const t = useTranslations('search')
  const searchParams = useSearchParams()
  const { status, data, error } = useQuery({
    queryKey: ['search', searchParams.toString()],
    queryFn: () => {
      return productsService.getProducts(searchParams)
    },
  })

  if (status === 'pending')
    return (
      <div className="flex items-center justify-center py-40">
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
    <div className="w-full">
      <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:gap-6">
        {data.data.map((product, index) => {
          return <ProductCard {...product} key={index} />
        })}
      </div>
      <div className="flex justify-center">
        <DynamicPagination totalPageCount={data.meta.last_page} />
      </div>
    </div>
  )
}

export default Results
