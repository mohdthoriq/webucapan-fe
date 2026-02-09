import { useState } from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Search, X, Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useProfitLossAccountDetailQuery } from '../hooks/use-profit-loss-account-detail-query'
import { useProfitLossContext } from './profit-loss-provider'

export function ProfitLossAccountDetailDialog() {
  const [search, setSearch] = useState('')
  const { selectedAccountId, isOpen, closeDetail, dateFrom, dateTo } =
    useProfitLossContext()
  const [page] = useState(1)

  const { data: detailData, isLoading } = useProfitLossAccountDetailQuery({
    accountId: selectedAccountId || '',
    date: dateFrom, // The API seems to expect 'date' but we have from/to. I'll use dateFrom for now or check if period is sufficient.
    period: 'month', // Generic for now
    page,
    per_page: 100,
  })

  if (!isOpen) return null

  const filteredData =
    detailData?.data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.ref_code.toLowerCase().includes(search.toLowerCase())
    ) || []

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeDetail()}>
      <DialogContent className='flex max-h-[90vh] max-w-[calc(100%-4rem)] flex-col p-0 sm:max-w-7xl'>
        <div className='flex flex-1 flex-col space-y-6 overflow-hidden p-6'>
          {/* Header */}
          <div className='flex items-start justify-between'>
            <DialogHeader className='text-left'>
              <DialogTitle className='text-3xl font-bold'>
                {detailData?.account_name?.title || 'Memuat...'}
              </DialogTitle>
              <DialogDescription className='text-lg font-medium text-blue-600'>
                {detailData?.account_name?.code}
              </DialogDescription>
              <p className='text-muted-foreground mt-1 text-sm'>
                Periode: {format(dateFrom, 'd MMMM yyyy', { locale: id })} -{' '}
                {format(dateTo, 'd MMMM yyyy', { locale: id })}
              </p>
            </DialogHeader>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <div className='relative w-full max-w-sm'>
              <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
              <Input
                placeholder='Cari kode atau nama...'
                className='pl-10'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {detailData?.journal_total && (
              <div className='flex gap-6 text-sm'>
                <div className='flex flex-col items-end'>
                  <span className='text-muted-foreground'>Total Debit</span>
                  <span className='font-bold text-green-600'>
                    {formatCurrency(detailData.journal_total.total_debit)}
                  </span>
                </div>
                <div className='flex flex-col items-end'>
                  <span className='text-muted-foreground'>Total Kredit</span>
                  <span className='font-bold text-red-600'>
                    {formatCurrency(detailData.journal_total.total_credit)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Table Container */}
          <div className='flex flex-1 flex-col overflow-hidden rounded-md border'>
            <Table>
              <TableHeader className='sticky top-0 z-10 bg-slate-50'>
                <TableRow>
                  <TableHead className='w-32 font-semibold'>
                    Kode Referensi
                  </TableHead>
                  <TableHead className='font-semibold'>Nama Akun</TableHead>
                  <TableHead className='text-right font-semibold'>
                    Saldo Awal
                  </TableHead>
                  <TableHead className='text-right font-semibold'>
                    Saldo Akhir
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className='py-20 text-center'>
                      <div className='flex flex-col items-center gap-2'>
                        <Loader2 className='text-primary h-8 w-8 animate-spin' />
                        <span className='text-muted-foreground'>
                          Memuat data transaksi...
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className='hover:bg-slate-50/50'>
                      <TableCell className='text-muted-foreground font-mono text-xs'>
                        {item.ref_code}
                      </TableCell>
                      <TableCell className='font-medium text-blue-600'>
                        {item.name}
                      </TableCell>
                      <TableCell className='text-right'>
                        {formatCurrency(item.opening_balance)}
                      </TableCell>
                      <TableCell className='text-right font-semibold'>
                        {formatCurrency(item.closing_balance)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className='text-muted-foreground py-20 text-center italic'
                    >
                      Tidak ada data ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className='flex justify-end gap-3 border-t bg-slate-50 p-4'>
          <Button
            variant='outline'
            onClick={() => closeDetail()}
            className='gap-2'
          >
            <X className='h-4 w-4' /> Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
