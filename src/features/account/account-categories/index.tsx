import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ContactsDialogs } from './components/contacts-dialogs'
import { ContactsProvider, useContacts } from './components/contacts-provider'
import { ContactsTable } from './components/contacts-table'

const route = getRouteApi('/_authenticated/contacts/')

function ContactsContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()
  const { setOpen } = useContacts()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Pengaturan Kontak
            </h2>
            <p className='text-muted-foreground'>
              Kelola Kontak di Perusahaan Anda.
            </p>
          </div>
          <div className='flex'>
            <Button variant={'link'} onClick={() => history.go(-1)}>
              Kembali
            </Button>
            <Button onClick={() => setOpen('add')}>
              <Plus className='mr-2 h-4 w-4' />
              Tambah Kontak
            </Button>
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <ContactsTable search={search} navigate={navigate} />
        <ContactsDialogs />
      </CardContent>
    </Card>
  )
}

function Contacts() {
  const search = route.useSearch() as Record<string, string>

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined
  const name = search?.name ? search.name : undefined

  return (
    <ContactsProvider paginationParams={{ page, limit, name }}>
      <ContactsContent />
    </ContactsProvider>
  )
}

export default Contacts
