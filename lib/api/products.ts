// API service for products
export interface Product {
  id: number
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  price: number
  originalPrice: number
  discount: number
  imageUrl: string
  category: string
  categoryAr: string
  colors: string[]
  sizes: string[]
  inStock: boolean
  isNew: boolean
  isFeatured: boolean
  rating: number
  reviewCount: number
  tags: string[]
  isFavorite: boolean
  isPlusSize: boolean
}

// Dummy data - in a real app, this would come from an API endpoint
const dummyProductData: Product[] = [
  {
    id: 1,
    name: 'Black Abaya',
    nameAr: 'عباية سوداء',
    description: 'Elegant black abaya with modern design and comfortable fit',
    descriptionAr: 'عباية سوداء أنيقة بتصميم عصري ومقاس مريح',
    price: 75,
    originalPrice: 120,
    discount: 60,
    imageUrl: '/girls.jpg',
    category: 'abayas',
    categoryAr: 'عبايات',
    colors: ['Black', 'Navy', 'Brown', 'Gray', 'Beige', 'White', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isNew: false,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 128,
    tags: ['plus size', 'modest', 'elegant'],
    isFavorite: false,
    isPlusSize: true,
  },
  {
    id: 2,
    name: 'Embroidered Hijab',
    nameAr: 'حجاب مطرز',
    description: 'Beautiful embroidered hijab with delicate patterns',
    descriptionAr: 'حجاب مطرز جميل بنقوش دقيقة',
    price: 45,
    originalPrice: 80,
    discount: 44,
    imageUrl: '/girls.jpg',
    category: 'hijabat',
    categoryAr: 'حجابات',
    colors: ['Black', 'White', 'Pink', 'Blue', 'Purple'],
    sizes: ['One Size'],
    inStock: true,
    isNew: true,
    isFeatured: false,
    rating: 4.8,
    reviewCount: 89,
    tags: ['embroidered', 'elegant', 'comfortable'],
    isFavorite: false,
    isPlusSize: false,
  },
  {
    id: 3,
    name: 'Swimming Suit',
    nameAr: 'بدلة سباحة',
    description: 'Modest swimming suit perfect for beach activities',
    descriptionAr: 'بدلة سباحة محتشمة مثالية لأنشطة الشاطئ',
    price: 120,
    originalPrice: 150,
    discount: 20,
    imageUrl: '/girls.jpg',
    category: 'swimming',
    categoryAr: 'سباحة',
    colors: ['Black', 'Navy', 'Purple'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isFeatured: true,
    rating: 4.3,
    reviewCount: 67,
    tags: ['modest', 'swimming', 'beach'],
    isFavorite: false,
    isPlusSize: false,
  },
  {
    id: 4,
    name: 'Evening Dress',
    nameAr: 'فستان سهرة',
    description: 'Stunning evening dress for special occasions',
    descriptionAr: 'فستان سهرة مذهل للمناسبات الخاصة',
    price: 200,
    originalPrice: 280,
    discount: 29,
    imageUrl: '/girls.jpg',
    category: 'dresses',
    categoryAr: 'فساتين',
    colors: ['Black', 'Red', 'Blue', 'Green'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 156,
    tags: ['evening', 'elegant', 'formal'],
    isFavorite: false,
    isPlusSize: false,
  },
  {
    id: 5,
    name: 'Leather Handbag',
    nameAr: 'حقيبة جلدية',
    description: 'High-quality leather handbag with multiple compartments',
    descriptionAr: 'حقيبة جلدية عالية الجودة مع أقسام متعددة',
    price: 85,
    originalPrice: 120,
    discount: 29,
    imageUrl: '/girls.jpg',
    category: 'bags',
    categoryAr: 'حقائب',
    colors: ['Brown', 'Black', 'Tan'],
    sizes: ['Medium'],
    inStock: true,
    isNew: false,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 203,
    tags: ['leather', 'practical', 'stylish'],
    isFavorite: false,
    isPlusSize: false,
  },
  {
    id: 6,
    name: 'Comfortable Shoes',
    nameAr: 'أحذية مريحة',
    description: 'Comfortable and stylish shoes for daily wear',
    descriptionAr: 'أحذية مريحة وأنيقة للاستخدام اليومي',
    price: 95,
    originalPrice: 130,
    discount: 27,
    imageUrl: '/girls.jpg',
    category: 'shoes',
    categoryAr: 'أحذية',
    colors: ['Black', 'White', 'Brown', 'Gray'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    inStock: true,
    isNew: false,
    isFeatured: false,
    rating: 4.4,
    reviewCount: 178,
    tags: ['comfortable', 'daily', 'casual'],
    isFavorite: false,
    isPlusSize: false,
  },
  {
    id: 7,
    name: 'Travel Abaya',
    nameAr: 'عباية سفر',
    description: 'Lightweight abaya perfect for travel and daily use',
    descriptionAr: 'عباية خفيفة مثالية للسفر والاستخدام اليومي',
    price: 65,
    originalPrice: 95,
    discount: 32,
    imageUrl: '/girls.jpg',
    category: 'travel',
    categoryAr: 'سفر',
    colors: ['Black', 'Gray', 'Navy', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 234,
    tags: ['travel', 'lightweight', 'versatile'],
    isFavorite: false,
    isPlusSize: false,
  },
  {
    id: 8,
    name: 'Silver Necklace',
    nameAr: 'قلادة فضية',
    description: 'Elegant silver necklace with beautiful design',
    descriptionAr: 'قلادة فضية أنيقة بتصميم جميل',
    price: 55,
    originalPrice: 75,
    discount: 27,
    imageUrl: '/girls.jpg',
    category: 'accessories',
    categoryAr: 'إكسسوارات',
    colors: ['Silver', 'Gold'],
    sizes: ['One Size'],
    inStock: true,
    isNew: false,
    isFeatured: false,
    rating: 4.2,
    reviewCount: 95,
    tags: ['jewelry', 'elegant', 'gift'],
    isFavorite: true,
    isPlusSize: true,
  },
  {
    id: 9,
    name: 'Summer Dress',
    nameAr: 'فستان صيفي',
    description: 'Light and comfortable summer dress',
    descriptionAr: 'فستان صيفي خفيف ومريح',
    price: 75,
    originalPrice: 100,
    discount: 25,
    imageUrl: '/girls.jpg',
    category: 'dresses',
    categoryAr: 'فساتين',
    colors: ['Blue', 'Pink', 'Yellow', 'White'],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    isNew: true,
    isFeatured: false,
    rating: 4.1,
    reviewCount: 67,
    tags: ['summer', 'casual', 'light'],
    isFavorite: false,
    isPlusSize: false,
  },
  {
    id: 10,
    name: 'Designer Hijab',
    nameAr: 'حجاب مصمم',
    description: 'Premium designer hijab with unique patterns',
    descriptionAr: 'حجاب مصمم فاخر بنقوش فريدة',
    price: 35,
    originalPrice: 50,
    discount: 30,
    imageUrl: '/girls.jpg',
    category: 'hijabat',
    categoryAr: 'حجابات',
    colors: ['Black', 'White', 'Gray', 'Beige'],
    sizes: ['One Size'],
    inStock: true,
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 145,
    tags: ['designer', 'premium', 'unique'],
    isFavorite: false,
    isPlusSize: false,
  },
]

// Simulate API call with delay
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would be:
  // const response = await fetch('/api/products')
  // return response.json()

  return dummyProductData
}

// Get products by category
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const products = dummyProductData.filter(
    (product) => product.category === category
  )
  return products
}

// Get a single product by ID
export async function getProduct(id: number): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const product = dummyProductData.find((prod) => prod.id === id)
  return product || null
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  const featuredProducts = dummyProductData.filter(
    (product) => product.isFeatured
  )
  return featuredProducts
}

// Get new products
export async function getNewProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  const newProducts = dummyProductData.filter((product) => product.isNew)
  return newProducts
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const searchTerm = query.toLowerCase()
  const results = dummyProductData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.nameAr.includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.descriptionAr.includes(searchTerm) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  )
  return results
}

// Get products with discount
export async function getDiscountedProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  const discountedProducts = dummyProductData.filter(
    (product) => product.discount > 0
  )
  return discountedProducts.sort((a, b) => b.discount - a.discount)
}
