'use client'

import React from 'react'

import { useLocale, useTranslations } from 'next-intl'

import { useCartItems } from '@/hooks/use-cart'

import { CartItems } from './cart-items'
import { CartSummary } from './cart-summary'

type Props = {}

const Wrapper = (props: Props) => {
  const t = useTranslations('cart')
  const locale = useLocale()
  const { data, isLoading, error } = useCartItems()

  // Map API response to UI cart items shape
  const items = (data?.items ?? []).map((item) => ({
    id: String(item.id),
    name: locale === 'ar' ? item.product.name_ar : item.product.name_en,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.color_image_url,
    color: '',
    size: item.product_size.size_code,
  }))

  // Use summary numbers from API when available
  const summaryData = {
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: data?.subtotal ?? 0,
    purchase: data?.subtotal ?? 0,
    purchaseTax: data?.tax_amount ?? 0,
    deliveryPrice: data?.shipping_amount ?? 0,
    discountPercentage: 0,
    total: data?.total_amount ?? 0,
  }

  if (isLoading) {
    return (
      <section>
        <div className="container">
          <div className="flex gap-8 pb-20">
            <div className="flex-1">
              <div className="w-full overflow-hidden rounded-lg border p-8 text-center">
                <p className="text-muted-foreground text-lg">
                  {t('operations.loading')}
                </p>
              </div>
            </div>
            <div className="w-80">
              <div className="rounded-lg border p-6">
                <p className="text-muted-foreground text-center">
                  {t('operations.loading')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <div className="container">
          <div className="flex gap-8 pb-20">
            <div className="flex-1">
              <div className="w-full overflow-hidden rounded-lg border p-8 text-center">
                <p className="text-lg text-red-500">{t('operations.error')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="container">
        <div className="flex flex-col gap-4 pb-20 md:flex-row">
          <div className="flex-1">
            <CartItems items={items} />
          </div>
          <CartSummary data={summaryData} />
        </div>
      </div>
    </section>
  )
}

export default Wrapper
