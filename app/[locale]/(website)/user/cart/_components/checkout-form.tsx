'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { parseAsString, useQueryStates } from 'nuqs'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Dispatch, SetStateAction, useEffect } from 'react'

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
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { RegionSelect } from '@/components/ui/region-select'
import { Separator } from '@/components/ui/separator'
import { cartSummaryQueryKey } from '@/hooks/use-cart'
import { Link } from '@/lib/i18n/navigation'
import { useSession } from '@/store/session-store'
import { handleFormError } from '@/utils/handle-form-errors'

export function CheckoutForm({
  setShowCheckoutForm,
}: {
  setShowCheckoutForm: Dispatch<SetStateAction<boolean>>
}) {
  const t = useTranslations('cart.checkout')

  const [queryState, setQueryStates] = useQueryStates({
    emirate_id: parseAsString.withDefault(''),
    region_id: parseAsString.withDefault(''),
    shipping_address: parseAsString.withDefault(''),
  })

  // Form validation schema
  const checkoutSchema = z.object({
    emirate_id: z.string().min(1, t('validation.emirateRequired')),
    region_id: z.string().min(1, t('validation.regionRequired')),
    shipping_address: z.string().min(1, t('validation.addressRequired')),
  })

  type CheckoutFormData = z.infer<typeof checkoutSchema>

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      emirate_id: queryState.emirate_id || '',
      region_id: queryState.region_id || '',
      shipping_address: queryState.shipping_address || '',
    },
  })

  // Reset region when emirate changes
  const handleEmirateChange = (value: string) => {
    form.setValue('emirate_id', value)
    form.setValue('region_id', '') // Reset region when emirate changes
  }

  const queryClient = useQueryClient()
  const onSubmitForm = async (data: CheckoutFormData) => {
    try {
      setQueryStates({
        emirate_id: data.emirate_id,
        region_id: data.region_id,
        shipping_address: data.shipping_address,
      })

      await queryClient.invalidateQueries({
        queryKey: cartSummaryQueryKey,
      })
      toast.success(t('operations.updateSuccess'))
      setShowCheckoutForm(false)
    } catch (error) {
      handleFormError(error, form)
    }
  }

  return (
    <Card className="bg-transparent p-4 py-9 shadow-none md:bg-white">
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
                      onValueChange={handleEmirateChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700">
                    {t('region')}
                  </FormLabel>
                  <FormControl>
                    <RegionSelect
                      emirateId={form.watch('emirate_id')}
                      value={form.watch('region_id')}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Full Address Field */}
            <FormField
              control={form.control}
              name="shipping_address"
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
            <div className="grid grid-cols-2 gap-2">
              <Button
                className="font-semibold"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {t('completePayment')}
                {form.formState.isSubmitting && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>

              <Button
                variant={'secondary'}
                onClick={() => setShowCheckoutForm(false)}
              >
                {t('cancel')}
              </Button>
            </div>
            <FormErrorMessage />
          </form>
        </Form>

        {/* Policy Disclaimer */}
        <p className="mt-4 text-center text-xs text-gray-600">
          {t('shopWithConfidence')}{' '}
          <Link
            href="/change-policy"
            className="text-blue-600 underline hover:text-blue-700"
          >
            {t('policy')}
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  )
}
