import type { UnitsType } from '@/features/sales/invoices/invoice-form/types/invoice-form.schema'
import type { GlobalResponse } from '../api/global-response'
import type { Account } from './account'
import type { Company } from './company'
import type { Contact } from './contact'
import type { Expedition } from './expedition'
import type { PaymentTerm } from './payment-term'
import type { Payment } from './payments'
import type { Product } from './product'
import type { Tag } from './tag'
import type { Tax, TransactionTax } from './tax'

export enum PaymentStatus {
  unpaid = 'unpaid',
  partially_paid = 'partially_paid',
  paid = 'paid',
}

export enum DocumentStatus {
  draft = 'draft',
  posted = 'posted',
  void = 'void',
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

export interface AdditionalDiscount extends GlobalResponse {
  type: UnitsType
  value: number
  amount: number
  name: string
}

export interface TransactionFee extends GlobalResponse {
  name: string
  type: UnitsType
  value: number
  amount: number
}

export interface Deduction extends GlobalResponse {
  account: Account
  account_id: string
  type: UnitsType
  value: number
  amount: number
  name: string
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
  payment_status: PaymentStatus
  document_status: DocumentStatus
  sales_invoice_items: InvoiceItem[]
  payments: Payment[]
  tags: (string | Tag)[]
  taxes: TransactionTax[]
  additional_discounts: AdditionalDiscount[]
  transaction_fees: TransactionFee[]
  deductions: Deduction[]
  is_tax_inclusive: boolean
  shipping_fee: number
  shipping_date: Date
  expedition_id: string
  expedition: Expedition | null
  tracking_number: string
  note?: string | null
  is_pos: boolean
}
