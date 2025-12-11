import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useDeleteProductMutation } from '../hooks/use-products-mutation'
import { ProductsActionDialog } from './products-action-dialog'
import { ProductsDetailDialog } from './products-detail-dialog'
import { useProducts } from './products-provider'

export function ProductsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProducts()

  const { mutate: deleteProduct, isPending } = useDeleteProductMutation()

  return (
    <>
      <ProductsActionDialog
        key='product-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <ProductsActionDialog
            key={`product-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ProductsDetailDialog
            key={`product-view-${currentRow.id}`}
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
            key={`account-delete-${currentRow.id}`}
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              deleteProduct({
                id: currentRow.id,
              })
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            disabled={isPending}
            className='max-w-md'
            title={`Hapus produk "${currentRow.name}" ?`}
            desc={
              <>
                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus secara
                permanen produk{' '}
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
