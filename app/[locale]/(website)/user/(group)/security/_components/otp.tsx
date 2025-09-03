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
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Separator } from '@/components/ui/separator'

export function OTPForm() {
  const t = useTranslations('security.otp')

  // Form validation schema
  const otpSchema = z.object({
    otp: z.string().length(6, t('validation.otpLength')),
  })

  type OTPFormData = z.infer<typeof otpSchema>

  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  })

  const onSubmitForm = (data: OTPFormData) => {
    // Handle form submission
    console.log('OTP data:', data)
  }

  return (
    <Card className="max-w-lg border-[0.5px] border-transparent bg-transparent shadow-none md:border-[#1A1A1A] md:bg-white md:p-8 md:py-14 md:shadow-lg">
      <CardHeader className="max-md:px-0">
        <CardTitle className="font-semibold md:text-xl">{t('title')}</CardTitle>
      </CardHeader>
      <Separator className="max-md:hidden" />
      <CardContent className="space-y-6 max-md:px-2">
        <div className="text-sm text-gray-600">{t('description')}</div>

        <Form {...form}>
          <form
            dir="ltr"
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="space-y-6"
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
                        <InputOTPSlot
                          index={4}
                          className="h-12 w-12 rounded-md border-2 text-lg font-semibold focus:border-orange-500 focus:ring-orange-500"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Button */}
            <Button
              className="w-full"
              type="submit"
              disabled={
                form.formState.isSubmitting || form.watch('otp')?.length !== 5
              }
            >
              {t('submitButton')}
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
