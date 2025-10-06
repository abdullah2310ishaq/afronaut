import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FavoritesState {
  favorites: string[]
  toggleFavorite: (eventId: string) => void
  isFavorite: (eventId: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (eventId: string) => {
        set((state) => ({
          favorites: state.favorites.includes(eventId)
            ? state.favorites.filter((id) => id !== eventId)
            : [...state.favorites, eventId],
        }))
      },

      isFavorite: (eventId: string) => {
        return get().favorites.includes(eventId)
      },
    }),
    {
      name: "favorites-storage",
    },
  ),
)
