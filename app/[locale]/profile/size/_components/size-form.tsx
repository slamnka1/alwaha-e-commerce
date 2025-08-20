'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Link } from '@/lib/i18n/navigation'
import { cn } from '@/lib/utils'

const SizeForm = ({ isHomeScreen }: { isHomeScreen?: boolean }) => {
  const t = useTranslations('profile.size')

  const sizeSchema = z.object({
    chestMeasurement: z
      .string()
      .min(1, t('validation.chestRequired'))
      .refine(
        (value) => {
          const num = parseFloat(value)
          return !isNaN(num) && num > 0 && num < 200
        },
        {
          message: t('validation.invalidChest'),
        }
      ),
    hipMeasurement: z
      .string()
      .min(1, t('validation.hipRequired'))
      .refine(
        (value) => {
          const num = parseFloat(value)
          return !isNaN(num) && num > 0 && num < 200
        },
        {
          message: t('validation.invalidHip'),
        }
      ),
  })

  type SizeFormData = z.infer<typeof sizeSchema>

  const form = useForm<SizeFormData>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      chestMeasurement: '',
      hipMeasurement: '',
    },
  })

  const onSubmit = (data: SizeFormData) => {
    console.log(data)
    // Handle size saving logic here
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {!isHomeScreen && (
        <Button asChild className="!absolute top-4 left-4" size={'sm'}>
          <Link href="/">{t('skip')}</Link>
        </Button>
      )}
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1
          className={cn(
            'text-2xl font-bold lg:text-4xl',
            isHomeScreen && 'text-white'
          )}
        >
          {t('title')}
        </h1>
        <p
          className={cn(
            'text-lg font-semibold max-lg:text-center lg:text-xl',
            isHomeScreen && 'hidden'
          )}
        >
          {t('subtitle')}
        </p>
        <p
          className={cn(
            'text-start text-sm font-medium text-red-600 max-lg:text-center',
            isHomeScreen && 'text-white'
          )}
        >
          {t('importantNote')}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Left Column - Input Fields */}
            <div className="space-y-6 lg:col-span-2">
              {/* Chest Measurement */}
              <FormField
                control={form.control}
                name="chestMeasurement"
                render={({ field }) => (
                  <FormItem>
                    <label
                      className={cn(
                        'mb-2 block text-right font-medium',
                        isHomeScreen && 'text-white'
                      )}
                    >
                      {t('chestMeasurement')}
                    </label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t('chestPlaceholder')}
                        className="text-right"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hip Measurement */}
              <FormField
                control={form.control}
                name="hipMeasurement"
                render={({ field }) => (
                  <FormItem>
                    <label
                      className={cn(
                        'mb-2 block text-right font-medium',
                        isHomeScreen && 'text-white'
                      )}
                    >
                      {t('hipMeasurement')}
                    </label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t('hipPlaceholder')}
                        className="text-right"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Save Button */}
              <div className="flex justify-center">
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="w-full max-w-md"
                >
                  {t('saveButton')}
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 animate-spin" />
                  )}
                </Button>
              </div>
            </div>

            {/* Right Column - Instructions */}
            <div className="space-y-5 lg:col-span-3 ltr:border-l-[#F3E0C8] ltr:lg:border-l-2 ltr:lg:pl-6 rtl:border-r-[#F3E0C8] rtl:lg:border-r-2 rtl:lg:pr-6">
              {/* Chest Measurement Instructions */}
              <div>
                <h3
                  className={cn(
                    'mb-2 text-xs font-semibold',
                    isHomeScreen && 'text-white'
                  )}
                >
                  {t('chestInstructionsTitle')}
                </h3>
                <p className="rounded-[16px] bg-white p-4 text-[10px] font-medium shadow-md">
                  {t('chestInstructions')}
                </p>
              </div>

              {/* Hip Measurement Instructions */}
              <div>
                <h3
                  className={cn(
                    'mb-2 text-xs font-semibold',
                    isHomeScreen && 'text-white'
                  )}
                >
                  {t('hipInstructionsTitle')}
                </h3>
                <p className="rounded-[16px] bg-white p-4 text-[10px] font-medium shadow-md">
                  {t('hipInstructions')}
                </p>
              </div>

              {/* Tips */}
              <div>
                <h3
                  className={cn(
                    'mb-2 text-xs font-semibold',
                    isHomeScreen && 'text-white'
                  )}
                >
                  {t('tipsTitle')}
                </h3>
                <p className="rounded-[16px] bg-white p-4 text-[10px] font-medium shadow-md">
                  {t('tips')}
                </p>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SizeForm
