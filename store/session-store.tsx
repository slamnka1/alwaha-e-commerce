'use client'

import { create } from 'zustand'

import { Session, SessionWithUser } from '@/@types/user'

type SessionStore = {
  session: Partial<SessionWithUser> | null
  isAuthenticated: boolean
  updateSession: (session: Partial<SessionWithUser> | null) => void
  clearSession: () => void
  isPending: boolean
}

export const useSession = create<SessionStore>((set) => ({
  session: null,
  isAuthenticated: false,
  isPending: true,

  updateSession: (session) =>
    set({
      session,
      isAuthenticated: !!session?.access_token,
      isPending: false,
    }),

  clearSession: () =>
    set({
      session: null,
      isAuthenticated: false,
      isPending: false,
    }),
}))
