"use client"

import { SidebarLayout } from "@/components/common/sidebar-layout"
import { TicketCard } from "@/components/tickets/ticket-card"
import { mockTickets } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMemo, useState } from "react"

export default function MyTicketsPage() {
  const [tab, setTab] = useState<"upcoming" | "past" | "cancelled">("upcoming")
  const tickets = mockTickets
  const filtered = useMemo(() => {
    const now = Date.now()
    return tickets.filter(t => {
      const eventTime = new Date(t.eventDate).getTime()
      if (tab === "upcoming") return eventTime >= now && t.status !== "cancelled"
      if (tab === "past") return eventTime < now
      return t.status === "cancelled"
    })
  }, [tab, tickets])

  return (
    <SidebarLayout role="user" title="My Tickets">
      <Tabs value={tab} onValueChange={(v)=>setTab(v as "upcoming" | "past" | "cancelled")}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <div className="grid gap-6">
            {filtered.length === 0 ? (
              <div className="text-sm text-zinc-400">No tickets yet. Explore events to buy your first ticket.</div>
            ) : (
              filtered.map((t, i) => (<TicketCard key={t.id} ticket={t} index={i} />))
            )}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="grid gap-6">
            {filtered.length === 0 ? (
              <div className="text-sm text-zinc-400">No past tickets.</div>
            ) : (
              filtered.map((t, i) => (<TicketCard key={t.id} ticket={t} index={i} />))
            )}
          </div>
        </TabsContent>
        <TabsContent value="cancelled">
          <div className="grid gap-6">
            {filtered.length === 0 ? (
              <div className="text-sm text-zinc-400">No cancelled tickets.</div>
            ) : (
              filtered.map((t, i) => (<TicketCard key={t.id} ticket={t} index={i} />))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </SidebarLayout>
  )
}


