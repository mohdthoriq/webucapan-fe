export const PERMISSION_KEY = {
  // Dashboard
  DASHBOARD_VIEW: 'dashboard.view',

  // Sales
  SALES: 'sales',
  SALES_OVERVIEW_VIEW: 'sales.overview.view',
  SALES_INVOICE: 'sales.invoice',
  SALES_INVOICE_VIEW: 'sales.invoice.view',
  SALES_INVOICE_ADD: 'sales.invoice.add',
  SALES_INVOICE_EDIT: 'sales.invoice.edit',
  SALES_INVOICE_DELETE: 'sales.invoice.delete',

  // Purchase
  PURCHASE: 'purchase',
  PURCHASE_OVERVIEW_VIEW: 'purchase.overview.view',
  PURCHASE_INVOICE: 'purchase.invoice',
  PURCHASE_INVOICE_VIEW: 'purchase.invoice.view',
  PURCHASE_INVOICE_ADD: 'purchase.invoice.add',
  PURCHASE_INVOICE_EDIT: 'purchase.invoice.edit',
  PURCHASE_INVOICE_DELETE: 'purchase.invoice.delete',

  // Expense
  EXPENSE: 'expense',
  EXPENSE_VIEW: 'expense.view',
  EXPENSE_ADD: 'expense.add',
  EXPENSE_EDIT: 'expense.edit',
  EXPENSE_DELETE: 'expense.delete',

  // Product Category
  PRODUCT_CATEGORY: 'product.category',
  PRODUCT_CATEGORY_VIEW: 'product.category.view',
  PRODUCT_CATEGORY_ADD: 'product.category.add',
  PRODUCT_CATEGORY_EDIT: 'product.category.edit',
  PRODUCT_CATEGORY_DELETE: 'product.category.delete',

  // Product
  PRODUCT: 'product',
  PRODUCT_VIEW: 'product.view',
  PRODUCT_ADD: 'product.add',
  PRODUCT_EDIT: 'product.edit',
  PRODUCT_DELETE: 'product.delete',

  // Reports
  REPORTS: 'reports',
  REPORTS_BALANCE_SHEET: 'reports.balance.sheet',
  REPORTS_BALANCE_SHEET_VIEW: 'reports.balance.sheet.view',
  REPORTS_PROFIT_LOSS: 'reports.profit.loss',
  REPORTS_PROFIT_LOSS_VIEW: 'reports.profit.loss.view',

  // Cash & Bank
  CASH_BANK: 'cash.bank',
  CASH_BANK_OVERVIEW_VIEW: 'cash.bank.overview.view',
  CASH_BANK_VIEW: 'cash.bank.view',
  CASH_BANK_TRANSFER: 'cash.bank.transfer',
  CASH_BANK_SPEND: 'cash.bank.spend',
  CASH_BANK_RECEIVE: 'cash.bank.receive',
  CASH_BANK_EDIT: 'cash.bank.edit',

  // Account
  ACCOUNT: 'account',
  ACCOUNT_VIEW: 'account.view',
  ACCOUNT_ADD: 'account.add',
  ACCOUNT_EDIT: 'account.edit',
  ACCOUNT_DELETE: 'account.delete',
  ACCOUNT_LEDGER: 'account.ledger',

  // Contact
  CONTACT: 'contact',
  CONTACT_VIEW: 'contact.view',
  CONTACT_ADD: 'contact.add',
  CONTACT_EDIT: 'contact.edit',
  CONTACT_DELETE: 'contact.delete',

  // Settings
  SETTINGS: 'settings',
  SETTINGS_COMPANY: 'settings.company',
  SETTINGS_COMPANY_VIEW: 'settings.company.view',
  SETTINGS_COMPANY_EDIT: 'settings.company.edit',
  SETTINGS_BILLING: 'settings.billing',
  SETTINGS_BILLING_VIEW: 'settings.billing.view',
  SETTINGS_BILLING_UPGRADE: 'settings.billing.upgrade',
  SETTINGS_AUTO_SEQUENCING: 'settings.auto.sequencing',
  SETTINGS_AUTO_SEQUENCING_VIEW: 'settings.auto.sequencing.view',
  SETTINGS_AUTO_SEQUENCING_EDIT: 'settings.auto.sequencing.edit',
  SETTINGS_USER: 'settings.user',
  SETTINGS_USER_VIEW: 'settings.user.view',
  SETTINGS_USER_ADD: 'settings.user.add',
  SETTINGS_COMPANY_ROLE: 'settings.company.role',
  SETTINGS_COMPANY_ROLE_VIEW: 'settings.company.role.view',
  SETTINGS_COMPANY_ROLE_ADD: 'settings.company.role.add',
  SETTINGS_COMPANY_ROLE_EDIT: 'settings.company.role.edit',
  SETTINGS_COMPANY_ROLE_DELETE: 'settings.company.role.delete',
  SETTINGS_UNIT: 'settings.unit',
  SETTINGS_UNIT_VIEW: 'settings.unit.view',
  SETTINGS_UNIT_ADD: 'settings.unit.add',
  SETTINGS_UNIT_EDIT: 'settings.unit.edit',
  SETTINGS_UNIT_DELETE: 'settings.unit.delete',
  SETTINGS_TAX: 'settings.tax',
  SETTINGS_TAX_VIEW: 'settings.tax.view',
  SETTINGS_TAX_ADD: 'settings.tax.add',
  SETTINGS_TAX_EDIT: 'settings.tax.edit',
  SETTINGS_TAX_DELETE: 'settings.tax.delete',
  SETTINGS_PAYMENT_TERM: 'settings.payment.term',
  SETTINGS_PAYMENT_TERM_VIEW: 'settings.payment.term.view',
  SETTINGS_PAYMENT_TERM_ADD: 'settings.payment.term.add',
  SETTINGS_PAYMENT_TERM_EDIT: 'settings.payment.term.edit',
  SETTINGS_PAYMENT_TERM_DELETE: 'settings.payment.term.delete',
  SETTINGS_TAG: 'settings.tag',
  SETTINGS_TAG_VIEW: 'settings.tag.view',
  SETTINGS_TAG_ADD: 'settings.tag.add',
  SETTINGS_TAG_EDIT: 'settings.tag.edit',
  SETTINGS_TAG_DELETE: 'settings.tag.delete',
  SETTINGS_PROFILE: 'settings.profile',
  SETTINGS_PROFILE_VIEW: 'settings.profile.view',
  SETTINGS_PROFILE_EDIT: 'settings.profile.edit',
} as const

export type PermissionKey = (typeof PERMISSION_KEY)[keyof typeof PERMISSION_KEY]
