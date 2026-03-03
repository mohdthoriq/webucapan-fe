import { MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { AdminDashboardPeriod } from '../types'

interface AdminDashboardCardActionProps {
  period: AdminDashboardPeriod
  year: number
  onChange: (updates: { period?: AdminDashboardPeriod; year?: number; month?: number }) => void
}

export function AdminDashboardCardAction({
  period,
  year,
  onChange,
}: AdminDashboardCardActionProps) {
  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='text-muted-foreground hover:text-foreground h-8 w-8 print:hidden'
        >
          <MoreVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuItem
          onClick={() => onChange({ period: 'month' })}
          className={cn(period === 'month' && 'bg-accent')}
        >
          6 Bulan Terakhir
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange({ period: 'year' })}
          className={cn(period === 'year' && 'bg-accent')}
        >
          Laporan Tahunan
        </DropdownMenuItem>
        
        {period === 'year' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Tahun: {year}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {yearOptions.map((y) => (
                  <DropdownMenuItem
                    key={y}
                    onClick={() => onChange({ year: y })}
                    className={cn(year === y && 'bg-accent')}
                  >
                    {y}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
