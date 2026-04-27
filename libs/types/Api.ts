export interface ApiResult<T> {
  success: boolean
  data: T | null
  error: string | null
}
