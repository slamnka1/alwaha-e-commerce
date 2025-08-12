'use client'

import { useFormContext } from 'react-hook-form'
import PhoneInputComponent from 'react-phone-number-input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import ar from 'react-phone-number-input/locale/ar.json'
import en from 'react-phone-number-input/locale/en.json'
import 'react-phone-number-input/style.css'

import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'

import { FormField, FormMessage } from './form'
import { FormItem } from './form'
import { FormControl } from './form'
import { Input } from './input'
import { Select } from './select'

const PhoneInput = () => {
  const locale = useLocale()
  const form = useFormContext()
  const t = useTranslations('auth.login.validation')
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
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
