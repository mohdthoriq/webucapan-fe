import { InvoiceFormPage } from '@/features/sales/invoices/invoice-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/sales/invoices/edit/')({
  component: InvoiceFormPage,
})
