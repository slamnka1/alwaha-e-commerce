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
    <div className="w-full max-w-lg mx-auto space-y-6">
      {/* Welcome Message */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl lg:text-4xl font-bold ">{t('welcome')}</h1>
        <p className="text-lg lg:text-2xl font-semibold">{t('subtitle')}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md"
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
                  <Label className="text-sm flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    {t.rich('privacyPolicy', {
                      a: (chunks) => (
                        <Link
                          href="/privacy-policy"
                          className="text-primary hover:underline font-medium"
                        >
                          {chunks}
                        </Link>
                      ),
                      a2: (chunks) => (
                        <Link
                          href="/terms-of-service"
                          className="text-primary hover:underline font-medium"
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
            className="w-full  text-white py-3 text-lg font-medium"
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
              className=" text-primary hover:underline font-medium"
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
