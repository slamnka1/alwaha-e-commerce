import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { paymentService } from '@/services'

import { cartQueryKey } from './use-cart'

export const usePayment = ({
  shipping_address,
  cart_id,
}: {
  shipping_address: string
  cart_id: string | number
}) => {
  const t = useTranslations('payment')
  const router = useRouter()
  return useMutation({
    mutationFn: () => paymentService.Payment({ shipping_address, cart_id }),
    onSuccess: (payment_link) => {
      router.push(payment_link)
    },
    onError: (error) => {
      // Show error toast
      toast.error(t('error'))
      console.error('Payment failed:', error)
    },
  })
}
