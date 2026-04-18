import type { Account, Reference, Tag, TransactionType } from '@/types'

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
}
