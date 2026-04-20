import type { GlobalResponse } from '../api/global-response';
import type { PaginationMeta } from '../api/pagination';
import type { Account } from './account';
import type { Reference, TransactionType } from './payments';
import type { Tag } from './tag';


export interface GraphicData {
  date: Date
  balance: number
}

export interface TransactionData extends GlobalResponse {
  trans_date: Date
  desc: string
  note: string
  account: Account
  reference: Reference | string
  entry_number?: string
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

export interface CashBankTransactionItem {
  id: string
  desc: string
  qty: number
  price: number
  amount: number
  account: Account
}

export interface CashBankTransactionContact {
  id: string
  name: string
  email: string | null
  phone: string | null
  address: string | null
}

export interface CashBankTransactionAudit {
  created_at: string
  updated_at: string
}

export interface CashBankTransactionDetail {
  id: string
  trans_date: string
  reference: Reference
  contact_id: string
  amount: number
  amount_after_tax: number
  note: string
  desc: string
  trans_type_id: string
  transaction_type?: TransactionType
  valid: boolean
  items: CashBankTransactionItem[]
  contact: CashBankTransactionContact
  account: Account
  tags: Tag[]
  audit: CashBankTransactionAudit
  id_journal: string
  entry_number?: string
}