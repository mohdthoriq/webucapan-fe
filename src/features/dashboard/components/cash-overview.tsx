import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Dummy data for cash flow chart
const cashFlowData = [
  { date: 'Jun', amount: 27000000 },
  { date: 'Jul', amount: 35000000 },
  { date: 'Aug', amount: 32000000 },
  { date: 'Sep', amount: 30000000 },
  { date: 'Oct', amount: 33000000 },
  { date: 'Nov', amount: 27000000 },
]

export function CashOverview() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value)
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-base font-semibold'>CASH</CardTitle>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          className='text-muted-foreground h-4 w-4'
        >
          <circle cx='12' cy='12' r='1' />
          <circle cx='12' cy='5' r='1' />
          <circle cx='12' cy='19' r='1' />
        </svg>
      </CardHeader>
      <CardContent>
        <div className='mb-4 space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground text-sm'>
              Saldo di Manajerku
            </span>
            <span className='text-sm font-semibold'>
              {formatCurrency(27064663)}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground text-sm'>Saldo di bank</span>
            <span className='text-sm font-semibold'>
              {formatCurrency(5918038)}
            </span>
          </div>
        </div>

        <ResponsiveContainer width='100%' height={200}>
          <AreaChart data={cashFlowData}>
            <defs>
              <linearGradient id='cashGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#3b82f6' stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey='date'
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
            />
            <Area
              type='monotone'
              dataKey='amount'
              stroke='#3b82f6'
              strokeWidth={2}
              fill='url(#cashGradient)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
