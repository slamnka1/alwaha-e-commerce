'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { RegionSelect } from '@/components/ui/region-select'
import { Separator } from '@/components/ui/separator'
import { authService } from '@/services/auth'
import { useSession } from '@/store/session-store'
import { handleFormError } from '@/utils/handle-form-errors'

export function AddressForm({}) {
  const t = useTranslations('cart.checkout')

  // Form validation schema
  const addressSchema = z.object({
    emirate_id: z.string().min(1, t('validation.emirateRequired')),
    region_id: z.string().min(1, t('validation.regionRequired')),
    address: z.string().min(1, t('validation.addressRequired')),
  })

  type AddressFormData = z.infer<typeof addressSchema>
  const { session, isPending } = useSession()

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: session
      ? {
          emirate_id: session.emirate?.id + '' || '',
          region_id: session.region?.id + '' || '',
          address: session.address || '',
        }
      : {
          emirate_id: '',
          region_id: '',
          address: '',
        },
  })

  useEffect(() => {
    if (!isPending) {
      form.setValue('emirate_id', session?.emirate?.id + '' || '')
      form.setValue('region_id', session?.region?.id + '' || '')
      form.setValue('address', session?.address || '')
    }
  }, [isPending])

  // Reset region when emirate changes
  const handleEmirateChange = (value: string) => {
    form.setValue('emirate_id', value)
    form.setValue('region_id', '') // Reset region when emirate changes
  }

  const queryClient = useQueryClient()
  const onSubmitForm = async (data: AddressFormData) => {
    try {
      await authService.updateAddress({
        emirate_id: data.emirate_id,
        region_id: data.region_id,
        address: data.address,
      })

      toast.success(t('operations.updateSuccess'))
      queryClient.invalidateQueries({
        queryKey: ['session'],
      })
    } catch (error) {
      handleFormError(error, form)
    }
  }

  if (isPending) {
    return (
      <Card className="border-[0.5px] border-transparent bg-transparent shadow-none md:border-[#1A1A1A] md:bg-white md:p-8 md:py-14 md:shadow-lg">
        <CardHeader className="max-md:px-0">
          <CardTitle className="font-semibold md:text-xl">
            {t('currentAddressTitle')}
          </CardTitle>
        </CardHeader>
        <Separator className="max-md:hidden" />
        <CardContent className="space-y-6 max-md:px-2">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
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
              name="address"
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
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {session?.address ? t('updateAddress') : t('addCurrentAddress')}
              {form.formState.isSubmitting && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
            <FormErrorMessage />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
