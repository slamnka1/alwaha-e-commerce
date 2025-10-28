export interface UserSize {
  id: number
  user_id: number
  name: string
  hip_size: string
  chest_size: string
  color: string
  created_at: string
  updated_at: string
}

export interface FitSize {
  id: number
  size_code: string
  quantity: number
  chest_cm: string
  hip_cm: string
  user_size:
    | {
        id: number
        name: string
        hip_cm: string
        chest_cm: string
        color: string
      }[]
    | null
}
