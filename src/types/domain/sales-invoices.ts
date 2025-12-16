import type { GlobalResponse } from '../api/global-response'
import type { Company } from './company'
import type { Contact } from './contact'
import type { PaymentTerm } from './payment-term'
import type { Product } from './product'

interface InvoiceItem extends GlobalResponse {
    product_id: Product
    description: string
    quantity: number
    unit_price: number
    discount: number
    tax: number
    total: number
}

export interface SalesInvoice extends GlobalResponse {
  company_id: Company
  customer_id: Contact
  payment_term_id: PaymentTerm
  invoice_number: string
  invoice_date: Date
  due_date: Date
  currency: string
  subtotal: number
  tax_total: number
  total: number
  status: string
  invoice_items: InvoiceItem[]
}
