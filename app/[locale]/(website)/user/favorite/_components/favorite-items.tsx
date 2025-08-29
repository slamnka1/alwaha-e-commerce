'use client'

import { CircleX, Heart, Plus, X } from 'lucide-react'

import React from 'react'

import { useTranslations } from 'next-intl'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@/lib/api/products'

export interface FavoriteItem {
  id: string
  name: string
  price: number
  image: string
  color: string
  size: string
  category: string
  categoryAr: string
}

interface FavoriteItemsProps {
  items: FavoriteItem[]
}

export const FavoriteItems = ({ items }: FavoriteItemsProps) => {
  const t = useTranslations('favorite.table')

  const handleAddToCart = (item: FavoriteItem) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', item)
  }

  const handleRemoveFromFavorites = (item: FavoriteItem) => {
    // TODO: Implement remove from favorites functionality
    console.log('Remove from favorites:', item)
  }

  if (items.length === 0) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-8 text-center">
          <Heart className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold">{t('noItems')}</h3>
          <p className="text-muted-foreground">{t('noItemsDescription')}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full">
      {/* Desktop Table Version */}
      <div className="hidden overflow-hidden rounded-lg border lg:block">
        {/* Table Header */}
        <div className="bg-border px-6 py-4">
          <div className="grid grid-cols-9 gap-4 text-sm font-semibold">
            <div className="col-span-4 text-center">{t('item')}</div>
            <div className="col-span-2 text-center">{t('price')}</div>
            <div className="col-span-2 text-center">{t('addToCart')}</div>
            <div className="col-span-1 text-center">{t('remove')}</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="px-6 py-4">
              <div className="grid grid-cols-9 items-center gap-4">
                {/* Item */}

                <div className="col-span-4 flex shrink-0 items-center gap-3">
                  {/* Remove Button */}
                  <div className="col-span-1 flex justify-center">
                    <Heart
                      className="text-primary fill-primary size-8"
                      strokeWidth={1}
                    />
                  </div>
                  <div className="relative aspect-square h-18 w-18 shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-xs text-[#A97C50]">
                      {t('color')}: {item.color} | {t('size')}: {item.size}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center">
                  <span className="font-semibold">
                    {item.price} {t('currency')}
                  </span>
                </div>

                {/* Add to Cart */}
                <div className="col-span-2 text-center">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    variant="link"
                    size="sm"
                    className="mx-auto flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    {t('addToCart')}
                  </Button>
                </div>

                {/* Remove */}
                <div className="col-span-1 text-center">
                  <Button
                    onClick={() => handleRemoveFromFavorites(item)}
                    variant="ghost"
                    size="sm"
                    className="size-9 cursor-pointer p-0"
                  >
                    <CircleX className="size-7" strokeWidth={1.2} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
