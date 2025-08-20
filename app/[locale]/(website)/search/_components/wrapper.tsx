'use client'

import { Filter } from 'lucide-react'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { DynamicPagination } from '@/components/ui/dynamic-pagination'

import Filters from './filters'
import Results from './results'

const ResultsWrapper = () => {
  const t = useTranslations('search')
  const [openFilters, setOpenFilters] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      console.log('resize')
      if (window.innerWidth > 1024) {
        setOpenFilters(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  if (openFilters) {
    return (
      <div className="container mb-20 space-y-8 py-6">
        <Filters />
        <Button
          onClick={() => {
            setOpenFilters(false)
          }}
          className="w-full"
        >
          {t('filters.filter-now')}
        </Button>
      </div>
    )
  }
  return (
    <div className="container py-6 lg:py-12">
      <div className="flex items-center justify-between gap-10 lg:pb-6">
        <h2 className="text-sm font-semibold lg:text-3xl lg:font-bold">
          {t('results.title')}
        </h2>
        <Button
          onClick={() => {
            setOpenFilters(true)
          }}
          variant={'ghost'}
          className="text-xs font-medium lg:hidden"
          size={'sm'}
        >
          <Filter />
          {t('filters.title')}
        </Button>
        <h3 className="hidden w-[270px] flex-nowrap items-center justify-between gap-4 font-bold lg:flex lg:text-xl 2xl:text-2xl rtl:flex-row-reverse">
          <span className="text-foreground/50 font-medium">
            {t('filters.home')}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="16"
            viewBox="0 0 64 16"
            fill="none"
          >
            <path
              d="M62.9556 8.70711C63.3462 8.31658 63.3462 7.68342 62.9556 7.29289L56.5917 0.928932C56.2012 0.538408 55.568 0.538408 55.1775 0.928932C54.7869 1.31946 54.7869 1.95262 55.1775 2.34315L60.8343 8L55.1775 13.6569C54.7869 14.0474 54.7869 14.6805 55.1775 15.0711C55.568 15.4616 56.2012 15.4616 56.5917 15.0711L62.9556 8.70711ZM0.751465 8V9H62.2485V8V7H0.751465V8Z"
              fill="black"
            />
          </svg>

          {t('filters.products')}
        </h3>
      </div>

      <div className="flex gap-8">
        <div className="w-full">
          <Results />
        </div>
        <div className="hidden lg:block">
          <Filters />
        </div>
      </div>
      <div className="flex justify-center">
        <DynamicPagination totalPageCount={10} />
      </div>
    </div>
  )
}

export default ResultsWrapper
