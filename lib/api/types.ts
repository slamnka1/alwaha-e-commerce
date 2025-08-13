// API service for type categories
export interface TypeCategory {
  id: number
  imageUrl: string
  categoryName: string
  buttonText: string
  link: string
}

// Dummy data - in a real app, this would come from an API endpoint
const dummyTypeData: TypeCategory[] = [
  {
    id: 1,
    imageUrl: '/girls.jpg',
    categoryName: 'حجابات',
    buttonText: 'رؤية المزيد',
    link: '/category/hijabat',
  },
  {
    id: 2,
    imageUrl: '/girls.jpg',
    categoryName: 'سفر',
    buttonText: 'رؤية المزيد',
    link: '/category/travel',
  },
  {
    id: 3,
    imageUrl: '/girls.jpg',
    categoryName: 'سباحة',
    buttonText: 'رؤية المزيد',
    link: '/category/swimming',
  },
  {
    id: 4,
    imageUrl: '/girls.jpg',
    categoryName: 'فساتين',
    buttonText: 'رؤية المزيد',
    link: '/category/dresses',
  },
  {
    id: 5,
    imageUrl: '/girls.jpg',
    categoryName: 'أحذية',
    buttonText: 'رؤية المزيد',
    link: '/category/shoes',
  },
  {
    id: 6,
    imageUrl: '/girls.jpg',
    categoryName: 'حقائب',
    buttonText: 'رؤية المزيد',
    link: '/category/bags',
  },
  {
    id: 7,
    imageUrl: '/girls.jpg',
    categoryName: 'إكسسوارات',
    buttonText: 'رؤية المزيد',
    link: '/category/accessories',
  },
  {
    id: 8,
    imageUrl: '/girls.jpg',
    categoryName: 'عبايات',
    buttonText: 'رؤية المزيد',
    link: '/category/abayas',
  },
]

// Simulate API call with delay
export async function getTypeCategories(): Promise<TypeCategory[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would be:
  // const response = await fetch('/api/categories')
  // return response.json()

  return dummyTypeData
}

// Get a single category by ID
export async function getTypeCategory(
  id: number
): Promise<TypeCategory | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const category = dummyTypeData.find((cat) => cat.id === id)
  return category || null
}
