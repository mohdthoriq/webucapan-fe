import { useTransactionTypes } from './transaction-types-provider'
import { TransactionTypesActionDialog } from './transaction-types-action-dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDeleteTransactionTypeMutation } from '../hooks/use-transaction-types-mutation'

export function TransactionTypesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTransactionTypes()
  const deleteMutation = useDeleteTransactionTypeMutation()

  return (
    <>
      <TransactionTypesActionDialog
        open={open === 'add' || open === 'edit'}
        onOpenChange={(isOpen) => { if (!isOpen) setOpen(null) }}
        currentRow={open === 'add' ? null : currentRow}
      />

      <AlertDialog open={open === 'delete'} onOpenChange={(isOpen) => { if (!isOpen) setOpen(null) }}>
        <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle><AlertDialogDescription>Tindakan ini tidak dapat dibatalkan. Ini akan menghapus tipe transaksi <b>{currentRow?.name}</b> secara permanen.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction className='bg-red-600 hover:bg-red-700' onClick={async () => { if (currentRow) { await deleteMutation.mutateAsync(currentRow.id); setOpen(null); setCurrentRow(null) } }}>Hapus</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
      </AlertDialog>
    </>
  )
}
