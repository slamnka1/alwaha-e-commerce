'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { useForm } from 'react-hook-form'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { toast } from 'sonner'
import * as z from 'zod'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { EmirateSelect } from '@/components/ui/emirate-select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PhoneInput from '@/components/ui/phone-input'
import { RegionSelect } from '@/components/ui/region-select'
import { Link, useRouter } from '@/lib/i18n/navigation'
import { useSession } from '@/store/session-store'
import { handleFormError } from '@/utils/handle-form-errors'

const SignupForm = () => {
  const t = useTranslations('auth.signup')
  const [callbackUrl] = useQueryState(
    'callbackUrl',
    parseAsString.withDefault(encodeURIComponent('/profile/size'))
  )
  const router = useRouter()

  const signupSchema = z
    .object({
      name: z.string().min(1, t('validation.nameRequired')),
      phone_number: z
        .string()
        .min(1, t('validation.phoneRequired'))
        .refine((value) => isPossiblePhoneNumber(value), {
          message: t('validation.invalid-phone-number'),
        }),
      email: z.email(t('validation.invalidEmail')),
      password: z.string().min(6, t('validation.passwordRequired')),
      password_confirmation: z
        .string()
        .min(1, t('validation.confirmPasswordRequired')),
      emirate_id: z.string().min(1, t('validation.emirateRequired')),
      region_id: z.string().min(1, t('validation.regionRequired')),
      address: z.string().min(1, t('validation.addressRequired')),
      approve: z.boolean().refine((value) => value, {
        message: t('validation.privacyPolicyRequired'),
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t('validation.passwordsDoNotMatch'),
      path: ['password_confirmation'],
    })

  type SignupFormData = z.infer<typeof signupSchema>

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      phone_number: '',
      email: '',
      password: '',
      password_confirmation: '',
      emirate_id: '',
      region_id: '',
      approve: false,
      address: '',
    },
  })

  const updateSession = useSession((s) => s.updateSession)

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await axios.post('/api/register', data)
      updateSession(response.data)
      router.push(callbackUrl)
    } catch (error: any) {
      handleFormError(error, form)
      console.error('Signup error:', error)
      const serverMsg = error?.response?.data?.message as string | undefined
      toast.error(serverMsg || t('validation.errorLoadingEmirates'))
    }
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
          {/* Full Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('namePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
          <PhoneInput />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    dir="ltr"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="password_confirmation"
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
          {/* Emirate Field */}
          <FormField
            control={form.control}
            name="emirate_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <EmirateSelect
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Region Field */}

          <FormField
            control={form.control}
            name="region_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RegionSelect
                    emirateId={form.watch('emirate_id')}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
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
                <FormControl>
                  <Input placeholder={t('addressPlaceholder')} {...field} />
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
                          href="/change-policy"
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
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
          <FormErrorMessage />

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
