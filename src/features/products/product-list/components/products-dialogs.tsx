import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useDeleteProductMutation } from '../../product-list/hooks/use-product-list-mutation'
import { useProducts } from './products-provider'

export function ProductsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProducts()

  const { mutate: deleteProduct, isPending } = useDeleteProductMutation()

  return (
    <>
      {currentRow && (
        <ConfirmDialog
          key={`products-delete-${currentRow.id}`}
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
      )}
    </>
  )
}
