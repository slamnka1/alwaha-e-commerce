'use client'

import { useQuery } from '@tanstack/react-query'

import { useEffect } from 'react'

import { ApiResponse } from '@/@types'
import { Session, User } from '@/@types/user'
import apiClient from '@/services/axios'
import { useSession } from '@/store/session-store'

export function InitSession({
  initialValue,
}: {
  initialValue: Session | null
}) {
  const initSession = useSession((s) => s.initSession)
  const updateSession = useSession((s) => s.updateSession)
  useEffect(() => {
    initSession(initialValue)
  }, [])

  const { data } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      try {
        const response = await apiClient.get<ApiResponse<User>>('/auth/me', {
          headers: {
            Authorization: `Bearer ${initialValue?.access_token}`,
          },
        })
        return {
          access_token: initialValue!.access_token,
          ...response.data,
        }
      } catch (error) {
        return null
      }
    },
  })

  useEffect(() => {
    if (data) {
      updateSession(data?.access_token ? data : null)
    }
  }, [data, updateSession])

  return null
}
