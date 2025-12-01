import { Loader2, Save, User, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { PasswordInput } from '@/components/forms/password-input'
import { useUserSettingsForm } from '../hooks/use-user-settings-form'

export function UserSettingsForm() {
  const { form, onSubmit, isLoading } = useUserSettingsForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Profile Information Section */}
        <div className='space-y-4'>
          <div className=''>
            <div className='flex items-center gap-2'>
              <User className='text-muted-foreground h-5 w-5' />
              <h3 className='text-lg font-medium'>Informasi Profil</h3>
            </div>
            <p className='text-muted-foreground text-sm'>
              Kelola data pribadi Anda.
            </p>
          </div>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      placeholder='nama@contoh.com'
                      {...field}
                      disabled
                      className='cursor-not-allowed'
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Email yang digunakan untuk login dan notifikasi
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='full_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder='Masukkan nama lengkap' {...field} />
                </FormControl>
                <FormDescription>
                  Nama ini akan ditampilkan di profil Anda
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Password Change Section */}
        <div className='space-y-4'>
          <div>
            <div className='flex items-center gap-2'>
              <Lock className='text-muted-foreground h-5 w-5' />
              <h3 className='text-lg font-medium'>Ubah Password</h3>
            </div>
            <p className='text-muted-foreground text-sm'>
              Kosongkan jika tidak ingin mengubah password
            </p>
          </div>

          <FormField
            control={form.control}
            name='old_password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Saat Ini</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='Masukkan password saat ini'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='new_password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Baru</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='Masukkan password baru'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Minimal 8 karakter</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirm_password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password Baru</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='Konfirmasi password baru'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-end pt-4'>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Save className='h-4 w-4' />
            )}
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </Form>
  )
}
