"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, LogOut, Heart, Bell } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import { useFavoritesStore } from "@/stores/favorites-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileMenu } from "@/components/common/mobile-menu"

export function Header() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { favorites } = useFavoritesStore()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const dashboardPath = (role?: string) => {
    switch (role) {
      case "admin":
        return "/admin/dashboard"
      case "agency":
        return "/agency/dashboard"
      case "employee":
        return "/employee/dashboard"
      case "user":
        return "/user/dashboard"
      default:
        return "/"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg
                className="h-5 w-5 text-primary-foreground"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <span className="text-xl font-bold">Afronaut Ticketing</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/events"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Events
            </Link>
            {isAuthenticated && user && (
              <>
                <Link
                  href={dashboardPath(user.role)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                {user.role === "agency" && (
                  <>
                    <Link href="/agency/events" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Events</Link>
                    <Link href="/agency/event-builder" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Event Builder</Link>
                    <Link href="/agency/employees" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Employees</Link>
                    <Link href="/agency/statistics" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Statistics</Link>
                  </>
                )}
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Icons */}
          {isAuthenticated && user && (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/favorites">
                  <Heart className="h-5 w-5" />
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {favorites.length}
                    </Badge>
                  )}
                </Link>
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                  3
                </Badge>
              </Button>
            </div>
          )}

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* Desktop User Menu */}
          {isAuthenticated && user ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden lg:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={dashboardPath(user.role)}>Dashboard</Link>
                  </DropdownMenuItem>
                  {user.role === "user" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/user/my-tickets">My Tickets</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/favorites">Favorites</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/user/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
