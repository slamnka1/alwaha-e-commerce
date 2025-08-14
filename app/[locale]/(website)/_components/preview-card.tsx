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
}

export function PreviewCard({
  image,
  title,
  isPlusSize,
  discount,
  price,
  onClick,
}: PreviewCardProps) {
  return (
    <Card
      className={cn(
        'group relative my-4 cursor-pointer overflow-hidden border-4 border-white p-0 shadow-[0px_4px_4px_0px_#00000040] transition-transform max-md:rounded-md lg:border-8'
      )}
      onClick={onClick}
    >
      <AspectRatio ratio={9 / 16} className={cn('overflow-hidden')}>
        <img src={image} className="h-full w-full object-cover" />

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-0.5 right-4.5 z-10">
            <Image src={discountIcon} alt="discount" width={30} height={30} />
          </div>
        )}

        {/* Plus Size Badge */}
        {isPlusSize && (
          <div className="absolute top-0 right-0 z-10">
            <div
              style={{
                writingMode: 'vertical-lr',
              }}
              className="bg-primary rounded-bl-md border-[0.5px] border-white px-2 py-1 !text-[8px] text-white"
            >
              FREE SIZE
            </div>
          </div>
        )}
      </AspectRatio>
    </Card>
  )
}
