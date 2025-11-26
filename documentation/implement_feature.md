# Implementing New Features in Amfibiz Frontend

This documentation provides a comprehensive guide on how to implement new features in the Amfibiz frontend application following established patterns and best practices.

## Table of Contents

1. [Feature Structure Overview](#feature-structure-overview)
2. [Step-by-Step Implementation Guide](#step-by-step-implementation-guide)
3. [Feature Architecture Patterns](#feature-architecture-patterns)
4. [API Integration](#api-integration)
5. [State Management](#state-management)
6. [Form Handling](#form-handling)
7. [Component Composition](#component-composition)
8. [Best Practices](#best-practices)
9. [Complete Examples](#complete-examples)

---

## Feature Structure Overview

Features in Amfibiz are organized in a modular structure under `src/features/`. Each feature is self-contained with its own components, hooks, types, and data.

### Standard Feature Structure

```
src/features/
└── [feature-name]/
    ├── index.tsx                # Main feature component (entry point)
    ├── components/              # Feature-specific components
    │   ├── [feature]-form.tsx
    │   ├── [feature]-table.tsx
    │   └── [feature]-dialog.tsx
    ├── hooks/                   # Custom hooks for business logic
    │   ├── use[Feature]Form.tsx
    │   ├── use[Feature]Mutation.ts
    │   └── use[Feature]Query.ts
    ├── types/                   # TypeScript types and schemas
    │   └── [feature].types.ts
    ├── data/                    # Static data, constants, mock data
    │   └── [feature]-data.ts
    └── assets/                  # Feature-specific assets (optional)
        └── images/
```

### Real-World Example: Login Feature

```
src/features/auth/login/
├── index.tsx                    # Main Login page component
├── components/
│   └── login-form.tsx          # Login form UI component
├── hooks/
│   ├── useLoginForm.tsx        # Form state management
│   └── useLoginMutation.ts     # API mutation logic
├── types/
│   └── login.types.ts          # Types and Zod schemas
└── assets/
    └── web-illustration.jpg
```

---

## Step-by-Step Implementation Guide

Let's implement a complete feature from scratch. We'll create a **Products** feature as an example.

### Step 1: Create Feature Directory

Create the feature directory structure:

```bash
mkdir -p src/features/products/{components,hooks,types,data}
```

### Step 2: Define Types and Schemas

**File:** `src/features/products/types/product.types.ts`

```typescript
import z from 'zod'

// ========== API Response Types ==========
export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  createdAt: string
  updatedAt: string
}

export interface ProductResponse {
  products: Product[]
  total: number
}

// ========== Form Validation Schema ==========
export const ProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama produk wajib diisi')
    .min(3, 'Nama produk minimal 3 karakter'),
  description: z
    .string()
    .min(1, 'Deskripsi wajib diisi')
    .min(10, 'Deskripsi minimal 10 karakter'),
  price: z
    .number({ required_error: 'Harga wajib diisi' })
    .positive('Harga harus lebih dari 0'),
  stock: z
    .number({ required_error: 'Stok wajib diisi' })
    .int('Stok harus berupa bilangan bulat')
    .min(0, 'Stok tidak boleh negatif'),
  category: z.string().min(1, 'Kategori wajib dipilih'),
})

export type ProductFormData = z.infer<typeof ProductSchema>

// ========== Create Product Request ==========
export interface CreateProductRequest {
  name: string
  description: string
  price: number
  stock: number
  category: string
}

// ========== Update Product Request ==========
export interface UpdateProductRequest extends CreateProductRequest {
  id: string
}
```

### Step 3: Create API Mutation Hook

**File:** `src/features/products/hooks/useCreateProductMutation.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import type { ApiResponse } from '@/types/global-types/api-response'
import type { Product, CreateProductRequest } from '../types/product.types'

export function useCreateProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      data: CreateProductRequest
    ): Promise<ApiResponse<Product>> => {
      const response = await apiClient.post<ApiResponse<Product>>(
        '/products',
        data
      )
      return response.data
    },
    onMutate: () => {
      toast.loading('Menyimpan produk...', { id: 'create-product-toast' })
    },
    onSuccess: (data) => {
      toast.dismiss('create-product-toast')
      toast.success('Produk berhasil ditambahkan!')
      
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => {
      toast.dismiss('create-product-toast')
      toast.error('Gagal menambahkan produk. Silakan coba lagi.')
      console.error('Create product error:', error)
    },
  })
}
```

### Step 4: Create Query Hook (for fetching data)

**File:** `src/features/products/hooks/useProductsQuery.ts`

```typescript
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import type { ApiResponse } from '@/types/global-types/api-response'
import type { ProductResponse } from '../types/product.types'

interface UseProductsQueryParams {
  page?: number
  pageSize?: number
  search?: string
  category?: string
}

export function useProductsQuery(params: UseProductsQueryParams = {}) {
  const { page = 1, pageSize = 10, search = '', category = '' } = params

  return useQuery({
    queryKey: ['products', { page, pageSize, search, category }],
    queryFn: async (): Promise<ApiResponse<ProductResponse>> => {
      const response = await apiClient.get<ApiResponse<ProductResponse>>(
        '/products',
        {
          params: {
            page,
            pageSize,
            search,
            category,
          },
        }
      )
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

### Step 5: Create Form Hook

**File:** `src/features/products/hooks/useProductForm.tsx`

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ProductSchema,
  type ProductFormData,
} from '../types/product.types'
import { useCreateProductMutation } from './useCreateProductMutation'

interface UseProductFormProps {
  defaultValues?: Partial<ProductFormData>
  onSuccess?: () => void
}

export function useProductForm({
  defaultValues,
  onSuccess,
}: UseProductFormProps = {}) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      description: defaultValues?.description || '',
      price: defaultValues?.price || 0,
      stock: defaultValues?.stock || 0,
      category: defaultValues?.category || '',
    },
  })

  const createMutation = useCreateProductMutation()

  function onSubmit(data: ProductFormData) {
    createMutation.mutate(data, {
      onSuccess: () => {
        form.reset()
        onSuccess?.()
      },
    })
  }

  return {
    form,
    isLoading: createMutation.isPending,
    onSubmit,
  }
}
```

### Step 6: Create Form Component

**File:** `src/features/products/components/product-form.tsx`

```tsx
import { Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useProductForm } from '../hooks/useProductForm'

interface ProductFormProps {
  onSuccess?: () => void
}

export function ProductForm({ onSuccess }: ProductFormProps) {
  const { form, isLoading, onSubmit } = useProductForm({ onSuccess })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Produk</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama produk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukkan deskripsi produk"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stok</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="electronics">Elektronik</SelectItem>
                  <SelectItem value="clothing">Pakaian</SelectItem>
                  <SelectItem value="food">Makanan</SelectItem>
                  <SelectItem value="books">Buku</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : <Save />}
          Simpan Produk
        </Button>
      </form>
    </Form>
  )
}
```

### Step 7: Create Main Feature Component

**File:** `src/features/products/index.tsx`

```tsx
import { useState } from 'react'
import { Plus } from 'lucide-react'
import RootLayout from '@/components/layout/root-layout'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ProductForm } from './components/product-form'
import { useProductsQuery } from './hooks/useProductsQuery'

export function Products() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data, isLoading } = useProductsQuery()

  const handleSuccess = () => {
    setIsDialogOpen(false)
  }

  return (
    <RootLayout>
      <div className="flex flex-1 flex-col gap-4 sm:gap-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Daftar Produk
            </h2>
            <p className="text-muted-foreground">
              Kelola produk Anda di sini.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Tambah Produk
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Tambah Produk Baru</DialogTitle>
                <DialogDescription>
                  Isi form di bawah ini untuk menambahkan produk baru.
                </DialogDescription>
              </DialogHeader>
              <ProductForm onSuccess={handleSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Product list/table would go here */}
        {isLoading && <div>Loading...</div>}
        {data && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.data?.products.map((product) => (
              <div key={product.id} className="rounded-lg border p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {product.description}
                </p>
                <div className="mt-2 flex justify-between">
                  <span className="font-medium">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-sm">Stok: {product.stock}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RootLayout>
  )
}
```

### Step 8: Create Route

**File:** `src/routes/_authenticated/products/index.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Products } from '@/features/products'

export const Route = createFileRoute('/_authenticated/products/')({
  component: Products,
})
```

---

## Feature Architecture Patterns

### 1. Separation of Concerns

**Layered Architecture:**

```
┌─────────────────────────────────────┐
│  Route Layer                        │  (routes/*.tsx)
│  - Route configuration              │
│  - Search param validation          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Feature Layer                      │  (features/*/index.tsx)
│  - Main feature component           │
│  - Layout and composition           │
│  - State orchestration              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Component Layer                    │  (features/*/components/*.tsx)
│  - UI components                    │
│  - Presentation logic               │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Hook Layer                         │  (features/*/hooks/*.ts)
│  - Business logic                   │
│  - Data fetching                    │
│  - Form handling                    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  API Layer                          │  (lib/api-client.ts)
│  - HTTP requests                    │
│  - Interceptors                     │
└─────────────────────────────────────┘
```

### 2. Hook Naming Conventions

| Hook Type | Naming Pattern | Example | Purpose |
|-----------|----------------|---------|---------|
| Query | `use[Feature]Query` | `useProductsQuery` | Fetch data |
| Mutation | `use[Action][Feature]Mutation` | `useCreateProductMutation` | Create/Update/Delete |
| Form | `use[Feature]Form` | `useProductForm` | Form state management |
| State | `use[Feature]State` | `useProductState` | Local state management |

### 3. Component Naming Conventions

| Component Type | Naming Pattern | Example |
|----------------|----------------|---------|
| Main Feature | `[Feature]` | `Products` |
| Form | `[Feature]Form` | `ProductForm` |
| Table | `[Feature]Table` | `ProductsTable` |
| Dialog | `[Feature]Dialog` | `ProductDialog` |
| Card | `[Feature]Card` | `ProductCard` |

---

## API Integration

### API Client Setup

The project uses **Axios** with interceptors for centralized API communication.

**File:** `src/lib/api-client.ts`

```typescript
import axios from 'axios'
import { getCookie } from '@/lib/cookies'

const ACCESS_TOKEN_COOKIE = 'thisisjustarandomstring'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
```

### Query Hook Pattern

```typescript
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'

export function useDataQuery(params) {
  return useQuery({
    queryKey: ['key', params],
    queryFn: async () => {
      const response = await apiClient.get('/endpoint', { params })
      return response.data
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collect after 10 minutes
  })
}
```

### Mutation Hook Pattern

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'

export function useCreateMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const response = await apiClient.post('/endpoint', data)
      return response.data
    },
    onMutate: () => {
      toast.loading('Processing...', { id: 'mutation-toast' })
    },
    onSuccess: () => {
      toast.dismiss('mutation-toast')
      toast.success('Success!')
      queryClient.invalidateQueries({ queryKey: ['key'] })
    },
    onError: () => {
      toast.dismiss('mutation-toast')
      toast.error('Failed. Please try again.')
    },
  })
}
```

---

## State Management

### 1. Server State (React Query)

Use **TanStack Query** for server state (data from API).

```typescript
// Fetch data
const { data, isLoading, error } = useProductsQuery()

// Create data
const mutation = useCreateProductMutation()
mutation.mutate(formData)
```

### 2. Local Component State (useState)

Use **useState** for UI state (dialog open/close, selected items).

```typescript
const [isDialogOpen, setIsDialogOpen] = useState(false)
const [selectedId, setSelectedId] = useState<string | null>(null)
```

### 3. Global State (Zustand)

Use **Zustand** for global application state (auth, theme, etc.).

**File:** `src/stores/auth-store.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  accessToken: string | null
  setUser: (user: User) => void
  setAccessToken: (token: string) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      reset: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
```

---

## Form Handling

### Form Stack

- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Bridge between RHF and Zod

### Complete Form Example

```typescript
// 1. Define schema
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

type FormData = z.infer<typeof schema>

// 2. Create form hook
export function useMyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const mutation = useCreateMutation()

  function onSubmit(data: FormData) {
    mutation.mutate(data)
  }

  return { form, isLoading: mutation.isPending, onSubmit }
}

// 3. Use in component
export function MyForm() {
  const { form, isLoading, onSubmit } = useMyForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
```

---

## Component Composition

### Feature Provider Pattern

For features with shared state across multiple components:

```tsx
// features/products/components/products-provider.tsx
import { createContext, useContext, useState } from 'react'

interface ProductsContextValue {
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
}

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined
)

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <ProductsContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProductsContext() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProductsContext must be used within ProductsProvider')
  }
  return context
}
```

### Usage in Main Feature

```tsx
export function Products() {
  return (
    <ProductsProvider>
      <RootLayout>
        <ProductsTable />
        <ProductsDialogs />
      </RootLayout>
    </ProductsProvider>
  )
}
```

---

## Best Practices

### 1. **Single Responsibility**

Each file should have one clear purpose:

✅ **Good:**
```typescript
// useCreateProductMutation.ts - Only handles product creation
export function useCreateProductMutation() { ... }
```

❌ **Bad:**
```typescript
// useProductMutations.ts - Too many responsibilities
export function useCreateProductMutation() { ... }
export function useUpdateProductMutation() { ... }
export function useDeleteProductMutation() { ... }
export function useDuplicateProductMutation() { ... }
```

### 2. **Type Safety**

Always define types and use them consistently:

```typescript
// Define API response type
export interface ProductResponse {
  products: Product[]
  total: number
}

// Use in query
const { data } = useQuery<ApiResponse<ProductResponse>>({ ... })
```

### 3. **Error Handling**

Handle errors at multiple levels:

```typescript
// In mutation
onError: (error) => {
  console.error('Detailed error:', error)
  toast.error('User-friendly message')
}

// In component
if (error) {
  return <ErrorComponent error={error} />
}
```

### 4. **Loading States**

Always provide feedback for async operations:

```tsx
<Button disabled={isLoading}>
  {isLoading ? <Loader2 className="animate-spin" /> : <Save />}
  Save
</Button>
```

### 5. **Optimistic Updates**

For better UX, update UI before server response:

```typescript
onMutate: async (newData) => {
  await queryClient.cancelQueries({ queryKey: ['products'] })
  const previousData = queryClient.getQueryData(['products'])
  
  queryClient.setQueryData(['products'], (old) => {
    return [...old, newData] // Optimistically add new item
  })
  
  return { previousData }
},
onError: (err, newData, context) => {
  // Rollback on error
  queryClient.setQueryData(['products'], context.previousData)
},
```

### 6. **Reusable Components**

Extract common patterns into reusable components:

```tsx
// components/forms/form-section.tsx
export function FormSection({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </div>
  )
}
```

### 7. **Internationalization Ready**

Structure your code to support i18n in the future:

```typescript
// Instead of hardcoded strings
<Button>Save Product</Button>

// Use constants or i18n keys
const LABELS = {
  saveButton: 'Simpan Produk',
  cancelButton: 'Batal',
}

<Button>{LABELS.saveButton}</Button>
```

---

## Complete Examples

### Example 1: CRUD Feature with Table

See the **Users** feature for a complete example:
- `src/features/users/`

Key files:
- `index.tsx` - Main component with table
- `components/users-table.tsx` - Data table
- `components/users-dialogs.tsx` - Create/Edit/Delete dialogs
- `components/users-provider.tsx` - Shared state

### Example 2: Authentication Feature

See the **Login** and **Register** features:
- `src/features/auth/login/`
- `src/features/auth/register/`

Key patterns:
- Form validation with Zod
- API mutations with loading states
- Navigation after success
- Error handling

### Example 3: Dashboard Feature

See the **Dashboard** feature:
- `src/features/dashboard/`

Key patterns:
- Data aggregation
- Chart components
- Multiple data sources

---

## Checklist for New Features

Use this checklist when implementing a new feature:

- [ ] Create feature directory structure
- [ ] Define TypeScript types and interfaces
- [ ] Create Zod validation schemas
- [ ] Implement query hooks (`use[Feature]Query`)
- [ ] Implement mutation hooks (`useCreate/Update/Delete[Feature]Mutation`)
- [ ] Create form hook (`use[Feature]Form`)
- [ ] Build form component (`[Feature]Form`)
- [ ] Build main feature component (`index.tsx`)
- [ ] Create route file (`routes/_authenticated/[feature]/index.tsx`)
- [ ] Add navigation link (if needed)
- [ ] Test loading states
- [ ] Test error states
- [ ] Test success scenarios
- [ ] Add optimistic updates (optional)
- [ ] Review accessibility
- [ ] Update documentation

---

## Common Patterns Quick Reference

### Query with Pagination

```typescript
export function useItemsQuery({ page = 1, pageSize = 10 }) {
  return useQuery({
    queryKey: ['items', { page, pageSize }],
    queryFn: async () => {
      const response = await apiClient.get('/items', {
        params: { page, pageSize },
      })
      return response.data
    },
  })
}
```

### Mutation with Invalidation

```typescript
export function useDeleteMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/items/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
      toast.success('Deleted successfully')
    },
  })
}
```

### Dependent Queries

```typescript
export function useItemDetailsQuery(id: string | null) {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => apiClient.get(`/items/${id}`),
    enabled: !!id, // Only run when id is available
  })
}
```

### Infinite Query (Infinite Scroll)

```typescript
export function useInfiniteItemsQuery() {
  return useInfiniteQuery({
    queryKey: ['items'],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.get('/items', { params: { page: pageParam } }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  })
}
```

---

## Resources

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [Shadcn/ui Components](https://ui.shadcn.com/)

---

Created: 2025-11-21  
Last Updated: 2025-11-21  
Version: 1.0
