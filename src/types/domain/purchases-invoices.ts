import type { GlobalResponse } from '../api/global-response'
import type { Account } from './account'
import type { Company } from './company'
import type { Contact } from './contact'
import type { PaymentTerm } from './payment-term'
import type { Product } from './product'
import type { Status } from './sales-invoices'
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

export interface PurchasePayment extends GlobalResponse {
  payment_date: Date
  amount: number
  method: string
  reference_no: string
  note: string
  status: string
  account: Account
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
  status: Status
  purchase_items: PurchaseItems[]
  purchase_payments: PurchasePayment[]
  tags: (string | Tag)[]
  taxes: Tax[]
}
