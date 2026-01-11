import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ExpensesListsProvider } from './components/expenses-list-provider'
import { ExpensesListsTable } from './components/expenses-list-table'

const route = getRouteApi('/_authenticated/expenses/')

import { type ExpenseListQueryParams } from './hooks/use-expenses-list-query'

function ExpensesListsContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Tagihan Pengeluaran
            </h2>
            <p className='text-muted-foreground'>Kelola Tagihan Pengeluaran.</p>
          </div>
          <div className='flex flex-col items-end gap-2 md:flex-row md:items-start'>
            <Button variant={'link'} onClick={() => history.go(-1)}>
              Kembali
            </Button>
            <Button onClick={() => navigate({ to: '/expenses/add' })}>
              <Plus className='mr-2 h-4 w-4' />
              Tambah Tagihan
            </Button>
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <ExpensesListsTable search={search} navigate={navigate} />
      </CardContent>
    </Card>
  )
}

function ExpensesLists() {
  const search = route.useSearch() as Record<string, unknown>

  const queryParams: ExpenseListQueryParams & { name?: string } = {
    page: search.page ? parseInt(search.page as string) : undefined,
    limit: search.limit ? parseInt(search.limit as string) : undefined,
    name: (search.name as string) || undefined,
    status: (search.status as ExpenseListQueryParams['status']) || undefined,
    contact_id: (search.contact_id as string) || undefined,
    company_id: (search.company_id as string) || undefined,
    order: (search.order as string) || undefined,
    date_from: search.date_from
      ? new Date(search.date_from as string)
      : undefined,
    date_to: search.date_to ? new Date(search.date_to as string) : undefined,
    tags: search.tags ? (search.tags as string).split(',') : undefined,
  }

  return (
    <ExpensesListsProvider paginationParams={queryParams}>
      <ExpensesListsContent />
    </ExpensesListsProvider>
  )
}

export default ExpensesLists
