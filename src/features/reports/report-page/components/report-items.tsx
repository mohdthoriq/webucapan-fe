import { Link } from '@tanstack/react-router'
import { Star } from 'lucide-react'
import type { Report } from '../types/report-data.types'

export function ReportItem({
  report,
  isFavorite,
  toggleFavorite,
}: {
  report: Report
  isFavorite: boolean
  toggleFavorite: (url: string) => void
}) {
  return (
    <div
      key={report.url}
      className='group hover:bg-muted/80 flex items-center rounded-lg p-2 transition-colors hover:border hover:border-blue-600'
    >
      <div className='p-4 pr-0'>
        <button
          onClick={() => toggleFavorite(report.url as string)}
          className='focus:outline-none'
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              isFavorite ? 'fill-blue-500 text-blue-500' : 'text-blue-500'
            }`}
          />
        </button>
      </div>
      <Link
        to={report.url}
        className='flex-1 p-4 pl-4 text-blue-500 group-hover:underline'
      >
        <span className='font-medium'>{report.name}</span>
      </Link>
    </div>
  )
}
