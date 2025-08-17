import React from 'react'

import Footer from './_components/footer'
import Header from './_components/header'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  )
}
