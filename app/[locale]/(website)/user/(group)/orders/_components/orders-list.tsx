'use client'

import { Loader2 } from 'lucide-react'

import React, { useEffect, useRef } from 'react'

import { useTranslations } from 'next-intl'

import { Separator } from '@/components/ui/separator'
import { useInfiniteOrders } from '@/hooks/use-orders'

import { OrderItem } from './order-item'

export const OrdersList = () => {
  const t = useTranslations('profile.orders')
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteOrders()

  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

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

  if (!data || data.pages.length === 0 || data.pages[0].data.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">
          {t('noOrders') || 'No orders found'}
        </p>
      </div>
    )
  }

  // Flatten all pages into a single array
  const allOrders = data.pages.flatMap((page) => page.data)

  return (
    <div className="space-y-2">
      {allOrders.map((order, index) => (
        <React.Fragment key={order.id}>
          <OrderItem order={order} />
          {index < allOrders.length - 1 && <Separator />}
        </React.Fragment>
      ))}

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="flex justify-center py-4">
        {isFetchingNextPage && (
          <Loader2 className="text-primary size-6 animate-spin" />
        )}
      </div>
    </div>
  )
}
