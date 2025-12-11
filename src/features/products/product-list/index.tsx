import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ProductsProvider } from './components/products-provider'
import { ProductsTable } from './components/products-table'
import { ProductsDialogs } from './components/products-dialogs'

const route = getRouteApi('/_authenticated/products/')

function ProductsContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Pengaturan Produk
            </h2>
            <p className='text-muted-foreground'>
              Kelola Produk di Perusahaan Anda.
            </p>
          </div>
          <div className='flex'>
            <Button variant={'link'} onClick={() => history.go(-1)}>
              Kembali
            </Button>
            <Button onClick={() => navigate({ to: '/products/add' })}>
              <Plus className='mr-2 h-4 w-4' />
              Tambah Produk
            </Button>
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <ProductsTable search={search} navigate={navigate} />
        <ProductsDialogs />
      </CardContent>
    </Card>
  )
}

function Products() {
  const search = route.useSearch() as Record<string, string>

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined
  const name = search?.name ? search.name : undefined

  return (
    <ProductsProvider paginationParams={{ page, limit, name }}>
      <ProductsContent />
    </ProductsProvider>
  )
}

export default Products
