import { useGlobalDialogStore } from '@/stores/global-dialog-store'
import { ContactsActionDialog } from '@/features/contacts/components/contacts-action-dialog'
import { ProductCategoryActionDialog } from '@/features/product-categories/components/product-category-action-dialog'
import { ProductActionDialog } from '@/features/products/product-list/components/product-action-dialog'
import { PaymentTermsActionDialog } from '@/features/settings/payment-terms/components/payment-terms-action-dialog'
import { TagsActionDialog } from '@/features/settings/tags/components/tags-action-dialog'
import { TaxesActionDialog } from '@/features/settings/taxes/components/taxes-action-dialog'
import { UnitsActionDialog } from '@/features/settings/units/components/units-action-dialog'
import { AccountsActionDialog } from '@/features/account/components/account-action-dialog'

export function GlobalDialogProvider() {
  const { stack, closeDialog } = useGlobalDialogStore()

  if (stack.length === 0) return null

  return (
    <>
      {stack.map((dialog) => {
        const { id, view, data, onSuccess } = dialog

        const commonProps = {
          open: true,
          onOpenChange: (open: boolean) => !open && closeDialog(id),
          currentRow: data,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess: (result: any) => {
            onSuccess?.(result)
            closeDialog(id)
          },
        }

        switch (view) {
          case 'contact':
            return <ContactsActionDialog key={id} {...commonProps} />
          case 'product':
            return <ProductActionDialog key={id} {...commonProps} />
          case 'payment-term':
            return <PaymentTermsActionDialog key={id} {...commonProps} />
          case 'tag':
            return <TagsActionDialog key={id} {...commonProps} />
          case 'tax':
            return <TaxesActionDialog key={id} {...commonProps} />
          case 'unit':
            return <UnitsActionDialog key={id} {...commonProps} />
          case 'product-category':
            return <ProductCategoryActionDialog key={id} {...commonProps} />
          case 'account': 
            return <AccountsActionDialog key={id} {...commonProps} />
          default:
            return null
        }
      })}
    </>
  )
}
