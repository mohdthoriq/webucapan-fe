import type { GlobalResponse } from '../api/global-response'
import type { Account } from './account'
import type { Expense } from './expenses'
import type { PurchaseInvoice } from './purchases-invoices'
import type { SalesInvoice } from './sales-invoices'
import type { Tag } from './tag'

export enum TransactionCode {
  SalesInvoice = 'sales_invoice_payment',
  PurchaseInvoice = 'purchase_invoice_payment',
  Expense = 'expense_payment',
  BankTransfer = 'bank_transfer',
  SpendMoney = 'spend_money',
  ReceiveMoney = 'receive_money',
}

export interface TransactionType {
  id: string
  name: string
  code: string
  description?: string
}

export interface Reference {
  id: string
  number: string
  type: string
}

export interface Payment extends GlobalResponse {
  company_id: string
  payment_date: Date
  amount: number
  reference_no?: string
  note?: string
  status?: string
  account: Account
  sales_invoice?: SalesInvoice
  purchase_invoice?: PurchaseInvoice
  expense?: Expense
  method: string
  tags?: Tag[]
}
