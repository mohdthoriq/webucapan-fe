import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type PaginationState,
  type Updater,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/components/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import type { CategorySalesReportItem } from '@/types/domain/sales-per-categories'
import { salesPerCategoryColumns } from './sales-per-category-columns'

interface SalesPerCategoryTableProps {
  data: CategorySalesReportItem[]
  isLoading: boolean
  pagination: {
    pageIndex: number
    pageSize: number
    pageCount: number
    onPaginationChange: (pagination: PaginationState) => void
  }
}

export function SalesPerCategoryTable({
  data,
  isLoading,
  pagination,
}: SalesPerCategoryTableProps) {
  const table = useReactTable({
    data,
    columns: salesPerCategoryColumns,
    state: {
      pagination: {
        pageIndex: pagination.pageIndex - 1,
        pageSize: pagination.pageSize,
      },
    },
    manualPagination: true,
    pageCount: pagination.pageCount,
    onPaginationChange: (updater: Updater<PaginationState>) => {
      if (typeof updater === 'function') {
        const nextState = updater({
          pageIndex: pagination.pageIndex - 1,
          pageSize: pagination.pageSize,
        })
        pagination.onPaginationChange({
          pageIndex: nextState.pageIndex + 1,
          pageSize: nextState.pageSize,
        })
      } else {
        pagination.onPaginationChange({
          pageIndex: updater.pageIndex + 1,
          pageSize: updater.pageSize,
        })
      }
    },
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='flex flex-col gap-4'>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'bg-secondary group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                      header.column.columnDef.meta?.className
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {salesPerCategoryColumns.map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className='h-6 w-full' />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.className}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={salesPerCategoryColumns.length}
                  className='h-24 text-center'
                >
                  Tidak ada data ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
