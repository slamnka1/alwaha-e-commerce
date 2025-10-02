'use client'

import { Plus } from 'lucide-react'
import { useQueryState } from 'nuqs'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { NoteIcon } from '@/assets'
import SizeModal from '@/components/size/size-modal'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useUserSizes } from '@/hooks/use-user-sizes'
import { Link } from '@/lib/i18n/navigation'
import { cn } from '@/lib/utils'
import { useSession } from '@/store/session-store'

type UserSizeProps = {
  className?: string
}

const UserSize = ({ className }: UserSizeProps) => {
  const { isAuthenticated } = useSession()
  const sizes = useUserSizes()
  const [selectedSize, setSelectedSize] = useQueryState('user_size')

  const hasSizes = (sizes.data?.length ?? 0) > 0
  const t = useTranslations('search.filters.userSize')

  if (!isAuthenticated) {
    return (
      <div>
        <div className={cn('mt-4', className)}>
          <p className="mb-4 text-xs font-bold">
            {t('addMeasurementsDescription')}
          </p>

          <Button
            asChild
            size={'sm'}
            className="h-8 rounded-xl px-4 py-1 text-xs font-normal"
          >
            <Link href="/auth/login">{t('addMeasurements')}</Link>
          </Button>
        </div>
        <p className="mb-3 flex w-fit items-center gap-2 border-b border-b-[#FF0000] px-2 pb-1 text-xs font-bold">
          <img src={NoteIcon.src} alt="note" className="size-4" />
          {t('importantNote')}
        </p>
      </div>
    )
  }
  if (!hasSizes) {
    return (
      <div>
        <div className={cn('mt-4', className)}>
          <p className="mb-4 text-xs font-bold">
            {t('addMeasurementsDescription')}
          </p>
          <SizeModal
            trigger={
              <Button
                size={'sm'}
                className="h-8 rounded-xl px-4 py-1 text-xs font-normal"
              >
                {t('addMeasurements')}
              </Button>
            }
          ></SizeModal>
        </div>
        <p className="mb-3 flex w-fit items-center gap-2 border-b border-b-[#FF0000] px-2 pb-1 text-xs font-bold">
          <img src={NoteIcon.src} alt="note" className="size-4" />
          {t('importantNote')}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className={cn('', className)}>
        <h3 className="mb-4 text-xs font-bold">
          {t('savedMeasurements')}{' '}
          <span className="font-normal">
            {t('savedMeasurementsDescription')}
          </span>
        </h3>
        {hasSizes && (
          <div className="space-y-4">
            <RadioGroup
              value={selectedSize}
              onValueChange={(value) => setSelectedSize(value)}
            >
              <div className="flex gap-8">
                {sizes.data!.map((size) => (
                  <div
                    key={size.id}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center gap-3">
                      <RadioGroupItem
                        value={String(size.id)}
                        style={{
                          border: `1px solid ${size.color}`,
                        }}
                      />
                      <div className="flex flex-col leading-tight">
                        <span
                          style={{ color: size.color }}
                          className="font-medium"
                        >
                          {size.name}
                        </span>
                        {/* <span className="text-muted-foreground text-xs">
                        {t('chestCircumference')}: {size.chest_size} •{' '}
                        {t('hipCircumference')}: {size.hip_size}
                      </span> */}
                      </div>
                    </label>
                    {/* <div className="flex items-center gap-1">
                    <SizeModal
                      mode="edit"
                      size={size}
                      trigger={
                        <Button size="icon" variant="ghost" className="size-8">
                          <Pencil className="size-5 text-gray-400" />
                        </Button>
                      }
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() => deleteSize.mutate(size.id)}
                      disabled={deleteSize.isPending}
                    >
                      <Trash2 className="size-5 text-gray-400" />
                    </Button>
                  </div> */}
                  </div>
                ))}
                {sizes.data!.length < 3 && (
                  <SizeModal
                    trigger={
                      <Button size="icon" className="size-6 gap-2 rounded-xs">
                        <Plus className="size-4" />
                        {/* {t('addSize')} */}
                      </Button>
                    }
                  />
                )}
              </div>
            </RadioGroup>
            {/* 
            {sizes.data!.length < 3 && (
              <SizeModal
                trigger={
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Plus className="size-4" />
                    {t('addSize')}
                  </Button>
                }
              />
            )} */}
          </div>
        )}
      </div>
      {/* <p className="mb-3 flex w-fit items-center gap-2 border-b border-b-[#FF0000] px-2 pb-1 text-xs font-bold">
        <img src={NoteIcon.src} alt="note" className="size-4" />
        {t('edit-importantNote')}
      </p> */}
    </div>
  )
}

export default UserSize
