import type { GlobalResponse } from '../api/global-response'
import type { Account } from './account'
import type { Company } from './company'
import type { Contact } from './contact'
import type { PaymentTerm } from './payment-term'
import type { Payment } from './payments'
import type { DocumentStatus, PaymentStatus } from './sales-invoices'
import type { Tag } from './tag'
import type { Tax } from './tax'

export interface ExpenseItem extends GlobalResponse {
  account: Account
  description: string
  tax: Tax
  amount: number
}

export interface Expense extends GlobalResponse {
  company: Company
  contact: Contact
  account: Account
  payment_term: PaymentTerm
  expense_number: string
  date: Date
  due_date?: Date
  currency: string
  subtotal: number
  tax_total: number
  total: number
  paid_amount: number
  outstanding: number
  payment_status: PaymentStatus
  document_status: DocumentStatus
  is_paylater: boolean
  expense_items: ExpenseItem[]
  payments: Payment[]
  tags: (string | Tag)[]
  taxes: Tax[]
}
