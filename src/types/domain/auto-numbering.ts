export interface FinanceNumber {
  id: string
  title: string
  type: string
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
