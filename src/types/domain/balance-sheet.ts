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
  data: {
    [date: string]: BalanceSheetReport | string
    print_url: string
  }
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

export interface BalanceSheetAccountDetailItem {
  id: string
  name: string
  ref_code: string
  opening_balance: number
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
