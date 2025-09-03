// Define error response structure
export interface ApiError {
  status: string
  message: string
  errors?: { [key: string]: string[] }
}

// Define successful response structure
export interface ApiResponse<T = any> {
  data: T
  message?: string
  status: number
}
