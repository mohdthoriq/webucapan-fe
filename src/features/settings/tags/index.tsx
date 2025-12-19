import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TagsDialogs } from './components/tags-dialogs'
import { TagsProvider, useTags } from './components/tags-provider'
import { TagsTable } from './components/tags-table'

const route = getRouteApi('/_authenticated/settings/tags/')

function TagsContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()
  const { setOpen } = useTags()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Pengaturan Tag
            </h2>
            <p className='text-muted-foreground'>
              Kelola Tag di Perusahaan Anda.
            </p>
          </div>
          <div className='flex flex-col items-end gap-2 md:flex-row md:items-start'>
            <Button variant={'link'} onClick={() => history.go(-1)}>
              Kembali
            </Button>
            <Button onClick={() => setOpen('add')}>
              <Plus className='mr-2 h-4 w-4' />
              Tambah Tag
            </Button>
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <TagsTable search={search} navigate={navigate} />
        <TagsDialogs />
      </CardContent>
    </Card>
  )
}

function Tags() {
  const search = route.useSearch() as Record<string, string>

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined
  const name = search?.name ? search.name : undefined

  return (
    <TagsProvider paginationParams={{ page, limit, name }}>
      <TagsContent />
    </TagsProvider>
  )
}

export default Tags
