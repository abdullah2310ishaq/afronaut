"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Menu, Ticket, User, LogOut, Heart, Bell } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import { useFavoritesStore } from "@/stores/favorites-store"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { favorites } = useFavoritesStore()

  const handleLogout = () => {
    logout()
    router.push("/")
    setIsOpen(false)
  }

  const navigationItems = [
    { label: "Events", href: "/events" },
    ...(isAuthenticated && user ? [{ label: "Dashboard", href: `/dashboard/${user.role}` }] : []),
    ...(isAuthenticated && user?.role === "user" ? [
      { label: "My Tickets", href: "/tickets" },
      { label: "Favorites", href: "/favorites" }
    ] : [])
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Ticket className="h-6 w-6 text-primary-foreground" />
              </div>
              <SheetTitle className="text-xl font-bold">Afronaut Ticketing</SheetTitle>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {/* User Info */}
            {isAuthenticated && user && (
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="p-6 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Quick Actions */}
            {isAuthenticated && user && (
              <div className="p-6 border-t border-border space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Quick Actions</p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild className="flex-1 gap-2">
                    <Link href="/favorites" onClick={() => setIsOpen(false)}>
                      <Heart className="h-4 w-4" />
                      Favorites
                      {favorites.length > 0 && (
                        <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {favorites.length}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Bell className="h-4 w-4" />
                    <Badge className="h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                      3
                    </Badge>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
            
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                className="w-full gap-2 border-destructive/20 text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/register" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}