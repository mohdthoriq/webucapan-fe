import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

interface InputFieldRupiahProps extends Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'> {
  value?: number | string
  onValueChange?: (value: number | undefined) => void
  prefix?: string
}

export const InputFieldRupiah = React.forwardRef<HTMLInputElement, InputFieldRupiahProps>(({ value, onValueChange, className, prefix, ...props }, ref) => {
  const [displayValue, setDisplayValue] = React.useState<string>('')

  // Format number to currency string without symbol
  const formatNumber = (num: number | string | undefined): string => {
    if (num === undefined || num === null || num === '') return ''
    const val =
      typeof num === 'string' ? parseFloat(num.replace(/[^\d]/g, '')) : num
    if (isNaN(val)) return ''
    return new Intl.NumberFormat('id-ID').format(val)
  }

  // Update display value when prop value changes
  React.useEffect(() => {
    setDisplayValue(formatNumber(value))
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '')

    if (rawValue === '') {
      setDisplayValue('')
      onValueChange?.(undefined)
      return
    }

    const numericValue = parseInt(rawValue, 10)
    if (!isNaN(numericValue)) {
      setDisplayValue(formatNumber(numericValue))
      onValueChange?.(numericValue)
    }
  }

  return (
    <Input
      {...props}
      ref={ref}
      type='text'
      value={displayValue}
      onChange={handleChange}
      className={cn('text-right font-medium', className)}
      startAdornment={
        prefix && (
          <span className='text-muted-foreground font-semibold'>{prefix}</span>
        )
      }
    />
  )
})

InputFieldRupiah.displayName = 'InputFieldRupiah'
