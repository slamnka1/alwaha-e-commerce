'use client'

import { CheckCircle, Loader2, XCircle } from 'lucide-react'

import React, { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function PaymentRedirectPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations('payment')

  const status = searchParams.get('status')

  const handleContinueShopping = () => {
    router.push('/')
  }

  const handleViewOrders = () => {
    router.push('/user/orders')
  }

  const handleRetryPayment = () => {
    router.push('/user/cart')
  }

  if (status === 'processing') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="mx-4 w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="text-primary mb-4 h-12 w-12 animate-spin" />
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              {t('processing')}
            </h2>
            <p className="text-center text-gray-500">
              {t('processingDescription')}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="mx-4 w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">
              {t('successTitle')}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {t('success')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {t('orderConfirmed')}
              </AlertDescription>
            </Alert>

            <div className="flex flex-col space-y-2">
              <Button onClick={handleViewOrders} className="w-full" size="lg">
                {t('viewOrders')}
              </Button>
              <Button
                onClick={handleContinueShopping}
                variant="outline"
                className="w-full"
                size="lg"
              >
                {t('continueShopping')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Failure case
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="mx-4 w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-700">
            {t('failureTitle')}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {t('error')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {t('paymentFailedDescription')}
            </AlertDescription>
          </Alert>

          <div className="flex flex-col space-y-2">
            <Button onClick={handleRetryPayment} className="w-full" size="lg">
              {t('tryAgain')}
            </Button>
            <Button
              onClick={handleContinueShopping}
              variant="outline"
              className="w-full"
              size="lg"
            >
              {t('continueShopping')}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>{t('needHelp')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
