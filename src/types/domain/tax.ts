import type { GlobalResponse } from '../api/global-response'
import type { Account } from './account'
import type { Company } from './company'

export interface Tax extends GlobalResponse {
  company: Company
  name: string
  rate: number
  description: string
  sell_account: Account
  buy_account: Account
  is_deletable: boolean
}
