import type { GlobalResponse } from '../api/global-response'
import type { Company } from './company'

export interface Tax extends GlobalResponse {
  company: Company
  name: string
  rate: number
  description: string
  sell_account: {
    id: string
    ref_code: string
    name: string
  }
  buy_account: {
    id: string
    ref_code: string
    name: string
  }
  is_deletable: boolean
  is_active: boolean
  is_withholding: boolean
}

export interface TransactionTax extends Tax {
  amount: number
}
