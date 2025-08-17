import axios, { AxiosInstance } from 'axios'

// Define error response structure
export interface ApiError {
  message: string
  status: number
  code?: string
  details?: any
}

// Define successful response structure
export interface ApiResponse<T = any> {
  data: T
  message?: string
  status: number
}

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000, // 10 seconds
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add locale header for internationalization
    const locale = document.documentElement.lang || 'en'
    config.headers['Accept-Language'] = locale

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Export the configured client
export default apiClient
