import React from 'react'

import { Separator } from '@/components/ui/separator'

import { OrderItem } from './order-item'

// Mock data for orders - in a real app this would come from an API
const mockOrders = [
  {
    id: 1,
    date: '12-07-2025',
    product: {
      title: 'ثوب صلاة قطعتين',
      color: 'الأبيض',
      size: 'L',
      image: '/girls.jpg',
    },
  },
  {
    id: 2,
    date: '12-07-2025',
    product: {
      title: 'ثوب صلاة قطعتين',
      color: 'الأبيض',
      size: 'L',
      image: '/girls.jpg',
    },
  },
  {
    id: 3,
    date: '12-07-2025',
    product: {
      title: 'ثوب صلاة قطعتين',
      color: 'الأبيض',
      size: 'L',
      image: '/girls.jpg',
    },
  },
  {
    id: 4,
    date: '12-07-2025',
    product: {
      title: 'ثوب صلاة قطعتين',
      color: 'الأبيض',
      size: 'L',
      image: '/girls.jpg',
    },
  },
  {
    id: 5,
    date: '12-07-2025',
    product: {
      title: 'ثوب صلاة قطعتين',
      color: 'الأبيض',
      size: 'L',
      image: '/girls.jpg',
    },
  },
  {
    id: 6,
    date: '12-07-2025',
    product: {
      title: 'ثوب صلاة قطعتين',
      color: 'الأبيض',
      size: 'L',
      image: '/girls.jpg',
    },
  },
]

export const OrdersList = () => {
  return (
    <div className="space-y-2">
      {mockOrders.map((order, index) => (
        <React.Fragment key={order.id}>
          <OrderItem order={order} />
          {index < mockOrders.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  )
}
