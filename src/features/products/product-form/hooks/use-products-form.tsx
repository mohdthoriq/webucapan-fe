import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import { FinanceNumberType, type FinanceNumber, type Product } from '@/types'
import { useGenerateNextNumber } from '@/features/sales/invoices/invoice-form/hooks/use-invoice-form-mutation'
import {
  type CreateProductFormData,
  createProductSchema,
} from '../types/product-form.schema'
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from './use-products-form-mutation'

type useProductsFormProps = {
  currentRow?: Product | null
  autoNumbering?: FinanceNumber | null
}

export function useProductsForm({
  currentRow,
  autoNumbering,
}: useProductsFormProps = {}) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const isEdit = !!currentRow
  const defaultValues = useMemo(
    () =>
      isEdit
        ? {
            sku: currentRow?.sku ?? '',
            name: currentRow?.name ?? '',
            description: currentRow?.description ?? '',
            purchase_price: Number(currentRow?.purchase_price ?? 0),
            sale_price: Number(currentRow?.sale_price ?? 0),
            taxable: currentRow?.taxable ?? false,
            unit_id: currentRow?.unit?.id ?? '',
            product_category_id: currentRow?.product_category?.id ?? '',
            images: [],
          }
        : {
            sku: autoNumbering?.format ?? '',
            name: '',
            description: '',
            taxable: false,
            unit_id: '',
            product_category_id: '',
            images: [],
          },
    [currentRow, isEdit, autoNumbering]
  )

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: defaultValues,
  })

  // Update form values when currentRow changes (e.g. after fetch)
  useEffect(() => {
    const updateForm = () => {
      if (currentRow) {
        form.reset(defaultValues)
        const imgs = Array.isArray(currentRow.images)
          ? currentRow.images.filter((img) => typeof img === 'string')
          : []
        setExistingImages(imgs)
        form.setValue('images', [])
      }
      if (autoNumbering !== null) {
        form.setValue('sku', autoNumbering?.format ?? '')
      }
    }
    updateForm()
  }, [currentRow, form, defaultValues, autoNumbering])

  const handleBoxClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFileSelect(e.dataTransfer.files)
  }

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return
    const newFiles = Array.from(files)
    setUploadedFiles((prev) => [...prev, ...newFiles])

    const base64Files = await Promise.all(
      newFiles.map((file) => convertToBase64(file))
    )

    // Append new base64 strings to existing form value
    const currentImages = form.getValues('images') || []
    form.setValue('images', [...currentImages, ...base64Files])
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const removeFile = (indexToRemove: number, source: 'new' | 'existing') => {
    if (source === 'new') {
      setUploadedFiles((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      )
      const currentImages = (form.getValues('images') as string[]) || []
      form.setValue(
        'images',
        currentImages.filter((_, index) => index !== indexToRemove)
      )
    } else {
      setExistingImages((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      )
    }
  }

  const createMutation = useCreateProductMutation()
  const updateMutation = useUpdateProductMutation()
  const generateNextNumber = useGenerateNextNumber()

  const prepareFormData = (data: CreateProductFormData) => {
    const formData = new FormData()
    formData.append('sku', data.sku)
    formData.append('name', data.name)
    if (data.description) formData.append('description', data.description)
    formData.append('purchase_price', data.purchase_price.toString())
    formData.append('sale_price', data.sale_price.toString())
    formData.append('taxable', String(data.taxable ?? false))
    formData.append('unit_id', data.unit_id)
    formData.append('product_category_id', data.product_category_id)

    // Append new files
    uploadedFiles.forEach((file) => {
      formData.append('images', file)
    })

    if (isEdit && Array.isArray(existingImages)) {
      existingImages.forEach((img: string) => {
        formData.append('images', img)
      })
    }

    return formData
  }

  const onSubmit = async (data: CreateProductFormData) => {
    const formData = prepareFormData(data)

    if (isEdit && currentRow) {
      await updateMutation.mutateAsync({ id: currentRow.id, formData })
      form.reset()
      router.history.back()
    } else {
      await createMutation.mutateAsync(formData)
      form.reset()
      await generateNextNumber.mutateAsync(FinanceNumberType.product_sku)
      router.history.back()
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    removeFile,
    uploadedFiles,
    existingImages,
    handleBoxClick,
    handleDragOver,
    handleDrop,
    fileInputRef,
    handleFileSelect,
    router,
  }
}
