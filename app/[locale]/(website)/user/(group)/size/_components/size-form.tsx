'use client'

import { Pencil, Plus, Trash2 } from 'lucide-react'

import { useTranslations } from 'next-intl'

import SizeModal from '@/components/size/size-modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useDeleteUserSize, useUserSizes } from '@/hooks/use-user-sizes'

const SizeForm = () => {
  const t = useTranslations('userSize.sizeForm')
  const sizes = useUserSizes()
  const deleteSize = useDeleteUserSize()

  const hasSizes = (sizes.data?.length ?? 0) > 0

  return (
    <Card className="max-w-lg border-[0.5px] border-transparent bg-transparent shadow-none md:border-black md:bg-white md:p-8 md:py-14 md:shadow-lg">
      <CardHeader className="max-md:px-0">
        <CardTitle className="font-semibold md:text-xl">
          {t('emptyStateTitle')}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 max-md:px-2">
        {!hasSizes && (
          <>
            <div className="space-y-4">
              <p className="font-bold text-red-500">{t('emptyStateMessage')}</p>
              <p className="text-sm font-semibold text-red-500">
                {t('emptyStateDescription')}
              </p>
            </div>
            <SizeModal
              trigger={
                <Button className="w-full font-semibold">
                  <Plus className="mr-2 h-4 w-4" />
                  {t('addButton')}
                </Button>
              }
            />
          </>
        )}

        {hasSizes && (
          <div className="space-y-4">
            <div className="space-y-4">
              <p className="font-bold">{t('user-sizes')}</p>
              <p className="text-sm font-semibold">
                {t('emptyStateDescription')}
              </p>
            </div>
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
      </CardContent>
    </Card>
  )
}

export default SizeForm
