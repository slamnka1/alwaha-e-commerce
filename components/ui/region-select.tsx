'use client'

import { useQuery } from '@tanstack/react-query'

import { useEffect } from 'react'

import { useTranslations } from 'next-intl'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { listsService } from '@/services/lists'

interface RegionSelectProps {
  emirateId?: number | string
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const RegionSelect = ({
  emirateId,
  value,
  onValueChange,
  placeholder,
  disabled = false,
  className,
}: RegionSelectProps) => {
  const t = useTranslations('cart.checkout')

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['regions', emirateId],
    queryFn: () =>
      listsService.getRegionsByEmirate(emirateId as number | string),
    enabled: !!emirateId,
    staleTime: Infinity,
    retry: 2,
  })

  // Reset selection if emirate changes
  useEffect(() => {
    onValueChange('')
  }, [emirateId])

  const regions = data?.data ?? []

  const defaultPlaceholder = t('regionPlaceholder')
  const loadingText = 'Loading regions...'
  const errorText = 'Error loading regions'

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || !emirateId || isLoading || isRefetching}
    >
      <SelectTrigger className={cn('w-full', className)}>
        <SelectValue
          placeholder={
            !emirateId
              ? defaultPlaceholder
              : isLoading || isRefetching
                ? loadingText
                : error
                  ? errorText
                  : placeholder || defaultPlaceholder
          }
        />
      </SelectTrigger>
      <SelectContent>
        {regions.map((region) => (
          <SelectItem key={region.id} value={region.id.toString()}>
            {region.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
