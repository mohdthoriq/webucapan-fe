import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { ResetPasswordForm } from './components/reset-password-form'

export function ResetPassword() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            Buat Kata Sandi Baru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground mx-auto px-8 text-center text-sm text-balance'>
            Belum punya akun?{' '}
            <Link
              to='/register'
              className='hover:text-primary underline underline-offset-4'
            >
              Daftar
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
