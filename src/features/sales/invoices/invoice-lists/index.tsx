import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { InvoiceListsProvider } from './components/invoice-list-provider'
import { InvoiceListsTable } from './components/invoice-list-table'

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
            <p className='text-muted-foreground'>
              Kelola Tagihan Penjualan.
            </p>
          </div>
          <div className='flex'>
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
  const search = route.useSearch() as Record<string, string>

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined
  const name = search?.name ? search.name : undefined

  return (
    <InvoiceListsProvider paginationParams={{ page, limit, name }}>
      <InvoiceListsContent />
    </InvoiceListsProvider>
  )
}

export default InvoiceLists
