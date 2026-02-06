interface Period {
  last_period_start: string
  last_period_end: string
  current_period_start: string
  current_period_end: string
}
export interface BalanceSheetAccount {
  id: number | string
  name: string
  ref_code: string
  currency_id?: number | null
  parent_id?: number | null
  is_parent?: number
}

export interface BalanceSheetItem {
  account_id: number | string
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
  assets: BalanceSheetSection
  liabilities_equity: BalanceSheetSection
}

export interface BalanceSheetData {
  [date: string]: BalanceSheetReport | string
  print_url: string
}

export interface QuickRatioData {
  balance_sheet_quick_ratio: {
    quick_ratio: {
      name: string
      total: number
      target: number
    }
    config: {
      movement_compare: string
      date: Date
    }
  }
}

export interface DebtEquityRatioData {
  balance_sheet_debt_equity_ratio: {
    config: {
      movement_compare: string
      date: Date
    }
    debt_to_equity_ratio: {
      name: string
      value: number
      percent: number
    }
  }
}

export interface CurrentRatioData {
  balance_sheet_current_ratio: {
    current_ratio: {
      name: string
      total: number
      percent: number
    }
    config: {
      movement_compare: string
      date: Date
      date_from: Date
      type: string
    }
  }
}

export interface EquityRatioData {
  balance_sheet_equity_ratio: {
    equity_ratio: {
      name: string
      total: number
      percent: number
    }
    config: {
      movement_compare: string
      date: Date
      date_from: Date
      type: string
    }
  }
}

export interface BalanceSheetTransactionData {
  trans_date: string
  id: string
  tran_id: string
  desc: string
  account_id: string
  reference: string
  credit: number
  debit: number
  amount: string
  trans_type_id: number
  balance: string
  ref_number: string
  source: string
  valid: boolean
}

export interface BalanceSheetAccountDetailItem {
  id: string
  name: string
  ref_code: string
  finance_account_category_id: string
  opening_balance: number
  opening_debit: number
  opening_credit: number
  data: BalanceSheetTransactionData[]
  closing_debit: number
  closing_credit: number
  closing_balance: number
}

export interface BalanceSheetAccountDetailData {
  current_page: number
  data: BalanceSheetAccountDetailItem[]
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
