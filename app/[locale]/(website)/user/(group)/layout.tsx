'use client'

import { ChevronRight } from 'lucide-react'

import React from 'react'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import ProfileNav from './_components/nav'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = useTranslations()

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="container max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-col items-center justify-between gap-6 md:gap-20 md:ltr:flex-row md:rtl:flex-row-reverse">
          <h3 className="flex shrink-0 flex-nowrap items-center gap-4 font-bold md:text-xl 2xl:text-2xl rtl:flex-row-reverse">
            <span className="text-foreground/50 font-medium">{t('home')}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="16"
              viewBox="0 0 64 16"
              fill="none"
            >
              <path
                d="M62.9556 8.70711C63.3462 8.31658 63.3462 7.68342 62.9556 7.29289L56.5917 0.928932C56.2012 0.538408 55.568 0.538408 55.1775 0.928932C54.7869 1.31946 54.7869 1.95262 55.1775 2.34315L60.8343 8L55.1775 13.6569C54.7869 14.0474 54.7869 14.6805 55.1775 15.0711C55.568 15.4616 56.2012 15.4616 56.5917 15.0711L62.9556 8.70711ZM0.751465 8V9H62.2485V8V7H0.751465V8Z"
                fill="black"
              />
            </svg>
            Personal Profile
          </h3>
          <p className="hidden text-lg font-bold md:block md:text-4xl">
            {t('profile.title')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Navigation Menu */}
          <ProfileNav />

          {/* Main Content - Personal Profile Form */}
          <div className="md:col-span-2">{children}</div>
        </div>
      </div>
    </div>
  )
}
