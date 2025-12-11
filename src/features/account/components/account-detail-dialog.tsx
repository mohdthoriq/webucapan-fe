import { type Account } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

type AccountDetailDialogProps = {
  currentRow: Account
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountsDetailDialog({
  currentRow,
  open,
  onOpenChange,
}: AccountDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Detail Akun</DialogTitle>
          <DialogDescription>
            Detail informasi akun yang dipilih.
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
              Nama Akun
            </h4>
            <p className='text-sm'>{currentRow.name || '-'}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Kategori Akun
            </h4>
            <p className='text-sm'>{currentRow.category.name || '-'}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Tipe Akun
            </h4>
            <p className='text-sm'>{currentRow.type.name || '-'}</p>
          </div>
            <div>
              <h4 className='text-muted-foreground text-sm font-medium'>
                Parent Akun
              </h4>
              <p className='text-sm'>{currentRow.parent?.name || '-'}</p>
            </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Allow Transaksi
            </h4>
            <p className='text-sm'>
              {currentRow.allow_transaction ? 'Ya' : 'Tidak'}
            </p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>Aktif</h4>
            <p className='text-sm'>{currentRow.is_active ? 'Ya' : 'Tidak'}</p>
          </div>
          <div>
            <h4 className='text-muted-foreground text-sm font-medium'>
              Deskripsi
            </h4>
            <p className='text-sm'>{currentRow.description || '-'}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
