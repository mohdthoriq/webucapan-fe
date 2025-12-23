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
      return <TrendingUp className='h-14 w-14' />
    case Direction.Down:
      return <TrendingDown className='h-14 w-14' />
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
    <Card className='bg-card border-border hover:border-primary/50 transition-colors'>
      <CardHeader className='flex items-start justify-between'>
        <h3 className='text-sm font-semibold tracking-wide uppercase'>
          {title}
        </h3>
        <button className='text-muted-foreground hover:text-foreground transition-colors'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='1' />
            <circle cx='12' cy='5' r='1' />
            <circle cx='12' cy='19' r='1' />
          </svg>
        </button>
      </CardHeader>
      <CardContent className='flex items-start justify-between'>
        <div className='flex flex-col justify-start gap-1'>
          <div className='text-foreground text-md font-bold'>
            {defaultFormatValue(value)}
          </div>
          {count !== undefined && (
            <div className='text-muted-foreground text-xs'>
              {count} {countLabel}
            </div>
          )}
        </div>
        <div
          className={cn(
            'flex flex-col justify-start items-center gap-1',
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
        </div>
      </CardContent>
    </Card>
  )
}
