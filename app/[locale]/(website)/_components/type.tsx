'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { type TypeCategory } from '@/lib/api/types'

import { TypeCard } from './type-card'

// Main Type Slider Component
export default function TypeSlider({ typeData }: { typeData: TypeCategory[] }) {
  return (
    <section className="relative bg-gray-50 py-8 lg:py-10">
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
            <CarouselContent className="-ml-3 md:-ml-4">
              {typeData.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="mx-1 basis-[38%] pl-2 md:pl-4 lg:basis-1/4"
                >
                  <TypeCard
                    imageUrl={item.imageUrl}
                    categoryName={item.categoryName}
                    buttonText={item.buttonText}
                    link={item.link}
                  />
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
