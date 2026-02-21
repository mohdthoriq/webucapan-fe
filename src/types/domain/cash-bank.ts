import type { GlobalResponse } from '../api/global-response'
import type { PaginationMeta } from '../api/pagination'
import type { Tag } from './tag'

export enum CashBankTransactionType {
  SalesInvoice = 'SalesInvoicePayment',
  PurchaseInvoice = 'PurchaseInvoicePayment',
  Expense = 'ExpensePayment',
  BankTransfer = 'bank_transfer',
  SpendMoney = 'spend_money',
  ReceiveMoney = 'receive_money',
}

export interface GraphicData {
  date: Date
  balance: number
}

export interface TransactionData extends GlobalResponse {
  trans_date: Date
  desc: string
  memo: string
  ref_number: string
  tags: (string | Tag)[]
  amount_after_tax: number
  balance: number
  status_id: number
  trans_type_id: number
  valid: boolean
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
