import { Link } from '@tanstack/react-router'
import { CircleArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface FeatureLockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feature: string
}

export function FeatureLockDialog({
  open,
  onOpenChange,
  feature,
}: FeatureLockDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='items-center text-center'>
          <DialogTitle className='text-2xl'>Fitur Tidak Tersedia</DialogTitle>
          <DialogDescription className='mt-2 text-base'>
            Fitur {feature} tidak tersedia pada paket Anda saat ini. Silakan
            upgrade paket untuk menggunakan fitur ini.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mt-4 w-full sm:justify-center'>
          <Button
            asChild
            className='h-11 w-full bg-green-600/70 text-base hover:bg-green-600/80'
          >
            <Link
              to='/settings/subscription'
              onClick={() => onOpenChange(false)}
            >
              <CircleArrowUp className='mr-2 h-5 w-5' />
              Upgrade Paket
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
