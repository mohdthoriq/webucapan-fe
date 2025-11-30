import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Dummy data for bills by age
const billsData = [
  { age: '<1 months', amount: 16500000 },
  { age: '1 months', amount: 1200000 },
  { age: '2 months', amount: 0 },
  { age: '3 months', amount: 0 },
  { age: 'Older', amount: 0 },
]

export function BillsOverview() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value)
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-base font-semibold'>
          TAGIHAN YANG PERLU KAMU BAYAR
        </CardTitle>
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
              37 Menunggu pembayaran
            </span>
            <span className='text-sm font-semibold'>
              {formatCurrency(22774038)}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground text-sm'>
              28 Jatuh tempo
            </span>
            <span className='text-sm font-semibold'>
              {formatCurrency(13210586)}
            </span>
          </div>
        </div>

        <ResponsiveContainer width='100%' height={200}>
          <BarChart data={billsData}>
            <XAxis
              dataKey='age'
              stroke='#888888'
              fontSize={11}
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
            <Bar
              dataKey='amount'
              fill='#ec4899'
              radius={[4, 4, 0, 0]}
              className='fill-blue-500'
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
