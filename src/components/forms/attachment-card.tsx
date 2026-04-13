import React from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'



type AttachmentCardProps = {
  value?: File[]
  onChange?: (files: File[]) => void
  maxFiles?: number
  maxSize?: number // in bytes
  accept?: string
  className?: string
  title?: string
  disabled?: boolean
}

export function AttachmentCard({
  value = [],
  onChange,
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = 'image/*,.pdf,.doc,.docx',
  className,
  title = 'Lampiran',
  disabled = false,
}: AttachmentCardProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (!selectedFiles.length) return

    let validFiles: File[] = []

    selectedFiles.forEach((file) => {
      if (file.size > maxSize) {
        toast.error(`Ukuran file ${file.name} melebihi maksimal ${maxSize / 1024 / 1024}MB.`)
      } else {
        validFiles.push(file)
      }
    })

    if (value.length + validFiles.length > maxFiles) {
      toast.error(`Maksimal ${maxFiles} file yang diizinkan.`)
      const remainingSlots = Math.max(0, maxFiles - value.length)
      validFiles = validFiles.slice(0, remainingSlots)
    }

    if (validFiles.length > 0) {
      onChange?.([...value, ...validFiles])
    }

    // Reset input
    e.target.value = ''
  }

  const removeFile = (index: number) => {
    const newFiles = [...value]
    newFiles.splice(index, 1)
    onChange?.(newFiles)
  }

  return (
    <Card className={cn('shadow-none w-full border', className)}>
      <CardHeader className='pb-3 border-b border-border'>
        <CardTitle className='text-base flex items-center gap-2 font-semibold'>
          {/* <Paperclip className='size-4' /> */}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-4 space-y-4'>
        {value.length > 0 && (
          <div className='space-y-2'>
            {value.map((file: File, index: number) => (
              <div
                key={`${file.name}-${index}`}
                className='flex items-center justify-between p-2 border rounded-md text-sm'
              >
                <span className='truncate max-w-[80%]'>{file.name}</span>
                <button
                  type='button'
                  disabled={disabled}
                  onClick={() => removeFile(index)}
                  className='text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50'
                >
                  <X className='size-4' />
                </button>
              </div>
            ))}
          </div>
        )}

        {value.length < maxFiles && (
          <div>
            <Label
              htmlFor='attachment-upload'
              className={cn(
                'flex items-center justify-center w-full h-20 px-4 transition bg-transparent border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary hover:bg-muted/50',
                disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
              )}
            >
              <div className='flex flex-col items-center space-y-1'>
                <Plus className='size-5 text-muted-foreground' />
                <span className='text-xs text-muted-foreground font-medium'>
                  Unggah File (Maks {maxFiles})
                </span>
              </div>
              <input
                id='attachment-upload'
                type='file'
                multiple
                className='hidden'
                disabled={disabled}
                onChange={handleFileChange}
                accept={accept}
              />
            </Label>
            <p className='text-[10px] text-muted-foreground mt-2 text-center text-balance'>
              Maks. ukuran {maxSize / 1024 / 1024}MB per file.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
