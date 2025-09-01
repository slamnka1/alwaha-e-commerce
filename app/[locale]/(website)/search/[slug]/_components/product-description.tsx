'use client'

import { Heart, Minus, Plus } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'

import React from 'react'

import { useTranslations } from 'next-intl'

import NumberInput from '@/app/[locale]/(website)/search/[slug]/_components/number-input'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Link } from '@/lib/i18n/navigation'
import { cn } from '@/lib/utils'
import { Product } from '@/services/products'

import UserSize from './user-size'

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
  const [selectedSize, setSelectedSize] = useQueryState('size')

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price

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
          <p className="text-xs lg:text-base lg:font-bold">{t('sizes')}:</p>
          <UserSize />
          <div className="flex flex-wrap gap-2">
            <RadioGroup
              value={selectedSize}
              onValueChange={(value) => setSelectedSize(value)}
              className="flex flex-wrap gap-2"
            >
              {product.sizes.map((size) => (
                <label
                  key={size}
                  className="has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex size-9 cursor-pointer flex-col items-center justify-center rounded-xs border border-black text-center text-xs font-bold shadow-[4px] transition-all outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-[state=checked]:border-[#00000033] has-data-[state=checked]:bg-black has-data-[state=checked]:text-white"
                >
                  <RadioGroupItem
                    id={size}
                    value={size}
                    className="sr-only after:absolute after:inset-0"
                  />
                  {size}
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          className="flex-1 bg-white font-normal max-lg:h-10 max-lg:text-xs"
        >
          {t('buy-now')}
        </Button>
        <Button className="flex-1 font-normal max-lg:h-10 max-lg:text-xs">
          {t('add-to-cart')}
        </Button>

        <NumberInput />
      </div>
      <p className="text-xs font-semibold">
        <span>{t('changing-item')}</span>
        <Link
          className="text-[#006FFF] hover:underline"
          href={`/change-policy`}
        >
          {t('change-policy')}
        </Link>
      </p>
    </div>
  )
}
