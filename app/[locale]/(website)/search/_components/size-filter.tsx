'use client'

import { Pencil, PlusIcon, Trash2 } from 'lucide-react'
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import SizeModal from '@/components/size/size-modal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'
import { useDeleteUserSize, useUserSizes } from '@/hooks/use-user-sizes'
import { useSession } from '@/store/session-store'

type Props = {}

const SizeFilter = (props: Props) => {
  const t = useTranslations('search.filters')
  const [filters, setFilters] = useQueryStates({
    chestMeasurement: parseAsInteger.withDefault(0),
    hipMeasurement: parseAsInteger.withDefault(0),
    'user_sizes[]': parseAsArrayOf(parseAsString).withDefault([]),
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

  const sizes = useUserSizes()
  const deleteSize = useDeleteUserSize()
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

  return (
    <div className="space-y-3 pt-4">
      <p className="text-sm font-medium">{t('size')}</p>
      {sizes?.data && sizes.data.length > 0 && (
        <div className="flex flex-col gap-3">
          {sizes.data.map((size) => (
            <div className="flex justify-between" key={size.id}>
              <div
                className="flex items-center gap-4"
                style={{
                  color: size.color,
                }}
              >
                <Checkbox
                  id={String(size.id)}
                  checked={filters['user_sizes[]'].includes(String(size.id))}
                  onCheckedChange={(checked) =>
                    setFilters({
                      'user_sizes[]': checked
                        ? [...filters['user_sizes[]'], String(size.id)]
                        : filters['user_sizes[]'].filter(
                            (id) => String(id) !== String(size.id)
                          ),
                    })
                  }
                />
                <Label htmlFor={String(size.id)}>{size.name}</Label>
              </div>
              <div className="flex items-center gap-1">
                <SizeModal
                  mode="edit"
                  size={size}
                  trigger={
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-5"
                      aria-label={t('edit')}
                    >
                      <Pencil className="size-4 text-gray-400" />
                    </Button>
                  }
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-5"
                  aria-label={t('delete')}
                  onClick={() => deleteSize.mutate(size.id)}
                  disabled={deleteSize.isPending}
                >
                  <Trash2 className="size-4 text-gray-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(!sizes?.data || sizes.data?.length < 3) && (
        <SizeModal
          trigger={
            sizes?.data && sizes.data.length > 0 ? (
              <Button size="sm" variant="link" className="gap-4 px-0">
                <span className="bg-primary flex size-5 items-center justify-center !rounded-[4px] text-white">
                  <PlusIcon className="size-4" />
                </span>
                {t('addSize')}
              </Button>
            ) : (
              <Button size="sm" variant="secondary" className="gap-2">
                <PlusIcon className="size-4" />
                {t('addSize')}
              </Button>
            )
          }
        />
      )}
    </div>
  )
}

export default SizeFilter
