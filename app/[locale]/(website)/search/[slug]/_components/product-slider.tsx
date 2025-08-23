'use client'

import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'

import * as React from 'react'
import { useState } from 'react'

import { useLocale } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Product } from '@/lib/api/products'
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
          <CarouselContent className="h-[93vh] max-h-[680px]">
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
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-4">
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
            <div className="absolute right-4 bottom-4 rounded-full bg-black/60 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              {selectedColor + 1} / {images.length}
            </div>
          )}
        </Carousel>
      </div>
      {/* Thumbnail Strip */}
      <Carousel
        orientation="vertical"
        className="w-30 flex-shrink-0"
        opts={{
          align: 'start',
          loop: true,
          dragFree: true,
        }}
      >
        <CarouselContent className="h-[95vh] max-h-[700px]">
          {images.map((image, index) => (
            <CarouselItem key={image.id} className="max-h-[160px] px-1 py-1">
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

// Compact version for smaller screens
export function ProductSliderCompact({
  images,
  className,
}: ProductSliderProps) {
  const [selectedColor, setselectedColor] = useState(0)
  const [api, setApi] = React.useState<any>(null)

  React.useEffect(() => {
    if (!api) return

    api.on('select', () => {
      setselectedColor(api.selectedScrollSnap())
    })
  }, [api])

  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          'flex h-64 items-center justify-center rounded-lg bg-gray-100',
          className
        )}
      >
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-200',
                selectedColor === index
                  ? 'bg-white shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              )}
            />
          ))}
        </div>
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-white/80 shadow-lg hover:bg-white"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-white/80 shadow-lg hover:bg-white"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Carousel>
    </div>
  )
}
