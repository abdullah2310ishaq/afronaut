import { create } from "zustand"
import { persist } from "zustand/middleware"

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
        // Mock authentication - check against mock users
        const mockUsers = [
          {
            id: "1",
            email: "admin@afronaut.com",
            password: "password123",
            name: "Admin User",
            role: "admin" as const,
          },
          {
            id: "2",
            email: "agency@afronaut.com",
            password: "password123",
            name: "Event Masters",
            role: "agency" as const,
          },
          {
            id: "3",
            email: "employee@afronaut.com",
            password: "password123",
            name: "John Scanner",
            role: "employee" as const,
          },
          { id: "4", email: "user@afronaut.com", password: "password123", name: "Jane Doe", role: "user" as const },
        ]

        const user = mockUsers.find((u) => u.email === email && u.password === password)

        if (user) {
          const { password: _, ...userWithoutPassword } = user
          const mockToken = `mock-jwt-token-${user.id}`

          set({
            user: userWithoutPassword,
            token: mockToken,
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
