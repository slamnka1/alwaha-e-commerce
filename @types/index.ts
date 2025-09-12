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

export interface PaginatedApiResponse<T = any> {
  data: T[]
  from: number
  to: number
  total: number
  per_page: number
  current_page: number
  last_page: number
  next_page_url: string | null
  previous_page_url: string | null
  message?: string
  status: number
}
