import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useTranslations } from 'next-intl'

import { paymentService } from '@/services'

import { cartQueryKey } from './use-cart'

export const usePayment = () => {
  const t = useTranslations('payment')
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => paymentService.Payment(),
    onSuccess: () => {
      // Invalidate cart to clear it after successful payment
      queryClient.invalidateQueries({ queryKey: cartQueryKey })

      // Show success toast
      toast.success(t('success'))
    },
    onError: (error) => {
      // Show error toast
      toast.error(t('error'))
      console.error('Payment failed:', error)
    },
  })
}
