'use client'

import { useQuery } from '@tanstack/react-query'

import { useEffect } from 'react'

import { Session, User } from '@/@types/user'
import apiClient from '@/services/axios'
import { useSession } from '@/store/session-store'

export function InitSession({
  initialValue,
}: {
  initialValue: Session | null
}) {
  const updateSession = useSession((s) => s.updateSession)

  const { data } = useQuery({
    queryKey: ['session'],
    enabled: !!initialValue?.access_token,
    queryFn: async () => {
      const response = await apiClient.get<User>(`/auth/me`, {})
      return {
        access_token: initialValue!.access_token,
        ...response.data,
      }
    },
    // initialData: initialValue,
  })

  useEffect(() => {
    if (data) {
      updateSession(data?.access_token ? data : null)
    }
  }, [data, updateSession])

  return null
}
