import type { Tax } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

type TaxesDetailDialogProps = {
  currentRow: Tax
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaxesDetailDialog({
  currentRow,
  open,
  onOpenChange,
}: TaxesDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Detail Pajak</DialogTitle>
          <DialogDescription>
            Detail informasi pajak yang dipilih.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Nama Pajak
            </h4>
            <p className='text-sm font-medium'>{currentRow.name}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>Rate</h4>
            <p className='text-sm'>{currentRow.rate || 0}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Deskripsi
            </h4>
            <p className='text-sm'>{currentRow.description || '-'}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Nama Perusahaan
            </h4>
            <p className='text-sm'>{currentRow.company?.name || '-'}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
