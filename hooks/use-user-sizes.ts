'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useTranslations } from 'next-intl'

import { UserSize } from '@/@types/sizes'
import { sizes as sizesService } from '@/services/sizes'
import { useSession } from '@/store/session-store'

export const userSizesQueryKey = ['user-sizes']

export function useUserSizes() {
  const { session } = useSession()
  return useQuery({
    queryKey: userSizesQueryKey,
    queryFn: () => sizesService.getSizes(),
    enabled: !!session?.access_token,
  })
}

type CreateOrUpdatePayload = Omit<
  UserSize,
  'id' | 'user_id' | 'created_at' | 'updated_at'
>

export function useCreateUserSize() {
  const t = useTranslations('addSizeForm')
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateOrUpdatePayload) =>
      sizesService.createSize(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userSizesQueryKey })
      if (t) toast.success(t('success'))
    },
  })
}

export function useUpdateUserSize() {
  const t = useTranslations('addSizeForm')
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (args: { id: number; payload: CreateOrUpdatePayload }) =>
      sizesService.updateSize(args.id, args.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userSizesQueryKey })
      if (t) toast.success(t('success'))
    },
  })
}

export function useDeleteUserSize() {
  const t = useTranslations('search.filters')
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => sizesService.deleteSize(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userSizesQueryKey })
      toast.success(t('clearAll'))
    },
  })
}
