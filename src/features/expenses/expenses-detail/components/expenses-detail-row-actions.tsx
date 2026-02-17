import { useState } from 'react'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useNavigate } from '@tanstack/react-router'
import type { Expense } from '@/types'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeleteExpensesMutation } from '../hooks/use-expenses-payments.mutation'
import { ExpenseDeleteDialog } from './expenses-delete-dialog'

type ExpenseDetailRowActionsProps = {
  expense: Expense
}

export function ExpenseDetailRowActions({
  expense,
}: ExpenseDetailRowActionsProps) {
  const navigate = useNavigate()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const deleteMutation = useDeleteExpensesMutation()

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
          >
            <DotsVerticalIcon className='h-8 w-8' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            onClick={() => {
              navigate({
                to: `/expenses/edit`,
                state: { currentRowId: expense.id } as Record<string, unknown>,
              })
            }}
          >
            <PencilIcon className='h-4 w-4' />
            Ubah
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            <Trash2Icon className='h-4 w-4' />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ExpenseDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        expense={expense}
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          deleteMutation.mutate(
            { ids: [expense.id] },
            {
              onSuccess: () => {
                setDeleteDialogOpen(false)
                // If we are on the detail page, we might want to navigate back to the list
                // However, the mutation success handler already invalidates queries.
                // The requirement says "navigate({ search: {} })" in the code I saw earlier,
                // but let's just close the dialog for now. Actually, if we are in detail, we should go back.
                if (window.location.pathname.includes('/detail')) {
                  navigate({ to: '/expenses' })
                }
              },
            }
          )
        }}
      />
    </>
  )
}
