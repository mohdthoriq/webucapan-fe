import type { GlobalResponse } from '../api/global-response'
import type { Company } from './company'
import type { Contact } from './contact'
import type { PaymentTerm } from './payment-term'
import type { Payment } from './payments'
import type { Product } from './product'
import type { DocumentStatus, PaymentStatus } from './sales-invoices'
import type { Tag } from './tag'
import type { Tax } from './tax'

export interface PurchaseItems extends GlobalResponse {
  product: Product
  description: string
  quantity: number
  unit_price: number
  discount: number | undefined
  tax: Tax
  line_total: number
}

export interface PurchaseInvoice extends GlobalResponse {
  company: Company
  vendor: Contact
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
  payment_status: PaymentStatus
  document_status: DocumentStatus
  purchase_invoice_items: PurchaseItems[]
  payments: Payment[]
  tags: (string | Tag)[]
  taxes: Tax[]
}
