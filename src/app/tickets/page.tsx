"use client"

import { Header } from "@/components/common/header"
import { TicketCard } from "@/components/tickets/ticket-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockTickets } from "@/lib/mock-data"
import { QrCode, Shield, Send } from "lucide-react"

export default function TicketsPage() {
  const validTickets = mockTickets.filter((t) => t.status === "active")
  const usedTickets = mockTickets.filter((t) => t.status === "used")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">My Tickets</h1>
          <p className="text-muted-foreground">Secure ticket management with PIN protection, QR codes, and transfer options</p>
        </div>

        {/* Features Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <QrCode className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">QR Code Generation</h3>
              <p className="text-sm text-gray-400">Secure entry codes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">PIN Protection</h3>
              <p className="text-sm text-gray-400">Enhanced security</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Send className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Easy Transfer</h3>
              <p className="text-sm text-gray-400">Share with friends</p>
            </div>
          </div>
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
