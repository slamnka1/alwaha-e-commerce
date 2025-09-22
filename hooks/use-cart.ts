import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useTranslations } from 'next-intl'

import { CartResponse } from '@/@types/cart'
import { cart } from '@/services'

import { AddToCartParams } from '../services'

// Query key for cart data
export const cartQueryKey = ['cart']

// Hook to fetch cart items
export function useCartItems() {
  return useQuery({
    queryKey: cartQueryKey,
    queryFn: cart.getCart,
  })
}

export function useAddToCart() {
  const t = useTranslations('cart')
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: AddToCartParams) => cart.addToCart(params),
  })
}

// Hook to update cart item quantity
export function useUpdateCartItemQuantity() {
  const t = useTranslations('cart')
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      cart.updateCartItemQuantity(itemId, quantity),
    onMutate: async ({ itemId, quantity }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: cartQueryKey })

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData(
        cartQueryKey
      ) as CartResponse['data']

      // Optimistically update to the new value
      queryClient.setQueryData(cartQueryKey, (old: CartResponse['data']) => {
        if (!old) return old
        return old.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      })

      // Return a context object with the snapshotted value
      return { previousCart }
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCart) {
        queryClient.setQueryData(cartQueryKey, context.previousCart)
      }
      if (t) {
        toast.error(t('operations.updateError'))
      }
      console.error('Error updating cart:', err)
    },
    onSuccess: (data) => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: cartQueryKey })
      if (t) {
        toast.success(t('operations.updateSuccess'))
      }
    },
  })
}

// Hook to remove cart item
export function useRemoveCartItem() {
  const t = useTranslations('cart')
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId: number) => cart.removeFromCart(itemId),
    onMutate: async (itemId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: cartQueryKey })

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData(
        cartQueryKey
      ) as CartResponse['data']

      // Optimistically update to the new value
      queryClient.setQueryData(cartQueryKey, (old: CartResponse['data']) => {
        if (!old) return old
        return old.items.filter((item) => item.id !== itemId)
      })

      // Return a context object with the snapshotted value
      return { previousCart }
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCart) {
        queryClient.setQueryData(cartQueryKey, context.previousCart)
      }
      if (t) {
        toast.error(t('operations.removeError'))
      }
      console.error('Error removing item from cart:', err)
    },
    onSuccess: (data) => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: cartQueryKey })
      if (t) {
        toast.success(t('operations.removeSuccess'))
      }
    },
  })
}
