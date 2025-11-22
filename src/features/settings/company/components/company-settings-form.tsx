import { Loader2, Save, Building2, MapPin } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
import { useCompanySettingsForm } from '../hooks/useCompanySettingsForm'

export function CompanySettingsForm() {
  const { form, onSubmit, isLoading } = useCompanySettingsForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-4'>
          <div className='flex items-center gap-2'>
            <Building2 className='text-muted-foreground h-5 w-5' />
            <h3 className='text-lg font-medium'>Informasi Perusahaan</h3>
          </div>

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Perusahaan</FormLabel>
                <FormControl>
                  <Input placeholder='Masukkan nama perusahaan' {...field} />
                </FormControl>
                <FormDescription>Nama resmi perusahaan Anda</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <div className='space-y-2'>
                    <div className='relative'>
                      <MapPin className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
                      <Textarea
                        placeholder='Masukkan alamat lengkap perusahaan'
                        className='min-h-[100px] resize-none pl-9'
                        {...field}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Alamat lengkap kantor atau lokasi perusahaan
                </FormDescription>
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
