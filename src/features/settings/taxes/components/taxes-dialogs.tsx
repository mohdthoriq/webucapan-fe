import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useDeleteTaxMutation } from '../hooks/useTaxesMutation'
import { TaxesActionDialog } from './taxes-action-dialog'
import { TaxesDetailDialog } from './taxes-detail-dialog'
import { useTaxes } from './taxes-provider'

export function TaxesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTaxes()

  const { mutate: deleteRole, isPending } = useDeleteTaxMutation()

  return (
    <>
      <TaxesActionDialog
        key='role-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <TaxesActionDialog
            key={`role-edit-${currentRow.id}`}
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
            key={`role-view-${currentRow.id}`}
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
            key={`role-delete-${currentRow.id}`}
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              deleteRole({
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
