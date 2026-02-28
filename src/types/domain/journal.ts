import type { Account } from './account'
import type { Reference, TransactionType } from './payments'

export interface JournalLine {
  id: string
  journal_id: string
  account_id: string
  debit: number
  credit: number
  description: string | null
  account: Account
}

export interface Journal {
  id: string
  company_id: string
  entry_number: string
  date: string
  description: string | null
  reference_type: string | null
  reference_id: string | null
  reference: Reference | null
  transaction_type_id: string | null
  transaction_type: TransactionType | null
  journal_lines: JournalLine[]
}
