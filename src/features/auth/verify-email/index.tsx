import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { VerifyEmailForm } from './components/verify-email-form'

export function VerifyEmail() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-base tracking-tight'>
            Verifikasi Email
          </CardTitle>
          <CardDescription>
            Silakan masukkan kode verifikasi yang telah dikirim ke email Anda.
            <br /> Kode verifikasi berlaku selama 10 menit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyEmailForm />
        </CardContent>
        <CardFooter className='flex flex-col space-y-2'>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            Tidak menerima kode?{' '}
            <button
              type='button'
              className='hover:text-primary underline underline-offset-4'
            >
              Kirim ulang kode
            </button>
            .
          </p>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            Sudah punya akun?{' '}
            <Link
              to='/login'
              className='hover:text-primary underline underline-offset-4'
            >
              Kembali ke Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
