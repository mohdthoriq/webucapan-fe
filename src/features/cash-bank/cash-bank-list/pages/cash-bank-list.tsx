import { getRouteApi, useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CashBankListsProvider } from '../components/cash-bank-list-provider'
import { CashBankListsTable } from '../components/cash-bank-list-table'
import { CashBankPrimaryButton } from '../components/cash-bank-primary-button'
import type { CashBankListQueryParams } from '../hooks/use-cash-bank-query'

const route = getRouteApi('/_authenticated/cash-bank/$accountName')

function CashBankListsContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()

  const location = useLocation()

  const accountData = location.state as unknown as Record<string, string>

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 flex items-center gap-4'>
            <h2 className='text-4xl font-bold tracking-tight'>
              {accountData?.accountName || 'Kas & Bank'}
            </h2>
            <p className='text-muted-foreground text-2xl'>
              {accountData?.accountCode || 'Kelola Kas & Bank'}
            </p>
          </div>
          <div className='flex flex-col items-end gap-2 md:flex-row md:items-start'>
            <Button variant={'link'} onClick={() => window.history.back()}>
              Kembali
            </Button>
            <CashBankPrimaryButton />
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <CashBankListsTable search={search} navigate={navigate} />
      </CardContent>
    </Card>
  )
}

function CashBankLists() {
  const search = route.useSearch() as Record<string, unknown>
  const location = useLocation()
  const accountData = location.state as unknown as Record<string, string>

  const queryParams: CashBankListQueryParams = {
    id:
      (accountData?.accountId as string) || (search.id as string) || undefined,
    page: search.page ? parseInt(search.page as string) : undefined,
    limit: search.limit ? parseInt(search.limit as string) : undefined,
    order: (search.order as string) || undefined,
    date_from: search.date_from
      ? new Date(search.date_from as string)
      : undefined,
    date_to: search.date_to ? new Date(search.date_to as string) : undefined,
    search: (search.search as string) || undefined,
  }

  return (
    <CashBankListsProvider paginationParams={queryParams}>
      <CashBankListsContent />
    </CashBankListsProvider>
  )
}

export default CashBankLists
