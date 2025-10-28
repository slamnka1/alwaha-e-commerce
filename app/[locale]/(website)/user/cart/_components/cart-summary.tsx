'use client'

import { ArrowRight, Loader2 } from 'lucide-react'
import { parseAsString, useQueryStates } from 'nuqs'

import { useEffect, useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCartSummary } from '@/hooks/use-cart'
import { usePayment } from '@/hooks/use-payment'
import { Link } from '@/lib/i18n/navigation'

import { CheckoutForm } from './checkout-form'

interface CartSummaryData {
  itemCount: number
  subtotal: number
  purchase: number
  purchaseTax: number
  deliveryPrice: number
  discountPercentage: number
  total: number
}

interface CartSummaryProps {
  className?: string
}

export function CartSummary({ className }: CartSummaryProps) {
  const t = useTranslations('cart.summary')
  const router = useRouter()
  const [queryStates] = useQueryStates({
    emirate_id: parseAsString.withDefault(''),
    region_id: parseAsString.withDefault(''),
    shipping_address: parseAsString.withDefault(''),
  })

  const { data, isLoading, error } = useCartSummary({
    region_id: queryStates.region_id,
    shipping_address: queryStates.shipping_address,
  })
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const locale = useLocale()

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2)
  }

  const formatPercentage = (percentage: number) => {
    return `${percentage}%`
  }

  const { mutateAsync: payment, isPending } = usePayment({
    shipping_address: data?.shipping_address ?? '',
    cart_id: data?.items[0].cart_id ?? '',
  })

  const [paymentLink, setPaymentLink] = useState<string | null>(null)

  useEffect(() => {
    setPaymentLink(null)
  }, [showCheckoutForm])
  const handleConfirmOrder = async () => {
    const paymentLink = await payment()

    setPaymentLink(paymentLink)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[250px] min-w-[250px] items-center justify-center md:min-w-[320]">
        <Loader2 className="animate-spin" />
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex min-h-[250px] min-w-[250px] items-center justify-center md:min-w-[320]">
        <p className="text-muted-foreground text-sm">{error.message}</p>
      </div>
    )
  }
  return (
    <div className="min-w-[250px] space-y-3 md:min-w-[320]">
      {showCheckoutForm ? (
        <CheckoutForm setShowCheckoutForm={setShowCheckoutForm} />
      ) : (
        <>
          <Card className={`gap-3 bg-white py-4 shadow-none ${className}`}>
            <CardHeader className="">
              <CardTitle className="font-semibold max-lg:text-sm lg:text-xl">
                {t('title')}
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-3">
                <div className="flex flex-nowrap items-center">
                  <div className="flex-1 space-y-1.5 text-sm">
                    <p>
                      {t('shippingAddress')}: {data?.shipping_address}
                    </p>
                    <p>
                      {t('region')}:{' '}
                      {data?.region[locale === 'ar' ? 'name_ar' : 'name_en']}
                    </p>
                  </div>

                  <Button
                    onClick={() => setShowCheckoutForm(true)}
                    size={'sm'}
                    variant={'secondary'}
                  >
                    {t('editAddress')}
                  </Button>
                </div>
              </CardDescription>
            </CardHeader>
            <Separator />

            <CardContent className="space-y-4 px-3 lg:px-5">
              {/* Summary Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold max-lg:text-xs">
                    {t('itemCount')}
                  </span>
                  <span className="font-medium">
                    {data?.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold max-lg:text-xs">
                    {t('subtotal')}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(data?.subtotal ?? 0)}
                  </span>
                </div>

                {/* <div className="flex items-center justify-between">
                  <span className="font-semibold max-lg:text-xs">
                    {t('purchase')}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(data?.total_amount ?? 0)}
                  </span>
                </div> */}

                <div className="flex items-center justify-between">
                  <span className="font-semibold max-lg:text-xs">
                    {t('purchaseTax')}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(data?.tax_amount ?? 0)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold max-lg:text-xs">
                    {t('deliveryPrice')}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(data?.shipping_amount ?? 0)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold max-lg:text-xs">
                    {t('discountCoupon')}
                  </span>
                  <span className="font-medium">
                    {formatPercentage(data?.discount_amount ?? 0)}
                  </span>
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <span className="font-semibold">{t('total')}</span>
                  <span className="font-bold">
                    {formatCurrency(data?.total_amount ?? 0)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="px-3">
            {/* Confirm Order Button */}
            <Button
              variant={'secondary'}
              onClick={handleConfirmOrder}
              className="w-full"
            >
              {isPending ? <Loader2 className="animate-spin" /> : ''}
              {t('confirmOrder')}
            </Button>
          </div>

          {paymentLink && (
            <div className="px-3">
              <Button variant={'link'} onClick={() => router.push(paymentLink)}>
                {t('redirectToPayment')} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Policy Disclaimer */}
          <p className="text-center text-xs leading-relaxed font-semibold">
            {t('shopWithConfidence')}{' '}
            <Link
              href={'/change-policy'}
              className="text-blue-600 underline hover:text-blue-700"
            >
              {t('policy')}
            </Link>
            .
          </p>
        </>
      )}
    </div>
  )
}
