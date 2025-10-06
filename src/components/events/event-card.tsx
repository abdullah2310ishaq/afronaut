"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Ticket, TrendingUp, Heart } from "lucide-react"
import type { Event } from "@/lib/mock-data"
import { useFavoritesStore } from "@/stores/favorites-store"
import { useAuthStore } from "@/stores/auth-store"
import { cn } from "@/lib/utils"

interface EventCardProps {
  event: Event
  index?: number
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const { isAuthenticated } = useAuthStore()
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const favorited = isFavorite(event.id)

  const availableTickets = event.totalCapacity - event.soldTickets
  const percentageSold = (event.soldTickets / event.totalCapacity) * 100

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isAuthenticated) {
      toggleFavorite(event.id)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="group relative h-full overflow-hidden border-white/10 bg-gradient-to-br from-zinc-900 to-black transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative aspect-video overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={event.image || "/placeholder.svg?height=400&width=600&query=concert+event"}
            alt={event.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteClick}
              className={cn(
                "absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all",
                favorited
                  ? "border-red-500/50 bg-red-500/90 text-white"
                  : "border-white/20 bg-zinc-900/90 text-zinc-300 hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-400",
              )}
            >
              <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
            </motion.button>
          )}

          {event.status === "draft" && (
            <Badge className="absolute right-3 top-3 border-white/20 bg-zinc-900/90 text-zinc-300 backdrop-blur-sm">
              Draft
            </Badge>
          )}
          {percentageSold > 80 && event.status === "active" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="absolute right-3 top-3 border-red-500/20 bg-red-500/90 text-white backdrop-blur-sm">
                <TrendingUp className="mr-1 h-3 w-3" />
                Almost Sold Out
              </Badge>
            </motion.div>
          )}
        </div>

        <CardContent className="relative space-y-4 p-5">
          <h3 className="line-clamp-1 text-xl font-bold text-white transition-colors group-hover:text-primary">
            {event.title}
          </h3>

          <div className="space-y-2.5 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                • {event.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="line-clamp-1">
                {event.venue}, {event.location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-primary" />
              <span className="font-medium text-white">{availableTickets.toLocaleString()}</span>
              <span>tickets available</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {event.categories.slice(0, 2).map((category) => (
              <Badge
                key={category.id}
                variant="outline"
                className="border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
              >
                ${category.price}
              </Badge>
            ))}
            {event.categories.length > 2 && (
              <Badge variant="outline" className="border-zinc-700 bg-zinc-800/50 text-zinc-300">
                +{event.categories.length - 2} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="relative p-5 pt-0">
          <Button asChild className="w-full group/btn" size="lg">
            <Link href={`/events/${event.id}`}>
              View Details
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                →
              </motion.span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
