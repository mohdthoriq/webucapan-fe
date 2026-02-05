import type { ReportData } from '../types/report-data.types'

export const reportData: ReportData[] = [
  {
    category: 'Finansial',
    reports: [
      {
        name: 'Neraca',
        url: '/reports/balance-sheet',
      },
      {
        name: 'Arus Kas',
        // url: '/reports/cash-flow',
      },
      {
        name: 'Laba Rugi',
        url: '/reports/profit-loss',
      },
      {
        name: 'Perubahan Modal',
        // url: '/reports/capital-changes',
      },
    ],
  },
  {
    category: 'Akuntansi',
    reports: [
      {
        name: 'Buku Besar',
        // url: '/reports/ledger',
      },
      {
        name: 'Jurnal',
        // url: '/reports/journal',
      },
      {
        name: 'Trial Balance',
        // url: '/reports/trial-balance',
      },
    ],
  },
]
