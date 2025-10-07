"use client"

import Link from "next/link"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TicketCard } from "@/components/tickets/ticket-card"
import { mockTickets } from "@/lib/mock-data"

export default function UserDashboardPage() {
  const upcomingTickets = mockTickets.filter(t => t.status === "active")
  const pendingTransfers: Array<{ id: string; to: string; createdAt: number }> = []
  const firstTicket = upcomingTickets[0]

  return (
    <SidebarLayout role="user" title="Dashboard">
      <div className="space-y-8">
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/user/my-tickets">My Tickets</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20">
            <Link href="/user/profile">Profile</Link>
          </Button>
          {firstTicket && (
            <>
              <Button asChild variant="outline" className="border-white/20">
                <Link href={`/user/tickets/${firstTicket.id}`}>View Ticket</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href={`/tickets/${firstTicket.id}/transfer`}>Transfer Ticket</Link>
              </Button>
            </>
          )}
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Upcoming Tickets</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{upcomingTickets.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Pending Transfers</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{pendingTransfers.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Favorites</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">0</div></CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Upcoming Tickets</h2>
            <Button variant="ghost" asChild><Link href="/user/my-tickets">View All</Link></Button>
          </div>
          {upcomingTickets.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">No upcoming tickets</CardContent></Card>
          ) : (
            <div className="space-y-4">
              {upcomingTickets.map(t => (<TicketCard key={t.id} ticket={t} />))}
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  )
}


