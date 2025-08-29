import { FavoriteItem } from '@/app/[locale]/(website)/user/favorite/_components/favorite-items'

// Dummy favorite data - in a real app, this would come from an API endpoint
let dummyFavoriteItems: FavoriteItem[] = [
  {
    id: '1',
    name: 'ثوب صلاة قطعتين',
    price: 120,
    image: '/girls.jpg',
    color: 'الأبيض',
    size: 'XL',
    category: 'الحجابات وملابس الصلاة',
    categoryAr: 'الحجابات وملابس الصلاة',
  },
  {
    id: '2',
    name: 'فستان أنيق للنساء',
    price: 299.99,
    image: '/girls.jpg',
    color: 'أزرق',
    size: 'M',
    category: 'الفساتين',
    categoryAr: 'الفساتين',
  },
  {
    id: '3',
    name: 'ملابس سفر أنيقة',
    price: 199.99,
    image: '/girls.jpg',
    color: 'أسود',
    size: 'L',
    category: 'ملابس السفر',
    categoryAr: 'ملابس السفر',
  },
  {
    id: '4',
    name: 'جاكيت شتوي دافئ',
    price: 399.99,
    image: '/girls.jpg',
    color: 'رمادي',
    size: 'XL',
    category: 'ملابس الشتاء',
    categoryAr: 'ملابس الشتاء',
  },
  {
    id: '5',
    name: 'ملابس سباحة محتشمة',
    price: 249.99,
    image: '/girls.jpg',
    color: 'أزرق داكن',
    size: 'M',
    category: 'ملابس السباحة الشرعية',
    categoryAr: 'ملابس السباحة الشرعية',
  },
]

// Get favorite items
export async function getFavoriteItems(): Promise<FavoriteItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return dummyFavoriteItems
}

// Add item to favorites
export async function addToFavorites(
  item: Omit<FavoriteItem, 'id'>
): Promise<FavoriteItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const newItem: FavoriteItem = {
    ...item,
    id: Date.now().toString(),
  }

  dummyFavoriteItems = [...dummyFavoriteItems, newItem]
  return dummyFavoriteItems
}

// Remove item from favorites
export async function removeFromFavorites(
  itemId: string
): Promise<FavoriteItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  dummyFavoriteItems = dummyFavoriteItems.filter((item) => item.id !== itemId)
  return dummyFavoriteItems
}

// Check if item is in favorites
export async function isInFavorites(itemId: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return dummyFavoriteItems.some((item) => item.id === itemId)
}
