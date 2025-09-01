export interface OrderProduct {
  title: string
  color: string
  size: string
  image: string
}

export interface Order {
  id: number
  date: string
  product: OrderProduct
}

export interface OrdersResponse {
  orders: Order[]
  hasNextPage: boolean
  nextCursor?: number
}

// Dummy orders data - in a real app, this would come from an API endpoint
const dummyOrders: Order[] = [
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
  {
    id: 7,
    date: '11-07-2025',
    product: {
      title: 'عباية سوداء',
      color: 'الأسود',
      size: 'M',
      image: '/girls.jpg',
    },
  },
  {
    id: 8,
    date: '10-07-2025',
    product: {
      title: 'حجاب أنيق',
      color: 'الأزرق',
      size: 'One Size',
      image: '/girls.jpg',
    },
  },
  {
    id: 9,
    date: '09-07-2025',
    product: {
      title: 'قميص كلاسيكي',
      color: 'الأبيض',
      size: 'L',
      image: '/girls.jpg',
    },
  },
  {
    id: 10,
    date: '08-07-2025',
    product: {
      title: 'بنطلون أنيق',
      color: 'الأسود',
      size: '32',
      image: '/girls.jpg',
    },
  },
]

// Get orders with pagination
export async function getOrders(
  cursor?: number,
  limit: number = 5
): Promise<OrdersResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const startIndex = cursor
    ? dummyOrders.findIndex((order) => order.id === cursor) + 1
    : 0
  const endIndex = startIndex + limit
  const orders = dummyOrders.slice(startIndex, endIndex)

  const hasNextPage = endIndex < dummyOrders.length
  const nextCursor = hasNextPage ? orders[orders.length - 1]?.id : undefined

  return {
    orders,
    hasNextPage,
    nextCursor,
  }
}

// Get all orders (for backward compatibility)
export async function getAllOrders(): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return dummyOrders
}
