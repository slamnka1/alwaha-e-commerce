'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'

import React, { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { DynamicPagination } from '@/components/ui/dynamic-pagination'
import { useFavoriteItems } from '@/hooks/use-favorites'

import { FavoriteCategories } from './favorite-categories'
import { FavoriteItems } from './favorite-items'

type Props = {}

const Wrapper = (props: Props) => {
  const t = useTranslations('favorite')
  const [page] = useQueryState('page', parseAsInteger.withDefault(1))

  const { data: favoriteData, isLoading, error } = useFavoriteItems(page)

  // Extract items and pagination info from the response
  const favoriteItems = favoriteData?.data || []
  const paginationInfo = favoriteData
    ? {
        currentPage: favoriteData.current_page,
        lastPage: favoriteData.last_page,
        total: favoriteData.total,
        perPage: favoriteData.per_page,
        from: favoriteData.from,
        to: favoriteData.to,
      }
    : null

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

            {/* Pagination */}
            {paginationInfo && paginationInfo.lastPage > 1 && (
              <div className="mt-6 flex flex-col items-center gap-4">
                <div className="text-muted-foreground text-sm">
                  {t('pagination.showing', {
                    from: paginationInfo.from,
                    to: paginationInfo.to,
                    total: paginationInfo.total,
                  })}
                </div>

                <DynamicPagination totalPageCount={paginationInfo.lastPage} />
              </div>
            )}
          </div>
          <FavoriteCategories items={favoriteItems} />
        </div>
      </div>
    </section>
  )
}

export default Wrapper
