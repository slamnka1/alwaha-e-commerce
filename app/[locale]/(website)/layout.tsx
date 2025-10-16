import React from 'react'

import { listsService } from '@/services'
import { getServerSession } from '@/utils/get-server-session'

import FloatingCart from './_components/cart'
import Footer from './_components/footer'
import Header from './_components/header'
import { InitSession } from './_components/init-client-session'
import InitServerSession from './_components/init-server-session'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await listsService.getCategories()

  return (
    <React.Fragment>
      <InitServerSession />
      <Header />
      {children}
      <Footer categories={categories.data} />
      <FloatingCart />
    </React.Fragment>
  )
}
