export interface SizesResponse {
  status: string
  message: string
  data: Size[]
}

export interface Size {
  id: number
  name: string
}
