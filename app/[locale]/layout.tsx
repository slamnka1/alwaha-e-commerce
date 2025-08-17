import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Cairo } from 'next/font/google'
import { notFound } from 'next/navigation'

import { Toaster } from '@/components/ui/sonner'
import { routing } from '@/lib/i18n/routing'
import { cn } from '@/lib/utils'

const font = Cairo({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  subsets: ['arabic', 'latin'],
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
      <body className={cn(font.variable, font.className, 'bg-primary/2')}>
        <NuqsAdapter>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  )
}
