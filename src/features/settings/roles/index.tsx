import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RolesProvider } from './components/roles-provider'
import { RolesTable } from './components/roles-table'
import { mockRoles } from './data/roles-data'

export function CompanyRoles() {
  return (
    <RolesProvider>
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
        <RolesTable data={mockRoles} search={{}} navigate={() => {}} />
      </div>
    </RolesProvider>
  )
}

export default CompanyRoles
