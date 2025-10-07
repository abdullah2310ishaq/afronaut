"use client"

import { useMemo, useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockEvents, mockTickets } from "@/lib/mock-data"

export default function AdminTicketReportsPage() {
  const [eventQuery, setEventQuery] = useState("")
  const [emailQuery, setEmailQuery] = useState("")
  const events = mockEvents
  const eventOptions = useMemo(() => events.filter(e => e.title.toLowerCase().includes(eventQuery.toLowerCase())), [eventQuery, events])
  const tickets = useMemo(() => {
    return mockTickets.filter(t =>
      (!emailQuery || t.userEmail.toLowerCase().includes(emailQuery.toLowerCase())) &&
      (!eventQuery || events.find(e => e.id === t.eventId)?.title.toLowerCase().includes(eventQuery.toLowerCase()))
    )
  }, [emailQuery, eventQuery])

  return (
    <SidebarLayout role="admin" title="Ticket Reports">
      <div className="space-y-6">
        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-sm text-zinc-400">Filter by Event</label>
              <Input placeholder="Event title..." value={eventQuery} onChange={e => setEventQuery(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Buyer Email</label>
              <Input placeholder="user@example.com" value={emailQuery} onChange={e => setEmailQuery(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button className="w-full">Export CSV</Button>
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Ticket ID</th>
                <th className="px-4 py-3 text-left">Event</th>
                <th className="px-4 py-3 text-left">Buyer</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => {
                const ev = events.find(e => e.id === t.eventId)
                return (
                  <tr key={t.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-white">{t.id}</td>
                    <td className="px-4 py-3 text-zinc-400">{ev?.title}</td>
                    <td className="px-4 py-3 text-zinc-400">{t.userEmail}</td>
                    <td className="px-4 py-3 text-zinc-400">${t.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-zinc-400 capitalize">{t.status}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </SidebarLayout>
  )
}


