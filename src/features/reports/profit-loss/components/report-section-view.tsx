import { format } from 'date-fns'
import type { BaseProfitLossSection, ProfitLossCategoryDetail } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useProfitLossContext } from './profit-loss-provider'

interface ReportSectionViewProps {
  title: string
  date?: Date
  section: BaseProfitLossSection & {
    data: Record<string, ProfitLossCategoryDetail>
  }
  totalLabel: string
}

export function ReportSectionView({
  title,
  date,
  section,
  totalLabel,
}: ReportSectionViewProps) {
  const { openDetail } = useProfitLossContext()
  const categories = Object.values(section.data)

  if (categories.length === 0) {
    return (
      <div className='space-y-4 p-8'>
        <div className='flex items-center justify-between border-b-2 p-6 font-bold'>
          <span className='text-xl uppercase'>{title}</span>
          {date && <span>{format(date, 'dd/MM/yyyy')}</span>}
        </div>
        <p className='text-muted-foreground py-4 text-sm italic'>
          Tidak ada data
        </p>
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      {/* Section Header */}
      <div className='flex items-center justify-between border-y border-slate-200 bg-slate-50 p-5'>
        <span className='text-xl font-bold tracking-tight uppercase'>
          {title}
        </span>
        {date && (
          <span className='text-lg font-medium'>
            {format(date, 'dd/MM/yyyy')}
          </span>
        )}
      </div>

      <div className='divide-y divide-slate-100'>
        {categories.map((category) => (
          <div key={category.name} className='flex flex-col'>
            {/* Category Header */}
            <div className='bg-slate-50/50 p-4 font-semibold text-slate-700'>
              {category.name}
            </div>

            {/* Account Rows */}
            <div className='divide-y divide-slate-50'>
              {category.data.map((item) => (
                <div
                  key={item.account_id}
                  className='group flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-blue-50/50'
                  onClick={() => openDetail(item.account_id.toString())}
                >
                  <div className='flex items-center gap-4 pl-4'>
                    {item.account.ref_code && (
                      <span className='text-muted-foreground w-24 text-sm font-medium'>
                        {item.account.ref_code}
                      </span>
                    )}
                    <span className='font-medium transition-colors group-hover:text-blue-600'>
                      {item.account.name}
                    </span>
                  </div>
                  <span className='text-md font-semibold'>
                    {item.net < 0
                      ? `(${formatCurrency(Math.abs(item.net))})`
                      : formatCurrency(item.net)}
                  </span>
                </div>
              ))}
            </div>

            {/* Category Total */}
            <div className='flex items-center justify-between bg-slate-50/30 p-4 font-bold text-slate-900'>
              <span className='pl-4'>Total {category.name}</span>
              <span>
                {category.total < 0
                  ? `(${formatCurrency(Math.abs(category.total))})`
                  : formatCurrency(category.total)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section Total */}
      <div className='flex items-center justify-between border-y border-slate-200 bg-slate-100/50 p-5 font-bold uppercase'>
        <span>{totalLabel}</span>
        <span className='text-xl'>
          {section.total < 0
            ? `(${formatCurrency(Math.abs(section.total))})`
            : formatCurrency(section.total)}
        </span>
      </div>
    </div>
  )
}
