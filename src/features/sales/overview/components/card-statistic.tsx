import type { ReactNode } from 'react'
import { TrendingDown, TrendingUp, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Direction, type Trend } from '../types/sales-overview'

interface CardStatisticProps {
  title: string
  value: number | undefined
  count?: number
  countLabel?: string
  trend?: Trend
  variant?: 'default' | 'clock'
  isLoading?: boolean
  cardAction?: ReactNode
}

const defaultFormatValue = (value: number | undefined) => {
  return new Intl.NumberFormat('id-ID').format(value ?? 0)
}

const getTrendColor = (direction?: Direction) => {
  switch (direction) {
    case Direction.Up:
      return 'text-green-500'
    case Direction.Down:
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

const getTrendIcon = (direction?: Direction) => {
  switch (direction) {
    case Direction.Up:
      return <TrendingUp className='h-16 w-16' />
    case Direction.Down:
      return <TrendingDown className='h-16 w-16' />
    default:
      return null
  }
}

export function CardStatistic({
  title,
  value,
  count,
  countLabel = 'Tagihan',
  trend,
  variant = 'default',
  isLoading = false,
  cardAction,
}: CardStatisticProps) {
  const getVariantIcon = () => {
    if (variant === 'clock') {
      return (
        <div className='relative'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20'>
            <Clock className='h-6 w-6 text-red-500' />
          </div>
          {trend && (
            <div className='absolute -right-1 -bottom-1 text-xs font-semibold text-red-500'>
              {Math.abs(trend.percentage).toFixed(1)}%
            </div>
          )}
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <Card className='bg-card border-border'>
        <CardHeader className='pb-2'>
          <div className='bg-muted h-4 w-32 animate-pulse rounded' />
        </CardHeader>
        <CardContent className='space-y-2'>
          <div className='bg-muted h-8 w-40 animate-pulse rounded' />
          <div className='bg-muted h-3 w-24 animate-pulse rounded' />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='bg-card border-border hover:border-primary/50 flex flex-col gap-0 px-5 transition-colors min-h-[180px]'>
      <div className='flex items-start justify-between'>
        <h3 className='text-md font-semibold tracking-wide uppercase'>
          {title}
        </h3>
        {cardAction}
      </div>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col justify-start gap-1'>
          <div className='text-foreground text-lg font-bold'>
            {defaultFormatValue(value)}
          </div>
          {count !== undefined && (
            <div className='text-muted-foreground text-sm'>
              {count} {countLabel}
            </div>
          )}
        </div>
        <div
          className={cn(
            'flex flex-col justify-start mr-10 gap-1',
            getTrendColor(trend?.direction)
          )}
        >
          {variant === 'clock'
            ? getVariantIcon()
            : getTrendIcon(trend?.direction)}
          <span className='text-xs font-medium'>
            {trend?.direction === Direction.Down ? '-' : '+'}
            {Math.abs(trend?.percentage ?? 0).toFixed(1)}%
          </span>
        </div>
      </div>
      {trend && variant !== 'clock' && (
        <span className='text-muted-foreground text-xs'>
          {trend.comparison_text}
        </span>
      )}

      {variant === 'clock' && trend && (
        <div className='text-muted-foreground text-xs'>
          {trend.comparison_text}
        </div>
      )}
    </Card>
  )
}
