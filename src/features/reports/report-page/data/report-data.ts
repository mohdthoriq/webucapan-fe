import type { ReportData } from '../types/report-data.types'

export const reportData: ReportData[] = [
  {
    category: 'Finansial',
    reports: [
      {
        id: 1,
        name: 'Neraca',
        url: '/reports/balance-sheet',
      },
      {
        id: 2,
        name: 'Arus Kas',
        // url: '/reports/cash-flow',
      },
      {
        id: 3,
        name: 'Laba Rugi',
        url: '/reports/profit-loss',
      },
      {
        id: 4,
        name: 'Perubahan Modal',
        // url: '/reports/capital-changes',
      },
    ],
  },
  {
    category: 'Akuntansi',
    reports: [
      {
        id: 5,
        name: 'Buku Besar',
        // url: '/reports/ledger',
      },
      {
        id: 6,
        name: 'Jurnal',
        // url: '/reports/journal',
      },
      {
        id: 7,
        name: 'Trial Balance',
        // url: '/reports/trial-balance',
      },
    ],
  },
]
