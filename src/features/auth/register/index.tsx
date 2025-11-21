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
import { RegisterForm } from './components/register-form'

export function Register() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>Buat akun</CardTitle>
          <CardDescription>
            Masukkan email dan password untuk membuat akun. <br />
            Sudah punya akun?{' '}
            <Link
              to='/register'
              className='hover:text-primary underline underline-offset-4'
            >
              Masuk
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* ========= Register Form ========= */}
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            Dengan membuat akun, Anda menyetujui{' '}
            <a
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Ketentuan Layanan
            </a>{' '}
            dan{' '}
            <a
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Kebijakan Privasi
            </a>{' '}
            kami.
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
