export interface PaginationMeta {
  page: number
  per_page: number
  total: number
  total_pages: number
}

export interface PaginatedResult<T> {
  items: T[]
  pagination: PaginationMeta
}

export function buildPaginationMeta(params: {
  page: number
  perPage: number
  total: number
}): PaginationMeta {
  const { page, perPage, total } = params
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  return {
    page,
    per_page: perPage,
    total,
    total_pages: totalPages,
  }
}
