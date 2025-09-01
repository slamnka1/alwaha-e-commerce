import { searchProducts } from '@/services/products'

export const search = (query: URLSearchParams) => {
  // TODO: Implement search
  return searchProducts(query)
}
