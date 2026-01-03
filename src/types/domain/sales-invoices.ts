import type { GlobalResponse } from '../api/global-response'
import type { Account } from './account'
import type { Company } from './company'
import type { Contact } from './contact'
import type { PaymentTerm } from './payment-term'
import type { Product } from './product'
import type { Tag } from './tag'
import type { Tax } from './tax'

export enum Status {
  unpaid = 'unpaid',
  partially_paid = 'partially_paid',
  paid = 'paid',
}

export interface InvoiceItem extends GlobalResponse {
  product: Product
  description: string
  quantity: number
  unit_price: number
  discount: number | undefined
  tax: Tax
  line_total: number
}

export interface InvoicePayment extends GlobalResponse {
  payment_date: Date
  amount: number
  method: string
  reference_no: string
  note: string
  status: string
  account: Account
}

export interface SalesInvoice extends GlobalResponse {
  company: Company
  customer: Contact
  payment_term: PaymentTerm
  invoice_number: string
  invoice_date: Date
  due_date: Date
  currency: string
  subtotal: number
  tax_total: number
  total: number
  paid_amount: number
  outstanding: number
  status: Status
  sales_invoice_items: InvoiceItem[]
  sales_invoice_payments: InvoicePayment[]
  tags: (string | Tag)[]
  taxes: Tax[]
}
