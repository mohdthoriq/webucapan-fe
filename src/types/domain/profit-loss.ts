import type { Account } from './account'
import type { Reference, TransactionType } from './payments'

export interface ProfitLossReportData {
  period: DatePeriod
  revenue: RevenueItem
  cogs: COGSItem
  gross_profit: GrossProfitItem
  operating_expenses: OperatingExpensesItem
  net_income: NetIncomeItem
  print_url: string
}

export interface DatePeriod {
  from: string
  to: string
}

export interface BaseProfitLossSection {
  name: string
  total: number
  comparison_totals: []
}

// Revenue
export interface RevenueItem extends BaseProfitLossSection {
  data: SalesData
}

export interface SalesData {
  sales: ProfitLossCategoryDetail
}

// COGS
export interface COGSItem extends BaseProfitLossSection {
  data: COGSData
}

export interface COGSData {
  cogs: ProfitLossCategoryDetail
}

// Gross Profit
export type GrossProfitItem = BaseProfitLossSection

// Operating Expenses
export interface OperatingExpensesItem extends BaseProfitLossSection {
  data: OperatingExpensesData
}

export interface OperatingExpensesData {
  operating_expenses: ProfitLossCategoryDetail
}

// Net Income
export type NetIncomeItem = BaseProfitLossSection

// Shared Details
export interface ProfitLossCategoryDetail {
  name: string
  total: number
  data: ProfitLossAccountItem[]
}

export interface ProfitLossAccountItem {
  account_id: string
  net: number
  account: ProfitLossAccount
  comparison_data: []
}

export interface ProfitLossAccount {
  id: string
  name: string
  ref_code: string
  currency_id: number | null
  parent_id: number | null
  is_parent: number
  formatted: string
}

export interface ProfitLossTransactionData {
  trans_date: string
  id: string
  tran_id: string
  desc: string
  account: Account
  reference: Reference
  credit: number
  debit: number
  amount: string
  trans_type_id: number
  transaction_type: string
  balance: string
  source: TransactionType
  valid: boolean
}

export interface ProfitLossAccountDetailItem {
  id: string
  name: string
  ref_code: string
  opening_balance: number
  opening_debit: number
  opening_credit: number
  data: ProfitLossTransactionData[]
  closing_debit: number
  closing_credit: number
  closing_balance: number
}

export interface ProfitLossAccountDetailData {
  current_page: number
  data: ProfitLossAccountDetailItem[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: []
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  total: number
  journal_total: {
    total_credit: number
    total_debit: number
  }
  account_name: {
    title: string
    code: string
  }
  total_accounts: number
}
