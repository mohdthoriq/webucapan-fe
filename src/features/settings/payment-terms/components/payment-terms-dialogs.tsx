import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useDeletePaymentTermMutation } from '../hooks/use-payment-terms-mutation'
import { PaymentTermsActionDialog } from './payment-terms-action-dialog'
import { PaymentTermsDetailDialog } from './payment-terms-detail-dialog'
import { usePaymentTerms } from './payment-terms-provider'

export function PaymentTermsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = usePaymentTerms()

  const { mutate: deletePaymentTerm, isPending } =
    useDeletePaymentTermMutation()

  return (
    <>
      <PaymentTermsActionDialog
        key='payment-term-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <PaymentTermsActionDialog
            key={`payment-term-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <PaymentTermsDetailDialog
            key={`payment-term-view-${currentRow.id}`}
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
            key={`payment-term-delete-${currentRow.id}`}
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              deletePaymentTerm({
                id: currentRow.id,
              })
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            disabled={isPending}
            className='max-w-md'
            title={`Hapus payment terms "${currentRow.name}" ?`}
            desc={
              <>
                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus secara
                permanen termin pembayaran{' '}
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
