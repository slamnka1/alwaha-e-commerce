'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { NoteIcon } from '@/assets'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type MeasurementData = {
  chest: number
  hip: number
}

type UserSizeProps = {
  className?: string
}

const UserSize = ({ className }: UserSizeProps) => {
  const t = useTranslations('search.filters.userSize')
  const [measurements, setMeasurements] = useState<MeasurementData>({
    chest: 0,
    hip: 0,
  })
  const [state, setState] = useState<'editing' | 'adding' | 'viewing'>(
    'viewing'
  )
  const [editValues, setEditValues] = useState<MeasurementData>(measurements)

  const handleEdit = () => {
    setEditValues(measurements)
    setState('editing')
  }

  const handleSave = () => {
    setMeasurements(editValues)
    setState('viewing')
  }

  const handleDelete = () => {
    setState('viewing')
    setMeasurements({ chest: 0, hip: 0 })
  }

  const handleAddNew = () => {
    setState('adding')
    setMeasurements({ chest: 80, hip: 80 })
  }
  const handleAdd = () => {
    setMeasurements({ chest: editValues.chest, hip: editValues.hip })
    setState('viewing')
  }

  if (
    state === 'viewing' &&
    measurements.chest === 0 &&
    measurements.hip === 0
  ) {
    return (
      <div>
        <div className={cn('mt-4 mb-6', className)}>
          <p className="mb-4 text-xs font-bold">
            {t('addMeasurementsDescription')}
          </p>
          <Button
            onClick={handleAddNew}
            size={'sm'}
            className="h-8 rounded-xl px-4 py-1 text-xs font-normal"
          >
            {t('addMeasurements')}
          </Button>
        </div>
        <p className="mb-3 flex w-fit items-center gap-2 border-b border-b-[#FF0000] px-2 pb-1 text-xs font-bold">
          <img src={NoteIcon.src} alt="note" className="size-4" />
          {t('importantNote')}
        </p>
      </div>
    )
  }

  if (state === 'editing') {
    return (
      <div>
        <div className={cn('mt-4 mb-6', className)}>
          <p className="mb-4 text-xs font-bold">{t('editMeasurements')}</p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="block text-xs font-medium">
                {t('enterChestMeasurement')}
              </label>
              <Input
                type="number"
                value={editValues.chest}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    chest: Number(e.target.value),
                  })
                }
                min={0}
                className="h-8 w-20 rounded-lg border border-[#F3E0C8] bg-white px-5 py-1 text-center text-xs text-[#00000080] shadow-md"
                placeholder="80cm"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="block text-xs font-medium">
                {t('enterHipMeasurement')}
              </label>
              <Input
                type="number"
                value={editValues.hip}
                onChange={(e) =>
                  setEditValues({ ...editValues, hip: Number(e.target.value) })
                }
                min={0}
                className="h-8 w-20 rounded-lg border border-[#F3E0C8] bg-white px-5 py-1 text-center text-xs text-[#00000080] shadow-md"
                placeholder="80cm"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <Button
              onClick={handleSave}
              size={'sm'}
              className="px-10 font-normal"
            >
              {t('edit')}
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium">{t('deleteQuestion')}</span>
              <Button
                onClick={handleDelete}
                variant="outline"
                size="sm"
                className="h-8 px-6 text-xs font-normal"
              >
                {t('yes')}
              </Button>
            </div>
          </div>
        </div>
        <p className="mb-3 flex w-fit items-center gap-2 border-b border-b-[#FF0000] px-2 pb-1 text-xs font-bold">
          <img src={NoteIcon.src} alt="note" className="size-4" />
          {t('edit-importantNote')}
        </p>
      </div>
    )
  }
  if (state === 'adding') {
    return (
      <div>
        <div className={cn('mt-4 mb-6', className)}>
          <h3 className="mb-4 text-xs font-bold">
            {t('savedMeasurements')}{' '}
            <span className="font-normal">
              {t('savedMeasurementsDescription')}
            </span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="block text-xs font-medium">
                {t('enterChestMeasurement')}
              </label>
              <Input
                type="number"
                value={editValues.chest}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    chest: Number(e.target.value),
                  })
                }
                min={0}
                className="h-8 w-20 rounded-lg border border-[#F3E0C8] bg-white px-5 py-1 text-center text-xs text-[#00000080] shadow-md"
                placeholder="80cm"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="block text-xs font-medium">
                {t('enterHipMeasurement')}
              </label>
              <Input
                type="number"
                value={editValues.hip}
                onChange={(e) =>
                  setEditValues({ ...editValues, hip: Number(e.target.value) })
                }
                min={0}
                className="h-8 w-20 rounded-lg border border-[#F3E0C8] bg-white px-5 py-1 text-center text-xs text-[#00000080] shadow-md"
                placeholder="80cm"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <Button
              onClick={handleAdd}
              size={'sm'}
              className="px-10 font-normal"
            >
              {t('addMeasurements')}
            </Button>
          </div>
        </div>
        <p className="mb-3 flex w-fit items-center gap-2 border-b border-b-[#FF0000] px-2 pb-1 text-xs font-bold">
          <img src={NoteIcon.src} alt="note" className="size-4" />
          {t('edit-importantNote')}
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className={cn('', className)}>
        <h3 className="mb-4 text-xs font-bold">
          {t('savedMeasurements')}{' '}
          <span className="font-normal">
            {t('savedMeasurementsDescription')}
          </span>
        </h3>

        <div className="mb-6 flex gap-4">
          <div className="flex items-center gap-2">
            <label className="block text-xs font-medium">
              {t('hipCircumference')}
            </label>
            <div className="rounded-lg border border-[#F3E0C8] bg-white px-5 py-1 text-xs text-[#00000080] shadow-md">
              {measurements.hip}cm
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="block text-xs font-medium">
              {t('chestCircumference')}
            </label>
            <div className="rounded-lg border border-[#F3E0C8] bg-white px-5 py-1 text-xs text-[#00000080] shadow-md">
              {measurements.chest}cm
            </div>
          </div>
          <div className="ms-auto flex items-center gap-6">
            <span className="text-primary text-xs font-medium">
              {t('editQuestion')}
            </span>
            <Button
              onClick={handleEdit}
              size={'sm'}
              className="h-8 px-6 text-xs font-normal"
            >
              {t('yes')}
            </Button>
          </div>
        </div>
      </div>
      <p className="mb-3 flex w-fit items-center gap-2 border-b border-b-[#FF0000] px-2 pb-1 text-xs font-bold">
        <img src={NoteIcon.src} alt="note" className="size-4" />
        {t('edit-importantNote')}
      </p>
    </div>
  )
}

export default UserSize
