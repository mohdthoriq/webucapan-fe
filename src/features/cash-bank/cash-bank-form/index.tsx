import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useCashBankForm } from './hooks/use-cash-bank-form'
import { CashBankFormActions } from './sections/cash-bank-form-actions'
import { CashBankFormHeader } from './sections/cash-bank-form-header'
import { CashBankFormItems } from './sections/cash-bank-form-items'
import { CashBankFormSummary } from './sections/cash-bank-form-summary'

type CashBankFormPageProps = {
  type: 'spend' | 'receive'
}

export function CashBankFormPage({ type }: CashBankFormPageProps) {
  const cashBankForm = useCashBankForm({
    type,
  })

  const title = type === 'spend' ? 'Kirim Dana' : 'Terima Dana'

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            {title}
            <Button variant='link' onClick={() => history.back()}>
              Kembali
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...cashBankForm.form}>
          <form
            onSubmit={cashBankForm.form.handleSubmit((data) =>
              cashBankForm.onSubmit(data)
            )}
            className='space-y-8'
            id='cash-bank-form'
          >
            <CashBankFormHeader type={type} />
            <div className='bg-border h-px' />
            <CashBankFormItems />
            <div className='bg-border h-px' />
            <CashBankFormSummary />
            <div className='bg-border h-px' />
            <CashBankFormActions isSubmitting={cashBankForm.isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
