'use client'

import React, { useState } from 'react'

import { useTranslations } from 'next-intl'

import { step1 } from '@/assets'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import SizeForm from './add-size-form'

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
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const t = useTranslations('size-modal')
  const firstStep = (
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

        <Button
          onClick={() => {
            setStep(2)
          }}
          className="mt-6 w-full sm:w-auto"
        >
          {t('button')}
        </Button>
      </div>
    </div>
  )
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        <DialogContent
          className={cn(
            'flex max-h-[min(700px,90vh)] flex-col gap-0 p-0 sm:max-w-2xl [&>button:last-child]:hidden'
          )}
        >
          <ScrollArea className="flex max-h-full flex-col overflow-hidden">
            {step === 1 && firstStep}
            {step === 2 && <SizeForm closeModal={() => setIsOpen(false)} />}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SizeModal
