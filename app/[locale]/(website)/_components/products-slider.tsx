'use client'

import Autoplay from 'embla-carousel-autoplay'

import { useTranslations } from 'next-intl'

import { Product } from '@/@types/product'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Link } from '@/lib/i18n/navigation'
import { cn } from '@/lib/utils'

import { ProductCard } from './product-card'

// Main Type Slider Component
export default function ProductsSlider({
  products,
  title,
  imageOnly,
  more,
  classNames = {},
}: {
  products: Product[]
  title: string
  imageOnly?: boolean
  more?: string
  classNames?: {
    container?: string
    title?: string
    header?: string
    more?: string
  }
}) {
  const t = useTranslations('common')
  return (
    <section className={cn('relative py-8 lg:py-10', classNames.container)}>
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'my-1 flex items-center justify-between gap-8 lg:my-4',
            classNames.header
          )}
        >
          <p
            className={cn(
              'md:text-3xl md:font-bold lg:text-3xl 2xl:text-4xl',
              classNames.title
            )}
          >
            {title}
          </p>
          {more ? (
            <Button
              asChild
              variant={'link'}
              className={cn('text-xs lg:text-xl', classNames.more)}
            >
              <Link href={more}>{t('see-more')}</Link>
            </Button>
          ) : null}
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
                  className="mx-1 basis-[38%] pl-2 md:pl-3 lg:basis-1/4"
                >
                  <ProductCard {...item} imageOnly={imageOnly} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
