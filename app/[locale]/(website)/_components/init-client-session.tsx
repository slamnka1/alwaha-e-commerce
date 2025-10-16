'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { useEffect } from 'react'

import { Session, User } from '@/@types/user'
import { BASE_RUL } from '@/services/axios'
import { useSession } from '@/store/session-store'

export function InitSession({
  initialValue,
}: {
  initialValue: Session | null
}) {
  const updateSession = useSession((s) => s.updateSession)
  useEffect(() => {
    if (initialValue) {
      updateSession(initialValue)
    }
  }, [initialValue, updateSession])

  const { data } = useQuery({
    queryKey: ['session'],
    enabled: initialValue ? (initialValue.access_token ? true : false) : false,
    queryFn: async () => {
      if (!initialValue) return null
      const response = await axios.get<User>(`${BASE_RUL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${initialValue.access_token}`,
        },
      })
      return {
        access_token: initialValue.access_token,
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
