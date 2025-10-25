import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { ordersService } from '@/services/orders'

// Query key for cart data
export const ordersQueryKey = ['orders']
export const useOrders = () => {
  return useQuery({
    queryKey: ordersQueryKey,
    queryFn: () => ordersService.getOrders(),
  })
}

// Query key for infinite orders
export const infiniteOrdersQueryKey = ['orders', 'infinite']
export const useInfiniteOrders = () => {
  return useInfiniteQuery({
    queryKey: infiniteOrdersQueryKey,
    queryFn: ({ pageParam = 1 }) => ordersService.getOrders(pageParam),
    getNextPageParam: (lastPage) => {
      const { meta } = lastPage
      return meta.current_page < meta.last_page
        ? meta.current_page + 1
        : undefined
    },
    initialPageParam: 1,
  })
}
