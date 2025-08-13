import React from 'react'

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
    </React.Fragment>
  )
}
