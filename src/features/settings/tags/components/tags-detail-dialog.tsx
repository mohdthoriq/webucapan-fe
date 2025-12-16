import { type Tag } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

type TagsDetailDialogProps = {
  currentRow: Tag
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TagsDetailDialog({
  currentRow,
  open,
  onOpenChange,
}: TagsDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Detail Tag</DialogTitle>
          <DialogDescription>
            Detail informasi tag yang dipilih.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Nama Tag
            </h4>
            <p className='text-sm font-medium'>{currentRow.name}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Deskripsi Tag
            </h4>
            <p className='text-sm font-medium'>{currentRow.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
