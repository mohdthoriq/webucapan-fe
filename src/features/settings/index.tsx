import { Building2, User, Shield } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CompanyRoles from './company-roles'
import { CompanySettingsForm } from './company/components/company-settings-form'
import { UserSettingsForm } from './profile/components/user-settings-form'

export function Settings() {
  return (
    <div className='space-y-3'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Pengaturan</h1>
        <p className='text-muted-foreground mt-2'>
          Kelola profil pengguna dan pengaturan perusahaan Anda
        </p>
      </div>

      <Tabs defaultValue='user' className='w-full'>
        <TabsList className='grid w-full max-w-2xl grid-cols-3'>
          <TabsTrigger value='user' className='flex items-center gap-2'>
            <User className='h-4 w-4' />
            Profil Pengguna
          </TabsTrigger>
          <TabsTrigger value='company' className='flex items-center gap-2'>
            <Building2 className='h-4 w-4' />
            Perusahaan
          </TabsTrigger>
          <TabsTrigger value='roles' className='flex items-center gap-2'>
            <Shield className='h-4 w-4' />
            Peran
          </TabsTrigger>
        </TabsList>

        <TabsContent value='user' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Profil</CardTitle>
              <CardDescription>
                Perbarui informasi profil dan preferensi akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='company' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Perusahaan</CardTitle>
              <CardDescription>
                Kelola informasi dan pengaturan perusahaan Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompanySettingsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='roles' className='mt-6'>
          <Card>
            <CardContent>
              <CompanyRoles />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Settings
