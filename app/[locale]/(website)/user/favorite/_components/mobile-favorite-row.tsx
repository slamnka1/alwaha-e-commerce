'use client'

import { CircleX, Heart, Loader2, Plus } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { Product } from '@/@types/product'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import useFavorite from '@/hooks/use-favorites'

interface MobileFavoriteRowProps {
  item: Product
}

const MobileFavoriteRow = ({ item }: MobileFavoriteRowProps) => {
  const t = useTranslations('favorite.table')
  const { mutate: removeFromFavorites, isPending } = useFavorite(item)
  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', item)
  }

  return (
    <Card key={item.id} className="border-none p-3 shadow-none">
      <div className="flex items-center gap-1">
        <Heart className="text-primary fill-primary size-5" strokeWidth={1} />

        {/* Product Image */}
        <div className="bg-muted relative aspect-square h-22 w-16 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={item.main_image_url}
            alt={item.product_name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="min-w-0 flex-1 ps-1">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 text-sm leading-tight font-medium">
                {item.product_name}
              </h3>
              <p className="text-muted-foreground mb-2 text-xs">
                {t('color')}: {item.colors.color_name}
              </p>
              <p className="text-sm font-medium">
                {item.base_price} {t('currency')}
              </p>

              {/* Add to Cart Button */}
              <Button
                onClick={() => handleAddToCart()}
                variant="link"
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="h-3 w-3" />
                {t('addToCart')}
              </Button>
            </div>

            {/* Price and Favorite Icon */}
            <div className="flex flex-col items-end gap-2">
              {/* Remove Button */}
              <Button
                onClick={removeFromFavorites}
                variant="ghost"
                size="icon"
                className="size-8 rounded-full"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <CircleX className="size-5" strokeWidth={1} />
                )}
                <CircleX className="size-5" strokeWidth={1} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default MobileFavoriteRow
