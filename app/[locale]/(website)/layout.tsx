import React from 'react'

import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Cairo } from 'next/font/google'
import { notFound } from 'next/navigation'

import { Toaster } from '@/components/ui/sonner'
import { routing } from '@/lib/i18n/routing'
import { cn } from '@/lib/utils'

import Header from '../_components/header'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}
