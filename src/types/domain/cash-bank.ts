import type { GlobalResponse } from '../api/global-response'
import type { PaginationMeta } from '../api/pagination'
import type { Account } from './account'
import type { Reference, TransactionType } from './payments'
import type { Tag } from './tag'

export interface GraphicData {
  date: Date
  balance: number
}

export interface TransactionData extends GlobalResponse {
  trans_date: Date
  desc: string
  memo: string
  account: Account
  reference: Reference
  tags: (string | Tag)[]
  amount_after_tax: number
  balance: number
  trans_type_id: string
  transaction_type: TransactionType
  valid: boolean
}

export interface CashBankOverview extends GlobalResponse {
  code: string
  name: string
  statement_balance: number
  closing_balance: number
  graphic: GraphicData[]
}

export interface CashBankTransaction extends GlobalResponse {
  summary: {
    opening_balance: number
    total_received: number
    total_spent: number
    closing_balance: number
    net_change: number
  }
  page_summary: {
    subtotal_received: number
    subtotal_spent: number
    subtotal_net: number
  }
  transactions: TransactionData[]
  pagination: PaginationMeta
}
