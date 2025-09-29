'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { parseAsString, useQueryStates } from 'nuqs'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Separator } from '@/components/ui/separator'
import { authService } from '@/services/auth'
import { useSession } from '@/store/session-store'
import { handleFormError } from '@/utils/handle-form-errors'

export function SecurityForm() {
  const t = useTranslations('security.form')
  const { isPending } = useSession()
  const [{ phone_number }, setQueryStates] = useQueryStates({
    phone_number: parseAsString.withDefault(''),
  })
  // Form validation schema
  const securitySchema = z
    .object({
      otp: z.string().length(4, t('validation.otpLength')),
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
      otp: '',
    },
  })

  const onSubmitForm = async (data: SecurityFormData) => {
    try {
      await authService.resetPassword({
        phone_number: phone_number,
        otp: data.otp,
        password: data.newPassword,
        confirm_password: data.confirmPassword,
      })
      toast.success(t('success'))
      form.reset()
      setQueryStates({ phone_number: '' })
    } catch (error) {
      handleFormError(error, form)
    }
  }

  if (isPending) {
    return (
      <Card className="max-w-lg border-[0.5px] border-transparent bg-transparent shadow-none md:border-[#1A1A1A] md:bg-white md:p-8 md:py-14 md:shadow-lg">
        <CardHeader className="max-md:px-0">
          <CardTitle className="font-semibold md:text-xl">
            {t('title')}
          </CardTitle>
        </CardHeader>
        <Separator className="max-md:hidden" />
        <CardContent className="flex items-center justify-center max-md:px-2">
          <Loader2 className="h-5 w-5 animate-spin" />
        </CardContent>
      </Card>
    )
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
              {/* OTP Input Fields */}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={5}
                        value={field.value}
                        onChange={field.onChange}
                        containerClassName="justify-center "
                      >
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot
                            index={0}
                            className="h-12 w-12 rounded-md border-2 text-lg font-semibold focus:border-orange-500 focus:ring-orange-500"
                          />
                          <InputOTPSlot
                            index={1}
                            className="h-12 w-12 rounded-md border-2 text-lg font-semibold focus:border-orange-500 focus:ring-orange-500"
                          />
                          <InputOTPSlot
                            index={2}
                            className="h-12 w-12 rounded-md border-2 text-lg font-semibold focus:border-orange-500 focus:ring-orange-500"
                          />
                          <InputOTPSlot
                            index={3}
                            className="h-12 w-12 rounded-md border-2 text-lg font-semibold focus:border-orange-500 focus:ring-orange-500"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
