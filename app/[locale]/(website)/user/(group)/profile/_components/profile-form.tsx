'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import * as z from 'zod'

import { useEffect } from 'react'

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
import { useSession } from '@/store/session-store'

export function ProfileForm() {
  const t = useTranslations('profile.form')

  // Form validation schema
  const profileSchema = z.object({
    name: z.string().min(1, t('validation.required')),
    phone_number: z
      .string()
      .min(1, t('validation.phoneRequired'))
      .refine((value) => isPossiblePhoneNumber(value), {
        message: t('validation.invalidPhone'),
      }),
    email: z.email(t('validation.required')),
  })

  type ProfileFormData = z.infer<typeof profileSchema>

  const { session, isPending } = useSession()
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: {
      name: session?.name || '',
      email: session?.email || '',
      phone_number: session?.phone_number || '',
    },
  })

  // useEffect(() => {
  //   if (!isPending && session) {
  //     form.reset({
  //       name: session.name,
  //       email: session.email,
  //       phone_number: session.phone_number,
  //     })
  //   }
  // }, [isPending])

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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    {t('name')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t('namePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    {t('email')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t('emailPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PhoneInput />

            {/* Address Field
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
            /> */}

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
