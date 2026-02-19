// import type { TransactionData } from '@/types'
// import { ConfirmDialog } from '@/components/dialog/confirm.dialog'

// interface CashBankDeleteDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onConfirm: () => void
//   transaction: TransactionData | null
//   isLoading?: boolean
// }

// export function CashBankDeleteDialog({
//   open,
//   onOpenChange,
//   onConfirm,
//   transaction,
//   isLoading,
// }: CashBankDeleteDialogProps) {
//   if (!transaction) return null

//   const isDeletable =
//     transaction. === 0 && transaction.payment_status === 'unpaid'

//   if (!isDeletable) {
//     return (
//       <ConfirmDialog
//         open={open}
//         onOpenChange={onOpenChange}
//         title='Invoice Tidak Dapat Dihapus'
//         desc={
//           <p className='text-muted-foreground text-sm'>
//             Invoice <span className='font-bold'>{invoice.invoice_number}</span>{' '}
//             tidak dapat dihapus karena sudah memiliki transaksi pembayaran.
//           </p>
//         }
//         confirmText='Mengerti'
//         handleConfirm={() => onOpenChange(false)}
//       />
//     )
//   }

//   return (
//     <ConfirmDialog
//       open={open}
//       onOpenChange={onOpenChange}
//       title='Hapus Invoice'
//       desc={
//         <p className='text-muted-foreground text-sm'>
//           Apakah Anda yakin ingin menghapus invoice{' '}
//           <span className='font-bold'>{invoice.invoice_number}</span>? Tindakan
//           ini tidak dapat dibatalkan.
//         </p>
//       }
//       destructive
//       confirmText='Hapus'
//       isLoading={isLoading}
//       handleConfirm={onConfirm}
//     />
//   )
// }
