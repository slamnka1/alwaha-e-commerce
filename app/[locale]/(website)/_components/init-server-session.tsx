import React from 'react'

import { getServerSession } from '@/utils/get-server-session'

import { InitSession } from './init-client-session'

export default async function InitServerSession() {
  const session = await getServerSession()

  return <InitSession initialValue={session} />
}
