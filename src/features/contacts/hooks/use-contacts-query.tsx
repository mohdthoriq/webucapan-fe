import { useQuery } from '@tanstack/react-query'
import type { Contact, PaginationApiResponse, ContactType } from '@/types'
import { useAuthStore } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'

interface ContactQueryParams {
  page?: number
  limit?: number
  company_id?: string
  name?: string
}

export function useContactsQuery(params?: ContactQueryParams) {
  const user = useAuthStore((state) => state.auth.user)

  return useQuery({
    queryKey: [
      'contacts',
      params?.page,
      params?.limit,
      params?.company_id,
      params?.name,
      user?.company?.id,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.name ? { name: params.name } : {}),
        company_id: params?.company_id
          ? params.company_id
          : user?.company?.id || '',
      })

      const url = queryParams.toString()
        ? `/contacts?${queryParams.toString()}`
        : '/contacts'
      const response =
        await apiClient.get<PaginationApiResponse<Contact>>(url)

      return response.data ?? []
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

export function useContactTypesQuery(params?: ContactQueryParams) {
  const user = useAuthStore((state) => state.auth.user)

  return useQuery({
    queryKey: [
      'contact-types',
      params?.page,
      params?.limit,
      params?.company_id,
      params?.name,
      user?.company?.id,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        ...(params?.page ? { page: params.page.toString() } : {}),
        ...(params?.limit ? { limit: params.limit.toString() } : {}),
        ...(params?.name ? { name: params.name } : {}),
        company_id: params?.company_id
          ? params.company_id
          : user?.company?.id || '',
      })

      const url = queryParams.toString()
        ? `/contact-types?${queryParams.toString()}`
        : '/contact-types'
      const response = await apiClient.get<PaginationApiResponse<ContactType>>(url)

      return response.data ?? []
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}
