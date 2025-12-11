import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ProductCategoryProvider, useProductCategories } from './components/product-category-provider'
import { ProductCategoryTable } from './components/product-category-table'

const route = getRouteApi('/_authenticated/product-categories/')

function ProductCategoryContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()
  const { setOpen } = useProductCategories()

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Pengaturan Kategori Produk
            </h2>
            <p className='text-muted-foreground'>
              Kelola Kategori Produk di Perusahaan Anda.
            </p>
          </div>
          <div className='flex'>
            <Button variant={'link'} onClick={() => history.go(-1)}>
              Kembali
            </Button>
            <Button onClick={() => setOpen('add')}>
              <Plus className='mr-2 h-4 w-4' />
              Tambah Kategori
            </Button>
          </div>
        </div>
        <hr />
      </CardHeader>
      <CardContent>
        <ProductCategoryTable search={search} navigate={navigate} />
        {/* <ProductCategoryDialogs /> */}
      </CardContent>
    </Card>
  )
}

function ProductCategory() {
  const search = route.useSearch() as Record<string, string>

  // Extract pagination parameters from URL search
  const page = search?.page ? parseInt(search.page) : undefined
  const limit = search?.limit ? parseInt(search.limit) : undefined
  const name = search?.name ? search.name : undefined

  return (
    <ProductCategoryProvider paginationParams={{ page, limit, name }}>
      <ProductCategoryContent />
    </ProductCategoryProvider>
  )
}

export default ProductCategory
