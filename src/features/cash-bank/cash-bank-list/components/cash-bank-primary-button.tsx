import {
  ChevronDown,
  CreditCard,
  Plus,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCashBankLists } from './cash-bank-list-provider'

export function CashBankPrimaryButton() {
  const { setOpen } = useCashBankLists()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='flex items-center gap-2'>
          <Plus className='h-4 w-4' />
          <span>Transaksi Baru</span>
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className='flex w-full items-center gap-4'
          onClick={() => setOpen('transfer')}
        >
          <CreditCard className='h-4 w-4' />
          <span>Transfer Dana</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='flex w-full items-center gap-4'>
          <TrendingDown className='text-destructive h-4 w-4' />
          <span>Kirim Dana</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='flex w-full items-center gap-4'>
          <TrendingUp className='text-primary h-4 w-4' />
          <span>Terima Dana</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
