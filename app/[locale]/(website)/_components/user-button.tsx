'use client'

import { Loader2 } from 'lucide-react'

import React from 'react'

import { useTranslations } from 'next-intl'

import { UserIcon } from '@/assets'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/lib/i18n/navigation'
import { useSession } from '@/store/session-store'

type Props = {}

const UserButton = (props: Props) => {
  const t = useTranslations('header')
  const { isPending, isAuthenticated } = useSession()

  if (isPending || !isAuthenticated)
    return (
      <>
        <div className="ms-auto grid max-w-20 gap-3 lg:max-w-58 lg:grid-cols-2">
          <Button
            className="h-9 max-md:text-base lg:h-10 2xl:h-11.5"
            variant={'outline'}
            asChild
          >
            <Link href="/auth/login">
              <span className="text-sm">{t('login')}</span>
            </Link>
          </Button>

          <Button className="hidden h-9 lg:flex lg:h-10 2xl:h-11.5" asChild>
            <Link href="/auth/signup">
              <span className="text-sm">{t('signup')}</span>
            </Link>
          </Button>
        </div>
      </>
    )
  return (
    <div className="ms-auto w-fit shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'ghost'}
            size={'icon'}
            className="size-9 p-0 lg:size-10 2xl:size-11.5"
          >
            <img src={UserIcon.src} alt="user" className="size-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-1">
          <DropdownMenuItem>
            <Link className="block w-full" href={'/user/cart'}>
              {t('cart')}
            </Link>
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem>
            <Link className="block w-full" href={'/user/profile'}>
              {t('profile')}
            </Link>
          </DropdownMenuItem>
          <Separator />

          <DropdownMenuItem className="cursor-pointer">
            {t('logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserButton
