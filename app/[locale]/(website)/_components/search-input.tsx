import { Search } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Input } from '@/components/ui/input'
import { useDebouncedCallback } from '@/hooks/user-debounced-callback'
import { cn } from '@/lib/utils'

type Props = {
  classNames?: {
    wrapper?: string
    input?: string
    icon?: string
  }
}

export default function SearchInput({ classNames }: Props) {
  const t = useTranslations('header')
  const [q, setQ] = useQueryState('q', parseAsString.withDefault(''))
  const [value, setValue] = useState(q)

  const search = useDebouncedCallback(setQ, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    search(e.target.value)
  }
  return (
    <div className={cn('relative w-full max-w-sm', classNames?.wrapper)}>
      <Input
        value={value}
        onChange={handleChange}
        className={cn('peer h-10 ps-9 2xl:h-12', classNames?.input)}
        placeholder={t('search')}
      />
      <div
        className={cn(
          'text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50',
          classNames?.icon
        )}
      >
        <Search size={20} aria-hidden="true" />
      </div>
    </div>
  )
}
