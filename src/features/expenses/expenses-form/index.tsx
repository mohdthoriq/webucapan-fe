import { useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useExpensesForm } from './hooks/use-expenses-form'
import { useDefaultNumberingQuery, useExpensesFormQuery } from './hooks/use-expenses-form-query'
import { ExpensesFormActions } from './sections/form-actions'
import { ExpensesFormHeader } from './sections/form-header'
import { ExpensesFormItems } from './sections/form-items-table'
import { ExpensesFormSummary } from './sections/form-summary'
import { FinanceNumberType } from '@/types'

export function ExpensesFormPage() {
  const location = useLocation()

  const currentRowId = (location.state as { currentRowId?: string })
    ?.currentRowId

  const currentRow = useExpensesFormQuery({ id: currentRowId })

  const { data: expensesAutoNumbering } = useDefaultNumberingQuery({
    type: FinanceNumberType.expense,
  })

  const expensesForm = useExpensesForm({
    currentRow: currentRow.data ?? undefined,
    autoNumbering: expensesAutoNumbering,
  })

  if (currentRowId && currentRow.isLoading) {
    return (
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Memuat data invoice...</CardTitle>
        </CardHeader>
        <CardContent className='flex h-40 items-center justify-center font-medium'>
          Mohon tunggu sebentar...
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='mb-8'>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            {expensesForm.isEdit ? 'Edit Expenses' : 'Buat Expenses Baru'}
            <Button variant='link' onClick={() => history.back()}>
              Kembali
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...expensesForm.form}>
          <form
            onSubmit={expensesForm.form.handleSubmit(expensesForm.onSubmit)}
            className='space-y-8'
            id='expenses-form'
          >
            <ExpensesFormHeader />
            <div className='bg-border h-px' />
            <ExpensesFormItems />
            <ExpensesFormSummary />
            <ExpensesFormActions
              isEdit={expensesForm.isEdit}
              isSubmitting={expensesForm.isSubmitting}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
