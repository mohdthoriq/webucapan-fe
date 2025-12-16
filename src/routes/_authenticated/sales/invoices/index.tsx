import InvoiceLists from '@/features/sales/invoices/invoice-lists'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/sales/invoices/')({
  component: InvoiceLists,
})

