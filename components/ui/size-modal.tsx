'use client'

import React from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { SetYourSizeImage, step1 } from '@/assets'
import { Button } from '@/components/ui/button'
import { Link } from '@/lib/i18n/navigation'
import { cn } from '@/lib/utils'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './dialog'

type SizeModalProps = {
  /**
   * Optional custom trigger. If not provided, a default button is used.
   */
  trigger?: React.ReactNode
  /**
   * Additional class names for the dialog content wrapper
   */
  contentClassName?: string
}

const SizeModal: React.FC<SizeModalProps> = ({ trigger, contentClassName }) => {
  const t = useTranslations('size-modal')
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {trigger ?? (
            <Button
              size={'sm'}
              className="h-8 rounded-xl px-4 py-1 text-xs font-normal"
            >
              {t('trigger')}
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className={cn('max-w-3xl p-0 sm:p-0', contentClassName)}>
          <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-center p-4">
              <img
                alt="Know your size illustration"
                src={step1.src}
                className="h-auto w-56 sm:w-64"
              />
            </div>
            <div className="flex flex-col justify-center">
              <DialogTitle className="leading-snug font-bold lg:text-xl">
                {t('title')}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2 text-sm">
                {t('subtitle')}
              </DialogDescription>

              <Button asChild className="mt-6 w-full sm:w-auto">
                <Link href="/profile/size">{t('button')}</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SizeModal
