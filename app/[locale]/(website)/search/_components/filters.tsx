'use client'

import { ArrowRight, Filter, X } from 'lucide-react'
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type Props = {}
const categories = [
  'dresses',
  'travelWear',
  'winterWear',
  'swimwear',
  'hijabsAndPrayer',
]

const weightSizes = [
  { value: 'S', label: 'S (45→55k)' },
  { value: 'M', label: 'M (55→65k)' },
  { value: 'L', label: 'Large (65→75k)' },
  { value: '2XL', label: '2X Large (80→85k)' },
  { value: '3XL', label: '3X Large (85→90k)' },
  { value: '4XL', label: '4X Large (90→95k)' },
  { value: '5XL', label: '5X Large (95→100k)' },
  { value: '6XL', label: '6X Large (100→105k)' },
  { value: '7XL', label: '7X Large (105→110k)' },
  { value: '8XL', label: '8X Large (110→115k)' },
  { value: '9XL', label: '9X Large (115→120k)' },
  { value: '10XL', label: '10X Large (120→130k)' },
  { value: 'FREE_SIZE', label: 'FREE SIZE', isSpecial: true },
]

const Filters = (props: Props) => {
  const t = useTranslations('search.filters')
  const [filters, setFilters] = useQueryStates({
    category: parseAsArrayOf(parseAsString).withDefault([]),
    size: parseAsArrayOf(parseAsString).withDefault([]),
    chestMeasurement: parseAsInteger.withDefault(0),
    hipMeasurement: parseAsInteger.withDefault(0),
    weightSize: parseAsString.withDefault(''),
    pluseSizes: parseAsBoolean.withDefault(false),
    offers: parseAsBoolean.withDefault(false),
  })

  const [measurementValues, setMeasurementValues] = useState({
    chest: filters.chestMeasurement,
    hip: filters.hipMeasurement,
  })

  const handleMeasurementSubmit = () => {
    setFilters({
      chestMeasurement: measurementValues.chest,
      hipMeasurement: measurementValues.hip,
    })
  }
  const handleClearMeasurement = () => [
    setFilters({
      chestMeasurement: 0,
      hipMeasurement: 0,
    }),
    setMeasurementValues({
      hip: 0,
      chest: 0,
    }),
  ]
  return (
    <div className="w-[270px] shrink-0">
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
                        category: checked
                          ? filters.category.filter((c) => c !== category)
                          : [...filters.category, category],
                      })
                    }
                  />
                  <label
                    htmlFor={category}
                    className="cursor-pointer text-sm font-medium"
                  >
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
            {/* Measurement-based Filtering */}
            <div className="my-2 space-y-3">
              <h4 className="text-xs font-semibold">{t('measurementTitle')}</h4>

              {/* Measurement Input Form */}
              <div className="space-y-1 rounded-lg px-6">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-medium">
                    {t('chestMeasurement')}
                  </label>
                  <Input
                    type="number"
                    className="h-8 w-20"
                    min={0}
                    placeholder={t('measurementPlaceholder')}
                    value={measurementValues.chest}
                    onChange={(e) =>
                      setMeasurementValues({
                        ...measurementValues,
                        chest: e.target.valueAsNumber,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-medium">
                    {t('hipMeasurement')}
                  </label>
                  <Input
                    type="number"
                    min={0}
                    placeholder={t('measurementPlaceholder')}
                    value={measurementValues.hip}
                    onChange={(e) =>
                      setMeasurementValues({
                        ...measurementValues,
                        hip: e.target.valueAsNumber,
                      })
                    }
                    className="h-8 w-20"
                  />
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <Button
                  size="sm"
                  variant={'secondary'}
                  className="h-8 bg-white px-4 text-xs font-medium"
                  onClick={handleClearMeasurement}
                >
                  {t('delete')}
                </Button>

                <Button
                  size="sm"
                  variant={'secondary'}
                  className="h-8 bg-white px-4 text-xs font-medium"
                  onClick={handleMeasurementSubmit}
                >
                  {t('filterButton')}
                </Button>
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
              <RadioGroup
                value={filters.weightSize}
                onValueChange={(value) => setFilters({ weightSize: value })}
                className="space-y-2"
              >
                {weightSizes.map((size) => (
                  <div key={size.value} className="flex items-center gap-x-3">
                    <RadioGroupItem
                      value={size.value}
                      id={`size-${size.value.toLowerCase()}`}
                    />
                    <label
                      htmlFor={`size-${size.value.toLowerCase()}`}
                      className={`cursor-pointer text-sm font-semibold ${
                        size.isSpecial ? 'text-red-500' : ''
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
            checked={filters.pluseSizes}
            onCheckedChange={(checked) =>
              setFilters({
                pluseSizes: checked ? true : false,
              })
            }
            id="plus-size"
          />
          <label htmlFor="plus-size" className="cursor-pointer text-xl">
            {t('plusSize')}
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            checked={filters.offers}
            onCheckedChange={(checked) =>
              setFilters({
                offers: checked ? true : false,
              })
            }
            id="exclusive-offers"
          />
          <label htmlFor="exclusive-offers" className="cursor-pointer text-xl">
            {t('exclusiveOffers')}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Filters
