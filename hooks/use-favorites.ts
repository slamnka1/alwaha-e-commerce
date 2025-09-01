import { useQuery } from '@tanstack/react-query'

import { getFavoriteItems } from '@/services/favorites'

export function useFavoriteItems() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: getFavoriteItems,
  })
}

export function useFavoriteItem(id: string) {
  return useQuery({
    queryKey: ['favorites', id],
    queryFn: () =>
      getFavoriteItems().then((items) => items.find((item) => item.id === id)),
    enabled: !!id,
  })
}
