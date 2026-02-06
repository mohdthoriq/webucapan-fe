import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ReportsState {
  favorites: string[]
  addFavorite: (slug: string) => void
  removeFavorite: (slug: string) => void
  toggleFavorite: (slug: string) => void
}

export const useReportsStore = create<ReportsState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (slug) =>
        set((state) => ({ favorites: [...state.favorites, slug] })),
      removeFavorite: (slug) =>
        set((state) => ({
          favorites: state.favorites.filter((s) => s !== slug),
        })),
      toggleFavorite: (slug) =>
        set((state) => {
          const isFavorite = state.favorites.includes(slug)
          return {
            favorites: isFavorite
              ? state.favorites.filter((s) => s !== slug)
              : [...state.favorites, slug],
          }
        }),
    }),
    {
      name: 'reports-storage',
    }
  )
)
