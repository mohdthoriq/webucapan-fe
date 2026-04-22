export enum FinanceNumberType {
  expense = 'expense',
  sales_invoice = 'sales_invoice',
  sales_payment = 'sales_payment',
  sales_delivery = 'sales_delivery',
  sales_order = 'sales_order',
  purchase_invoice = 'purchase_invoice',
  purchase_payment = 'purchase_payment',
  purchase_delivery = 'purchase_delivery',
  purchase_order = 'purchase_order',
  product_sku = 'product_sku',
  bank_transaction = 'bank_transaction',
  bank_transfer = 'bank_transfer',
}

export interface FinanceNumber {
  id: string
  title: string
  type: FinanceNumberType
  format: string
  format_only: string
  sequence: number
  cat_id: string
  reset_every: number
  reset_every_date: string
  reset_every_month: number
}

export interface AutoNumbering {
  id: string
  title: string
  finance_numbers: FinanceNumber[]
}

export interface FinanceNumberCodes {
  code: string
  description: string
}

export interface AutoNumberingResponse {
  data: AutoNumbering[]
  finance_number_codes: FinanceNumberCodes[]
}

export interface GenerateAutoNumberingResponse {
  type: FinanceNumberType
  number: string
  message: string
}
