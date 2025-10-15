'use client'

import { Heart, Loader2, Minus, Plus } from 'lucide-react'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

import React from 'react'

import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { ProductFullData } from '@/@types/product'
import NumberInput from '@/app/[locale]/(website)/search/[slug]/_components/number-input'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAddToCart } from '@/hooks/use-cart'
import useFavorite from '@/hooks/use-favorites'
import { Link, useRouter } from '@/lib/i18n/navigation'
import { cn } from '@/lib/utils'
import { getSizeMessage } from '@/utils/get-size-message'

import UserSize from './user-size'

type ProductDescriptionProps = {
  product: ProductFullData
  className?: string
}

export default function ProductDescription({
  product,
  className,
}: ProductDescriptionProps) {
  const t = useTranslations('product-description')
  const locale = useLocale()
  const { slug } = useParams<{ slug: string }>()
  const [selectedSize, setSelectedSize] = useQueryState('size')
  const [quantity = 1] = useQueryState(
    'quantity',
    parseAsInteger.withDefault(1)
  )
  const [selectedUserSize] = useQueryState(
    'user_size',
    parseAsString.withDefault('')
  )

  const router = useRouter()
  const hasDiscount = !!Number(product.discount_amount)
  const {
    isFavorite,
    mutate: toggleFavorite,
    isPending,
  } = useFavorite({
    // Product color-level id appears as `id` on ProductFullData
    // This minimal shape satisfies what the hook needs
    product_id: product.product_id,

    id: product.id as unknown as number,
    is_favourite: product.is_favorited,
  } as unknown as any)

  const addToCart = useAddToCart()
  const isAddDisabled = !selectedSize || addToCart.isPending

  const [isExpanded, setIsExpanded] = React.useState(false)
  const [showToggle, setShowToggle] = React.useState(false)
  const descriptionRef = React.useRef<HTMLParagraphElement | null>(null)

  React.useEffect(() => {
    const element = descriptionRef.current
    if (!element) return
    // Ensure we measure in the clamped state
    const wasExpanded = isExpanded
    if (wasExpanded) {
      setIsExpanded(false)
      requestAnimationFrame(() => {
        const hasOverflow = element.scrollHeight > element.clientHeight
        setShowToggle(hasOverflow)
        setIsExpanded(wasExpanded)
      })
    } else {
      const hasOverflow = element.scrollHeight > element.clientHeight
      setShowToggle(hasOverflow)
    }
    // Re-run when description changes
  }, [product.description])

  return (
    <div className={cn('flex w-full max-w-xl flex-col gap-6', className)}>
      <div>
        <p className="text-sm font-semibold text-[#A97C50]">
          {product.product_code}
        </p>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-sm lg:text-4xl lg:font-bold">
            {product.product_name}
          </h1>
          <Button
            variant={'ghost'}
            className="size-11 rounded-full"
            size={'icon'}
            onClick={() => toggleFavorite()}
            disabled={isPending}
          >
            <Heart
              className={cn(
                isFavorite ? 'fill-red-500 text-red-500' : 'text-orange-500',
                'size-8'
              )}
              strokeWidth={1.5}
            />
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
                {product.price_before_discount} {t('currency')}
              </span>
            </>
          )}
        </div>
        <p
          ref={descriptionRef}
          className={cn(
            'text-xs text-[#A97C50] lg:text-lg',
            !isExpanded && 'line-clamp-2'
          )}
        >
          {product.description}
        </p>
        {showToggle && (
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            className="w-fit text-xs text-[#006FFF] hover:underline"
          >
            {isExpanded ? t('see-less') : t('see-more')}
          </button>
        )}
      </div>

      {product.other_colors && product.other_colors.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs lg:text-base lg:font-bold">
            {t('colors')}:
            <span className="ms-2 text-[8px] lg:text-xs">
              {product.other_colors.length} {t('color')}
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
            <CarouselContent className="ml-0">
              {product.other_colors
                .sort((e) => e.id)
                .map((item, index) => (
                  <CarouselItem
                    key={item.id}
                    className="h-16 w-14 basis-[unset] pl-2"
                  >
                    <button
                      key={item.id}
                      onClick={() => router.push(`/search/${item.id}`)}
                      className={cn(
                        'relative h-full w-full overflow-hidden rounded-[8px] transition-all duration-300',
                        slug === item.id + '' ? 'scale-95' : ''
                      )}
                    >
                      <img
                        src={item.main_image_url}
                        alt={item.color_name}
                        className="h-full w-full object-cover"
                      />
                      {slug === item.id + '' && (
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
        <div className="space-y-4">
          <p className="text-xs lg:text-base lg:font-bold">{t('sizes')}:</p>
          <UserSize />
          <p className="text-xs text-red-600 lg:text-sm">
            {getSizeMessage(
              product.sizes,
              selectedUserSize,
              locale as 'ar' | 'en'
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            <RadioGroup
              value={selectedSize}
              onValueChange={(value) => setSelectedSize(value)}
              className="flex flex-wrap gap-2"
            >
              {product.sizes.map((size) => (
                <label
                  style={{
                    border:
                      size.user_size?.id == Number(selectedUserSize)
                        ? `2px solid ${size.user_size?.color}`
                        : '',
                  }}
                  data-disabled={size.quantity === 0}
                  key={size.size_code}
                  className={cn(
                    'has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex size-9 cursor-pointer flex-col items-center justify-center rounded-xs border border-black text-center text-xs font-bold shadow-[4px] transition-all outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-[state=checked]:border-[#00000033] has-data-[state=checked]:bg-black has-data-[state=checked]:text-white',
                    size.quantity === 0 &&
                      'cursor-not-allowed bg-gray-400 opacity-50'
                  )}
                >
                  <RadioGroupItem
                    disabled={size.quantity === 0}
                    id={size.size_code}
                    value={size.id.toString()}
                    className="sr-only after:absolute after:inset-0"
                  />
                  {size.size_code}
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* <Button
          variant="secondary"
          className="flex-1 bg-white font-normal max-lg:h-10 max-lg:text-xs"
        >
          {t('buy-now')}
        </Button> */}
        <Button
          className="flex-1 font-normal max-lg:h-10 max-lg:text-xs"
          disabled={isAddDisabled}
          onClick={() =>
            addToCart.mutate({
              product_id: Number(product.product_id),
              product_color_id: Number(product.id),
              product_size_id: Number(selectedSize),
              quantity: Number(quantity) || 1,
            })
          }
        >
          {addToCart.isPending && <Loader2 className="size-4 animate-spin" />}
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
