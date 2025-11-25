import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RolesProvider } from './components/roles-provider'
import { RolesTable } from './components/roles-table'

const route = getRouteApi('/_authenticated/settings/')

export function CompanyRoles() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined

  const paginationParams = {
    page,
    limit,
  }

  return (
    <RolesProvider paginationParams={paginationParams}>
      <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <div>
              <h2 className='leading-none font-semibold'>Pengaturan Peran</h2>
              <p className='text-muted-foreground mt-[6px] text-sm'>
                Kelola Peran dan hak akses akun di Perusahaan Anda.
              </p>
            </div>
          </div>
          <div className='flex gap-2'>
            <Button>
              <Plus className='mr-2 h-4 w-4' />
              Add Role
            </Button>
          </div>
        </div>
        <RolesTable search={search} navigate={navigate} />
      </div>
    </RolesProvider>
  )
}

export default CompanyRoles
