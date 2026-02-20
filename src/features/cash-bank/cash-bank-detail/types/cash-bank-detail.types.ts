import type { Tag } from '@/types'

export interface CashBankTransactionItem {
  id: string
  desc: string
  qty: number
  price: number
  amount: number
  account_id: string
  account_code: string
  account_name: string
}

export interface CashBankTransactionContact {
  id: string
  name: string
  email: string | null
  phone: string | null
  address: string | null
}

export interface CashBankTransactionBankAccount {
  id: string
  name: string
  ref_code: string
}

export interface CashBankTransactionAudit {
  created_at: string
  updated_at: string
}

export interface CashBankTransactionDetail {
  id: string
  trans_date: string
  ref_number: string
  contact_id: string
  amount: number
  amount_after_tax: number
  memo: string
  desc: string
  trans_type_id: string
  transaction_type?: string
  valid: boolean
  items: CashBankTransactionItem[]
  contact: CashBankTransactionContact
  bank_account: CashBankTransactionBankAccount
  tags: Tag[]
  audit: CashBankTransactionAudit
  id_journal: string
}
