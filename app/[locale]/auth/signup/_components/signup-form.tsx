'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import * as z from 'zod'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PhoneInput from '@/components/ui/phone-input'
import { Link } from '@/lib/i18n/navigation'

const SignupForm = () => {
  const t = useTranslations('auth.signup')

  const signupSchema = z
    .object({
      firstName: z.string().min(1, t('validation.firstNameRequired')),
      lastName: z.string().min(1, t('validation.lastNameRequired')),
      phone: z
        .string()
        .min(1, t('validation.phoneRequired'))
        .refine((value) => isPossiblePhoneNumber(value), {
          message: t('validation.invalid-phone-number'),
        }),
      password: z.string().min(6, t('validation.passwordRequired')),
      confirmPassword: z
        .string()
        .min(1, t('validation.confirmPasswordRequired')),
      approve: z.boolean().refine((value) => value, {
        message: t('validation.privacyPolicyRequired'),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.passwordsDoNotMatch'),
      path: ['confirmPassword'],
    })

  type SignupFormData = z.infer<typeof signupSchema>

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      confirmPassword: '',
      approve: false,
    },
  })

  const onSubmit = (data: SignupFormData) => {
    console.log(data)
    // Handle signup logic here
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      {/* Welcome Message */}
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold lg:text-4xl">{t('welcome')}</h1>
        <p className="text-lg font-semibold lg:text-2xl">{t('subtitle')}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-md space-y-4"
          autoComplete="off"
        >
          {/* First Name Field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('firstNamePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name Field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('lastNamePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PhoneInput />

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

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
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

          {/* Privacy Policy Field */}
          <FormField
            control={form.control}
            name="approve"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    {t.rich('privacyPolicy', {
                      a: (chunks) => (
                        <Link
                          href="/privacy-policy"
                          className="text-primary font-medium hover:underline"
                        >
                          {chunks}
                        </Link>
                      ),
                      a2: (chunks) => (
                        <Link
                          href="/terms-of-service"
                          className="text-primary font-medium hover:underline"
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
                  </Label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Signup Button */}
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full py-3 text-lg font-medium text-white"
          >
            {t('signupButton')}
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
          </Button>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-600">{t('haveAccount')} </span>
            <Link
              href="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              {t('loginNow')}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignupForm
