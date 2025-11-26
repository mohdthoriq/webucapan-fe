import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UnitsDialogs } from './components/units-dialogs'
import { UnitsProvider, useUnits } from './components/units-provider'
import { UnitsTable } from './components/units-table'

const route = getRouteApi('/_authenticated/settings/units/')

function UnitsContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()
  const { setOpen } = useUnits()

  return (
    <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
      <div className='flex flex-wrap items-end justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Pengaturan Satuan
            </h2>
            <p className='text-muted-foreground'>
              Kelola Satuan di Perusahaan Anda.
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button onClick={() => setOpen('add')}>
            <Plus className='mr-2 h-4 w-4' />
            Tambah Satuan
          </Button>
        </div>
      </div>
      <UnitsTable search={search} navigate={navigate} />
      <UnitsDialogs />
    </div>
  )
}

function Units() {
  const search = route.useSearch() as Record<string, string>

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined
  const name = search?.name ? search.name : undefined

  return (
    <UnitsProvider paginationParams={{ page, limit, name }}>
      <UnitsContent />
    </UnitsProvider>
  )
}

export default Units
