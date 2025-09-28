'use client'

import { Pencil, Plus, Trash2 } from 'lucide-react'

import { useTranslations } from 'next-intl'

import { NoteIcon } from '@/assets'
import SizeModal from '@/components/size/size-modal'
import { Button } from '@/components/ui/button'
import { useDeleteUserSize, useUserSizes } from '@/hooks/use-user-sizes'
import { cn } from '@/lib/utils'

type UserSizeProps = {
  className?: string
}

const UserSize = ({ className }: UserSizeProps) => {
  const sizes = useUserSizes()
  const deleteSize = useDeleteUserSize()

  const hasSizes = (sizes.data?.length ?? 0) > 0
  const t = useTranslations('search.filters.userSize')

  if (!hasSizes) {
    return (
      <div>
        <div className={cn('mt-4 mb-6', className)}>
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
            <div className="flex flex-col gap-3">
              {sizes.data!.map((size) => (
                <div
                  key={size.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block size-4 rounded-sm"
                      style={{ backgroundColor: size.color }}
                      aria-hidden
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="font-medium">{size.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {t('chestCircumference')}: {size.chest_size} •{' '}
                        {t('hipCircumference')}: {size.hip_size}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
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
                  </div>
                </div>
              ))}
            </div>

            {sizes.data!.length < 3 && (
              <SizeModal
                trigger={
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Plus className="size-4" />
                    {t('addSize')}
                  </Button>
                }
              />
            )}
          </div>
        )}
      </div>
      <p className="mb-3 flex w-fit items-center gap-2 border-b border-b-[#FF0000] px-2 pb-1 text-xs font-bold">
        <img src={NoteIcon.src} alt="note" className="size-4" />
        {t('edit-importantNote')}
      </p>
    </div>
  )
}

export default UserSize
