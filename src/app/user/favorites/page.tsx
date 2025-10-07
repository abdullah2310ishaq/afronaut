"use client"

import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useFavoritesStore } from "@/stores/favorites-store"
import { mockEvents } from "@/lib/mock-data"
import Link from "next/link"

export default function UserFavoritesPage() {
  const { favorites } = useFavoritesStore()
  const favoriteEvents = mockEvents.filter(e => favorites.includes(e.id))
  return (
    <SidebarLayout role="user" title="Favorites">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favoriteEvents.length === 0 && (
          <Card className="border-white/10 bg-zinc-900/60 p-8 text-center text-sm text-zinc-400 md:col-span-2 lg:col-span-3">
            You haven’t favorited any events yet.
            <div className="mt-3"><Button asChild variant="outline" className="border-white/20"><Link href="/events">Explore Events</Link></Button></div>
          </Card>
        )}
        {favoriteEvents.map(ev => (
          <Card key={ev.id} className="border-white/10 bg-zinc-900/60 p-5">
            <div className="aspect-video rounded-md overflow-hidden mb-3">
              <img src={ev.image} alt={ev.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{ev.title}</p>
                <p className="text-xs text-zinc-400">{ev.location}</p>
              </div>
              <Button asChild size="sm"><Link href={`/events/${ev.id}`}>View</Link></Button>
            </div>
          </Card>
        ))}
      </div>
    </SidebarLayout>
  )
}


