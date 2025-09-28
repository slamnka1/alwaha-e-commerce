import React from 'react'

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
  return (
    <React.Fragment>
      <Header />
      <InitSession initialValue={session} />
      {children}
      <Footer />
      <FloatingCart />
    </React.Fragment>
  )
}
