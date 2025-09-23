'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { useEffect } from 'react'

import { ApiResponse } from '@/@types'
import { Session, User } from '@/@types/user'
import apiClient, { BASE_RUL } from '@/services/axios'
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
    enabled: !!initialValue?.access_token,
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<User>>(`/auth/me`, {})
      return {
        access_token: initialValue!.access_token,
        ...response.data,
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
