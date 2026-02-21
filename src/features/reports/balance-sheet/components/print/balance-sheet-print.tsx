import { forwardRef } from 'react'
import { format } from 'date-fns'
import type {
  BalanceSheetCategory,
  BalanceSheetItem,
  BalanceSheetReport,
  BalanceSheetSection,
} from '@/types'
import { id } from 'date-fns/locale'
import { useAuthStore } from '@/stores/auth-store'
import { cn, formatCurrency } from '@/lib/utils'

interface BalanceSheetPrintProps {
  data: BalanceSheetReport
  date: Date
  className?: string
}

export const BalanceSheetPrint = forwardRef<
  HTMLDivElement,
  BalanceSheetPrintProps
>(({ data, date, className }, ref) => {
  const company = useAuthStore((state) => state.auth.user?.company)

  const renderSection = (
    title: string,
    section: BalanceSheetSection,
    totalLabel: string
  ) => {
    const categories = Object.values(
      section.data || {}
    ) as BalanceSheetCategory[]

    return (
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between border-b-2 border-slate-900 pb-2'>
          <span className='text-xl font-bold uppercase'>{title}</span>
          <span className='text-sm font-medium'>
            Per Tanggal {format(date, 'd MMMM yyyy', { locale: id })}
          </span>
        </div>

        <div className='flex flex-col'>
          {categories.map((category) => (
            <div key={category.name} className='mb-4'>
              <h4 className='border-b border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold uppercase'>
                {category.name}
              </h4>
              <div className='flex flex-col'>
                {category.data.map((item: BalanceSheetItem) =>
                  item.account_id === 5000 || item.account_id === 5001 ? (
                    <div
                      key={item.account_id}
                      className='flex cursor-pointer items-center justify-between border-b border-slate-200 p-4 transition-colors hover:bg-slate-100/50'
                    >
                      <div className='ml-6 flex gap-4'>
                        {item.account.ref_code ? (
                          <span className='text-md w-20 font-medium'>
                            {item.account.ref_code}
                          </span>
                        ) : (
                          '-'
                        )}
                        <span className='text-md font-medium'>
                          {item.account.name}
                        </span>
                      </div>
                      <span className='text-md text-primary font-medium'>
                        {item.net < 0
                          ? `(${formatCurrency(Math.abs(item.net))})`
                          : formatCurrency(item.net)}
                      </span>
                    </div>
                  ) : (
                    <div
                      key={item.account_id}
                      className='flex cursor-pointer items-center justify-between border-b border-slate-200 p-4 transition-colors hover:bg-slate-100/50'
                    >
                      <div className='ml-6 flex gap-4'>
                        {item.account.ref_code && (
                          <span className='text-md w-20 font-medium'>
                            {item.account.ref_code}
                          </span>
                        )}
                        <span className='text-md font-medium'>
                          {item.name || item.account.name}
                        </span>
                      </div>
                      <span className='text-md text-primary font-medium'>
                        {item.net < 0
                          ? `(${formatCurrency(Math.abs(item.net))})`
                          : formatCurrency(item.net)}
                      </span>
                    </div>
                  )
                )}
              </div>
              <div className='flex items-center justify-between bg-slate-50/50 px-3 py-2 text-xs font-bold'>
                <span>Total {category.name}</span>
                <span>
                  {category.total < 0
                    ? `(${formatCurrency(Math.abs(category.total))})`
                    : formatCurrency(category.total)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-2 flex items-center justify-between border-t-2 border-slate-900 bg-slate-100 px-3 py-3 text-sm font-black uppercase'>
          <span>{totalLabel}</span>
          <span>
            {section.total < 0
              ? `(${formatCurrency(Math.abs(section.total))})`
              : formatCurrency(section.total)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn('hidden flex-col bg-white font-sans print:flex', className)}
    >
      <style type='text/css' media='print'>
        {`
            @page {
              size: portrait;
              margin: 10mm;
            }
            body {
              -webkit-print-color-adjust: exact;
            }
          `}
      </style>

      {/* Header Print */}
      <div className='mb-10 flex flex-col items-center justify-center space-y-3 border-b-2 border-slate-900 pb-8 text-center'>
        {company?.logo_url && (
          <img
            src={company.logo_url}
            alt={company.name}
            className='mb-2 h-20 w-auto object-contain'
          />
        )}
        <div className='flex flex-col items-center space-y-1'>
          <h2 className='text-2xl font-black tracking-widest text-slate-900 uppercase'>
            {company?.name || 'MANAJERKU'}
          </h2>
          <div className='h-1 w-20 bg-slate-900' />
          <h1 className='mt-4 text-3xl font-bold tracking-tight text-slate-800'>
            Laporan Neraca
          </h1>
          <p className='text-sm text-slate-500'>
            Per {format(date, 'd MMMM yyyy', { locale: id })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col gap-10'>
        {/* Assets Section */}
        {renderSection('Aset', data.assets, 'Total Aset')}

        {/* Liabilities and Equity Section */}
        {renderSection(
          'Liabilitas dan Modal',
          data.liabilities_equity,
          'Total Liabilitas & Modal'
        )}
      </div>

      {/* Footer Print */}
      <div className='mt-auto pt-10 text-right text-[10px] text-slate-400'>
        Dicetak pada {format(new Date(), 'd MMMM yyyy HH:mm', { locale: id })} -
        Manajerku
      </div>
    </div>
  )
})

BalanceSheetPrint.displayName = 'BalanceSheetPrint'
