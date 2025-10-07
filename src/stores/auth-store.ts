import { create } from "zustand"
import { persist } from "zustand/middleware"
import { mockUsers, MOCK_PASSWORD } from "@/lib/mock-data"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "agency" | "employee" | "user"
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User, token: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Find user in mock data  
        const user = mockUsers.find((u) => u.email === email && password === MOCK_PASSWORD)
        
        if (user) {
          set({
            user,
            token: "mock-token",
            isAuthenticated: true,
          })
          return true
        }
        return false
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      setUser: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
        })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
