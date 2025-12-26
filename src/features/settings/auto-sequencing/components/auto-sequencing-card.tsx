import type { FinanceNumber } from '@/types/domain/auto-numbering'
import { Card, CardContent } from '@/components/ui/card'

interface AutoSequencingCardProps {
  item: FinanceNumber
  onClick: (item: FinanceNumber) => void
}

export function AutoSequencingCard({ item, onClick }: AutoSequencingCardProps) {
  return (
    <Card
      className='hover:bg-muted/50 cursor-pointer transition-colors'
      onClick={() => onClick(item)}
    >
      <CardContent className='flex flex-col items-center justify-center gap-4'>
        <h3 className='text-sm font-semibold'>{item.title}</h3>
        <p className='text-muted-foreground text-sm'>{item.format}</p>
      </CardContent>
    </Card>
  )
}
