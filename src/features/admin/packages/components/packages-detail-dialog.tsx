import { type Package } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

type PackagesDetailDialogProps = {
  currentRow: Package
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PackagesDetailDialog({
  currentRow,
  open,
  onOpenChange,
}: PackagesDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Detail Plan</DialogTitle>
          <DialogDescription>
            Detail informasi plan yang dipilih.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Nama Plan
            </h4>
            <p className='text-sm font-medium'>{currentRow.name}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Harga Bulanan
            </h4>
            <p className='text-sm'>{currentRow.monthly_price || '-'}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Harga Tahunan
            </h4>
            <p className='text-sm'>{currentRow.yearly_price || '-'}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Fitur - fitur
            </h4>
            <p className='text-sm'>{currentRow.features.join(', ') || '-'}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
