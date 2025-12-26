enum FinanceNumberType {
  expense = 'expense',
  sales_payment = 'sales_payment',
  sales_invoice = 'sales_invoice',
  purchase_invoice = 'purchase_invoice',
  purchase_payment = 'purchase_payment',
  product_sku = 'product_sku',
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
