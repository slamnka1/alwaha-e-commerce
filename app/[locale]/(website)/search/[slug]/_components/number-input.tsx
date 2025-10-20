'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Button, Group, Input, NumberField } from 'react-aria-components'

import { useTranslations } from 'next-intl'

export default function NumberInput({ maxValue }: { maxValue: number }) {
  const [quantity, setQuantity] = useQueryState(
    'quantity',
    parseAsInteger.withDefault(1)
  )
  const t = useTranslations('number-input')
  return (
    <div>
      <NumberField
        defaultValue={quantity}
        minValue={0}
        maxValue={maxValue}
        onChange={(value) => setQuantity(value ?? 1)}
      >
        <div className="*:not-first:mt-2">
          <Group className="data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-10 w-full items-center overflow-hidden rounded-[8px] border border-[#F8E0C8] text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px] lg:h-12">
            <Button
              slot="decrement"
              className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center border border-[#F8E0C8] text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MinusIcon size={16} aria-hidden="true" />
            </Button>
            <Input className="bg-background text-foreground w-16 grow px-3 py-4 text-center tabular-nums" />
            <Button
              slot="increment"
              className="bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center border border-[#F8E0C8] text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PlusIcon size={16} aria-hidden="true" />
            </Button>
          </Group>
        </div>
      </NumberField>
      {maxValue && (
        <p className="mt-1 text-xs text-gray-600">
          {t('max-value', { items: maxValue })}
        </p>
      )}
    </div>
  )
}
