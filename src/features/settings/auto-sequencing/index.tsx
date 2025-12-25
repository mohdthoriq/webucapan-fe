import { ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function AutoSequencing() {
  return (
    <Card className='w-full'>
      <CardHeader className='flex w-full flex-col gap-8 p-4 px-6'>
        <div className='flex w-full items-center justify-between'>
          <h1 className='text-4xl font-medium tracking-wide'>
            Penomoran Otomatis
          </h1>
          <Button variant='ghost' onClick={() => history.back()}>
            <ArrowLeft />
            Kembali
          </Button>
        </div>
        <CardDescription className='text-sm font-medium'>
          Tentukan nomor yang akan digunakan saat membuat faktur atau pesanan
          pembelian. Nomor tersebut <br /> akan secara otomatis bertambah setiap
          kali Anda membuat dokumen baru.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex w-full flex-col gap-8'>
          <div className='flex w-full items-center justify-end'>
            <Input
              title='Cari Penomoran'
              placeholder='cari penomoran..'
              startAdornment={<Search className='h-4 w-4' />}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
