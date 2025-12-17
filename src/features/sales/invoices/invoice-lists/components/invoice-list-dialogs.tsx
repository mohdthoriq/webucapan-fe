import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useInvoiceLists } from './invoice-list-provider'
import { useDeleteInvoiceMutation } from '../hooks/use-invoice-list-mutation'

export function InvoiceListsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useInvoiceLists()

  const { mutate: deleteInvoice, isPending } = useDeleteInvoiceMutation()

  return (
    <>
      {currentRow && (
        <ConfirmDialog
          key={`invoice-delete-${currentRow.id}`}
          destructive
          open={open === 'delete'}
          onOpenChange={() => {
            setOpen('delete')
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          handleConfirm={() => {
            deleteInvoice({
              id: currentRow.id,
            })
            setOpen(null)
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          disabled={isPending}
          className='max-w-md'
          title={`Hapus tagihan "${currentRow.invoice_number}" ?`}
          desc={
            <>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus secara
              permanen tagihan{' '}
              <span className='text-foreground font-semibold'>
                "{currentRow.invoice_number}"
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
