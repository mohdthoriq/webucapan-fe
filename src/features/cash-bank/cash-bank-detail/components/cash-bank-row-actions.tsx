import { useState } from 'react'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useNavigate } from '@tanstack/react-router'
import { type CashBankTransactionDetail, TransactionCode } from '@/types'
import { PencilIcon, Trash2Icon } from 'lucide-react'
// import { useDeleteSalesInvoiceMutation } from '../hooks/use-invoice-payments.mutation'
// import { InvoiceDeleteDialog } from './cash-bank-delete-dialog'

import { useGlobalDialogStore } from '@/stores/global-dialog-store'
import { PERMISSION_KEY } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/use-has-permission'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FeatureLockDialog } from '@/components/dialog/feature-lock.dialog'

type CashBankRowActionsProps = {
  transaction: CashBankTransactionDetail
}

export function CashBankRowActions({ transaction }: CashBankRowActionsProps) {
  const navigate = useNavigate()
  const { openDialog } = useGlobalDialogStore()
  const [showLockDialog, setShowLockDialog] = useState(false)
  const canEdit = useHasPermission(PERMISSION_KEY.CASH_BANK_EDIT)

  const handleEdit = () => {
    if (!canEdit && transaction.transaction_type?.code === TransactionCode.BankTransfer) {
      setShowLockDialog(true)
      return
    }

    if (transaction.transaction_type?.code === TransactionCode.BankTransfer) {
      openDialog('transfer', {
        data: transaction,
      })
      return
    }

    navigate({
      to: '/cash-bank/edit',
      search: {
        transactionId: transaction.id,
        accountId: transaction?.account?.id || '',
      },
    })
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
          >
            <DotsVerticalIcon className='h-[1.2rem] w-[1.2rem]' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem onClick={handleEdit}>
            <PencilIcon className='h-4 w-4' />
            Ubah
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Trash2Icon className='h-4 w-4' />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FeatureLockDialog
        open={showLockDialog}
        onOpenChange={setShowLockDialog}
        feature='Ubah Transaksi'
      />
    </>
  )
}
