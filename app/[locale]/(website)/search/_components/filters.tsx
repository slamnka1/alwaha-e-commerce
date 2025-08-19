'use client'

import { ArrowRight, Filter } from 'lucide-react'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'

import { useTranslations } from 'next-intl'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'

type Props = {}
const categories = [
  'dresses',
  'travelWear',
  'winterWear',
  'swimwear',
  'hijabsAndPrayer',
]

const Filters = (props: Props) => {
  const t = useTranslations('search.filters')
  const [filters, setFilters] = useQueryStates({
    category: parseAsArrayOf(parseAsString).withDefault([]),
  })

  return (
    <div className="w-[270px] shrink-0">
      <div className="mb-8">
        <h3 className="flex flex-nowrap items-center justify-between gap-4 font-bold lg:text-xl 2xl:text-2xl rtl:flex-row-reverse">
          <span className="text-foreground/50 font-medium">{t('home')}</span>
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

          {t('products')}
        </h3>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-bold lg:text-xl 2xl:text-2xl">{t('title')}</h3>
        <Filter className="size-6" />
      </div>

      <Accordion type="multiple" className="space-y-2">
        <AccordionItem value="categories" className="border-[#1A1A1A]">
          <AccordionTrigger
            iconClassName="size-6 2xl:size-7 text-foreground"
            className="py-2 font-semibold hover:no-underline"
          >
            <span className="text-lg 2xl:text-xl">{t('categories')}</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {/* All Items checkbox */}
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-3">
                  <Checkbox
                    id={category}
                    checked={filters.category.includes(category)}
                    onCheckedChange={(checked) =>
                      setFilters({
                        ...filters,
                        category: filters.category.includes(category)
                          ? filters.category.filter((c) => c !== category)
                          : [...filters.category, category],
                      })
                    }
                  />
                  <label htmlFor={category} className="cursor-pointer text-xl">
                    {t(`categoryOptions.${category}`)}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size" className="border-[#1A1A1A]">
          <AccordionTrigger
            iconClassName="size-6 2xl:size-7 text-foreground"
            className="py-2 font-semibold hover:no-underline"
          >
            <span className="text-lg 2xl:text-xl">{t('size')}</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {/* Size options would go here */}
              <div className="text-lg 2xl:text-xl">
                Size options coming soon...
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="weightSizes"
          className="!border-b !border-[#1A1A1A]"
        >
          <AccordionTrigger
            iconClassName="size-6 2xl:size-7 text-foreground"
            className="py-2 font-semibold hover:no-underline"
          >
            <span className="text-lg 2xl:text-xl">{t('weightSizes')}</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {/* Weight-based size options would go here */}
              <div className="text-lg 2xl:text-xl">
                Weight-based size options coming soon...
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-3">
          <Checkbox id="plus-size" />
          <label htmlFor="plus-size" className="cursor-pointer text-xl">
            {t('plusSize')}
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox id="exclusive-offers" />
          <label htmlFor="exclusive-offers" className="cursor-pointer text-xl">
            {t('exclusiveOffers')}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Filters
