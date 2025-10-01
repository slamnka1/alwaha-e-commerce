'use client'

import { useQuery } from '@tanstack/react-query'

import { listsService } from '@/services/lists'

/**
 * Fetches available sizes.
 */
const sizesNumber = {
  m: '(38, 1)',
  l: '(40, 1)',
  xl: '(42, 2)',
  '2xl': '(44, 3)',
  '3xl': '(46, 4)',
  '4xl': '(48, 4)',
  '5xl': '(50, 4)',
  '6xl': '(52, 4)',
  '7xl': '(54)',
  '8xl': '(56)',
  '9xl': '(58)',
  '10xl': '(58)',
}
export function useSizes() {
  const { data } = useQuery({
    queryKey: ['sizes'],
    queryFn: () => listsService.getSizes(),
    staleTime: Infinity,
    retry: 2,
    select: (data) => {
      return data.data.map((size) => ({
        ...size,
        label:
          size.name +
          ' ' +
          (sizesNumber[size.name.toLowerCase() as keyof typeof sizesNumber] ||
            ''),
      }))
    },
  })

  return data ?? []
}
