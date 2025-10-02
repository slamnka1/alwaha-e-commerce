import React from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { type Order } from '@/@types/orders'
import { Badge } from '@/components/ui/badge'

interface OrderItemProps {
  order: Order
}

export const OrderItem = ({ order }: OrderItemProps) => {
  const t = useTranslations('profile.orders')

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'secondary'
      case 'processing':
        return 'default'
      case 'shipped':
        return 'default'
      case 'delivered':
        return 'default'
      case 'cancelled':
        return 'destructive'
      case 'refunded':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="flex items-center py-1">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="h-20 w-18 overflow-hidden rounded-lg">
          <img
            src={order.items[0].product_color?.color_image_url}
            alt={order.items[0].product.name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="ms-4 flex-1">
        <h3 className="mb-1 text-sm font-medium text-gray-900">
          {order.items[0].product.name}
        </h3>
        <p className="text-xs text-gray-500">
          {t('color')}: {order.items[0].product_color?.color_name} | {t('size')}
          : {order.items[0].product_size.size_code}
        </p>
      </div>
      {/* Status Badge */}
      <div className="ms-auto flex flex-col items-end gap-2">
        <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
        <span className="text-sm font-medium text-gray-900">
          {order.created_at}
        </span>
      </div>
    </div>
  )
}
