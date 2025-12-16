import { ConfirmDialog } from '@/components/dialog/confirm.dialog'
import { useDeleteTagMutation } from '../hooks/use-tags-mutation'
import { useInvoiceLists } from './invoice-list-provider'

export function TagsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useInvoiceLists()

  const { mutate: deleteTag, isPending } = useDeleteTagMutation()

  return (
    <>
      {currentRow && (
        <ConfirmDialog
          key={`tag-delete-${currentRow.id}`}
          destructive
          open={open === 'delete'}
          onOpenChange={() => {
            setOpen('delete')
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          handleConfirm={() => {
            deleteTag({
              id: currentRow.id,
            })
            setOpen(null)
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          disabled={isPending}
          className='max-w-md'
          title={`Hapus satuan "${currentRow.invoice_number}" ?`}
          desc={
            <>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus secara
              permanen satuan{' '}
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
