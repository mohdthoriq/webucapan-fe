import type { GlobalResponse } from '../api/global-response'
import type { Company } from './company'
import type { Contact } from './contact'
import type { PaymentTerm } from './payment-term'
import type { Product } from './product'
import type { Tax } from './tax'

export enum Status {
  draft = 'draft',
  sent = 'sent',
  paid = 'paid',
  cancelled = 'cancelled',
}

export interface InvoiceItem extends GlobalResponse {
  product: Product
  description: string
  quantity: number
  unit_price: number
  discount: number
  tax: Tax
  total: number
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
  status: Status
  invoice_items: InvoiceItem[]
  tags: string[]
}
