'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface ProductImage {
  id: number
  url: string
  alt: string
}

interface ProductSliderProps {
  images: ProductImage[]
  className?: string
  showZoom?: boolean
  showCounter?: boolean
}

export function ProductSlider({
  images,
  className,
  showCounter = true,
}: ProductSliderProps) {
  const [selectedColor, setSelectedColor] = useQueryState(
    'color',
    parseAsInteger.withDefault(1)
  )
  const [api, setApi] = React.useState<any>(null)

  React.useEffect(() => {
    if (!api) return

    api.on('select', () => {
      setSelectedColor(api.selectedScrollSnap())
    })
  }, [api])

  const scrollTo = (index: number) => {
    api?.scrollTo(index)
  }

  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          'flex h-96 items-center justify-center rounded-lg bg-gray-100',
          className
        )}
      >
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  return (
    <div className={cn('flex gap-2', className)}>
      {/* Main Carousel */}
      <div className="group relative flex-1">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="h-screen max-h-[350px] lg:h-[95vh] lg:max-h-[700px]">
            {images.map((image) => (
              <CarouselItem key={image.id} className="basis-full">
                <div
                  className={cn(
                    'relative h-full w-full overflow-hidden rounded-lg transition-transform duration-300'
                  )}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className={cn(
                      'h-full w-full object-cover transition-transform duration-300'
                    )}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation Buttons */}
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-between p-4 lg:flex">
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
          </div>

          {/* Image Counter */}
          {showCounter && (
            <div className="absolute right-4 bottom-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm lg:text-sm">
              {selectedColor + 1} / {images.length}
            </div>
          )}
        </Carousel>
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
          {images.map((image, index) => (
            <CarouselItem
              key={image.id}
              className="max-h-[90px] px-1 pt-1 lg:max-h-[160px]"
            >
              <button
                key={image.id}
                onClick={() => scrollTo(index)}
                className={cn(
                  'relative h-full w-full overflow-hidden rounded-[12px] border-2 transition-all duration-300',
                  selectedColor === index
                    ? 'border-primary'
                    : 'border-transparent'
                )}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
                {selectedColor === index && (
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
