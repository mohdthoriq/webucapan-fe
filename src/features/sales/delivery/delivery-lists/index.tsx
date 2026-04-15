import { getRouteApi } from '@tanstack/react-router'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DeliveryListsProvider } from './components/delivery-list-provider'
import { DeliveryListsTable } from './components/delivery-list-table'
import type { DeliveryListQueryParams } from './hooks/use-delivery-list-query'

const route = getRouteApi('/_authenticated/sales/delivery/')

function DeliveryListsContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Pengiriman Penjualan
            </h2>
            <p className='text-muted-foreground'>
              Kelola pengiriman penjualan.
            </p>
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <DeliveryListsTable search={search} navigate={navigate} />
      </CardContent>
    </Card>
  )
}

function DeliveryLists() {
  const search = route.useSearch() as Record<string, unknown>

  const queryParams: DeliveryListQueryParams = {
    page: search.page ? parseInt(search.page as string) : undefined,
    limit: search.limit ? parseInt(search.limit as string) : undefined,
    invoice_number: (search.invoice_number as string) || undefined,
    payment_status:
      (search.payment_status as DeliveryListQueryParams['payment_status']) ||
      undefined,
    customer_id: (search.customer_id as string) || undefined,
    company_id: (search.company_id as string) || undefined,
    order: (search.order as string) || undefined,
    shipping_date_from: search.shipping_date_from
      ? new Date(search.shipping_date_from as string)
      : undefined,
    shipping_date_to: search.shipping_date_to
      ? new Date(search.shipping_date_to as string)
      : undefined,
    expedition_id: (search.expedition_id as string) || undefined,
  }

  return (
    <DeliveryListsProvider paginationParams={queryParams}>
      <DeliveryListsContent />
    </DeliveryListsProvider>
  )
}

export default DeliveryLists
