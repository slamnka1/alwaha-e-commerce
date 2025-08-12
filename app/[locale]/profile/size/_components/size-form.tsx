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

const SizeForm = () => {
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
    <div className="w-full max-w-4xl mx-auto space-y-6 ">
      <Button asChild className="!absolute top-4 left-4" size={'sm'}>
        <Link href="/">{t('skip')}</Link>
      </Button>
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl lg:text-4xl font-bold ">{t('title')}</h1>
        <p className="text-lg lg:text-xl font-semibold ">{t('subtitle')}</p>
        <p className="text-sm text-red-600 font-medium text-start ">
          {t('importantNote')}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column - Input Fields */}
            <div className="space-y-6 lg:col-span-2">
              {/* Chest Measurement */}
              <FormField
                control={form.control}
                name="chestMeasurement"
                render={({ field }) => (
                  <FormItem>
                    <label className="block text-right font-medium mb-2">
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
                    <label className="block text-right font-medium mb-2">
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
                  className="w-full max-w-md "
                >
                  {t('saveButton')}
                  {form.formState.isSubmitting && (
                    <Loader2 className="animate-spin mr-2" />
                  )}
                </Button>
              </div>
            </div>

            {/* Right Column - Instructions */}
            <div className="space-y-5 ltr:border-l-2 ltr:border-l-[#F3E0C8]  rtl:border-r-2 rtl:border-r-[#F3E0C8] ps-6 lg:col-span-3 ">
              {/* Chest Measurement Instructions */}
              <div>
                <h3 className="font-semibold text-xs mb-2">
                  {t('chestInstructionsTitle')}
                </h3>
                <p className="text-[10px] shadow-md p-4 rounded-xl font-medium">
                  {t('chestInstructions')}
                </p>
              </div>

              {/* Hip Measurement Instructions */}
              <div>
                <h3 className="font-semibold text-xs mb-2">
                  {t('hipInstructionsTitle')}
                </h3>
                <p className="text-[10px] shadow-md p-4 rounded-xl font-medium">
                  {t('hipInstructions')}
                </p>
              </div>

              {/* Tips */}
              <div>
                <h3 className="font-semibold text-xs mb-2">{t('tipsTitle')}</h3>
                <p className="text-[10px] shadow-md p-4 rounded-xl font-medium">
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
