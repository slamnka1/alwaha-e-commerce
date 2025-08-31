import React from 'react'

import { useTranslations } from 'next-intl'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { OrdersList } from './_components/orders-list'

type Props = {}

const Orders = (props: Props) => {
  const t = useTranslations('profile.orders')

  return (
    <Card className="border-[0.5px] border-transparent bg-transparent shadow-none md:border-[#1A1A1A] md:bg-white md:p-5 md:py-10 md:shadow-lg">
      <CardHeader className="max-md:px-0">
        <CardTitle className="font-semibold md:text-xl">{t('title')}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <OrdersList />
      </CardContent>
    </Card>
  )
}

export default Orders
