'use client'

import { Play } from 'lucide-react'
import { parseAsBoolean, useQueryState } from 'nuqs'

import { useParams } from 'next/navigation'

import { ProductFullData } from '@/@types/product'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { useRouter } from '@/lib/i18n/navigation'
import { cn } from '@/lib/utils'

interface ProductSliderProps {
  product: ProductFullData
  className?: string
  showZoom?: boolean
  showCounter?: boolean
}

export function ProductSlider({
  product,
  className,
  showCounter = true,
}: ProductSliderProps) {
  const [opened, setOpened] = useQueryState(
    'video',
    parseAsBoolean.withDefault(false)
  )
  const router = useRouter()
  const { slug } = useParams()

  return (
    <div className={cn('flex gap-2', className)}>
      {/* Main Carousel */}
      <div className="group relative flex-1">
        <div
          className={cn(
            'relative h-full w-full overflow-hidden rounded-lg transition-transform duration-300'
          )}
        >
          <img
            src={product.main_image_url}
            alt={product.color_name}
            className={cn(
              'h-full w-full object-cover transition-transform duration-300'
            )}
          />
        </div>
      </div>
      {/* Thumbnail Strip */}
      <Carousel
        orientation="vertical"
        className="w-20 flex-shrink-0 lg:w-26 xl:w-30"
        opts={{
          align: 'start',
          dragFree: true,
        }}
      >
        <CarouselContent className="mt-0 h-screen max-h-[350px] lg:h-[95vh] lg:max-h-[700px]">
          {product.video_url ? (
            <CarouselItem
              key="video"
              className="max-h-[90px] px-1 pt-1 lg:max-h-[160px]"
            >
              <button
                onClick={() => setOpened(true)}
                className={cn(
                  'relative flex h-full w-full items-center justify-center overflow-hidden rounded-[12px] border-2 border-transparent bg-black/5 transition-all duration-300 hover:bg-black/10'
                )}
                aria-label="Open product video"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-full items-center justify-center bg-gradient-to-tr from-black/40 to-black/10 text-white">
                    <Play className="size-6 lg:size-8" />
                  </div>
                </div>
                {/* Fallback preview using main image with overlay */}
                <img
                  src={product.main_image_url}
                  alt="video thumbnail"
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-1 bottom-1 left-1 rounded-md bg-black/60 px-1 py-0.5 text-center text-[10px] font-medium text-white lg:text-xs">
                  Video
                </div>
              </button>
            </CarouselItem>
          ) : null}
          {product.other_colors.map((item, index) => (
            <CarouselItem
              key={item.id}
              className="max-h-[90px] px-1 pt-1 lg:max-h-[160px]"
            >
              <button
                key={item.id}
                onClick={() => router.push(`/search/${item.id}`)}
                className={cn(
                  'relative h-full w-full overflow-hidden rounded-[12px] border-2 transition-all duration-300',
                  slug == item.id + '' ? 'border-primary' : 'border-transparent'
                )}
              >
                <img
                  src={item.main_image_url}
                  alt={item.color_name}
                  className="h-full w-full object-cover"
                />
                {slug == item.id + '' && (
                  <div className="bg-primary/10 absolute inset-0" />
                )}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
