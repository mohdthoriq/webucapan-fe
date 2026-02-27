import { getRouteApi } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { PERMISSION_KEY } from '@/constants/permissions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PermissionGuard } from '@/components/permission-guard'
import { ProductCategoryDialogs } from './components/product-category-dialogs'
import { ProductCategoryFallback } from './components/product-category-fallback'
import {
  ProductCategoryProvider,
  useProductCategories,
} from './components/product-category-provider'
import { ProductCategoryTable } from './components/product-category-table'

const route = getRouteApi('/_authenticated/product-categories/')

function ProductCategoryContent() {
  const search = route.useSearch() as Record<string, string>
  const navigate = route.useNavigate()
  const { setOpen } = useProductCategories()

  return (
    <PermissionGuard
      permission={PERMISSION_KEY.PRODUCT_CATEGORY}
      fallback={<ProductCategoryFallback search={search} navigate={navigate} />}
    >
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
            <div className='flex flex-col items-end gap-2 md:flex-row md:items-start'>
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
          <ProductCategoryDialogs />
        </CardContent>
      </Card>
    </PermissionGuard>
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
