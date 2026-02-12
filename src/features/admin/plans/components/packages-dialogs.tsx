import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useDeletePackageMutation } from '../hooks/use-packages-mutation'
import { PackagesActionDialog } from './packages-action-dialog'
import { PackagesDetailDialog } from './packages-detail-dialog'
import { usePackages } from './packages-provider'

export function PackagesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = usePackages()

  const { mutate: deletePackage, isPending } = useDeletePackageMutation()

  return (
    <>
      <PackagesActionDialog
        key='packages-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <PackagesActionDialog
            key={`packages-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <PackagesDetailDialog
            key={`packages-view-${currentRow.id}`}
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
            key={`packages-delete-${currentRow.id}`}
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              deletePackage({
                id: currentRow.id,
              })
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            disabled={isPending}
            className='max-w-md'
            title={`Hapus plan "${currentRow.name}" ?`}
            desc={
              <>
                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus secara
                permanen plan{' '}
                <span className='text-foreground font-semibold'>
                  "{currentRow.name}"
                </span>{' '}
                dari Aplikasi Manajerku.
              </>
            }
            confirmText={`${isPending ? 'Deleting...' : 'Delete'}`}
          />
        </>
      )}
    </>
  )
}
