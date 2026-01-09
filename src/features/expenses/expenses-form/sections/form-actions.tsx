import { Button } from '@/components/ui/button'

type ExpensesFormActionsProps = {
  isEdit?: boolean
  isSubmitting?: boolean
}

export function ExpensesFormActions({
  isEdit,
  isSubmitting,
}: ExpensesFormActionsProps) {
  // We can use context here if we want, but props are fine too for simple flags
  // However, we need to handle the back button.

  return (
    <div className='flex justify-end gap-4'>
      <Button type='button' variant='outline' onClick={() => history.back()}>
        Batal
      </Button>
      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting
          ? 'Menyimpan...'
          : isEdit
            ? 'Update Pengeluaran'
            : 'Buat Pengeluaran'}
      </Button>
    </div>
  )
}
