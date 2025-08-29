'use client'

import { useFormContext } from 'react-hook-form'
import PhoneInputComponent from 'react-phone-number-input'
import ar from 'react-phone-number-input/locale/ar.json'
import en from 'react-phone-number-input/locale/en.json'
import 'react-phone-number-input/style.css'

import { useLocale, useTranslations } from 'next-intl'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import { Input } from './input'
import { Select } from './select'

const PhoneInput = ({ withLabel = false }: { withLabel?: boolean }) => {
  const locale = useLocale()
  const form = useFormContext()
  const t = useTranslations('cart.checkout')
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          {withLabel && (
            <FormLabel className="text-sm font-medium rtl:text-right">
              {t('phone')}
            </FormLabel>
          )}
          <FormControl>
            <div dir="ltr" className="flex gap-2">
              <PhoneInputComponent
                containerComponent={Select}
                labels={locale === 'ar' ? ar : en}
                international
                countryCallingCodeEditable={false}
                defaultCountry="AE"
                inputComponent={Input}
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default PhoneInput
