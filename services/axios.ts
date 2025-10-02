import axios, { AxiosInstance } from 'axios'

import { getLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'

import { useSession } from '@/store/session-store'
import { getLocaleFromUrl } from '@/utils/get-locale'
import { getServerSession } from '@/utils/get-server-session'

import { logoutAction } from './logout-action'

export const BASE_RUL = 'https://waha.droos.live/api'
// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_RUL,
})

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const session = useSession.getState().session
      if (session) {
        config.headers.Authorization = `Bearer ${session.access_token}`
      }
      // Add locale header for internationalization
      const locale = getLocaleFromUrl()
      config.headers['Accept-Language'] = locale
    } else {
      const session = await getServerSession()
      if (session) {
        config.headers.Authorization = `Bearer ${session.access_token}`
      }
      // Add locale header for internationalization
      const locale = await getLocale()
      config.headers['Accept-Language'] = locale
    }

    // turn URLSearchParams to object , and handle arrays
    if (config.params && config.params instanceof URLSearchParams) {
      const paramsObject: Record<string, unknown> = {}
      for (const [key, value] of config.params.entries()) {
        if (key.endsWith('[]')) {
          //  for arrays
          paramsObject[key.slice(0, -2)] = value.split(',').filter(Boolean)
        } else {
          // Otherwise, just assign the value
          paramsObject[key] = value
        }
      }

      config.params = paramsObject
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log('🚀 ~ error:', error)
    if (error.response?.status === 401) {
      // Only handle 401 on client side to avoid server-side cookie issues
      if (typeof window !== 'undefined') {
        try {
          await axios.post('/api/logout')
        } catch (logoutError) {
          console.error('Logout failed:', logoutError)
        }

        useSession.getState().initSession(null)

        const locale = getLocaleFromUrl()
        window.location.href = `/${locale}`
      }
      // For server-side 401s, let the error propagate naturally
      // The server component will handle the redirect appropriately
    }

    // Prepare fallback message with status code
    const statusCode = error?.response?.status ?? 'Unknown'
    const fallbackMessage = `Request failed with status code ${statusCode}`

    // Set custom message
    error.message =
      error?.response?.data?.errors?.[0] ??
      error?.response?.data?.message ??
      fallbackMessage

    return Promise.reject(error)
  }
)

// Export the configured client
export default apiClient
