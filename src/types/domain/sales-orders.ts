import type { GlobalResponse } from '../api/global-response'
import type { Company } from './company'
import type { Contact } from './contact'
import type { Expedition } from './expedition'
import type { PaymentTerm } from './payment-term'
import type { Payment } from './payments'
import type { Product } from './product'
import type { Tag } from './tag'
import type { Tax } from './tax'
import type {
  AdditionalDiscount,
  DocumentStatus,
  PaymentStatus,
  TransactionFee,
} from './sales-invoices'

export interface SalesOrderItem extends GlobalResponse {
  product: Product
  product_id: string
  description: string
  quantity: number
  unit_price: number
  purchase_price: number
  tax_id: string
  tax?: Tax
  discount: number
  line_total: number
}

export interface SalesOrder extends GlobalResponse {
  company_id: string
  company?: Company
  customer_id: string
  customer?: Contact
  payment_term_id: string
  payment_term?: PaymentTerm
  order_number: string
  order_date: Date
  due_date: Date
  currency: string
  subtotal: number
  tax_total: number
  taxes: Tax[] | null
  total: number
  note: string
  document_status: DocumentStatus
  payment_status: PaymentStatus
  paid_amount: number
  outstanding: number
  sales_order_items: SalesOrderItem[]
  additional_discounts: AdditionalDiscount[]
  is_tax_inclusive: boolean
  shipping_fee: number
  transaction_fees: TransactionFee[]
  tags: (string | Tag)[]
  shipping_date: Date | string
  expedition_id: string
  tracking_number: string
  expedition: Expedition | null
  payments: (Payment | null)[]
  dp_type: 'percent' | 'fixed'
  dp_value: number
  dp_amount: number
  dp_account_id: string
  attachments: string[]
  is_pos: boolean
  shift_id: string | null
}
