'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

type SizeData = {
  chest: string
  hip: string
}

type Props = {
  currentSize: SizeData | null
}

const SizeForm = ({ currentSize }: Props) => {
  const [hasSize, setHasSize] = useState(!!currentSize)
  const t = useTranslations('userSize.sizeForm')

  // Form validation schema
  const sizeSchema = z.object({
    chest: z.string().min(1, 'Chest measurement is required'),
    hip: z.string().min(1, 'Hip measurement is required'),
  })

  type SizeFormData = z.infer<typeof sizeSchema>

  const form = useForm<SizeFormData>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      chest: currentSize?.chest || '',
      hip: currentSize?.hip || '',
    },
  })

  const onSubmitForm = (data: SizeFormData) => {
    // Handle form submission
  }

  const handleAddNew = () => {
    setHasSize(true)
  }

  // Empty state - no measurements
  if (!hasSize) {
    return (
      <Card className="max-w-lg border-[0.5px] border-transparent bg-transparent shadow-none md:border-black md:bg-white md:p-8 md:py-14 md:shadow-lg">
        <CardHeader className="max-md:px-0">
          <CardTitle className="font-semibold md:text-xl">
            {t('emptyStateTitle')}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-6 max-md:px-2">
          <div className="space-y-4">
            <p className="font-bold text-red-500">{t('emptyStateMessage')}</p>
            <p className="text-sm font-semibold text-red-500">
              {t('emptyStateDescription')}
            </p>
          </div>
          <Button onClick={handleAddNew} className="w-full font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            {t('addButton')}
          </Button>
        </CardContent>
      </Card>
    )
  }

  //   // Delete confirmation state
  //   if (currentSize && !isEditing) {
  //     return (
  //       <Card className="border-[0.5px] border-transparent bg-transparent shadow-none md:border-black md:bg-white md:p-8 md:py-14 md:shadow-lg">
  //         <CardHeader className="max-md:px-0">
  //           <CardTitle className="font-semibold md:text-xl">
  //             {t('deleteTitle')}
  //           </CardTitle>
  //         </CardHeader>
  //         <Separator className="bg-orange-200 max-md:hidden" />
  //         <CardContent className="space-y-6 max-md:px-2">
  //           <div className="space-y-4 text-center">
  //             <p className="font-medium text-red-500">{t('deleteWarning')}</p>
  //             <p className="text-sm">{t('deleteDescription')}</p>
  //           </div>

  //           <div className="space-y-4">
  //             <div className="space-y-3 rounded-lg border border-red-200 p-4">
  //               <div className="flex items-center justify-between">
  //                 <label className="text-sm font-medium">
  //                   {t('chestCircumference')}:
  //                 </label>
  //                 <div className="rounded-lg border border-red-200 bg-white px-3 py-2">
  //                   {currentSize.chest}cm
  //                 </div>
  //               </div>
  //               <div className="flex items-center justify-between">
  //                 <label className="text-sm font-medium">
  //                   {t('hipCircumference')}:
  //                 </label>
  //                 <div className="rounded-lg border border-red-200 bg-white px-3 py-2">
  //                   {currentSize.hip}cm
  //                 </div>
  //               </div>
  //             </div>

  //             <p className="">{t('deleteConfirmQuestion')}</p>
  //           </div>

  //           <div className="flex gap-3">
  //             <Button onClick={handleEdit} variant="outline" className="flex-1">
  //               {t('edit')}
  //             </Button>

  //           </div>
  //         </CardContent>
  //       </Card>
  //     )
  //   }

  return (
    <Card className="max-w-lg border-[0.5px] border-transparent bg-transparent shadow-none md:border-black md:bg-white md:p-8 md:py-14 md:shadow-lg">
      <CardHeader className="max-md:px-0">
        <CardTitle className="font-semibold md:text-xl">{t('title')}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 max-md:px-2">
        <div className="">
          <p className="text-sm text-red-500">{t('tips')}</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="space-y-4 lg:space-y-6"
          >
            {/* Chest Measurement Field */}
            <FormField
              control={form.control}
              name="chest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium">
                    {t('chestCircumference')}:
                  </FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="cm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hip Measurement Field */}
            <FormField
              control={form.control}
              name="hip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium">
                    {t('hipCircumference')}:
                  </FormLabel>
                  <FormControl>
                    <Input type="number" min={0} placeholder="cm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="submit"
                className="grow font-semibold"
                disabled={form.formState.isSubmitting}
              >
                {currentSize ? t('edit') : t('addButton')}
                {form.formState.isSubmitting && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
              {currentSize && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="grow font-semibold"
                    >
                      {t('deleteButton')}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t('deleteWarning')}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('deleteDescription')}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => setHasSize(false)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        {t('yes')}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SizeForm
