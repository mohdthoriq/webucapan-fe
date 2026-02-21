import { useSearch, createFileRoute } from '@tanstack/react-router'
import { TransactionCode } from '@/types'
import { CashBankEdit } from '@/features/cash-bank/cash-bank-detail/components/cash-bank-edit-source-view'
import { useCashBankDetailQuery } from '@/features/cash-bank/cash-bank-detail/hooks/use-cash-bank-detail-query'
import { CashBankFormPage } from '@/features/cash-bank/cash-bank-form'

export const Route = createFileRoute('/_authenticated/cash-bank/edit')({
  component: EditTransactionComponent,
})

function EditTransactionComponent() {
  const search = useSearch({ strict: false }) as {
    transactionId?: string
    accountId?: string
  }

  const { data: transaction, isLoading } = useCashBankDetailQuery({
    transactionId: search.transactionId,
    accountId: search.accountId,
  })

  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center font-medium'>
        Memuat data transaksi...
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className='flex h-[60vh] items-center justify-center font-medium'>
        Data transaksi tidak ditemukan.
      </div>
    )
  }

  if (
    transaction.transaction_type?.code === TransactionCode.Expense ||
    transaction.transaction_type?.code === TransactionCode.SalesInvoice ||
    transaction.transaction_type?.code === TransactionCode.PurchaseInvoice
  ) {
    return <CashBankEdit transaction={transaction} />
  }

  const type =
    transaction.transaction_type?.code === TransactionCode.SpendMoney
      ? 'spend'
      : 'receive'

  const currentRow = {
    id: transaction.id,
    bank_account_id: transaction.account.id,
    date: transaction.trans_date
      ? new Date(transaction.trans_date)
      : new Date(),
    description: transaction.desc ?? undefined,
    contact_id: transaction.contact?.id ?? undefined,
    reference: transaction.reference.number ?? undefined,
    tags: transaction.tags.map((tag) => tag.id),
    include_tax: false,
    tax_total: 0,
    items: transaction.items.map((item) => ({
      account_id: item.account?.id,
      amount: item.amount,
      description: item.desc ?? undefined,
      tax_id: null,
    })),
    withholdings: [],
  }

  return <CashBankFormPage type={type} currentRow={currentRow} />
}
