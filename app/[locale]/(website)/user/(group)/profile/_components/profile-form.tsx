'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import * as z from 'zod'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

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
import { Separator } from '@/components/ui/separator'
import { Link as I18nLink } from '@/lib/i18n/navigation'

export function ProfileForm() {
  const t = useTranslations('profile.form')

  // Form validation schema
  const profileSchema = z.object({
    first_name: z.string().min(1, t('validation.firstNameRequired')),
    last_name: z.string().min(1, t('validation.lastNameRequired')),
    phone: z
      .string()
      .min(1, t('validation.phoneRequired'))
      .refine((value) => isPossiblePhoneNumber(value), {
        message: t('validation.invalidPhone'),
      }),
    address: z.string().min(1, t('validation.addressRequired')),
  })

  type ProfileFormData = z.infer<typeof profileSchema>

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  const onSubmitForm = (data: ProfileFormData) => {
    // Handle form submission
    console.log('Profile data:', data)
  }

  return (
    <Card className="border-[0.5px] border-transparent bg-transparent shadow-none md:border-[#1A1A1A] md:bg-white md:p-8 md:py-14 md:shadow-lg">
      <CardHeader className="max-md:px-0">
        <CardTitle className="font-semibold md:text-xl">{t('title')}</CardTitle>
      </CardHeader>
      <Separator className="max-md:hidden" />
      <CardContent className="space-y-6 max-md:px-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="space-y-4 lg:space-y-6"
          >
            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">
                      {t('firstName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('firstNamePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">
                      {t('lastName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('lastNamePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    {t('phone')}
                  </FormLabel>
                  <FormControl>
                    <PhoneInput />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Field */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    {t('address')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t('addressPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Reset Link */}
            <div className="">
              <I18nLink href="/auth/forgot-password">
                {t('forgotPassword')}
              </I18nLink>
            </div>

            {/* Action Button */}
            <Button
              variant={'secondary'}
              className="w-full font-semibold"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {t('updateButton')}
              {form.formState.isSubmitting && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
