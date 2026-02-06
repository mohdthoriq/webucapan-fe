// import { useState } from 'react'
// import { format } from 'date-fns'
// import { id } from 'date-fns/locale'
// import { Search, X } from 'lucide-react'
// import { formatNumber } from '@/lib/utils'
// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import { useBalanceSheetAccountDetailQuery } from '../hooks/use-profit-loss-report-query'
// import { useBalanceSheetContext } from './profit-loss-provider'

// export function BalanceSheetAccountDetailDialog() {
//   const [search, setSearch] = useState('')
//   const { selectedAccountId, isOpen, closeDetail, date, period } =
//     useBalanceSheetContext()
//   const page = 1

//   const { data: detailData, isLoading } = useBalanceSheetAccountDetailQuery({
//     accountId: selectedAccountId || '',
//     date,
//     period,
//     page,
//     per_page: 100,
//   })

//   if (!isOpen) return null

//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => !open && closeDetail()}>
//       <DialogContent className='flex max-h-[90vh] max-w-[calc(100%-4rem)] flex-col p-0 sm:max-w-7xl'>
//         <div className='flex flex-1 flex-col space-y-6 overflow-hidden p-6'>
//           {/* Header */}
//           <div className='flex items-start justify-between'>
//             <DialogHeader className='text-left'>
//               <DialogTitle className='text-2xl font-bold'>
//                 Transaksi: {detailData?.account_name?.title || 'Memuat...'}
//               </DialogTitle>
//               <DialogDescription className='text-lg font-medium'>
//                 {detailData?.account_name?.code}
//               </DialogDescription>
//               <p className='text-muted-foreground text-sm'>
//                 Periode: {format(date, 'MMMM yyyy', { locale: id })}
//               </p>
//             </DialogHeader>
//           </div>

//           <hr />

//           {/* Controls */}
//           <div className='relative w-xs max-w-xs flex-1'>
//             <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
//             <Input
//               placeholder='Cari...'
//               className='pl-10'
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>

//           {/* Table Container */}
//           <div className='flex flex-1 flex-col overflow-hidden rounded-md border [&_[data-slot=table-container]]:flex-1 [&_[data-slot=table-container]]:overflow-auto'>
//             <Table>
//               <TableHeader className='bg-secondary [&_th]:bg-secondary sticky top-0 z-10 shadow-sm'>
//                 <TableRow className='bg-secondary hover:bg-secondary'>
//                   <TableHead className='whitespace-wrap font-semibold'>
//                     Kode Referensi
//                   </TableHead>
//                   <TableHead className='whitespace-wrap font-semibold'>
//                     Nama Akun
//                   </TableHead>
//                   <TableHead className='whitespace-wrap text-right font-semibold'>
//                     Saldo Awal
//                   </TableHead>
//                   <TableHead className='whitespace-wrap text-right font-semibold'>
//                     Saldo Akhir
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {/* Loading State or Entries */}
//                 {isLoading ? (
//                   <TableRow>
//                     <TableCell colSpan={4} className='py-20 text-center'>
//                       <div className='text-muted-foreground flex flex-col items-center gap-2'>
//                         <div className='border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent' />
//                         <span>Memuat data detail...</span>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   detailData?.data.map((item) => (
//                     <TableRow key={item.id}>
//                       <TableCell className='text-muted-foreground whitespace-nowrap'>
//                         {item.ref_code}
//                       </TableCell>
//                       <TableCell className='max-w-[200px] font-medium break-words whitespace-normal text-blue-600'>
//                         {item.name}
//                       </TableCell>
//                       <TableCell className='text-right whitespace-nowrap'>
//                         {formatNumber(item.opening_balance)}
//                       </TableCell>
//                       <TableCell className='text-right font-medium whitespace-nowrap'>
//                         {formatNumber(item.closing_balance)}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}

//                 {!isLoading && detailData?.data.length === 0 && (
//                   <TableRow>
//                     <TableCell
//                       colSpan={4}
//                       className='text-muted-foreground py-10 text-center italic'
//                     >
//                       Tidak ada detail untuk akun ini.
//                     </TableCell>
//                   </TableRow>
//                 )}

//                 {/* Footer / Total Row if applicable */}
//                 {/* Assuming journal_total gives some totals, but strictly we are listing sub-items. 
//                      We can add a total row if needed, but the provided JSON only has journal_total for debit/credit, 
//                      which matches transactions, but the table items are balances. 
//                      I'll verify if I should show total debit/credit or just opening/closing totals.
//                      Based on JSON: `journal_total: { total_credit: 0, total_debit: 500000 }`
//                      But the table shows opening/closing balance. I'll omit totals effectively unless I sum them up or use meaningful api data.
//                   */}
//               </TableBody>
//             </Table>
//           </div>
//         </div>

//         <div className='bg-muted/50 flex justify-end gap-3 border-t p-4'>
//           <Button
//             variant='outline'
//             onClick={() => closeDetail()}
//             className='gap-2'
//           >
//             <X className='h-4 w-4' /> Tutup
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
