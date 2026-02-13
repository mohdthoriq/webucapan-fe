import { AlertCircle } from 'lucide-react'
import { CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { usePlansQuery } from '../hooks/use-plans-query'
import { useSubscription } from '../hooks/use-subscription'
// import { PlanDetailsCard } from './plan-details-card'
import { PricingSection } from './pricing-section'
import { SubscriptionInfoCard } from './subscription-info-card'

export function SubscriptionContent() {
  const { subscription, plan, company, user, isEmpty } = useSubscription()
  const { data: plans = [], isLoading: isPlansLoading } = usePlansQuery()

  if (isEmpty || !subscription) {
    return (
      <CardContent>
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <div className='bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
            <AlertCircle className='text-muted-foreground h-8 w-8' />
          </div>
          <h3 className='mb-2 text-lg font-semibold'>Belum Ada Langganan</h3>
          <p className='text-muted-foreground max-w-sm text-sm'>
            Anda belum memiliki paket langganan aktif. Silakan pilih paket di
            bawah ini.
          </p>
        </div>

        <Separator className='my-8' />

        <PricingSection
          currentPlanName={undefined}
          plans={plans}
          isLoading={isPlansLoading}
        />
      </CardContent>
    )
  }

  return (
    <CardContent className='space-y-8'>
      <div className='space-y-6'>
        <SubscriptionInfoCard
          subscription={subscription}
          companyName={company?.name}
          userName={user?.full_name}
        />
        {/* Hanya tampilkan detail paket jika ini adalah paket berbayar */}
        {/* {plan && plan.monthly_price > 0 && <PlanDetailsCard plan={plan} />} */}
      </div>

      <Separator />

      <PricingSection
        currentPlanName={plan?.name || subscription?.plan_name}
        plans={plans}
        isLoading={isPlansLoading}
      />
    </CardContent>
  )
}
