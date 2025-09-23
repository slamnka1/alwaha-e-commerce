'use client'

import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SizeModal from '@/components/ui/size-modal'
import { useSession } from '@/store/session-store'

type Props = {}

const SizeFilter = (props: Props) => {
  const t = useTranslations('search.filters')
  const [filters, setFilters] = useQueryStates({
    chestMeasurement: parseAsInteger.withDefault(0),
    hipMeasurement: parseAsInteger.withDefault(0),
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

  const { isAuthenticated } = useSession()
  if (!isAuthenticated)
    return (
      <div className="my-2 space-y-3">
        <h4 className="text-sm font-semibold">{t('measurementTitle')}</h4>

        {/* Measurement Input Form */}
        <div className="mx-auto max-w-52 space-y-1 rounded-lg">
          <div className="mx-auto flex items-center justify-between gap-2">
            <label className="text-sm font-medium">
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
            <label className="text-sm font-medium">{t('hipMeasurement')}</label>
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
            className="h-8 bg-white px-4 text-sm font-medium"
            onClick={handleClearMeasurement}
          >
            {t('delete')}
          </Button>

          <Button
            size="sm"
            variant={'secondary'}
            className="h-8 bg-white px-4 text-sm font-medium"
            onClick={handleMeasurementSubmit}
          >
            {t('filterButton')}
          </Button>
        </div>
      </div>
    )

  return <SizeModal />
}

export default SizeFilter
