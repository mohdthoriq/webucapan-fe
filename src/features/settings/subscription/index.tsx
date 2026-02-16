import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { SubscriptionContent } from './components/subscription-content'

export function SubscriptionPage() {
  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <div className='mb-2 grid'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Langganan Saya
            </h2>
            <p className='text-muted-foreground'>
              Kelola langganan dan paket Anda.
            </p>
          </div>
          <div>
            <Button variant={'link'} onClick={() => history.back()}>
              Kembali
            </Button>
          </div>
        </div>
        <hr />
      </CardHeader>
      <SubscriptionContent />
    </Card>
  )
}

