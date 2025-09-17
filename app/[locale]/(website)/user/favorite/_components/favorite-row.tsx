'use client'

import { CircleX, Heart, Loader2, Plus } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { Product } from '@/@types/product'
import { Button } from '@/components/ui/button'
import useFavorite from '@/hooks/use-favorites'

interface FavoriteRowProps {
  item: Product
}

const FavoriteRow = ({ item }: FavoriteRowProps) => {
  const t = useTranslations('favorite.table')
  const { mutate: toggleFavorite, isPending } = useFavorite(item)

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', item)
  }

  return (
    <div key={item.id} className="px-6 py-4">
      <div className="grid grid-cols-9 items-center gap-4">
        {/* Item */}

        <div className="col-span-4 flex shrink-0 items-center gap-3">
          {/* Remove Button */}
          <div className="col-span-1 flex justify-center">
            <Heart
              className="text-primary fill-primary size-8"
              strokeWidth={1}
            />
          </div>
          <div className="relative aspect-square h-18 w-18 shrink-0 overflow-hidden rounded-lg">
            <img
              src={item.main_image_url}
              alt={item.product_name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="font-medium">{item.product_name}</h3>
            <p className="text-xs text-[#A97C50]">
              {t('color')}: {item.colors.color_name}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-2 text-center">
          <span className="font-semibold">
            {item.base_price} {t('currency')}
          </span>
        </div>

        {/* Add to Cart */}
        <div className="col-span-2 text-center">
          <Button
            onClick={() => handleAddToCart()}
            variant="link"
            size="sm"
            className="mx-auto flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {t('addToCart')}
          </Button>
        </div>

        {/* Remove */}
        <div className="col-span-1 text-center">
          <Button
            onClick={() => toggleFavorite()}
            variant="ghost"
            size="sm"
            className="size-9 cursor-pointer p-0"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <CircleX className="size-7" strokeWidth={1.2} />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FavoriteRow
