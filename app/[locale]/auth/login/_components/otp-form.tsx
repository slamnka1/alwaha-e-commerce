'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { parseAsString, useQueryStates } from 'nuqs'
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
import { FormErrorMessage } from '@/components/ui/form-error-message'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useRouter } from '@/lib/i18n/navigation'
import { handleFormError } from '@/utils/handle-form-errors'

export function OTPForm() {
  const t = useTranslations('security.otp')
  const [{ phone_number }, setQueryStates] = useQueryStates({
    phone_number: parseAsString.withDefault(''),
  })

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

  const router = useRouter()
  const onSubmitForm = async (data: OTPFormData) => {
    // Handle form submission
    try {
      await axios.post('/api/login', { ...data, phone_number: phone_number })
      router.push('/')
    } catch (error) {
      handleFormError(error, form)
    }
  }

  const handleResendOTP = () => {
    setQueryStates(null)
  }

  return (
    <div className="max-w-lg space-y-6 max-md:px-2">
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
                    maxLength={6}
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
                      <InputOTPSlot
                        index={5}
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
              form.formState.isSubmitting || form.watch('otp')?.length !== 6
            }
          >
            {t('submitButton')}
            {form.formState.isSubmitting && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>

          {/* Resend OTP Button with Countdown */}
          <Button
            variant={'link'}
            className="w-full"
            type="button"
            onClick={handleResendOTP}
          >
            {t('resendOTP')}
          </Button>

          <FormErrorMessage />
        </form>
      </Form>
    </div>
  )
}
