'use client'

import { useTranslations } from 'next-intl'

import { Category } from '@/@types/categories'
import { Button } from '@/components/ui/button'
import { Link } from '@/lib/i18n/navigation'

export function TypeCard(props: Category) {
  const t = useTranslations('common')
  return (
    <Link
      href={'/search?category_id[]=' + props.id}
      className="group relative block h-50 w-full max-w-xs overflow-hidden rounded-md shadow-lg transition-all duration-300 select-none hover:shadow-xl md:h-70 lg:h-100 lg:rounded-2xl"
    >
      {/* <div className="text-primary absolute top-0 left-0 z-10 rounded-br-md bg-white px-2 py-0.5 text-[8px] font-semibold shadow-md md:hidden lg:rounded-br-2xl lg:px-4 lg:py-2 lg:text-sm">
        {t('see-more')}
      </div> */}
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={props.image}
          alt={props.category_name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
        {/* Category Name */}
        <h3 className="font-medium whitespace-normal text-white max-lg:min-h-24 md:text-3xl">
          {props.category_name}
        </h3>

        {/* View More Button */}
        {/* <Button
          variant="secondary"
          size="default"
          className="text-primary bg-white/90 font-semibold transition-all duration-200 hover:scale-105 hover:bg-white max-lg:h-10 max-md:text-sm"
        >
          {t('see-more')}
        </Button> */}
      </div>
    </Link>
  )
}
