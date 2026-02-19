import type { GlobalResponse } from '../api/global-response'
import type { Account } from './account'
import type { Expense } from './expenses'
import type { PurchaseInvoice } from './purchases-invoices'
import type { SalesInvoice } from './sales-invoices'
import type { Tag } from './tag'

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
  tags?: Tag[]
}
