import { CashBankListActionDialog } from './cash-bank-list-action-dialog'
import { useCashBankLists } from './cash-bank-list-provider'

export function CashBankListDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCashBankLists()

  return (
    <>
      <CashBankListActionDialog
        key='cash-bank-list-transfer'
        open={open === 'transfer'}
        onOpenChange={(state) => setOpen(state ? 'transfer' : null)}
      />

      {currentRow && (
        <>
          <CashBankListActionDialog
            key={`cash-bank-list-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(state) => {
              setOpen(state ? 'edit' : null)
              if (!state) {
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
          />
        </>
      )}
    </>
  )
}
