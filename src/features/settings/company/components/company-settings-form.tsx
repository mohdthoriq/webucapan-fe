import { Loader2, Save } from 'lucide-react'
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
import { useCompanySettingsForm } from '../hooks/use-company-settings-form'
import { CompanySettingsSkeleton } from './company-settings-skeleton'

export function CompanySettingsForm() {
  const { form, onSubmit, isLoading, isLoadingData } = useCompanySettingsForm()

  // Show loading skeleton while fetching data
  if (isLoadingData) {
    return <CompanySettingsSkeleton />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Perusahaan</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Masukkan nama perusahaan'
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
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
                      <Textarea
                        placeholder='Masukkan alamat lengkap perusahaan'
                        className='min-h-[100px] resize-none'
                        value={field.value || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
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

          <FormField
            control={form.control}
            name='npwp'
            render={({ field }) => (
              <FormItem>
                <FormLabel>NPWP</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Masukkan NPWP perusahaan'
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormDescription>NPWP perusahaan Anda</FormDescription>
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
