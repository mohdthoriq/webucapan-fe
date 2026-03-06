import { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { type Tag } from '@/types'
import { PERMISSION_KEY } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/use-has-permission'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FeatureLockDialog } from '@/components/dialog/feature-lock.dialog'
import { useTags } from './tags-provider'

type DataTableRowActionsProps = {
  row: Row<Tag>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [lockFeatureDialog, setLockFeatureDialog] = useState(false)
  const hasPermission = useHasPermission(PERMISSION_KEY.SETTINGS_TAG_DELETE)
  const tag = row.original
  const { setOpen, setCurrentRow } = useTags()

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
          <div className='text-muted-foreground text-center text-sm'>{`${tag?.name}`}</div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(tag)
              setOpen('view')
            }}
          >
            Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(tag)
              setOpen('edit')
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={tag.is_deletable === false}
            onClick={() => {
              if (!hasPermission) {
                setLockFeatureDialog(true)
              } else {
                setCurrentRow(tag)
                setOpen('delete')
              }
            }}
            className='text-red-500!'
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <FeatureLockDialog
        open={lockFeatureDialog}
        onOpenChange={setLockFeatureDialog}
        feature='Hapus Tag'
      />
    </>
  )
}
