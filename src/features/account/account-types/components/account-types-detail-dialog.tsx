import { type AccountType } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

type AccountTypesDetailDialogProps = {
  currentRow: AccountType
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountTypesDetailDialog({
  currentRow,
  open,
  onOpenChange,
}: AccountTypesDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Detail Tipe Akun</DialogTitle>
          <DialogDescription>
            Detail informasi tipe akun yang dipilih.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Kode Akun
            </h4>
            <p className='text-sm font-medium'>{currentRow.code}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Nama Tipe Akun
            </h4>
            <p className='text-sm'>{currentRow.name || '-'}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Saldo Normal  
            </h4>
            <p className='text-sm'>{currentRow.normal_balance || '-'}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
