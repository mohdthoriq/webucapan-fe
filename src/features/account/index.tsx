import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { AccountsDialogs } from './components/account-dialogs'
import { AccountsProvider, useAccounts } from './components/account-provider'
import { AccountsTable } from './components/account-table'

const route = getRouteApi('/_authenticated/account/account/')

function AccountContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()
  const { setOpen } = useAccounts()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Pengaturan Akun
            </h2>
            <p className='text-muted-foreground'>
              Kelola Akun di Perusahaan Anda.
            </p>
          </div>
          <div className='flex'>
            <Button variant={'link'} onClick={() => history.go(-1)}>
              Kembali
            </Button>
            <Button onClick={() => setOpen('add')}>
              <Plus className='mr-2 h-4 w-4' />
              Tambah Akun
            </Button>
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <AccountsTable search={search} navigate={navigate} />
        <AccountsDialogs />
      </CardContent>
    </Card>
  )
}

function Account() {
  const search = route.useSearch() as Record<string, string>

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined
  const name = search?.name ? search.name : undefined

  return (
    <AccountsProvider paginationParams={{ page, limit, name }}>
      <AccountContent />
    </AccountsProvider>
  )
}

export default Account
