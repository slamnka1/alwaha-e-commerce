import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { useRouter } from '@/lib/i18n/navigation'
import { cart } from '@/services'
import { useSession } from '@/store/session-store'

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
  const { isAuthenticated } = useSession()
  const router = useRouter()
  const { slug } = useParams()

  return useMutation({
    mutationFn: (params: AddToCartParams) => {
      if (!isAuthenticated) {
        router.push('/auth/login')
        router.push({
          pathname: '/auth/login',
          query: { callbackUrl: `/search/${slug}` },
        })
        return new Promise((resolve) => resolve(null))
      }
      return cart.addToCart(params)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey })
      if (t) {
        toast.success(t('operations.updateSuccess'))
      }
    },
    onError: (err) => {
      if (t) {
        toast.error(t('operations.updateError'))
      }
      console.error('Error adding to cart:', err)
    },
  })
}

// Hook to update cart item quantity
export function useUpdateCartItemQuantity() {
  const t = useTranslations('cart')
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      cart.updateCartItemQuantity(itemId, quantity),

    onError: (err) => {
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

    onError: (err, variables, context) => {
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
