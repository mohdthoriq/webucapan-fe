import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useDeleteAccountMutation } from '../hooks/use-account-mutation'
import { AccountsActionDialog } from './account-action-dialog'
import { AccountsDetailDialog } from './account-detail-dialog'
import { AccountsLedgerDialog } from './account-ledger-dialog'
import { useAccounts } from './account-provider'

export function AccountsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useAccounts()

  const { mutate: deleteAccount, isPending } = useDeleteAccountMutation()

  return (
    <>
      <AccountsActionDialog
        key='account-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <AccountsActionDialog
            key={`account-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <AccountsDetailDialog
            key={`account-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <AccountsLedgerDialog
            key={`account-ledger-${currentRow.id}`}
            open={open === 'ledger'}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(null)
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
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
              deleteAccount({
                id: currentRow.id,
              })
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            disabled={isPending}
            className='max-w-md'
            title={`Hapus akun "${currentRow.name}" ?`}
            desc={
              <>
                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus secara
                permanen akun{' '}
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
