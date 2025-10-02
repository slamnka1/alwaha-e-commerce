import { useQuery } from '@tanstack/react-query'

import { ordersService } from '@/services/orders'

// Query key for cart data
export const ordersQueryKey = ['orders']
export const useOrders = () => {
  return useQuery({
    queryKey: ordersQueryKey,
    queryFn: () => ordersService.getOrders(),
  })
}
