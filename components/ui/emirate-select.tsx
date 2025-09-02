'use client'

import { useLocale, useTranslations } from 'next-intl'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEmirates } from '@/hooks'

interface EmirateSelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const EmirateSelect = ({
  value,
  onValueChange,
  placeholder,
  disabled = false,
  className,
}: EmirateSelectProps) => {
  const locale = useLocale()
  const t = useTranslations('common')
  const { emirates, isLoading, error, getEmirateName } = useEmirates()

  const defaultPlaceholder = t('selectEmirate')
  const loadingText = t('loadingEmirates')
  const errorText = t('errorLoadingEmirates')

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || isLoading}
    >
      <SelectTrigger className={className}>
        <SelectValue
          placeholder={
            isLoading
              ? loadingText
              : error
                ? errorText
                : placeholder || defaultPlaceholder
          }
        />
      </SelectTrigger>
      <SelectContent>
        {isLoading && (
          <SelectItem value="" disabled>
            {loadingText}
          </SelectItem>
        )}
        {error && (
          <SelectItem value="" disabled>
            {errorText}
          </SelectItem>
        )}
        {emirates.map((emirate) => (
          <SelectItem key={emirate.id} value={emirate.id.toString()}>
            {getEmirateName(emirate.id)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
