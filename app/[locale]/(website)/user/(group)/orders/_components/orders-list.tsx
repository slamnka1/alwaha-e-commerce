'use client'

import { Loader2 } from 'lucide-react'

import React from 'react'

import { useTranslations } from 'next-intl'

import { Separator } from '@/components/ui/separator'
import { useOrders } from '@/hooks/use-orders'

import { OrderItem } from './order-item'

export const OrdersList = () => {
  const t = useTranslations('profile.orders')
  const { data, isLoading, error } = useOrders()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="text-primary size-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-destructive">Error: {error?.message}</p>
      </div>
    )
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">
          {t('noOrders') || 'No orders found'}
        </p>
      </div>
    )
  }

  // Flatten all pages into a single array
  const allOrders = data.data

  return (
    <div className="space-y-2">
      {allOrders.map((order, index) => (
        <React.Fragment key={order.id}>
          <OrderItem order={order} />
          {index < allOrders.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  )
}
