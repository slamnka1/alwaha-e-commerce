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
