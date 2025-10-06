"use client"

import { Header } from "@/components/common/header"
import { EventCard } from "@/components/events/event-card"
import { Button } from "@/components/ui/button"
import { useFavoritesStore } from "@/stores/favorites-store"
import { useAuthStore } from "@/stores/auth-store"
import { mockEvents } from "@/lib/mock-data"
import { Heart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function FavoritesPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { favorites } = useFavoritesStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const favoriteEvents = mockEvents.filter((event) => favorites.includes(event.id))

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container px-4 py-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <Heart className="h-6 w-6 text-primary fill-current" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">My Favorites</h1>
            <p className="text-muted-foreground">Events you've saved for later</p>
          </div>
        </div>

        {favoriteEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Start exploring events and save your favorites by clicking the heart icon
            </p>
            <Button asChild>
              <Link href="/events">Browse Events</Link>
            </Button>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              {favoriteEvents.length} saved event{favoriteEvents.length !== 1 ? "s" : ""}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
