import { Search } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Input } from '@/components/ui/input'
import { useDebouncedCallback } from '@/hooks/user-debounced-callback'

export default function SearchInput() {
  const t = useTranslations('header')
  const [q, setQ] = useQueryState('q', parseAsString.withDefault(''))
  const [value, setValue] = useState(q)

  const search = useDebouncedCallback(setQ, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    search(e.target.value)
  }
  return (
    <div className="relative w-full max-w-sm">
      <Input
        value={value}
        onChange={handleChange}
        className="peer ps-9 max-2xl:h-10"
        placeholder={t('search')}
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <Search size={20} aria-hidden="true" />
      </div>
    </div>
  )
}
