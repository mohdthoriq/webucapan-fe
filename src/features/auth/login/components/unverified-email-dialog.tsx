import { useNavigate } from '@tanstack/react-router'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface UnverifiedEmailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
  onResendOtp: () => void
}

export function UnverifiedEmailDialog({
  open,
  onOpenChange,
  email,
  onResendOtp,
}: UnverifiedEmailDialogProps) {
  const navigate = useNavigate()

  const handleGoToVerify = () => {
    navigate({
      to: '/verify-email',
    })
    onOpenChange(false)
  }

  const handleResendOtp = () => {
    onResendOtp()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Anda belum melakukan verifikasi email
          </AlertDialogTitle>
          <AlertDialogDescription>
            Email Anda ({email}) belum diverifikasi. <br /> Silakan verifikasi
            email Anda untuk melanjutkan. Anda dapat meminta kode OTP baru atau
            langsung ke halaman verifikasi email.
            <br />
            <span
              onClick={handleResendOtp}
              className='hover:text-primary mt-2 cursor-pointer underline'
            >
              Kirim ulang OTP
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleGoToVerify}>
            Ke Halaman Verifikasi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
