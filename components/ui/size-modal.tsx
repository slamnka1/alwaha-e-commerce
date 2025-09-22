'use client'

import React from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { SetYourSizeImage } from '@/assets'
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
  const tHome = useTranslations('home-page.knowYourSize')
  const tSize = useTranslations('profile.size')
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {trigger ?? (
            <Button size="sm" className="rounded-3xl px-6">
              {tHome('button')}
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className={cn('max-w-2xl p-0 sm:p-0', contentClassName)}>
          <div className="flex flex-col gap-6 p-6">
            <div className="order-1 flex items-center justify-center p-4 sm:order-2">
              <Image
                alt="Know your size illustration"
                src={SetYourSizeImage}
                className="h-auto w-56 sm:w-64"
              />
            </div>
            <div className="order-2 flex flex-col justify-center sm:order-1">
              <DialogTitle className="text-2xl">{tSize('title')}</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-2">
                {tSize('subtitle')}
              </DialogDescription>

              <Button asChild className="mt-6 w-full sm:w-auto">
                <Link href="/profile/size">{tHome('button')}</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SizeModal
