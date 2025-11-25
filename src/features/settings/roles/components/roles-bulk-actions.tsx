import { type Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface DataTableBulkActionsProps<TData> {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const rows = table.getFilteredSelectedRowModel().rows

  if (rows.length === 0) {
    return null
  }

  return (
    <div className='pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-md bg-background p-2 shadow-md border'>
      <span className='text-sm text-muted-foreground mr-2'>
        {rows.length} selected
      </span>
      <Button
        variant='outline'
        size='sm'
        className='h-8'
        onClick={() => {
          // Handle bulk delete action
        }}
      >
        <Trash2 className='mr-2 h-4 w-4' />
        Delete
      </Button>
    </div>
  )
}