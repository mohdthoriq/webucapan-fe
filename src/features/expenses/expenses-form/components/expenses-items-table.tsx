import { Fragment, useMemo } from 'react'
import { type useForm } from 'react-hook-form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTaxesQuery } from '@/features/settings/taxes/hooks/use-taxes-query'
import type {
  CreateExpenseFormData,
  ExpenseItemFormData,
  UpdateExpenseFormData,
} from '../types/expenses-form.schema'
import { ExpensesItemRow } from './expenses-item-row'

type ExpensesItemsTableProps = {
  fields: ExpenseItemFormData[]
  form: ReturnType<
    typeof useForm<CreateExpenseFormData | UpdateExpenseFormData>
  >
  remove: (index: number) => void
}

export function ExpensesItemsTable({
  fields,
  form,
  remove,
}: ExpensesItemsTableProps) {
  const { data: taxes } = useTaxesQuery({ page: 1, limit: 100 })

  const taxesData = useMemo(() => ({ data: taxes?.data || [] }), [taxes?.data])

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Akun</TableHead>
            <TableHead className='w-[200px]'>Deskripsi</TableHead>
            <TableHead className='w-[100px]'>Pajak</TableHead>
            <TableHead className='w-[100px] text-right'>Total</TableHead>
            <TableHead className='w-[50px]'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <Fragment key={`${field.account_id}-${index}`}>
              <ExpensesItemRow
                index={index}
                form={form}
                remove={remove}
                taxes={taxesData}
              />
            </Fragment>
          ))}
          {fields.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                className='text-muted-foreground h-24 text-center'
              >
                Belum ada item. Tambahkan item baru.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
