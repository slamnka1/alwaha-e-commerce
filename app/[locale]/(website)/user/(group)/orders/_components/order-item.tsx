import React from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { type Order } from '@/@types/orders'

interface OrderItemProps {
  order: Order
}

export const OrderItem = ({ order }: OrderItemProps) => {
  const t = useTranslations('profile.orders')

  return (
    <div className="flex items-center py-1">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="h-20 w-18 overflow-hidden rounded-lg">
          <Image
            src={order.main_image_url}
            alt={order.product_name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="ms-4 flex-1">
        <h3 className="mb-1 text-sm font-medium text-gray-900">
          {order.product_name}
        </h3>
        <p className="text-xs text-gray-500">
          {t('color')}: {order.color_name} | {t('size')}: {order.size_code}
        </p>
      </div>
      {/* Date */}

      <div className="ms-auto w-24 flex-shrink-0">
        <span className="text-sm font-medium text-gray-900">
          {order.created_at}
        </span>
      </div>
    </div>
  )
}
