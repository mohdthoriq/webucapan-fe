import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { type Unit } from '../types/units-response'

type UnitsDetailDialogProps = {
  currentRow: Unit
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UnitsDetailDialog({
  currentRow,
  open,
  onOpenChange,
}: UnitsDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Detail Satuan</DialogTitle>
          <DialogDescription>
            Detail informasi satuan yang dipilih.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Nama Satuan
            </h4>
            <p className='text-sm font-medium'>{currentRow.name}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>Kode</h4>
            <p className='text-sm'>{currentRow.code || '-'}</p>
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
