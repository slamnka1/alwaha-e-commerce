'use client'

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
  const router = useRouter()
  const { slug } = useParams()

  return (
    <div className={cn('flex gap-2', className)}>
      {/* Main Carousel */}
      <div className="group relative flex-1">
        {/* <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        > */}
        {/* <CarouselContent className="h-screen max-h-[350px] lg:h-[95vh] lg:max-h-[700px]"> */}
        {/* {images.map((image) => (
              <CarouselItem key={image.id} className="basis-full"> */}
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
        {/* </CarouselItem>
            ))}
          </CarouselContent> */}

        {/* Custom Navigation Buttons */}
        {/* <div className="pointer-events-none absolute inset-0 hidden items-center justify-between p-4 lg:flex">
            <Button
              variant="secondary"
              size="icon"
              className="pointer-events-auto size-12 rounded-full border border-[#F3E0C8] bg-white/90 shadow-lg transition-opacity duration-300 group-hover:opacity-100 hover:bg-white"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronRight className="size-7 text-black" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="pointer-events-auto size-12 rounded-full border border-[#F3E0C8] bg-white/90 shadow-lg transition-opacity duration-300 group-hover:opacity-100 hover:bg-white"
              onClick={() => api?.scrollNext()}
            >
              <ChevronLeft className="size-7 text-black" />
            </Button>
          </div> */}

        {/* Image Counter */}
        {/* {showCounter && (
          <div className="absolute right-4 bottom-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm lg:text-sm">
            {selectedColor + 1} / {images.length}
          </div>
        )} */}
        {/* </Carousel> */}
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
