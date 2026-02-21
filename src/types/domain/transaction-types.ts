import type { GlobalResponse } from '../api/global-response'

export interface TransactionType extends GlobalResponse {
  name: string
  code: string
  description: string
}
