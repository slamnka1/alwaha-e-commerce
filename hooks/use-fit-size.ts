import { useQuery } from '@tanstack/react-query'

import { sizes } from '@/services/sizes'
import { useSession } from '@/store/session-store'

export const useFitSize = (product_color_id: string | number) => {
  const session = useSession()
  const query = useQuery({
    enabled: !!session?.isAuthenticated,
    queryKey: ['fit-size', product_color_id],
    queryFn: () => sizes.getFitSize(product_color_id),
  })
  return {
    ...query,
    data: query.data ?? [],
  }
}
