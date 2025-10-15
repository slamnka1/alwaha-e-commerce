import React from 'react'

import { listsService } from '@/services'
import { getServerSession } from '@/utils/get-server-session'

import FloatingCart from './_components/cart'
import Footer from './_components/footer'
import Header from './_components/header'
import { InitSession } from './_components/init-client-session'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  const categories = await listsService.getCategories()

  return (
    <React.Fragment>
      <InitSession initialValue={session} />
      <Header />
      {children}
      <Footer categories={categories.data} />
      <FloatingCart />
    </React.Fragment>
  )
}
