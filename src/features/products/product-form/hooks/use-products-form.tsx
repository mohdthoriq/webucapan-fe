import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import type { Product } from '@/types'
import {
  type CreateProductFormData,
  createProductSchema,
  type UpdateProductFormData,
} from '../types/product-form.schema'
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from './use-products-form-mutation'

type useProductsFormProps = {
  currentRow?: Product
}

export function useProductsForm({ currentRow }: useProductsFormProps = {}) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const isEdit = !!currentRow
  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: isEdit
      ? {
          sku: currentRow?.sku ?? '',
          name: currentRow?.name ?? '',
          description: currentRow?.description ?? '',
          purchase_price: currentRow?.purchase_price ?? 0,
          sale_price: currentRow?.sale_price ?? 0,
          taxable: currentRow?.taxable ?? false,
          unit_id: currentRow?.unit_id.id ?? '',
          product_category_id: currentRow?.product_category_id.id ?? '',
          images: currentRow?.images ?? [],
        }
      : {
          sku: '',
          name: '',
          description: '',
          purchase_price: 0,
          sale_price: 0,
          taxable: false,
          unit_id: '',
          product_category_id: '',
          images: [],
        },
  })

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

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    )
    const currentImages = form.getValues('images') || []
    form.setValue(
      'images',
      currentImages.filter((_, index) => index !== indexToRemove)
    )
  }

  const createMutation = useCreateProductMutation()
  const updateMutation = useUpdateProductMutation()

  const onSubmit = async (data: CreateProductFormData) => {
    if (isEdit && currentRow) {
      const updateData: UpdateProductFormData = {
        id: currentRow.id,
        sku: data.sku,
        name: data.name,
        description: data.description,
        purchase_price: data.purchase_price,
        sale_price: data.sale_price,
        taxable: data.taxable,
        unit_id: data.unit_id,
        product_category_id: data.product_category_id,
        images: data.images,
      }
      await updateMutation.mutateAsync(updateData)
      form.reset()
      router.history.back()
    } else {
      await createMutation.mutateAsync(data)
      form.reset()
      router.history.back()
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    removeFile,
    uploadedFiles,
    handleBoxClick,
    handleDragOver,
    handleDrop,
    fileInputRef,
    handleFileSelect,
    router,
  }
}
