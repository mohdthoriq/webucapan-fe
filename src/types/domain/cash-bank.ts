import type { GlobalResponse } from '../api/global-response'
import type { PaginationMeta } from '../api/pagination'
import type { Tag } from './tag'

export interface GraphicData {
  date: Date
  balance: number
}

export interface TransactionData extends GlobalResponse {
  date: Date
  description: string
  reference: string
  ref_number: string
  tags: (string | Tag)[]
  received: number
  spent: number
  balance: number
  status: string
  reference_id: string | null
  reference_type: string | null
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
