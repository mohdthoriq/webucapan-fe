import { AlertCircle } from 'lucide-react'
import { CardContent } from '@/components/ui/card'
import { SubscriptionInfoCard } from './subscription-info-card'
import { PlanDetailsCard } from './plan-details-card'
import { useSubscription } from '../hooks/use-subscription'

export function SubscriptionContent() {
  const { subscription, plan, company, user, isEmpty } = useSubscription()

  if (isEmpty || !subscription) {
    return (
      <CardContent>
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <div className='bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
            <AlertCircle className='text-muted-foreground h-8 w-8' />
          </div>
          <h3 className='mb-2 text-lg font-semibold'>Belum Ada Langganan</h3>
          <p className='text-muted-foreground max-w-sm text-sm'>
            Anda belum memiliki paket langganan aktif. Silakan hubungi
            administrator untuk informasi lebih lanjut.
          </p>
        </div>
      </CardContent>
    )
  }

  return (
    <CardContent className='space-y-6'>
      <SubscriptionInfoCard
        subscription={subscription}
        companyName={company?.name}
        userName={user?.full_name}
      />
      {plan && <PlanDetailsCard plan={plan} />}
    </CardContent>
  )
}
