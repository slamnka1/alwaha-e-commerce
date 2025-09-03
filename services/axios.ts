import axios, { AxiosInstance } from 'axios'

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://waha.droos.live/api',
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = localStorage.getItem('auth-token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    // // Add locale header for internationalization
    // const locale = document.documentElement.lang || 'en'
    // config.headers['Accept-Language'] = locale

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Export the configured client
export default apiClient
