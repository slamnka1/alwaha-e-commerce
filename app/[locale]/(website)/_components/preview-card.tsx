'use client'

import Image from 'next/image'

import { discountIcon } from '@/assets'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface ProductCardType {
  id: string
  image: string
  title: string
  isPlusSize: boolean
  discount?: number
  price: number
}

interface PreviewCardProps extends ProductCardType {
  onClick?: () => void
  active?: boolean
}

export function PreviewCard({
  image,
  title,
  isPlusSize,
  discount,
  price,
  onClick,
  active,
}: PreviewCardProps) {
  return (
    <Card
      className={cn(
        'group relative my-4 cursor-pointer overflow-hidden rounded-[8px] border-2 border-white p-0 shadow-md transition-transform select-none md:rounded-md lg:rounded-xl lg:border-[3px] lg:shadow-lg'
      )}
      onClick={onClick}
    >
      <AspectRatio ratio={9 / 16} className={cn('overflow-hidden')}>
        <img src={image} className="h-full w-full object-cover" />

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-0.5 right-2.5 z-10 md:right-3.5 lg:right-4.5">
            <Image
              src={discountIcon}
              alt="discount"
              className="size-4 lg:size-8"
            />
          </div>
        )}

        {/* Plus Size Badge */}
        {isPlusSize && (
          <div className="absolute top-0 right-0 z-10">
            <div
              style={{
                writingMode: 'vertical-lr',
              }}
              className="bg-primary rounded-bl-[8px] border-[0.5px] border-white px-1 py-0.5 text-[4px] font-medium text-white md:text-[6px] lg:rounded-tr-lg lg:rounded-bl-md lg:px-2 lg:py-1 lg:!text-[8px]"
            >
              FREE SIZE
            </div>
          </div>
        )}
      </AspectRatio>
    </Card>
  )
}
