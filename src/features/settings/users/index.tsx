import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { UsersDialogs } from './components/users-dialogs'
import { UsersProvider, useUsers } from './components/users-provider'
import { UsersTable } from './components/users-table'

const route = getRouteApi('/_authenticated/settings/users/')

function UsersContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()
  const { setOpen } = useUsers()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Pengaturan Pengguna
            </h2>
            <p className='text-muted-foreground'>
              Kelola Pengguna di Perusahaan Anda.
            </p>
          </div>
          <div className='flex flex-col items-end gap-2 md:flex-row md:items-start'>
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
        <UsersTable search={search} navigate={navigate} />
        <UsersDialogs />
      </CardContent>
    </Card>
  )
}

function Users() {
  const search = route.useSearch() as Record<string, string>

  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined
  const name = search?.name ? search.name : undefined

  return (
    <UsersProvider paginationParams={{ page, limit, name }}>
      <UsersContent />
    </UsersProvider>
  )
}

export default Users
