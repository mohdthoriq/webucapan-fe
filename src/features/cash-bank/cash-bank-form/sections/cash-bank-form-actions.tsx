import { Button } from '@/components/ui/button'

type CashBankFormActionsProps = {
  isSubmitting: boolean
  errorMessage?: string
}

export function CashBankFormActions({
  isSubmitting,
  errorMessage,
}: CashBankFormActionsProps) {
  return (
    <div className='flex flex-col gap-4'>
      {errorMessage && (
        <div className='bg-destructive/10 text-destructive rounded-md p-3 text-sm font-medium'>
          {errorMessage}
        </div>
      )}
      <div className='flex items-center justify-end gap-3'>
        <Button
          type='button'
          variant='outline'
          onClick={() => history.back()}
          disabled={isSubmitting}
        >
          Batal
        </Button>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </div>
    </div>
  )
}
