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
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { authService } from '@/services/auth'
import { useSession } from '@/store/session-store'
import { handleFormError } from '@/utils/handle-form-errors'

const phoneSchema = z.object({
  phone_number: z.string(),
})

type PhoneFormData = z.infer<typeof phoneSchema>

export function SendOTPForm() {
  const t = useTranslations('security.sendOtp')
  const { session, isPending } = useSession()
  const [{ phone_number }, setQueryStates] = useQueryStates({
    phone_number: parseAsString.withDefault(''),
  })

  const currentPhone = session?.phone_number ?? phone_number ?? ''

  const form = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone_number: currentPhone,
    },
    values: { phone_number: currentPhone },
  })

  const onSubmitForm = async (data: PhoneFormData) => {
    try {
      await authService.forgotPassword({ phone_number: data.phone_number })
      toast.success(t('success'))
      setQueryStates({ phone_number: data.phone_number })
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
    <Card className="max-w-lg border-[0.5px] border-transparent bg-transparent shadow-none md:border-[#1A1A1A] md:bg-white md:p-8 md:py-14 md:shadow-lg">
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
            <p className="text-sm text-gray-600">
              {t('phoneLabel')}:{' '}
              <span className="font-semibold text-gray-900">
                {currentPhone}
              </span>
            </p>

            <Button
              className="w-full font-semibold"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {t('sendButton')}
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

export default SendOTPForm
