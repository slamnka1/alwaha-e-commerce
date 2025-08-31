import React from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface Product {
  title: string
  color: string
  size: string
  image: string
}

interface Order {
  id: number
  date: string
  product: Product
}

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
            src={order.product.image}
            alt={order.product.title}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="ms-4 flex-1">
        <h3 className="mb-1 text-sm font-medium text-gray-900">
          {order.product.title}
        </h3>
        <p className="text-xs text-gray-500">
          {t('color')}: {order.product.color} | {t('size')}:{' '}
          {order.product.size}
        </p>
      </div>
      {/* Date */}

      <div className="ms-auto w-24 flex-shrink-0">
        <span className="text-sm font-medium text-gray-900">{order.date}</span>
      </div>
    </div>
  )
}
