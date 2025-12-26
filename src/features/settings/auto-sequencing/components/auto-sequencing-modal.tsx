import type {
  FinanceNumber,
  FinanceNumberCodes,
} from '@/types/domain/auto-numbering'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAutoNumberingForm } from '../hooks/use-auto-numbering-form'

interface AutoSequencingModalProps {
  item: FinanceNumber | null
  codes: FinanceNumberCodes[]
  isOpen: boolean
  onClose: () => void
}

export function AutoSequencingModal({
  item,
  codes,
  isOpen,
  onClose,
}: AutoSequencingModalProps) {
  const { form, exampleOutput, handleAddCode, onSubmit } = useAutoNumberingForm(
    { item }
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>{item?.title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <div className='col-span-1 md:col-span-2'>
                <FormField
                  control={form.control}
                  name='format'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='required-field'>
                        Format Nomor
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='col-span-1 flex items-end'>
                <Select onValueChange={handleAddCode}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Numbering Code' />
                  </SelectTrigger>
                  <SelectContent>
                    {codes.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='space-y-2'>
              <FormLabel>Contoh Output Nomor Otomatis</FormLabel>
              <div className='text-muted-foreground text-sm'>
                {exampleOutput}
              </div>
            </div>

            <FormField
              control={form.control}
              name='current_number'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='required-field'>
                    Nomor Sekarang
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='reset_frequency'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='required-field mb-2'>
                    Reset Nomor Setiap
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='never' id='r0' />
                        <label htmlFor='r0'>Never reset</label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='monthly' id='r1' />
                        <label htmlFor='r1'>Every month</label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='yearly' id='r2' />
                        <label htmlFor='r2'>Every year</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type='button' variant='outline' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
