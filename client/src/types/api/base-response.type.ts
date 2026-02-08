export interface ApiResponse<T> {
  success: boolean
  code?: string
  message?: string
  data?: T
  errors?: {
    field: string
    message: string
  }[]
}
