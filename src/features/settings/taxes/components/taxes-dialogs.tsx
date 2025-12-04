import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useDeleteTaxMutation } from '../hooks/use-taxes-mutation'
import { TaxesActionDialog } from './taxes-action-dialog'
import { TaxesDetailDialog } from './taxes-detail-dialog'
import { useTaxes } from './taxes-provider'

export function TaxesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTaxes()

  const { mutate: deleteTax, isPending } = useDeleteTaxMutation()

  return (
    <>
      <TaxesActionDialog
        key='tax-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <TaxesActionDialog
            key={`tax-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <TaxesDetailDialog
            key={`tax-view-${currentRow.id}`}
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
            key={`tax-delete-${currentRow.id}`}
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              deleteTax({
                id: currentRow.id,
              })
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            disabled={isPending}
            className='max-w-md'
            title={`Hapus pajak "${currentRow.name}" ?`}
            desc={
              <>
                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus secara
                permanen pajak{' '}
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
