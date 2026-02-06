import type { LinkProps } from '@tanstack/react-router'

export interface ReportData {
  category: string
  reports: Report[]
}

export interface Report {
  name: string
  url?: LinkProps['to']
}
