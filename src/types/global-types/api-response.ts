import type { PaginationMeta } from './pagination'

export type ApiStatus = 'success' | 'error'

export interface ApiResponse<T = unknown> {
  status: ApiStatus
  code: number
  message: string
  content: T | null
  pagination?: PaginationMeta | null
  errors?: string[] | null
}
