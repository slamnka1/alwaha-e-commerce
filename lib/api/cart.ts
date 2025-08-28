import { CartItem } from '@/app/[locale]/(website)/user/cart/_components/cart-items'

// Dummy cart data - in a real app, this would come from an API endpoint
let dummyCartItems: CartItem[] = [
  {
    id: '1',
    name: 'فستان أنيق للنساء',
    price: 299.99,
    quantity: 2,
    image: '/girls.jpg',
    color: 'أزرق',
    size: 'M',
  },
  {
    id: '2',
    name: 'قميص كلاسيكي',
    price: 149.99,
    quantity: 1,
    image: '/girls.jpg',
    color: 'أبيض',
    size: 'L',
  },
  {
    id: '3',
    name: 'بنطلون أنيق',
    price: 199.99,
    quantity: 1,
    image: '/girls.jpg',
    color: 'أسود',
    size: '32',
  },
  {
    id: '4',
    name: 'جاكيت شتوي',
    price: 399.99,
    quantity: 1,
    image: '/girls.jpg',
    color: 'رمادي',
    size: 'XL',
  },
]

// Get cart items
export async function getCartItems(): Promise<CartItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return dummyCartItems
}

// Update cart item quantity
export async function updateCartItemQuantity(
  itemId: string,
  quantity: number
): Promise<CartItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  // Update the item quantity
  dummyCartItems = dummyCartItems.map((item) =>
    item.id === itemId ? { ...item, quantity } : item
  )

  return dummyCartItems
}

// Remove item from cart
export async function removeCartItem(itemId: string): Promise<CartItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  // Remove the item
  dummyCartItems = dummyCartItems.filter((item) => item.id !== itemId)

  return dummyCartItems
}
