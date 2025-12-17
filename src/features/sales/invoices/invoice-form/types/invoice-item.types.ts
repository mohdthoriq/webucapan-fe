export type InvoiceItem = {
    product_id: string
    description: string
    quantity: number
    unit_price: number
    discount: number | null
    tax_id: string | null
    total: number
}   