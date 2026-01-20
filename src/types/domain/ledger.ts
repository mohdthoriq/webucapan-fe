export interface LedgerEntry {
  id: string
  date: string
  source: string
  description: string
  reference: string
  ref_number: string
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
