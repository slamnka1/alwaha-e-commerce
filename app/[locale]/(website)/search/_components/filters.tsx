'use client'

import { Filter } from 'lucide-react'
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  useQueryStates,
} from 'nuqs'

import { useTranslations } from 'next-intl'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCategories, useSizes } from '@/hooks'

import SearchInput from '../../_components/search-input'
import SizeFilter from './size-filter'

type Props = {}

const sizesNumber = {
  m: '(38, 1)',
  l: '(40, 1)',
  xl: '(42, 2)',
  '2xl': '(44, 3)',
  '3xl': '(46, 4)',
  '4xl': '(48, 4)',
  '5xl': '(50, 4)',
  '6xl': '(52, 4)',
  '7xl': '(54)',
  '8xl': '(56)',
  '9xl': '(58)',
  '10xl': '(58)',
}
const Filters = (props: Props) => {
  const t = useTranslations('search.filters')
  const [filters, setFilters] = useQueryStates({
    categories: parseAsArrayOf(parseAsString).withDefault([]),
    size_id: parseAsString.withDefault(''),
    has_plus_size: parseAsBoolean.withDefault(false),
    has_offer: parseAsBoolean.withDefault(false),
  })

  const categories = useCategories()
  const sizes = useSizes()
  return (
    <div className="w-full shrink-0 lg:w-[270px]">
      <div className="mb-6 flex items-center justify-between">
        <div className="lg:hidden">
          <SearchInput
            classNames={{
              input: 'h-8 shadow-none border rounded-sm border-foreground',
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-2 lg:w-full">
          <h3 className="text-xs font-medium lg:text-xl lg:font-bold 2xl:text-2xl">
            {t('title')}
          </h3>
          <Filter className="size-4.5 lg:size-6" strokeWidth={1.5} />
        </div>
      </div>

      <Accordion type="multiple" className="space-y-2">
        <AccordionItem value="categories" className="border-[#1A1A1A]">
          <AccordionTrigger
            iconClassName="size-6 2xl:size-7 text-foreground"
            className="py-2 font-semibold hover:no-underline"
          >
            <span className="text-sm lg:text-lg 2xl:text-xl">
              {t('categories')}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {/* All Items checkbox */}
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={category.id}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      setFilters({
                        categories: !checked
                          ? filters.categories.filter((c) => c !== category.id)
                          : [...filters.categories, category.id],
                      })
                    }
                  />
                  <label
                    htmlFor={category.id}
                    className="cursor-pointer text-xs font-medium lg:text-sm"
                  >
                    {category.category_name}
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
            <span className="text-sm lg:text-lg 2xl:text-xl">{t('size')}</span>
          </AccordionTrigger>
          <AccordionContent>
            {/* Measurement-based Filtering */}
            <SizeFilter />
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
            <span className="text-sm lg:text-lg 2xl:text-xl">
              {t('weightSizes')}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <RadioGroup
                value={filters.size_id}
                onValueChange={(value) => setFilters({ size_id: value })}
                className="space-y-1"
              >
                {sizes.map((size) => (
                  <div key={size.id} className="flex items-center gap-x-3">
                    <RadioGroupItem
                      value={size.id + ''}
                      id={`size-${size.id}`}
                    />
                    <label
                      htmlFor={`size-${size.id}`}
                      className={`cursor-pointer text-sm font-semibold ${
                        size.name === 'FREE_SIZE' ? 'text-red-500' : ''
                      }`}
                    >
                      {size.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={filters.has_plus_size}
            onCheckedChange={(checked) =>
              setFilters({
                has_plus_size: checked ? true : false,
              })
            }
            id="plus-size"
          />
          <label
            htmlFor="plus-size"
            className="cursor-pointer text-sm lg:text-xl"
          >
            {t('plusSize')}
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            checked={filters.has_offer}
            onCheckedChange={(checked) =>
              setFilters({
                has_offer: checked ? true : false,
              })
            }
            id="exclusive-has_offer"
          />
          <label
            htmlFor="exclusive-has_offer"
            className="cursor-pointer text-sm lg:text-xl"
          >
            {t('exclusiveOffers')}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Filters
