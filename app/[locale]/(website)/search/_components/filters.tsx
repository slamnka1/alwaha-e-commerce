import { Filter } from 'lucide-react'

import React from 'react'

import { useTranslations } from 'next-intl'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'

type Props = {}

const Filters = (props: Props) => {
  const t = useTranslations('search.filters')

  return (
    <div className="w-[270px] shrink-0">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold">{t('title')}</h3>
        <Filter className="size-6" />
      </div>

      <Accordion type="multiple" className="space-y-2">
        <AccordionItem value="categories" className="border-[#1A1A1A]">
          <AccordionTrigger
            iconClassName="size-7 text-foreground"
            className="py-2 font-semibold hover:no-underline"
          >
            <span className="text-xl">{t('categories')}</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {/* Category options would go here */}
              <div className="text-xl">Category options coming soon...</div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size" className="border-[#1A1A1A]">
          <AccordionTrigger
            iconClassName="size-7 text-foreground"
            className="py-2 font-semibold hover:no-underline"
          >
            <span className="text-xl">{t('size')}</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {/* Size options would go here */}
              <div className="text-xl">Size options coming soon...</div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="weightSizes"
          className="!border-b !border-[#1A1A1A]"
        >
          <AccordionTrigger
            iconClassName="size-7 text-foreground"
            className="py-2 font-semibold hover:no-underline"
          >
            <span className="text-xl">{t('weightSizes')}</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {/* Weight-based size options would go here */}
              <div className="text-xl">
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
