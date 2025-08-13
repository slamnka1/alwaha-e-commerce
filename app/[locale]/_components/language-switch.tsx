'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname } from '@/lib/i18n/navigation'

type Props = {}

const LanguageSwitch = (props: Props) => {
  const locale = useLocale() as 'ar' | 'en'
  const pathname = usePathname()

  const router = useRouter()
  const handleSwitchLanguage = (newLocale: 'ar' | 'en') => {
    if (locale === newLocale) return
    router.push(`/${locale}${pathname}`)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="max-md:h-10 max-md:text-base" variant={'ghost'}>
          <span className="text-sm font-normal">{locale.toUpperCase()}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            className="shrink-0 size-6"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M25.8754 6.30005L23.5087 8.07505C23.1625 8.33469 22.7415 8.47505 22.3087 8.47505H16.9615C16.2039 8.47505 15.5114 8.90305 15.1726 9.58062L14.9904 9.94509C14.5723 10.7812 14.7892 11.7955 15.5127 12.3874L19.7264 15.8349C21.3003 17.1227 22.1148 19.1201 21.8903 21.1413L21.6453 23.3457C21.5657 24.062 21.3897 24.7642 21.1221 25.4334L20.0754 28.05"
              stroke="#222222"
              strokeWidth="1.5"
            />
            <path
              d="M1.22461 12.825L7.16271 11.8353C8.51635 11.6097 9.6899 12.7833 9.46429 14.1369L8.96029 17.1609C8.67161 18.893 9.54638 20.6109 11.117 21.3962L12.1222 21.8988C13.3798 22.5276 14.032 23.9455 13.6909 25.3097L12.8246 28.775"
              stroke="#222222"
              strokeWidth="1.5"
            />
            <circle
              cx="15"
              cy="15"
              r="13.75"
              stroke="#222222"
              strokeWidth="1.5"
            />
          </svg>
          <span className="sr-only">Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        sideOffset={4}
        className="w-40 p-2"
      >
        <div className="flex flex-col gap-2">
          <DropdownMenuItem
            className="font-medium text-sm"
            onClick={() => handleSwitchLanguage('en')}
          >
            <span>English</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-medium text-sm"
            onClick={() => handleSwitchLanguage('ar')}
          >
            <span>عربي</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitch
