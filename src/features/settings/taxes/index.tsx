import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TaxesDialogs } from './components/taxes-dialogs'
import { useTaxes, TaxesProvider } from './components/taxes-provider'
import { TaxesTable } from './components/taxes-table'

const route = getRouteApi('/_authenticated/settings/taxes/')

function TaxesContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()
  const { setOpen } = useTaxes()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Pengaturan Pajak
            </h2>
            <p className='text-muted-foreground'>
              Kelola Pajak di Perusahaan Anda.
            </p>
          </div>
          <div>
            <div className='flex'>
              <Button variant={'link'} onClick={() => history.go(-1)}>
                Kembali
              </Button>
              <Button onClick={() => setOpen('add')}>
                <Plus className='mr-2 h-4 w-4' />
                Tambah Pajak
              </Button>
            </div>
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
          <TaxesTable search={search} navigate={navigate} />
          <TaxesDialogs />
        </div>
      </CardContent>
    </Card>
  )
}

export function Taxes() {
  const search = route.useSearch() as Record<string, string>

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined
  const name = search?.name ? search.name : undefined

  return (
    <TaxesProvider paginationParams={{ page, limit, name }}>
      <TaxesContent />
    </TaxesProvider>
  )
}

export default Taxes
