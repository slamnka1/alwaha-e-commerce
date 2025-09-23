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
  emirate: {
    id: number
    name: string
  }
  region: {
    id: number
    name: string
  }
  address: string
}

export interface Session {
  access_token: string
}
export interface SessionWithUser extends Session, User {}
