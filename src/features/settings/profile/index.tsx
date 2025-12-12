import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { UserSettingsForm } from './components/user-settings-form'

export function UserSettings() {
  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex justify-between'>
            <div className='mb-2 grid'>
              <h2 className='text-2xl font-bold tracking-tight'>
                Profil Pengguna
              </h2>
              <p className='text-muted-foreground'>Kelola data pribadi Anda.</p>
            </div>
            <div>
              <Button variant={'link'} onClick={() => history.back()}>
                Kembali
              </Button>
            </div>
          </div>
          <hr />
        </CardHeader>
        <CardContent>
          <UserSettingsForm />
        </CardContent>
      </Card>
    </>
  )
}
