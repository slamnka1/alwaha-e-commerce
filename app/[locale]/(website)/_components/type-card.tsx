'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'

export interface TypeCardProps {
  imageUrl: string
  categoryName: string
  buttonText: string
  link: string
}

export function TypeCard({
  imageUrl,
  categoryName,
  buttonText,
  link,
}: TypeCardProps) {
  return (
    <div className="group relative h-80 w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 select-none hover:shadow-xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={categoryName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
        {/* Category Name */}
        <h3 className="mb-4 text-2xl font-medium text-white md:text-3xl">
          {categoryName}
        </h3>

        {/* View More Button */}
        <Button
          variant="secondary"
          size="default"
          className="text-primary bg-white/90 transition-all duration-200 hover:scale-105 hover:bg-white"
          asChild
        >
          <a href={link}>{buttonText}</a>
        </Button>
      </div>
    </div>
  )
}
