'use client'

import { Heart } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { Product } from '@/@types/product'
import { Card, CardContent } from '@/components/ui/card'

import FavoriteRow from './favorite-row'
import MobileFavoriteRow from './mobile-favorite-row'

interface FavoriteItemsProps {
  items: Product[]
}

export const FavoriteItems = ({ items }: FavoriteItemsProps) => {
  const t = useTranslations('favorite.table')

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
            <FavoriteRow key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Mobile Compact Version */}
      <div className="overflow-hidden rounded-lg border lg:hidden">
        {/* Table Header */}
        <div className="bg-border p-3">
          <div className="font-semibold">{t('favoriteItem')}</div>
        </div>

        <div className="">
          {items.map((item) => (
            <MobileFavoriteRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
