import type { GlobalResponse } from '../api/global-response'

export interface AccountType extends GlobalResponse {
  code: string
  name: string
  normal_balance: string
}
