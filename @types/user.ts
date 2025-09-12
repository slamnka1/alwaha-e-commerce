export interface UserResponse {
  status: string
  message: string
  user: User
  authorization: Authorization
}

export interface Authorization {
  token: string
  type: string
}

export interface User {
  phone_number: string
  name: string
  email: string
  updated_at: string
  created_at: string
  id: number
  emirate_id: string
  region: string
  full_address: string
}

export interface Session extends User {
  access_token: string
}
