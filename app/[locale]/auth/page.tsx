import React from 'react'

import { redirect } from '@/lib/i18n/navigation'

type Props = {
  params: Promise<{
    locale: string
  }>
}

const Page = async (props: Props) => {
  const { locale } = await props.params
  redirect({ href: '/auth/login', locale })
}

export default Page
