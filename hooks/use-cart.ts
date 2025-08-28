import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from '@/lib/api/cart'

// Type for translation function
type TranslationFunction = (key: string) => string

// Query key for cart data
export const cartQueryKey = ['cart']

// Hook to fetch cart items
export function useCartItems() {
  return useQuery({
    queryKey: cartQueryKey,
    queryFn: getCartItems,
  })
}

// Hook to update cart item quantity
export function useUpdateCartItemQuantity(t?: TranslationFunction) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      updateCartItemQuantity(itemId, quantity),
    onMutate: async ({ itemId, quantity }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: cartQueryKey })

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData(cartQueryKey)

      // Optimistically update to the new value
      queryClient.setQueryData(cartQueryKey, (old: any) => {
        if (!old) return old
        return old.map((item: any) =>
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
export function useRemoveCartItem(t?: TranslationFunction) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId: string) => removeCartItem(itemId),
    onMutate: async (itemId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: cartQueryKey })

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData(cartQueryKey)

      // Optimistically update to the new value
      queryClient.setQueryData(cartQueryKey, (old: any) => {
        if (!old) return old
        return old.filter((item: any) => item.id !== itemId)
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
