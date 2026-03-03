import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SubscriptionByPlan } from '../types'

interface SubscriptionOverviewProps {
  subscriptionByPlan: SubscriptionByPlan[] | undefined
  isLoading: boolean
}

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export function SubscriptionOverview({ 
  subscriptionByPlan, 
  isLoading,
}: SubscriptionOverviewProps) {
  const chartData = (subscriptionByPlan ?? []).map((item) => ({
    name: item.plan_name,
    value: item.company_count,
    percentage: item.percentage,
  }))

  if (isLoading) {
    return (
      <Card className='col-span-1 lg:col-span-2'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0'>
          <CardTitle className='text-base font-semibold uppercase'>
            Distribusi Paket Langganan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-[350px] w-full animate-pulse rounded bg-muted' />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='col-span-1 lg:col-span-2'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='text-base font-semibold uppercase'>
          Distribusi Paket Langganan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex h-[350px] flex-col items-center justify-center '>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={chartData}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey='value'
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(
                  value: number | string | (number | string)[] | undefined,
                  name: string | number | undefined,
                  item: { payload?: { percentage: number } }
                ) => {
                  if (value === undefined) return ['', '']
                  const val = Array.isArray(value) ? value[0] : value
                  const percentage = item.payload?.percentage ?? 0
                  return [`${val} Perusahaan (${percentage}%)`, name ?? '']
                }}
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className='mt-4 grid grid-cols-2 gap-4'>
            {chartData.map((item, index) => (
              <div key={item.name} className='flex items-center space-x-2'>
                <div
                  className='h-3 w-3 rounded-full'
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className='text-sm text-muted-foreground'>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
