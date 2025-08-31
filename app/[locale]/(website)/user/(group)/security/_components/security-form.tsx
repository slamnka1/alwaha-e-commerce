'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useTranslations } from 'next-intl'

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
import { Separator } from '@/components/ui/separator'

export function SecurityForm() {
  const t = useTranslations('security.form')

  // Form validation schema
  const securitySchema = z
    .object({
      newPassword: z.string().min(8, t('validation.newPasswordMinLength')),
      confirmPassword: z
        .string()
        .min(1, t('validation.confirmPasswordRequired')),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('validation.passwordsDoNotMatch'),
      path: ['confirmPassword'],
    })

  type SecurityFormData = z.infer<typeof securitySchema>

  const form = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmitForm = (data: SecurityFormData) => {
    // Handle form submission
    console.log('Security data:', data)
  }

  return (
    <div>
      <Card className="max-w-lg border-[0.5px] border-transparent bg-transparent shadow-none md:border-[#1A1A1A] md:bg-white md:p-8 md:py-14 md:shadow-lg">
        <CardHeader className="max-md:px-0">
          <CardTitle className="font-semibold md:text-xl">
            {t('title')}
          </CardTitle>
        </CardHeader>
        <Separator className="max-md:hidden" />
        <CardContent className="space-y-6 max-md:px-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitForm)}
              className="space-y-4 lg:space-y-6"
            >
              {/* New Password Field */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">
                      {t('newPassword')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t('newPasswordPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">
                      {t('confirmPassword')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t('confirmPasswordPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
    </div>
  )
}
