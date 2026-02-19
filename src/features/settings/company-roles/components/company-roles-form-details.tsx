import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2Icon } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { CreateCompanyRoleSettingsFormData } from '../types/company-roles.schema'

interface CompanyRolesFormDetailsProps {
  form: UseFormReturn<CreateCompanyRoleSettingsFormData>
  isEdit: boolean
  errorMessage?: string | null
}

export function CompanyRolesFormDetails({ form, isEdit, errorMessage }: CompanyRolesFormDetailsProps) {
  return (
    <Card className='flex flex-col'>
      <CardHeader>
        <CardTitle>Detail Peran</CardTitle>
        <CardDescription>
          {isEdit ? 'Ubah nama dan deskripsi untuk peran ini.' : 'Tentukan nama dan deskripsi untuk peran baru ini.'}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Peran</FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g., Administrator, Manager, Developer'
                    autoComplete='off'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Deskripsikan peran ini...'
                    className='min-h-[100px]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {errorMessage && (
          <Alert variant='destructive' className='mt-4'>
            <CheckCircle2Icon className='h-4 w-4' />
            <AlertTitle>Perhatian!</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
