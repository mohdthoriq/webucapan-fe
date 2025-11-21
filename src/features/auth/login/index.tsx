import { Logo } from '@/assets/logo'
import { cn } from '@/lib/utils'
import businessIllustrator from './assets/business.jpg'
import { LoginForm } from './components/login-form'

export function Login() {
  return (
    <div className='relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
          <div className='flex items-center justify-center'>
            <Logo className='me-2' />
            <h1 className='text-xl font-medium'>Amfibiz</h1>
          </div>
        </div>
        <div className='mx-auto flex w-full max-w-sm flex-col justify-center space-y-6'>
          <div className='flex flex-col space-y-2 text-start'>
            <h2 className='text-lg font-semibold tracking-tight'>Masuk</h2>
            <p className='text-muted-foreground text-sm'>
              Masukkan email dan kata sandi Anda di bawah ini <br />
              untuk masuk ke akun Anda
            </p>
          </div>
          <LoginForm />
        </div>
      </div>

      <div
        className={cn(
          'bg-muted relative h-full overflow-hidden max-lg:hidden',
          '[&>img]:absolute [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:object-top-left [&>img]:select-none'
        )}
      >
        <img
          src={businessIllustrator}
          className='dark:hidden'
          width={1024}
          height={1151}
          alt='Shadcn-Admin'
        />
        <img
          src={businessIllustrator}
          className='hidden dark:block'
          width={1024}
          height={1138}
          alt='Shadcn-Admin'
        />
      </div>
    </div>
  )
}
