"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, QrCode, Sparkles } from "lucide-react"
import type { Ticket } from "@/lib/mock-data"

interface TicketCardProps {
  ticket: Ticket
  index?: number
}

export function TicketCard({ ticket, index = 0 }: TicketCardProps) {
  const statusConfig = {
    valid: {
      color: "border-primary/30 bg-primary/20 text-primary",
      icon: Sparkles,
      label: "Valid",
    },
    used: {
      color: "border-zinc-700 bg-zinc-800/50 text-zinc-400",
      icon: null,
      label: "Used",
    },
    transferred: {
      color: "border-blue-500/30 bg-blue-500/20 text-blue-400",
      icon: null,
      label: "Transferred",
    },
  }

  const config = statusConfig[ticket.status]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="group relative overflow-hidden border-white/10 bg-gradient-to-br from-zinc-900 to-black transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="flex flex-col sm:flex-row">
          <div className="relative aspect-video w-full overflow-hidden sm:aspect-square sm:w-48">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={ticket.eventImage || "/placeholder.svg?height=300&width=300&query=event+ticket"}
              alt={ticket.eventTitle}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
          </div>

          <CardContent className="relative flex-1 space-y-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="line-clamp-1 text-lg font-bold text-white">{ticket.eventTitle}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{ticket.category}</p>
              </div>
              <Badge className={`${config.color} flex items-center gap-1`}>
                {config.icon && <config.icon className="h-3 w-3" />}
                {config.label}
              </Badge>
            </div>

            <div className="space-y-2 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>
                  {new Date(ticket.eventDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{ticket.eventVenue}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <p className="text-xs text-zinc-500">Ticket Price</p>
                <p className="text-2xl font-bold text-white">${ticket.price.toFixed(2)}</p>
              </div>

              {ticket.status === "valid" && (
                <Button asChild size="lg" className="gap-2">
                  <Link href={`/tickets/${ticket.id}`}>
                    <QrCode className="h-4 w-4" />
                    View QR
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
