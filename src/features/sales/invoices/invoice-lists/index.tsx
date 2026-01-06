import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { InvoiceListsProvider } from './components/invoice-list-provider'
import { InvoiceListsTable } from './components/invoice-list-table'
import type { InvoiceListQueryParams } from './hooks/use-invoice-list-query'

const route = getRouteApi('/_authenticated/sales/invoices/')

function InvoiceListsContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Tagihan Penjualan
            </h2>
            <p className='text-muted-foreground'>Kelola Tagihan Penjualan.</p>
          </div>
          <div className='flex flex-col items-end gap-2 md:flex-row md:items-start'>
            <Button variant={'link'} onClick={() => history.go(-1)}>
              Kembali
            </Button>
            <Button onClick={() => navigate({ to: '/sales/invoices/add' })}>
              <Plus className='mr-2 h-4 w-4' />
              Tambah Tagihan
            </Button>
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <InvoiceListsTable search={search} navigate={navigate} />
      </CardContent>
    </Card>
  )
}

function InvoiceLists() {
  const search = route.useSearch() as Record<string, unknown>

  const queryParams: InvoiceListQueryParams = {
    page: search.page ? parseInt(search.page as string) : undefined,
    limit: search.limit ? parseInt(search.limit as string) : undefined,
    invoice_number: (search.name as string) || undefined,
    status: (search.status as InvoiceListQueryParams['status']) || undefined,
    customer_id: (search.customer_id as string) || undefined,
    company_id: (search.company_id as string) || undefined,
    order: (search.order as string) || undefined,
    date_from: search.date_from
      ? new Date(search.date_from as string)
      : undefined,
    date_to: search.date_to ? new Date(search.date_to as string) : undefined,
    due_date_from: search.due_date_from
      ? new Date(search.due_date_from as string)
      : undefined,
    due_date_to: search.due_date_to
      ? new Date(search.due_date_to as string)
      : undefined,
    payment_date_from: search.payment_date_from
      ? new Date(search.payment_date_from as string)
      : undefined,
    payment_date_to: search.payment_date_to
      ? new Date(search.payment_date_to as string)
      : undefined,
    tags: search.tags ? (search.tags as string).split(',') : undefined,
  }

  return (
    <InvoiceListsProvider paginationParams={queryParams}>
      <InvoiceListsContent />
    </InvoiceListsProvider>
  )
}

export default InvoiceLists
