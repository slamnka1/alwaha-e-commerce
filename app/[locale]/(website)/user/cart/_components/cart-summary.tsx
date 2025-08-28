'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

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
  data: CartSummaryData
  onConfirmOrder: () => void
  onPolicyClick?: () => void
  className?: string
}

export function CartSummary({
  data,
  onConfirmOrder,
  onPolicyClick,
  className,
}: CartSummaryProps) {
  const t = useTranslations('cart.summary')

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2)
  }

  const formatPercentage = (percentage: number) => {
    return `${percentage}%`
  }

  return (
    <div className="min-w-[250px] space-y-3">
      <Card className={`gap-3 bg-white py-4 shadow-none ${className}`}>
        <CardHeader className="">
          <CardTitle className="font-semibold max-lg:text-sm lg:text-xl">
            {t('title')}
          </CardTitle>
        </CardHeader>
        <Separator />

        <CardContent className="space-y-4 px-3 lg:px-5">
          {/* Summary Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold max-lg:text-xs">
                {t('itemCount')}
              </span>
              <span className="font-medium">{data.itemCount}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold max-lg:text-xs">
                {t('subtotal')}
              </span>
              <span className="font-medium">
                {formatCurrency(data.subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold max-lg:text-xs">
                {t('purchase')}
              </span>
              <span className="font-medium">
                {formatCurrency(data.purchase)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold max-lg:text-xs">
                {t('purchaseTax')}
              </span>
              <span className="font-medium">
                {formatCurrency(data.purchaseTax)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold max-lg:text-xs">
                {t('deliveryPrice')}
              </span>
              <span className="font-medium">
                {formatCurrency(data.deliveryPrice)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold max-lg:text-xs">
                {t('discountCoupon')}
              </span>
              <span className="font-medium">
                {formatPercentage(data.discountPercentage)}
              </span>
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-semibold">{t('total')}</span>
              <span className="font-bold">{formatCurrency(data.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="px-3">
        {/* Confirm Order Button */}
        <Button
          variant={'secondary'}
          onClick={onConfirmOrder}
          className="w-full"
        >
          {t('confirmOrder')}
        </Button>
      </div>

      {/* Policy Disclaimer */}
      <p className="text-center text-xs leading-relaxed font-semibold">
        {t('shopWithConfidence')}{' '}
        <button
          onClick={onPolicyClick}
          className="text-blue-600 underline hover:text-blue-700"
        >
          {t('policy')}
        </button>
        .
      </p>
    </div>
  )
}
