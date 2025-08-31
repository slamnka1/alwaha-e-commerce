import { useInfiniteQuery } from '@tanstack/react-query'

import { useCallback, useEffect, useRef } from 'react'

import { type OrdersResponse, getOrders } from '@/lib/api/orders'

// Query key for orders data
export const ordersQueryKey = ['orders']

// Hook to fetch orders with automatic intersection observer for infinite scroll
export function useInfiniteOrders(limit: number = 5) {
  const query = useInfiniteQuery({
    queryKey: ordersQueryKey,
    queryFn: ({ pageParam }) => getOrders(pageParam, limit),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage: OrdersResponse) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const first = entries[0]
      if (
        first.isIntersecting &&
        query.hasNextPage &&
        !query.isFetchingNextPage
      ) {
        query.fetchNextPage()
      }
    },
    [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    })

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [handleIntersection])

  return {
    ...query,
    loadMoreRef,
  }
}

// Hook to get all orders (for backward compatibility)
export function useAllOrders() {
  return useInfiniteQuery({
    queryKey: [...ordersQueryKey, 'all'],
    queryFn: ({ pageParam }) => getOrders(pageParam, 50), // Large limit to get all
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage: OrdersResponse) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}
