import { Link } from '@tanstack/react-router'
import { CircleArrowUp } from 'lucide-react'
import { Button } from './ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

interface UpgradePlanCardProps {
  feature: string
}

export function UpgradePlanCard({ feature }: UpgradePlanCardProps) {
  return (
    <div className='absolute inset-0 z-10 flex items-start justify-center p-4 pt-[10%]'>
      <Card className='bg-background/95 supports-[backdrop-filter]:bg-background/60 w-full max-w-md shadow-lg backdrop-blur'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Fitur Tidak Tersedia</CardTitle>
          <CardDescription className='mt-2 text-base'>
            Fitur {feature} tidak tersedia pada paket Anda saat ini. Silakan
            upgrade paket untuk menggunakan fitur ini.
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex justify-center border-t'>
          <Button className='h-11 w-full bg-green-600/70 text-base hover:bg-green-600/80'>
            <CircleArrowUp className='h-6 w-6' />
            <Link to='/settings/subscription'>Upgrade Paket</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
