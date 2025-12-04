import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PaymentTermsDialogs } from './components/payment-terms-dialogs'
import {
  usePaymentTerms,
  PaymentTermsProvider,
} from './components/payment-terms-provider'
import { PaymentTermsTable } from './components/payment-terms-table'

const route = getRouteApi('/_authenticated/settings/payment-terms/')

function PaymentTermsContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()
  const { setOpen } = usePaymentTerms()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Pengaturan Termin Pembayaran
            </h2>
            <p className='text-muted-foreground'>
              Kelola Termin Pembayaran di Perusahaan Anda.
            </p>
          </div>
          <div>
            <div className='flex'>
              <Button variant={'link'} onClick={() => history.go(-1)}>
                Kembali
              </Button>
              <Button onClick={() => setOpen('add')}>
                <Plus className='mr-2 h-4 w-4' />
                Tambah Termin
              </Button>
            </div>
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
          <PaymentTermsTable search={search} navigate={navigate} />
          <PaymentTermsDialogs />
        </div>
      </CardContent>
    </Card>
  )
}

export function PaymentTerms() {
  const search = route.useSearch() as Record<string, string>

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined
  const name = search?.name ? search.name : undefined

  return (
    <PaymentTermsProvider paginationParams={{ page, limit, name }}>
      <PaymentTermsContent />
    </PaymentTermsProvider>
  )
}

export default PaymentTerms
