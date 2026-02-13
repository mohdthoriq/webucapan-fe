import { Check, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { PricingPeriod, PricingPlan } from '../types'

interface PricingCardProps {
  plan: PricingPlan
  period: PricingPeriod
  isCurrentPlan: boolean
  isLoading?: boolean
  onSelect: (plan: PricingPlan) => void
}

export function PricingCard({
  plan,
  period,
  isCurrentPlan,
  isLoading,
  onSelect,
}: PricingCardProps) {
  const price = period === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
  const periodText = period === 'monthly' ? '/bulan' : '/tahun'

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <Card
      className={cn(
        'relative flex flex-col transition-all duration-200',
        isCurrentPlan
          ? 'bg-muted/50 border-primary/20 scale-[0.98] opacity-80 shadow-none'
          : 'hover:border-primary/50 hover:shadow-md',
        plan.isPopular && !isCurrentPlan ? 'border-primary shadow-sm' : ''
      )}
    >
      {plan.isPopular && !isCurrentPlan && (
        <div className='absolute -top-3 left-0 right-0 flex justify-center'>
          <Badge className='bg-primary text-primary-foreground hover:bg-primary'>
            Popular
          </Badge>
        </div>
      )}

      {isCurrentPlan && (
        <div className='absolute -top-3 left-0 right-0 flex justify-center'>
          <Badge variant='outline' className='bg-background text-muted-foreground'>
            Paket Saat Ini
          </Badge>
        </div>
      )}

      <CardHeader>
        <CardTitle className='text-xl'>{plan.name}</CardTitle>
        <CardDescription className='min-h-[80px] leading-relaxed'>
          {plan.description}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1'>
        <div className='mb-6'>
          <span className='text-3xl font-bold'>{formattedPrice}</span>
          <span className='text-muted-foreground ml-1 text-sm font-medium'>
            {periodText}
          </span>
        </div>
        <div className='space-y-3'>
          {plan.features.map((feature, index) => (
            <div key={index} className='flex items-start gap-2'>
              <div className='bg-primary/10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full'>
                <Check className='text-primary h-2.5 w-2.5' />
              </div>
              <span className='text-muted-foreground text-sm leading-tight'>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className='w-full'
          variant={isCurrentPlan ? 'outline' : 'default'}
          disabled={isCurrentPlan || isLoading}
          onClick={() => onSelect(plan)}
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {isCurrentPlan ? 'Sedang Digunakan' : plan.buttonText || 'Pilih Paket'}
        </Button>
      </CardFooter>
    </Card>
  )
}
