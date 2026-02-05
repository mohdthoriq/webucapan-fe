export interface Report {
  name: string
  slug: string
}

export interface Category {
  category: string
  reports: Report[]
}
