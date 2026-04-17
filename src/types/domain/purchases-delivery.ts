import type { GlobalResponse } from '../api/global-response'
import type { Company } from './company'
import type { Contact } from './contact'
import type { Expedition } from './expedition'
import type { PaymentTerm } from './payment-term'
import type { Payment } from './payments'
import type { Product } from './product'
import type { Tag } from './tag'
import type { Tax } from './tax'
import type { DocumentStatus, PaymentStatus } from './sales-invoices'

export interface PurchaseDeliveryItem extends GlobalResponse {
  product: Product
  description: string
  quantity: number
  unit_price: number
  discount: number | undefined
  tax: Tax | null
  line_total: number
}

export interface PurchaseDelivery extends GlobalResponse {
  number: string
  customer: string | Contact
  date: string
  expedition: string | Expedition | null
  tracking_number: string
  status: string
  reference: string
  // Optional detailed fields
  company?: Company
  vendor?: Contact
  payment_term?: PaymentTerm
  invoice_number?: string
  invoice_date?: Date
  due_date?: Date
  currency?: string
  subtotal?: number
  tax_total?: number
  total?: number
  paid_amount?: number
  outstanding?: number
  payment_status?: PaymentStatus
  document_status?: DocumentStatus
  purchase_invoice_items?: PurchaseDeliveryItem[]
  payments?: Payment[]
  tags?: (string | Tag)[]
  taxes?: Tax[]
  shipping_fee?: number
  shipping_date?: Date | null
  expedition_id?: string | null
}


