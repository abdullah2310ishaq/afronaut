"use client"

import { Header } from "@/components/common/header"
import { TicketCard } from "@/components/tickets/ticket-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockTickets } from "@/lib/mock-data"

export default function TicketsPage() {
  const validTickets = mockTickets.filter((t) => t.status === "valid")
  const usedTickets = mockTickets.filter((t) => t.status === "used")

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={{ name: "Jane Doe", role: "user" }} />

      <div className="container px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">My Tickets</h1>
          <p className="text-muted-foreground">Manage and view all your event tickets</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({validTickets.length})</TabsTrigger>
            <TabsTrigger value="past">Past Events ({usedTickets.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {validTickets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No upcoming tickets</p>
              </div>
            ) : (
              validTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {usedTickets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No past tickets</p>
              </div>
            ) : (
              usedTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
