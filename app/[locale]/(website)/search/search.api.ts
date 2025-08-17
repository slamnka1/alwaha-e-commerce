import { searchProducts } from '@/lib/api/products'

export const search = (query: URLSearchParams) => {
  // TODO: Implement search
  return searchProducts(query)
}
