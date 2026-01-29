import { useEffect } from 'react'
import { getRouteApi, useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CashBankListDialogs } from '../components/cash-bank-list-dialogs'
import { CashBankListsProvider } from '../components/cash-bank-list-provider'
import { CashBankListsTable } from '../components/cash-bank-list-table'
import { CashBankPrimaryButton } from '../components/cash-bank-primary-button'
import type { CashBankListQueryParams } from '../hooks/use-cash-bank-list-query'

const route = getRouteApi('/_authenticated/cash-bank/$accountName')

function CashBankListsContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()

  const location = useLocation()

  const accountData = location.state as unknown as Record<string, string>
  const { accountName } = route.useParams()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 flex items-center gap-4'>
            <h2 className='text-4xl font-bold tracking-tight'>
              {decodeURIComponent(accountName)}
            </h2>
            <p className='text-muted-foreground text-2xl'>
              {accountData?.accountCode || (search.code as string)}
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
        <CashBankListDialogs />
      </CardContent>
    </Card>
  )
}

function CashBankLists() {
  const search = route.useSearch() as Record<string, unknown>
  const navigate = route.useNavigate()
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

  // Effect to persist accountId and accountCode in search params if they exist in state but not in search
  useEffect(() => {
    if (
      (accountData?.accountId && !search.id) ||
      (accountData?.accountCode && !search.code)
    ) {
      navigate({
        search: (prev: Record<string, unknown>) => ({
          ...prev,
          id: search.id || accountData?.accountId,
          code: search.code || accountData?.accountCode,
        }),
        replace: true,
      })
    }
  }, [
    accountData?.accountId,
    accountData?.accountCode,
    search.id,
    search.code,
    navigate,
  ])

  return (
    <CashBankListsProvider paginationParams={queryParams}>
      <CashBankListsContent />
    </CashBankListsProvider>
  )
}

export default CashBankLists
