import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { type Package } from '@/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePackages } from './packages-provider'

type DataTableRowActionsProps = {
  row: Row<Package>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const packages = row.original
  const { setOpen, setCurrentRow } = usePackages()

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <div className='text-muted-foreground text-center text-sm'>{`${packages?.name}`}</div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(packages)
              setOpen('view')
            }}
          >
            Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(packages)
              setOpen('edit')
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(packages)
              setOpen('delete')
            }}
            className='text-red-500!'
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
