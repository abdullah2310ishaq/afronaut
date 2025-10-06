"use client"

import { Header } from "@/components/common/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TicketCard } from "@/components/tickets/ticket-card"
import { mockTickets, mockEvents } from "@/lib/mock-data"
import { Ticket, Calendar, Wallet, TrendingUp, LogOut } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
// next one
export default function UserDashboard() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated === false || (isAuthenticated && user && user.role !== "user")) {
      router.push("/login")
    }
  }, [isAuthenticated, user?.role, router])

  if (isAuthenticated === false || (isAuthenticated && user && user.role !== "user")) {
    return null
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-black pt-20 pb-12 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }
  const upcomingTickets = mockTickets.filter((t) => t.status === "valid")
  const upcomingEvents = mockEvents.filter((e) => e.status === "active").slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground mt-2">Here's what's happening with your events</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              logout()
              router.push("/")
            }}
            className="gap-2 border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingTickets.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active tickets</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockTickets.reduce((sum, t) => sum + t.price, 0).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTickets.filter((t) => t.status === "used").length}</div>
              <p className="text-xs text-muted-foreground mt-1">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$250.00</div>
              <p className="text-xs text-muted-foreground mt-1">Available</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tickets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Upcoming Tickets</h2>
            <Button variant="ghost" asChild>
              <Link href="/tickets">View All</Link>
            </Button>
          </div>

          {upcomingTickets.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Ticket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No upcoming tickets</p>
                <Button asChild>
                  <Link href="/events">Browse Events</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </div>

        {/* Recommended Events */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                <div className="aspect-video relative">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" size="sm">
                    <Link href={`/events/${event.id}`}>View Event</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
