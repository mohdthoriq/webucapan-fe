import { format } from 'date-fns'
import type {
  COGSItem,
  GrossProfitItem,
  NetIncomeItem,
  OperatingExpensesItem,
  RevenueItem,
  ProfitLossCategoryDetail,
} from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useProfitLossContext } from './profit-loss-provider'

type ReportSection =
  | RevenueItem
  | COGSItem
  | GrossProfitItem
  | OperatingExpensesItem
  | NetIncomeItem

interface ReportSectionWithData {
  data?: Record<string, ProfitLossCategoryDetail>
}

export function ReportSectionView({
  title,
  date,
  section,
  totalLabel,
}: {
  title: string
  date?: Date
  section: ReportSection
  totalLabel: string
}) {
  const { openDetail } = useProfitLossContext()
  const sectionWithData = section as ReportSectionWithData
  const categories: ProfitLossCategoryDetail[] = sectionWithData.data
    ? Object.values(sectionWithData.data)
    : []

  return (
    <div>
      {/* Section Header */}
      <div className='flex items-center justify-between rounded-md bg-slate-100/20 p-4 text-sm font-bold'>
        <span className='text-2xl font-semibold'>{title}</span>
        {date && <span className='text-lg'>{format(date, 'dd/MM/yyyy')}</span>}
      </div>

      <div>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.name}>
              {/* Category Header */}
              <h4 className='border-b border-slate-200 p-4 text-lg font-medium hover:bg-slate-100/20'>
                {category.name}
              </h4>

              {/* Account Rows */}
              <div>
                {category.data.map((item) => {
                  const accountId = item.account_id.toString()
                  const isExcluded =
                    accountId === '5000' || accountId === '5001'

                  return (
                    <div
                      key={item.account_id}
                      className='flex cursor-pointer items-center justify-between border-b border-slate-200 p-4 transition-colors hover:bg-slate-100/50'
                      onClick={() => !isExcluded && openDetail(accountId)}
                    >
                      <div className='ml-6 flex gap-4'>
                        {item.account.ref_code ? (
                          <span className='text-md w-20 font-medium'>
                            {item.account.ref_code}
                          </span>
                        ) : (
                          <span className='text-md w-20 font-medium'>-</span>
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
                  )
                })}
              </div>

              {/* Category Total */}
              <div className='flex items-center justify-between border-b border-slate-200 p-4 text-lg font-medium hover:bg-slate-100/20'>
                <span>Total {category.name}</span>
                <span>
                  {category.total < 0
                    ? `(${formatCurrency(Math.abs(category.total))})`
                    : formatCurrency(category.total)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className='p-8'>
            {section.total === 0 && (
              <p className='text-muted-foreground py-4 text-sm italic'>
                Tidak ada data
              </p>
            )}
          </div>
        )}
      </div>

      {/* Main Section Total */}
      <div className='border-b border-slate-200 p-4 hover:bg-slate-100/20'>
        <div className='flex items-center justify-between text-lg font-semibold tracking-tight uppercase'>
          <span>{totalLabel}</span>
          <span>
            {section.total < 0
              ? `(${formatCurrency(Math.abs(section.total))})`
              : formatCurrency(section.total)}
          </span>
        </div>
      </div>
    </div>
  )
}
