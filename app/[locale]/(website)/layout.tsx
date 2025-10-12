import axios from 'axios'

import React from 'react'

import { cookies } from 'next/headers'

import { ApiResponse } from '@/@types'
import { User } from '@/@types/user'
import { listsService } from '@/services'
import apiClient from '@/services/axios'
import { logoutAction } from '@/services/logout-action'
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
      <Header />
      <InitSession initialValue={session} />
      {children}
      <Footer categories={categories.data} />
      <FloatingCart />
    </React.Fragment>
  )
}
