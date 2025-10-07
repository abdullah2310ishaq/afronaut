"use client"

import { Header } from "@/components/common/header"
import { TicketCard } from "@/components/tickets/ticket-card"
import { mockTickets } from "@/lib/mock-data"

export default function MyTicketsPage() {
  const tickets = mockTickets
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container px-4 py-10 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">My Tickets</h1>
          <p className="text-zinc-400">All your purchased tickets</p>
        </div>
        <div className="grid gap-6">
          {tickets.map((t, i) => (
            <TicketCard key={t.id} ticket={t} index={i} />
          ))}
        </div>
      </main>
    </div>
  )
}


