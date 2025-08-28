'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import { useCartItems } from '@/hooks/use-cart'

import { CartItems } from './cart-items'
import { CartSummary } from './cart-summary'

type Props = {}

const Wrapper = (props: Props) => {
  const t = useTranslations('cart')
  const { data: cartItems = [], isLoading, error } = useCartItems()

  // Calculate summary data from cart items
  const summaryData = {
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    purchase: cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    purchaseTax: 45.5,
    deliveryPrice: 25.0,
    discountPercentage: 10,
    total: 0, // Will be calculated
  }

  // Calculate total
  summaryData.total =
    summaryData.purchase +
    summaryData.purchaseTax +
    summaryData.deliveryPrice -
    (summaryData.purchase * summaryData.discountPercentage) / 100

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
            <CartItems items={cartItems} />
          </div>
          <CartSummary
            data={summaryData}
            onConfirmOrder={() => {
              console.log('Confirm order clicked')
            }}
            onPolicyClick={() => {
              console.log('Policy clicked')
            }}
            className=""
          />
        </div>
      </div>
    </section>
  )
}

export default Wrapper
