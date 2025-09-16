import { useQuery } from '@tanstack/react-query'

import { useLocale } from 'next-intl'

import { Emirate, listsService } from '@/services/lists'

export interface UseEmiratesReturn {
  emirates: Emirate[]
  isLoading: boolean
  error: Error | null
  refetch: () => void
  getEmirateById: (id: number | string) => Emirate | undefined
  getEmirateName: (id: number | string, locale?: string) => string
  getEmirateShippingPrice: (id: number | string) => string | undefined
}

export const useEmirates = (): UseEmiratesReturn => {
  const locale = useLocale()

  const {
    data: emiratesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['emirates'],
    queryFn: listsService.getEmirates,
    staleTime: Infinity,
    retry: 2,
  })

  const emirates = emiratesData?.data || []

  // Helper function to find emirate by ID
  const getEmirateById = (id: number | string): Emirate | undefined => {
    const emirateId = typeof id === 'string' ? parseInt(id, 10) : id
    return emirates.find((emirate) => emirate.id === emirateId)
  }

  // Helper function to get localized emirate name
  const getEmirateName = (
    id: number | string,
    customLocale?: string
  ): string => {
    const emirate = getEmirateById(id)
    if (!emirate) return ''

    const currentLocale = customLocale || locale
    return currentLocale === 'ar' ? emirate.name_ar : emirate.name_en
  }

  // Helper function to get emirate shipping price
  const getEmirateShippingPrice = (id: number | string): string | undefined => {
    const emirate = getEmirateById(id)
    return emirate?.shipping_price
  }

  return {
    emirates,
    isLoading,
    error,
    refetch,
    getEmirateById,
    getEmirateName,
    getEmirateShippingPrice,
  }
}
