import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useContactsQuery } from "@/features/contacts/hooks/use-contacts-query"
import { cn } from "@/lib/utils"
import type { Contact } from "@/types"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { useState } from "react"

export function CustomerSelector({
  value,
  onChange,
}: {
  value?: string
  onChange: (val?: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { data, isLoading } = useContactsQuery({ limit: 10, name: search }) // Simple search
  const contacts = data?.data || []

  const selectedContact =
    contacts.find((c) => c.id === value) ||
    (value ? ({ id: value, name: 'Loading...' } as Contact) : null)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='h-9 w-full justify-between px-3'
        >
          <span className='truncate'>
            {selectedContact ? selectedContact.name : 'Pilih pelanggan...'}
          </span>
          <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Cari pelanggan...'
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {isLoading && (
              <div className='text-muted-foreground py-2 text-center text-xs'>
                Loading...
              </div>
            )}
            {!isLoading && contacts.length === 0 && (
              <CommandEmpty>Tidak ditemukan.</CommandEmpty>
            )}
            <CommandGroup>
              {contacts.map((contact) => (
                <CommandItem
                  key={contact.id}
                  value={contact.id}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? undefined : currentValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === contact.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {contact.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
