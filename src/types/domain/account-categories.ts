import type { GlobalResponse } from '../api/global-response'

export interface AccountCategory extends GlobalResponse {
  name: string
  description: string
  account_type: string
  normal_balance: string
  report_group: string
  code_prefix: string
  is_system: boolean
  allowed_transactions: {
    id: string
    name: string
    code: string
  }[]
}
