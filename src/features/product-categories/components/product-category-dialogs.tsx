import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useDeleteProductCategoryMutation } from '../hooks/use-product-category-mutation'
import { ProductCategoryActionDialog } from './product-category-action-dialog'
import { ProductCategoryDetailDialog } from './product-category-detail-dialog'
import { useProductCategories } from './product-category-provider'

export function ProductCategoryDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProductCategories()

  const { mutate: deleteProductCategory, isPending } =
    useDeleteProductCategoryMutation()

  return (
    <>
      <ProductCategoryActionDialog
        key='product-category-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <ProductCategoryActionDialog
            key={`product-category-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ProductCategoryDetailDialog
            key={`product-category-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key={`product-category-delete-${currentRow.id}`}
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              deleteProductCategory({
                id: currentRow.id,
              })
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            disabled={isPending}
            className='max-w-md'
            title={`Hapus kategori produk "${currentRow.name}" ?`}
            desc={
              <>
                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus secara
                permanen kategori produk{' '}
                <span className='text-foreground font-semibold'>
                  "{currentRow.name}"
                </span>{' '}
                dari perusahaan Anda.
              </>
            }
            confirmText={`${isPending ? 'Deleting...' : 'Delete'}`}
          />
        </>
      )}
    </>
  )
}
