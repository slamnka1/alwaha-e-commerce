'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2, SearchX } from 'lucide-react'

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

  // Handle no results case
  if (!data.data || data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted mb-6 rounded-full p-6">
          <SearchX className="text-muted-foreground h-12 w-12" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">{t('noResults')}</h3>
        <p className="text-muted-foreground">{t('tryAgain')}</p>
      </div>
    )
  }

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
