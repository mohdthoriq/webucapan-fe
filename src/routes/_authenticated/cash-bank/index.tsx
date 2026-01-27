import { createFileRoute } from '@tanstack/react-router'
import CashBankOverviewPage from '@/features/cash-bank'

export const Route = createFileRoute('/_authenticated/cash-bank/')({
  component: CashBankOverviewPage,
})
