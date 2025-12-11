import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useDeleteAccountTypeMutation } from '../hooks/use-account-types-mutation'
import { AccountTypesActionDialog } from './account-types-action-dialog'
import { AccountTypesDetailDialog } from './account-types-detail-dialog'
import { useAccountTypes } from './account-types-provider'

export function AccountTypesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useAccountTypes()

  const { mutate: deleteAccountType, isPending } = useDeleteAccountTypeMutation()

  return (
    <>
      <AccountTypesActionDialog
        key='account-type-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <AccountTypesActionDialog
            key={`account-type-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          < AccountTypesDetailDialog
            key={`account-type-view-${currentRow.id}`}
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
            key={`account-type-delete-${currentRow.id}`}
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              deleteAccountType({
                id: currentRow.id,
              })
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            disabled={isPending}
            className='max-w-md'
            title={`Hapus tipe akun "${currentRow.name}" ?`}
            desc={
              <>
                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus secara
                permanen tipe akun{' '}
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
