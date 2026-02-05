interface Period {
  last_period_start: string
  last_period_end: string
  current_period_start: string
  current_period_end: string
}
export interface BalanceSheetAccount {
  id: number
  name: string
  ref_code: string
  currency_id?: number | null
  parent_id?: number | null
  is_parent?: number
}

export interface BalanceSheetItem {
  account_id: number
  net: number
  name?: string
  account: BalanceSheetAccount
}

export interface BalanceSheetCategory {
  name: string
  total: number
  data: BalanceSheetItem[]
  period?: Period
}

export interface BalanceSheetSection {
  name: string
  total: number
  data: {
    [key: string]: BalanceSheetCategory
  }
}

export interface BalanceSheetReport {
  [key: string]: BalanceSheetSection
}

export interface BalanceSheetData {
  [date: string]: BalanceSheetReport | string
  print_url: string
}

