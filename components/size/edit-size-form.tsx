'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { useTranslations } from 'next-intl'

import { UserSize } from '@/@types/sizes'
import { step2 } from '@/assets'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { userSizesQueryKey } from '@/hooks/use-user-sizes'
import { cn } from '@/lib/utils'
import { sizes as sizesService } from '@/services/sizes'
import { handleFormError } from '@/utils/handle-form-errors'

import { DialogDescription, DialogTitle } from '../ui/dialog'
import { FormErrorMessage } from '../ui/form-error-message'

const EditSizeForm = ({
  closeModal,
  size,
}: {
  closeModal: () => void
  size: UserSize
}) => {
  const t = useTranslations('addSizeForm')

  const colorOptions = ['#B689FF', '#6E98FF', '#FF7A7A'] as const

  const sizeSchema = z.object({
    name: z.string().min(1, t('nameLabel')),
    color: z.enum(colorOptions),
    chest_size: z
      .string()
      .min(1, t('validation.chestRequired'))
      .refine(
        (value) => {
          const num = parseFloat(value)
          return !isNaN(num) && num > 0 && num < 200
        },
        { message: t('validation.invalidChest') }
      ),
    hip_size: z
      .string()
      .min(1, t('validation.hipRequired'))
      .refine(
        (value) => {
          const num = parseFloat(value)
          return !isNaN(num) && num > 0 && num < 200
        },
        { message: t('validation.invalidHip') }
      ),
  })

  type SizeFormData = z.infer<typeof sizeSchema>

  const form = useForm<SizeFormData>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      name: size.name,
      color: (colorOptions as readonly string[]).includes(size.color)
        ? (size.color as (typeof colorOptions)[number])
        : colorOptions[0],
      chest_size: size.chest_size,
      hip_size: size.hip_size,
    },
  })

  const queryClient = useQueryClient()
  const onSubmit = async (data: SizeFormData) => {
    try {
      await sizesService.updateSize(size.id, data)
      queryClient.invalidateQueries({ queryKey: userSizesQueryKey })
      toast.success(t('success'))
      closeModal()
    } catch (error) {
      handleFormError(error, form)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-center p-4">
        <img
          alt="Know your size illustration"
          src={step2.src}
          className="h-auto w-56 sm:w-64"
        />
      </div>
      <div className="space-y-4">
        <DialogTitle className="leading-snug font-bold lg:text-xl">
          {t('title2')}
        </DialogTitle>
        <DialogDescription className="text-muted-foreground mt-2 text-sm">
          {t('subtitle')}
        </DialogDescription>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <label className="block font-medium">
                      {t('nameLabel')}
                    </label>
                    <FormControl>
                      <Input type="text" placeholder="noor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <label className="block font-medium">
                      {t('addButton')}
                    </label>
                    <div className="flex items-center gap-3">
                      {colorOptions.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => field.onChange(c)}
                          className={cn(
                            'h-8 w-8 rounded-md',
                            'ring-offset-background transition focus:outline-none',
                            field.value === c ? 'ring-2 ring-black' : 'ring-0'
                          )}
                          style={{ backgroundColor: c }}
                          aria-label={`color-${c}`}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="hip_size"
                render={({ field }) => (
                  <FormItem>
                    <label className="block font-medium">
                      {t('hipMeasurement')}
                    </label>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        inputMode="decimal"
                        placeholder={t('hipPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chest_size"
                render={({ field }) => (
                  <FormItem>
                    <label className="block font-medium">
                      {t('chestMeasurement')}
                    </label>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        inputMode="decimal"
                        placeholder={t('chestPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full max-w-xl bg-[#FF9657] hover:bg-[#ff8a44]"
              >
                {t('saveButton')}
                {form.formState.isSubmitting && (
                  <Loader2 className="ml-2 animate-spin" />
                )}
              </Button>
              <FormErrorMessage />
              <p className="text-sm font-medium text-red-600">
                {t('importantNote')}
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default EditSizeForm
