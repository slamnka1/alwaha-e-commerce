'use client'

import { LogInIcon } from 'lucide-react'

import React from 'react'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Link } from '@/lib/i18n/navigation'

type Props = {}

const UserButton = (props: Props) => {
  const t = useTranslations('header')
  return (
    <>
      <div className="ms-auto grid max-w-20 gap-3 lg:max-w-58 lg:grid-cols-2">
        <Button
          className="h-11.5 max-md:h-10 max-md:text-base"
          variant={'outline'}
          asChild
        >
          <Link href="/auth/login">
            <span className="text-sm">{t('login')}</span>
          </Link>
        </Button>

        <Button className="hidden h-11.5 lg:flex" asChild>
          <Link href="/auth/signup">
            <span className="text-sm">{t('signup')}</span>
          </Link>
        </Button>
      </div>
    </>
  )
}

export default UserButton
