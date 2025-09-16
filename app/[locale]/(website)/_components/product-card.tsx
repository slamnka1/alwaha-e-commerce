'use client'

import { Heart } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { Product } from '@/@types/product'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import useFavorite from '@/hooks/use-favorites'
import { Link } from '@/lib/i18n/navigation'
import { cn } from '@/lib/utils'

export function ProductCard(props: Product & { imageOnly?: boolean }) {
  const t = useTranslations('product-card')
  const { isFavorite, mutate: toggleFavorite, isPending } = useFavorite(props)
  const onAddToCart = () => {}
  return (
    <Card className="overflow-hidden border-0 bg-transparent py-2 shadow-none select-none max-lg:gap-2.5">
      {/* Image Section */}
      <Link
        href={`/search/${props.product_id}?color=${props.colors.id}`}
        className="relative"
      >
        <AspectRatio
          ratio={9 / 13}
          className="relative w-full overflow-hidden rounded-xl shadow-lg md:rounded-[32px]"
        >
          <img
            src={props.main_image_url}
            alt={props.product_name}
            className="h-full w-full object-cover"
          />
          {/* Badges */}
          <div className="absolute top-0 left-[-1px] flex gap-1" dir="ltr">
            {props.sizes && (
              <div className="bg-foreground relative z-[1] rounded-br-xl border border-white px-4 py-1 text-xs font-bold text-white md:rounded-br-3xl lg:px-5 lg:text-base">
                {t('plus-size')}
              </div>
            )}
            {Number(props.discount_percent) > 0 && (
              <div
                className={cn(
                  'bg-primary rounded-br-xl border border-white px-3 py-1 text-xs font-bold text-white md:rounded-br-3xl lg:px-4 lg:text-base',
                  props.sizes && '-ml-8 !pl-8'
                )}
              >
                {props.discount_percent}%
              </div>
            )}
          </div>
        </AspectRatio>
      </Link>

      {/* Content Section */}
      {props.imageOnly ? null : (
        <CardContent className="space-y-1 px-0 md:space-y-2">
          {/* Header with Heart and Product Name */}
          <div className="flex items-center justify-between gap-2">
            <Link
              href={`/search/${props.product_id}?color=${props.colors.id}`}
              className="flex-1 text-sm leading-tight font-semibold text-gray-900 md:text-xl 2xl:text-2xl"
            >
              {props.product_name}
            </Link>
            <Button
              onClick={() => toggleFavorite()}
              variant="secondary"
              size={'icon'}
              className="rounded-full bg-white"
              disabled={isPending}
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
            <span className="text-primary text-sm font-bold md:text-xl 2xl:text-2xl">
              {props.base_price} {t('currency')}
            </span>
            {Number(props.discount_percent) ? (
              <span className="text-xs font-semibold text-[#00000033] line-through md:text-lg">
                {Number(props.base_price) - Number(props.discount_amount)}{' '}
                {t('currency')}
              </span>
            ) : null}
          </div>

          {/* Color Options */}
          <div>
            <span className="text-sm font-semibold text-[#0000006c]">
              {t('colors')} : {props.available_colors_count}
            </span>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={() => onAddToCart()}
            variant="secondary"
            size={'lg'}
            className="w-full bg-white font-semibold shadow-lg max-lg:h-11 md:text-xl 2xl:text-2xl"
          >
            {t('add-to-cart')}
          </Button>
        </CardContent>
      )}
    </Card>
  )
}
