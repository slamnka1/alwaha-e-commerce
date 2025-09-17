'use client'

import { useQuery } from '@tanstack/react-query'

import { listsService } from '@/services/lists'

/**
 * Fetches available sizes.
 */
export function useSizes() {
  const { data } = useQuery({
    queryKey: ['sizes'],
    queryFn: () => listsService.getSizes(),
    staleTime: Infinity,
    retry: 2,
  })

  return data?.data ?? []
}
