import axios from 'axios'

import React from 'react'

import { cookies } from 'next/headers'

import { ApiResponse } from '@/@types'
import { User } from '@/@types/user'
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
  const user = await (async () => {
    if (!session) return null
    try {
      const response = await apiClient.get<ApiResponse<User>>(`/auth/me`, {})
      return {
        access_token: session!.access_token,
        ...response.data.data,
      }
    } catch (error) {
      // If the API call fails (e.g., 401), return null to let the client handle it
      console.error('Failed to fetch user data:', error)

      return null
    }
  })()
  return (
    <React.Fragment>
      <Header />
      <InitSession initialValue={user} />
      {children}
      <Footer />
      <FloatingCart />
    </React.Fragment>
  )
}
