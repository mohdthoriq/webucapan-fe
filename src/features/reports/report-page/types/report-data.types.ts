import type { LinkProps } from '@tanstack/react-router'

export interface ReportData {
  category: string
  reports: Report[]
}

export interface Report {
  id: number
  name: string
  url?: LinkProps['to']
}
