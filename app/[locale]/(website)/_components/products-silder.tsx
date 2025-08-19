'use client'

import Autoplay from 'embla-carousel-autoplay'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Product } from '@/lib/api/products'

import { ProductCard } from './product-card'

// Main Type Slider Component
export default function ProductsSlider({
  products,
  title,
}: {
  products: Product[]
  title: string
}) {
  const t = useTranslations('common')
  return (
    <section className="relative py-8 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="my-4 flex items-center justify-between gap-8">
          <p className="md:text-3xl md:font-bold lg:text-3xl 2xl:text-4xl">
            {title}
          </p>
          <Button variant={'link'}>{t('see-more')}</Button>
        </div>
        <div className="relative">
          <Carousel
            opts={{
              loop: true,
              slidesToScroll: 1,
              dragFree: true,
            }}
            plugins={[
              Autoplay({
                delay: Math.floor(Math.random() * 3000) + 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {products.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="mx-1 basis-[38%] pl-2 md:pl-4 lg:basis-1/4"
                >
                  <ProductCard {...item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
