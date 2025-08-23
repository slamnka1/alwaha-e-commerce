'use client'

import { Heart, Minus, Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'

import React from 'react'

import { useLocale, useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Product } from '@/lib/api/products'
import { cn } from '@/lib/utils'

type ProductDescriptionProps = {
  product: Product
  className?: string
}

export default function ProductDescription({
  product,
  className,
}: ProductDescriptionProps) {
  const t = useTranslations('product-description')
  const [selectedColor, setSelectedColor] = useQueryState(
    'color',
    parseAsInteger
  )
  const [selectedSize, setSelectedSize] = React.useState<string | null>(
    product.sizes?.[0] ?? null
  )
  const [quantity, setQuantity] = React.useState<number>(1)

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price

  const decQty = () => setQuantity((q) => Math.max(1, q - 1))
  const incQty = () => setQuantity((q) => Math.min(99, q + 1))

  return (
    <div className={cn('flex w-full max-w-xl flex-col gap-6', className)}>
      <div>
        <p className="text-sm font-semibold text-[#A97C50]">
          {product.category}
        </p>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-sm lg:text-4xl lg:font-bold">{product.name}</h1>
          <Button
            variant={'ghost'}
            className="size-11 rounded-full"
            size={'icon'}
          >
            <Heart className="text-primary size-8" strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="text-sm text-black lg:text-2xl lg:font-bold">
            {product.price}
            {t('currency')}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xs text-[#A97C50] line-through lg:text-base lg:font-medium">
                {product.originalPrice} {t('currency')}
              </span>
            </>
          )}
        </div>
        <p className="text-xs text-[#A97C50] lg:text-lg">
          {product.description}
        </p>
      </div>

      {product.colors && product.colors.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs lg:text-base lg:font-bold">
            {t('colors')}:
            <span className="ms-2 text-[8px] lg:text-xs">
              {product.colors.length} {t('color')}
            </span>
          </p>
          {/* Thumbnail Strip */}
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem
                  key={image.id}
                  className="h-16 w-14 basis-[unset] pl-2"
                >
                  <button
                    key={image.id}
                    onClick={() => setSelectedColor(index)}
                    className={cn(
                      'relative h-full w-full overflow-hidden rounded-[8px] transition-all duration-300',
                      selectedColor === index ? 'scale-95' : ''
                    )}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                    {selectedColor === index && (
                      <div className="absolute inset-0 bg-white/20" />
                    )}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}

      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold">{t('sizes')}</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  'h-9 min-w-9 rounded-md border px-2 text-sm transition-colors',
                  selectedSize === size
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:bg-muted'
                )}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={decQty}
            aria-label={t('decrease-quantity')}
          >
            <Minus className="size-4" />
          </Button>
          <span className="w-10 text-center text-base font-semibold">
            {quantity}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={incQty}
            aria-label={t('increase-quantity')}
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <Button className="flex-1">{t('add-to-cart')}</Button>
        <Button variant="secondary" className="flex-1">
          {t('buy-now')}
        </Button>
      </div>

      {/* Meta */}
      <div className="text-muted-foreground text-xs">
        {product.tags && product.tags.length > 0 ? (
          <p>
            {t('tags') + ': '}
            {product.tags.join(', ')}
          </p>
        ) : null}
        {!product.inStock && (
          <p className="text-destructive">{t('out-of-stock')}</p>
        )}
      </div>
    </div>
  )
}
