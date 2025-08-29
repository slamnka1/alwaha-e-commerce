'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import { useFavoriteItems } from '@/hooks/use-favorites'

import { FavoriteCategories } from './favorite-categories'
import { FavoriteItems } from './favorite-items'

type Props = {}

const Wrapper = (props: Props) => {
  const t = useTranslations('favorite')
  const { data: favoriteItems = [], isLoading, error } = useFavoriteItems()

  if (isLoading) {
    return (
      <section>
        <div className="container">
          <div className="flex gap-8 pb-20">
            <div className="flex-1">
              <div className="w-full overflow-hidden rounded-lg border p-8 text-center">
                <p className="text-muted-foreground text-lg">
                  {t('operations.loading')}
                </p>
              </div>
            </div>
            <div className="w-80">
              <div className="rounded-lg border p-6">
                <p className="text-muted-foreground text-center">
                  {t('operations.loading')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <div className="container">
          <div className="flex gap-8 pb-20">
            <div className="flex-1">
              <div className="w-full overflow-hidden rounded-lg border p-8 text-center">
                <p className="text-lg text-red-500">{t('operations.error')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="container">
        <div className="flex flex-col gap-4 pb-20 md:flex-row">
          <div className="flex-1">
            <FavoriteItems items={favoriteItems} />
          </div>
          <FavoriteCategories items={favoriteItems} />
        </div>
      </div>
    </section>
  )
}

export default Wrapper
