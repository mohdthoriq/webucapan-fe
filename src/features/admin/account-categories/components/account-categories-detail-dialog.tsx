import { type AccountCategory } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

type AccountCategoriesDetailDialogProps = {
  currentRow: AccountCategory
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountCategoriesDetailDialog({
  currentRow,
  open,
  onOpenChange,
}: AccountCategoriesDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Detail Kategori Akun</DialogTitle>
          <DialogDescription>
            Detail informasi kategori akun yang dipilih.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Nama Kategori Akun
            </h4>
            <p className='text-sm font-medium'>{currentRow.name}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Deskripsi Kategori Akun
            </h4>
            <p className='text-sm'>{currentRow.description || '-'}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
