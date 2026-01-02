import InvoiceLists from '@/features/purchases/invoices/invoice-lists'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/purchases/invoices/')({
  component: InvoiceLists,
})

