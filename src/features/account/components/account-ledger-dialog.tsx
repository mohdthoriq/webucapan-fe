import { format, subDays } from 'date-fns';
import { type Account } from '@/types';
import { X, Search } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAccountLedgerQuery } from '../hooks/use-account-query';
import { DatePickerWithRange } from '../../sales/invoices/invoice-lists/components/date-picker-with-range';
import type { DateRange } from 'react-day-picker';
import { useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';

type AccountLedgerDialogProps = {
  currentRow: Account
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountsLedgerDialog({
  currentRow,
  open,
  onOpenChange,
}: AccountLedgerDialogProps) {
  const [date, setDate] = useState<DateRange | undefined>(() => {
    return {
      from: subDays(new Date(), 30),
      to: new Date()
    }
  })

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const { data: ledger, isLoading } = useAccountLedgerQuery(
    currentRow?.id,
    date?.from ? format(date.from, 'yyyy-MM-dd') : undefined,
    date?.to ? format(date.to, 'yyyy-MM-dd') : undefined,
    debouncedSearch
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className='max-w-[calc(100%-4rem)] sm:max-w-7xl max-h-[90vh] p-0 flex flex-col'>
        <div className='p-6 space-y-6 flex-1 flex flex-col overflow-hidden'>
          {/* Header */}
          <div className='flex justify-between items-start'>
            <DialogHeader className='text-left'>
              <DialogTitle className='text-2xl font-bold'>
                Transaksi {currentRow?.name}
              </DialogTitle>
              <DialogDescription className='text-lg font-medium'>
                {currentRow?.code}
              </DialogDescription>
            </DialogHeader>
          </div>

          <hr />

          {/* Controls */}
          <div className='flex flex-wrap gap-3 items-center'>
            <div className='relative flex-1 min-w-[200px] max-w-xs'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Cari...'
                className='pl-10'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className='ml-auto shrink-0'>
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>
          </div>

          {/* Table Container */}
          <div className='rounded-md border flex-1 overflow-hidden [&_[data-slot=table-container]]:flex-1 [&_[data-slot=table-container]]:overflow-auto flex flex-col'>
            <Table>
              <TableHeader className='sticky top-0 z-10 bg-secondary shadow-sm [&_th]:bg-secondary'>
                <TableRow className='bg-secondary hover:bg-secondary'>
                  <TableHead className='font-semibold whitespace-wrap'>Tanggal</TableHead>
                  <TableHead className='font-semibold whitespace-wrap'>Sumber</TableHead>
                  <TableHead className='font-semibold whitespace-wrap'>Deskripsi</TableHead>
                  <TableHead className='font-semibold whitespace-wrap'>Referensi</TableHead>
                  <TableHead className='font-semibold whitespace-wrap'>Nomor</TableHead>
                  <TableHead className='text-right font-semibold whitespace-wrap'>Debit</TableHead>
                  <TableHead className='text-right font-semibold whitespace-wrap'>Kredit</TableHead>
                  <TableHead className='text-right font-semibold whitespace-wrap'>Saldo Berjalan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Saldo Awal */}
                <TableRow className='font-medium'>
                  <TableCell colSpan={5}>Saldo Awal</TableCell>
                  <TableCell className='text-right'>0</TableCell>
                  <TableCell className='text-right'>0</TableCell>
                  <TableCell className='text-right'>
                    {formatNumber(ledger?.opening_balance || 0)}
                  </TableCell>
                </TableRow>

                {/* Loading State or Entries */}
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className='text-center py-20'>
                      <div className='flex flex-col items-center gap-2 text-muted-foreground'>
                        <div className='h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent' />
                        <span>Memuat data transaksi...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  ledger?.entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className='text-muted-foreground whitespace-nowrap text-xs'>
                        {format(new Date(entry.date), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell className='text-muted-foreground whitespace-nowrap'>{entry.source}</TableCell>
                      <TableCell className='text-blue-600 font-medium max-w-[50px] py-3 whitespace-normal break-words'>
                        {entry.description}
                      </TableCell>
                    <TableCell className='text-blue-600 font-medium max-w-[50px] py-3 whitespace-normal break-words'>{entry.reference}</TableCell>
                      <TableCell className='text-blue-600 font-medium max-w-[50px] py-3 whitespace-normal break-words'>{entry.ref_number}</TableCell>
                      <TableCell className='text-right whitespace-nowrap'>
                        {entry.debit > 0 ? formatNumber(entry.debit) : '0'}
                      </TableCell>
                      <TableCell className='text-right whitespace-nowrap'>
                        {entry.credit > 0 ? formatNumber(entry.credit) : '0'}
                      </TableCell>
                      <TableCell className='text-right font-medium whitespace-nowrap'>
                        {formatNumber(entry.running_balance)}
                      </TableCell>
                    </TableRow>
                  ))
                )}

                {!isLoading && ledger?.entries.length === 0 && (
                   <TableRow>
                     <TableCell colSpan={8} className='text-center py-10 text-muted-foreground italic'>
                       Tidak ada transaksi untuk periode ini.
                     </TableCell>
                   </TableRow>
                )}

                {/* Statistics Rows */}
                <TableRow className='font-bold bg-muted/50'>
                  <TableCell colSpan={5}>Saldo Akhir</TableCell>
                  <TableCell className='text-right'>
                    {formatNumber(ledger?.total_debit || 0)}
                  </TableCell>
                  <TableCell className='text-right'>
                    {formatNumber(ledger?.total_credit || 0)}
                  </TableCell>
                  <TableCell className='text-right'>
                    {formatNumber(ledger?.closing_balance || 0)}
                  </TableCell>
                </TableRow>

                <TableRow className='h-8 border-none hover:bg-transparent'>
                   <TableCell colSpan={8}></TableCell>
                </TableRow>

                <TableRow className='font-bold border-t-2'>
                  <TableCell colSpan={5}>Total</TableCell>
                  <TableCell className='text-right'>
                    {formatNumber(ledger?.total_debit || 0)}
                  </TableCell>
                  <TableCell className='text-right'>
                    {formatNumber(ledger?.total_credit || 0)}
                  </TableCell>
                  <TableCell className='text-right'></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className='flex justify-end p-4 gap-3 border-t bg-muted/50'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            className='gap-2'
          >
            <X className='h-4 w-4' /> Batal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}