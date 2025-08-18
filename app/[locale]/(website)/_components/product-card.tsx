'use client'

import { Heart } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@/lib/api/products'
import { cn } from '@/lib/utils'

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  imageUrl,
  colors,
  discount,

  isFavorite,
  isPlusSize,
}: Product) {
  const t = useTranslations('product-card')
  const onAddToCart = () => {}
  const toggleFavorite = () => {}
  return (
    <Card className="overflow-hidden border-0 bg-transparent py-3 shadow-none select-none">
      {/* Image Section */}
      <div className="relative">
        <AspectRatio
          ratio={9 / 13}
          className="relative w-full overflow-hidden rounded-xl shadow-lg md:rounded-3xl"
        >
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
          {/* Badges */}
          <div className="absolute top-0 left-0 flex gap-1" dir="ltr">
            {isPlusSize && (
              <div className="bg-foreground relative z-[1] rounded-br-xl border border-white px-4 py-1 font-bold text-white md:rounded-br-3xl">
                {t('plus-size')}
              </div>
            )}
            {discount && (
              <div
                className={cn(
                  'bg-primary rounded-br-xl border border-white px-3 py-1 font-bold text-white md:rounded-br-3xl',
                  isPlusSize && '-ml-8 pe-8'
                )}
              >
                {discount}%
              </div>
            )}
          </div>
        </AspectRatio>
      </div>

      {/* Content Section */}
      <CardContent className="space-y-1 px-0 md:space-y-2">
        {/* Header with Heart and Product Name */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="flex-1 text-sm leading-tight font-semibold text-gray-900 md:text-2xl">
            {name}
          </h3>
          <Button
            onClick={() => toggleFavorite()}
            variant="secondary"
            size={'icon'}
            className="rounded-full"
          >
            <Heart
              className={cn(
                isFavorite ? 'fill-red-500 text-red-500' : 'text-orange-500',
                'size-4 md:size-5'
              )}
            />
          </Button>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-primary text-sm font-bold md:text-2xl">
            {price} {t('currency')}
          </span>
          <span className="text-xs font-semibold text-[#00000033] line-through md:text-lg">
            {originalPrice} {t('currency')}
          </span>
        </div>

        {/* Color Options */}
        <div>
          <span className="text-sm font-semibold text-[#0000006c]">
            {t('colors')} : {colors.length}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => onAddToCart()}
          variant="secondary"
          size={'lg'}
          className="w-full bg-white font-semibold shadow-lg md:text-2xl"
        >
          {t('add-to-cart')}
        </Button>
      </CardContent>
    </Card>
  )
}
