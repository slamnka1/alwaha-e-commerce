'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import { Product } from '@/@types/product'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface FavoriteCategoriesProps {
  items: Product[]
}

export const FavoriteCategories = ({ items }: FavoriteCategoriesProps) => {
  const t = useTranslations('favorite.categories')

  // Calculate category counts
  const categoryCounts = items.reduce(
    (acc, item) => {
      const category = item.category || 'unknown'
      acc[category] = (acc[category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const totalItems = items.length

  return (
    <div className="w-full md:max-w-80">
      <Card className={`gap-3 bg-white py-4 shadow-none`}>
        <CardHeader>
          <CardTitle className="font-semibold max-lg:text-sm lg:text-xl">
            {t('title')}
          </CardTitle>
        </CardHeader>
        <Separator />

        <CardContent className="space-y-4">
          {/* Total Items */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('totalItems')}</span>
            <span className="text-sm font-bold">{totalItems}</span>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-2">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm">{category}</span>
                <span className="text-sm font-semibold">{count}</span>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {totalItems === 0 && (
            <div className="py-4 text-center">
              <p className="text-sm">{t('noItems')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
