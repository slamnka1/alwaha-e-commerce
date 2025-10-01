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
  meta: {
    total: number
    per_page: number
    current_page: number
    last_page: number
    next_page_url: string | null
    previous_page_url: string | null
    from: number
    to: number
  }
  message?: string
  status: number
}
