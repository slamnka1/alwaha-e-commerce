'use client'

import { Category } from '@/@types/categories'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { TypeCard } from './type-card'

// Main Type Slider Component
export default function TypeSlider({ typeData }: { typeData: Category[] }) {
  return (
    <section className="relative py-8 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="relative">
          <Carousel
            opts={{
              loop: true,
              slidesToScroll: 1,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {typeData.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="mx-1 w-full max-w-[120px] basis-auto pl-0 md:max-w-48 md:pl-4 lg:max-w-xs"
                >
                  <TypeCard {...item} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className="left-4 border-orange-400 bg-orange-400 text-white hover:border-orange-500 hover:bg-orange-500 max-md:hidden" />
            <CarouselNext className="right-4 border-orange-400 bg-orange-400 text-white hover:border-orange-500 hover:bg-orange-500 max-md:hidden" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
