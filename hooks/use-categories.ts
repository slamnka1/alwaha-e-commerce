'use client'

import { useQuery } from '@tanstack/react-query'

import { useLocale } from 'next-intl'

import { listsService } from '@/services/lists'

/**
 * Fetches product categories and returns their slugs.
 * Slugs are used as stable identifiers and translation keys in the UI.
 */
export function useCategories() {
  const locale = useLocale()
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => listsService.getCategories(),
    staleTime: Infinity,
    retry: 2,
  })

  return (
    data?.data.map((category) => ({
      ...category,
      category_name:
        category.category_name ||
        category[locale == 'ar' ? 'category_name_ar' : 'category_name_en'],
      id: category.id + '',
    })) ?? []
  )
}
