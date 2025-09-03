import axios, { AxiosInstance } from 'axios'

import { getLocale } from 'next-intl/server'

import { useSession } from '@/store/session-store'
import { getServerSession } from '@/utils/get-server-session'

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://waha.droos.live/api',
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
      const locale = document.documentElement.lang || 'en'
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

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Export the configured client
export default apiClient
