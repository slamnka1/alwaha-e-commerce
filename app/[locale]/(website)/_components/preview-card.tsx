'use client'

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

export function PreviewCard({ image, onClick }: PreviewCardProps) {
  return (
    <Card
      className={cn(
        'group my-4 cursor-pointer overflow-hidden border-4 border-white p-0 shadow-[0px_4px_4px_0px_#00000040] transition-transform max-md:rounded-md lg:border-8'
      )}
      onClick={onClick}
    >
      <AspectRatio ratio={9 / 16} className={cn('overflow-hidden')}>
        <img src={image} className="h-full w-full object-cover" />
      </AspectRatio>
    </Card>
  )
}
