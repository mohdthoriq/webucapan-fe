import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Search, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { reportsData } from './data'

export function Reports() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = reportsData
    .map((cat) => ({
      ...cat,
      reports: cat.reports.filter((report) =>
        report.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.reports.length > 0)

  return (
    <div className='flex flex-col space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Laporan</h1>
      </div>

      <div className='flex justify-end'>
        <div className='relative w-full max-w-sm'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
          <Input
            placeholder='Cari'
            className='pl-9'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {filteredData.map((category) => (
          <div key={category.category} className='flex flex-col space-y-4'>
            <h2 className='text-foreground/90 text-lg font-semibold'>
              {category.category}
            </h2>
            <Card className='bg-card text-card-foreground overflow-hidden'>
              <div className='divide-border divide-y'>
                {category.reports.map((report) => (
                  <Link
                    key={report.slug}
                    to={`/reports/${report.slug}`}
                    className='group hover:bg-muted/50 block transition-colors'
                  >
                    <CardContent className='flex items-center space-x-4 p-4'>
                      <Star className='h-5 w-5 text-blue-500' />
                      <span className='font-medium text-blue-500 group-hover:underline'>
                        {report.name}
                      </span>
                    </CardContent>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
