'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { useForm } from 'react-hook-form'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
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
import { Input } from '@/components/ui/input'
import PhoneInput from '@/components/ui/phone-input'
import { Link, useRouter } from '@/lib/i18n/navigation'
import { cn } from '@/lib/utils'
import { handleFormError } from '@/utils/handle-form-errors'

const LoginForm = () => {
  const t = useTranslations('auth.login')
  const [callbackUrl] = useQueryState(
    'callbackUrl',
    parseAsString.withDefault('/')
  )

  const loginSchema = z.object({
    username: z
      .string()
      .min(1, t('validation.phoneRequired'))
      .refine((value) => isPossiblePhoneNumber(value), {
        message: t('validation.invalid-phone-number'),
      }),
    password: z.string().min(6, t('validation.passwordRequired')),
  })

  type LoginFormData = z.infer<typeof loginSchema>

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const router = useRouter()
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post('/api/login', data)
      console.log('🚀 ~ onSubmit ~ response:', response)
      router.push(callbackUrl)
    } catch (error) {
      handleFormError(error, form)
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      {/* Welcome Message */}
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold lg:text-4xl">{t('welcome')}</h1>
        <p className="text-lg font-semibold lg:text-2xl">{t('subtitle')}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('mx-auto max-w-md space-y-4')}
          autoComplete="off"
        >
          <PhoneInput name="username" />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('passwordPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Forgot Password Link */}
          <div className="text-start">
            <a href="#" className="text-xs font-semibold hover:underline">
              {t('forgotPassword')}
            </a>
          </div>

          {/* Login Button */}
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full py-3 text-lg font-medium text-white"
          >
            {t('loginButton')}
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
          </Button>
          <FormErrorMessage />

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-gray-600">{t('noAccount')} </span>
            <Link
              href="/auth/signup"
              className="text-primary font-medium hover:underline"
            >
              {t('signUp')}
            </Link>
          </div>
        </form>
      </Form>
      {/* {phone_number && <OTPForm />} */}
    </div>
  )
}

export default LoginForm
