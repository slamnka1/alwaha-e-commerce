'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useEffect } from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmirateSelect } from '@/components/ui/emirate-select'
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
import { useSession } from '@/store/session-store'

export function AddressForm({}) {
  const t = useTranslations('cart.checkout')

  // Form validation schema
  const addressSchema = z.object({
    emirate_id: z.string().min(1, t('validation.emirateRequired')),
    region: z.string().min(1, t('validation.regionRequired')),
    full_address: z.string().min(1, t('validation.addressRequired')),
  })

  type AddressFormData = z.infer<typeof addressSchema>
  const { session, isPending } = useSession()
  console.log('🚀 ~ AddressForm ~ session:', session)

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      emirate_id: session?.emirate_id || '',
      region: session?.region || '',
      full_address: session?.full_address || '',
    },
  })

  useEffect(() => {
    if (isPending && session) {
      form.reset({
        emirate_id: session.emirate_id,
        region: session.region,
        full_address: session.full_address,
      })
    }
  }, [isPending])

  const onSubmitForm = (data: AddressFormData) => {
    // Handle form submission
    console.log('Address data:', data)
  }

  return (
    <Card className="border-[0.5px] border-transparent bg-transparent shadow-none md:border-[#1A1A1A] md:bg-white md:p-8 md:py-14 md:shadow-lg">
      <CardHeader className="max-md:px-0">
        <CardTitle className="font-semibold md:text-xl">
          {t('currentAddressTitle')}
        </CardTitle>
      </CardHeader>
      <Separator className="max-md:hidden" />
      <CardContent className="space-y-6 max-md:px-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="space-y-4 lg:space-y-6"
          >
            {/* Name Fields */}
            {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">
                      {t('firstName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('firstNamePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">
                      {t('lastName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('lastNamePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

            {/* Phone Number Fields */}
            {/* <div className="space-y-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">
                      {t('phone')}
                    </FormLabel>
                    <FormControl>
                      <PhoneInput />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="other_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">
                      {t('otherPhone')}
                    </FormLabel>
                    <FormControl>
                      <PhoneInput />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

            {/* Address Fields */}
            <FormField
              control={form.control}
              name="emirate_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    {t('emirate')}
                  </FormLabel>
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

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    {t('region')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t('regionPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Full Address Field */}
            <FormField
              control={form.control}
              name="full_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    {t('fullAddress')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t('addressPlaceholder')} {...field} />
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
              {t('addCurrentAddress')}
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
