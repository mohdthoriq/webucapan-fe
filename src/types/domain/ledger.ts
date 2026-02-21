import type { Account } from './account'
import type { Reference, TransactionType } from './payments'

export interface LedgerEntry {
  id: string
  date: string
  source: TransactionType
  description: string
  account: Account
  reference: Reference
  debit: number
  credit: number
  running_balance: number
}

export interface LedgerData {
  opening_balance: number
  entries: LedgerEntry[]
  total_debit: number
  total_credit: number
  closing_balance: number
}
