'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import * as z from 'zod'

import { useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PhoneInput from '@/components/ui/phone-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/lib/i18n/navigation'

// UAE Emirates data
const emirates = [
  { value: 'abudhabi', label: { en: 'Abu Dhabi', ar: 'أبو ظبي' } },
  { value: 'dubai', label: { en: 'Dubai', ar: 'دبي' } },
  { value: 'sharjah', label: { en: 'Sharjah', ar: 'الشارقة' } },
  { value: 'ajman', label: { en: 'Ajman', ar: 'عجمان' } },
  { value: 'umm-al-quwain', label: { en: 'Umm Al Quwain', ar: 'أم القيوين' } },
  {
    value: 'ras-al-khaimah',
    label: { en: 'Ras Al Khaimah', ar: 'رأس الخيمة' },
  },
  { value: 'fujairah', label: { en: 'Fujairah', ar: 'الفجيرة' } },
]

// Regions for each emirate (simplified)
const regions = {
  abudhabi: [
    {
      value: 'abu-dhabi-city',
      label: { en: 'Abu Dhabi City', ar: 'مدينة أبو ظبي' },
    },
    { value: 'al-ain', label: { en: 'Al Ain', ar: 'العين' } },
    { value: 'al-dhafra', label: { en: 'Al Dhafra', ar: 'الظفرة' } },
  ],
  dubai: [
    { value: 'dubai-city', label: { en: 'Dubai City', ar: 'مدينة دبي' } },
    { value: 'jebel-ali', label: { en: 'Jebel Ali', ar: 'جبل علي' } },
    { value: 'hatta', label: { en: 'Hatta', ar: 'حتا' } },
  ],
  sharjah: [
    {
      value: 'sharjah-city',
      label: { en: 'Sharjah City', ar: 'مدينة الشارقة' },
    },
    { value: 'kalba', label: { en: 'Kalba', ar: 'كلباء' } },
    { value: 'dibba', label: { en: 'Dibba', ar: 'دبا' } },
  ],
  ajman: [
    { value: 'ajman-city', label: { en: 'Ajman City', ar: 'مدينة عجمان' } },
  ],
  'umm-al-quwain': [
    {
      value: 'umm-al-quwain-city',
      label: { en: 'Umm Al Quwain City', ar: 'مدينة أم القيوين' },
    },
  ],
  'ras-al-khaimah': [
    {
      value: 'ras-al-khaimah-city',
      label: { en: 'Ras Al Khaimah City', ar: 'مدينة رأس الخيمة' },
    },
  ],
  fujairah: [
    {
      value: 'fujairah-city',
      label: { en: 'Fujairah City', ar: 'مدينة الفجيرة' },
    },
  ],
}

export function CheckoutForm() {
  const t = useTranslations('cart.checkout')
  // Form validation schema
  const checkoutSchema = z.object({
    first_name: z.string().min(1, t('validation.firstNameRequired')),
    last_name: z.string().min(1, t('validation.lastNameRequired')),
    phone: z
      .string()
      .min(1, t('validation.phoneRequired'))
      .refine((value) => isPossiblePhoneNumber(value), {
        message: t('validation.invalidPhone'),
      }),
    emirate: z.string().min(1, t('validation.emirateRequired')),
    region: z.string().min(1, t('validation.regionRequired')),
    fullAddress: z.string().min(1, t('validation.addressRequired')),
  })

  type CheckoutFormData = z.infer<typeof checkoutSchema>

  const locale = useLocale()
  const [selectedEmirate, setSelectedEmirate] = useState('')

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const handleEmirateChange = (value: string) => {
    setSelectedEmirate(value)
    form.setValue('emirate', value)
    form.setValue('region', '') // Reset region when emirate changes
  }

  const handleRegionChange = (value: string) => {
    form.setValue('region', value)
  }

  const onSubmitForm = (data: CheckoutFormData) => {
    //
  }

  return (
    <Card className="gap-3 bg-white py-4 shadow-none">
      <CardHeader>
        <CardTitle className="font-semibold max-lg:text-sm lg:text-xl">
          {t('title')}
        </CardTitle>
      </CardHeader>
      <Separator />

      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="space-y-4"
          >
            {/* First Name */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t('firstNamePlaceholder')}
                      className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t('lastNamePlaceholder')}
                      className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <PhoneInput />

            {/* Emirate */}
            <FormField
              control={form.control}
              name="emirate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={handleEmirateChange}
                      value={selectedEmirate}
                    >
                      <SelectTrigger className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder={t('emiratePlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {emirates.map((emirate) => (
                          <SelectItem key={emirate.value} value={emirate.value}>
                            {
                              emirate.label[
                                locale as keyof typeof emirate.label
                              ]
                            }
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Region */}
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={handleRegionChange}
                      disabled={!selectedEmirate}
                    >
                      <SelectTrigger className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue placeholder={t('regionPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedEmirate &&
                          regions[selectedEmirate as keyof typeof regions]?.map(
                            (region) => (
                              <SelectItem
                                key={region.value}
                                value={region.value}
                              >
                                {
                                  region.label[
                                    locale as keyof typeof region.label
                                  ]
                                }
                              </SelectItem>
                            )
                          )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Full Address */}
            <FormField
              control={form.control}
              name="fullAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t('addressPlaceholder')}
                      className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              variant={'secondary'}
              className="w-full font-medium"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {t('completePayment')}
              {form.formState.isSubmitting && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </form>
        </Form>

        {/* Policy Disclaimer */}
        <p className="mt-4 text-center text-xs text-gray-600">
          {t('shopWithConfidence')}{' '}
          <Link
            href="/change-policy"
            className="text-blue-600 underline hover:text-blue-700"
          >
            {t('policy')}
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  )
}
