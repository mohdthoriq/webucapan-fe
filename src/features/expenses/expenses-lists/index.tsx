import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ExpensesListsProvider } from './components/expenses-list-provider'
import { ExpensesListsTable } from './components/expenses-list-table'

const route = getRouteApi('/_authenticated/expenses/')

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
            <p className='text-muted-foreground'>
              Kelola Tagihan Pengeluaran.
            </p>
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
        <ExpensesListsTable search={search} navigate={navigate} />
      </CardContent>
    </Card>
  )
}

function ExpensesLists() {
  const search = route.useSearch() as Record<string, string>

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined
  const name = search?.name ? search.name : undefined

  return (
    <ExpensesListsProvider paginationParams={{ page, limit, name }}>
      <ExpensesListsContent />
    </ExpensesListsProvider>
  )
}

export default ExpensesLists
