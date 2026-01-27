import type { GlobalResponse } from '../api/global-response'

export interface GraphicData {
  date: Date
  balance: number
}

export interface CashBankOverview extends GlobalResponse {
  code: string
  name: string
  statement_balance: number
  closing_balance: number
  graphic: GraphicData[]
}
