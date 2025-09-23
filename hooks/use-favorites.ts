import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Product } from '@/@types/product'
import apiClient from '@/services/axios'
import { getFavoriteItems } from '@/services/favorites'
import { useSession } from '@/store/session-store'

export const favoriteQueryKey = ['favorites']
export function useFavoriteItems(page: number = 1) {
  return useQuery({
    queryKey: [...favoriteQueryKey, page],
    queryFn: () => getFavoriteItems(page),
  })
}

const addToFavorite = async ({
  product_id,
  color_id,
}: {
  product_id: number | string
  color_id: number | string
}) => {
  const response = await apiClient.post(
    `/products/${product_id}/add-favourite?color_id=${color_id}`,
    {}
  )
  return response
}
const removeFromFavorite = async ({
  product_id,
  color_id,
}: {
  product_id: number | string
  color_id: number | string
}) => {
  const response = await apiClient.delete(
    `/products/${product_id}/remove-favourite?color_id=${color_id}`,
    {}
  )
  return response
}

const useFavorite = (product: Product) => {
  const t = useTranslations()
  const { isAuthenticated } = useSession()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [isFavorite, setIsFavorite] = useState(product.is_favourite)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    async mutationFn({ is_favourite }: { is_favourite: boolean }) {
      if (is_favourite) {
        return removeFromFavorite({
          product_id: product.product_id,
          color_id: product.id,
        })
      } else
        return addToFavorite({
          product_id: product.product_id,
          color_id: product.id,
        })
    },

    onSuccess(data, vars) {
      if (!vars.is_favourite) {
        toast.success(t('favorite.operations.addSuccess'))
      } else {
        toast.success(t('favorite.operations.removeSuccess'))
      }
      setIsFavorite((pre) => !pre)
      queryClient.invalidateQueries({
        queryKey: favoriteQueryKey,
      })
    },
    onError(error, vars) {
      if (vars.is_favourite) {
        toast.error(t('favorite.operations.removeError'))
      } else toast.error(t('favorite.operations.addError'))
    },
  })

  const mutate = () => {
    if (!isAuthenticated) {
      toast.error(t('favorite.operations.addError'))
      return
    }
    mutation.mutate({ is_favourite: isFavorite })
  }
  return { isFavorite, ...mutation, mutate }
}

export default useFavorite
