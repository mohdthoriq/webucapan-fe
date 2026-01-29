export interface CashBankTransactionLine {
  id: string
  account_id: string
  account_code: string
  account_name: string
  description: string
  debit: number
  credit: number
  amount: number
}

export interface CashBankTransactionAudit {
  created_by: string
  created_at: string
  updated_by: string
  updated_at: string
}

export type CashBankTransactionStatus =
  | 'reconciled'
  | 'unreconciled'
  | 'cleared'
  | 'voided'
  | 'deleted'

export interface CashBankTransactionDetail {
  id: string
  account_code: string
  account_name: string
  entry_number: string
  transaction_type: string
  transaction_title: string
  status: CashBankTransactionStatus
  date: string
  reference: string
  reference_type: string
  reference_id: string
  contact_name: string
  contact_id: string
  description: string
  lines: CashBankTransactionLine[]
  total: number
  audit: CashBankTransactionAudit
}
