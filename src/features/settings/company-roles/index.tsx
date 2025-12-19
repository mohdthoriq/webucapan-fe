import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CompanyRolesDialogs } from './components/company-roles-dialogs'
import {
  useCompanyRoles,
  CompanyRolesProvider,
} from './components/company-roles-provider'
import { CompanyRolesTable } from './components/company-roles-table'

const route = getRouteApi('/_authenticated/settings/company-roles/')

function CompanyRolesContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()
  const { setOpen } = useCompanyRoles()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Pengaturan Peran
            </h2>
            <p className='text-muted-foreground'>
              Kelola Hak Akses Pengguna di Perusahaan Anda.
            </p>
          </div>
          <div>
            <div className='flex flex-col items-end gap-2 md:flex-row md:items-start'>
              <Button variant={'link'} onClick={() => history.go(-1)}>
                Kembali
              </Button>
              <Button onClick={() => setOpen('add')}>
                <Plus className='mr-2 h-4 w-4' />
                Tambah Peran
              </Button>
            </div>
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
          <CompanyRolesTable search={search} navigate={navigate} />
          <CompanyRolesDialogs />
        </div>
      </CardContent>
    </Card>
  )
}

export function CompanyRoles() {
  const search = route.useSearch() as Record<string, string>

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined

  return (
    <CompanyRolesProvider paginationParams={{ page, limit }}>
      <CompanyRolesContent />
    </CompanyRolesProvider>
  )
}

export default CompanyRoles
