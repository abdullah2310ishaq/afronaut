"use client"

import { useMemo, useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockEvents, mockTickets } from "@/lib/mock-data"

export default function AgencyTicketsPage() {
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState<"active" | "used">("active")
  const eventsById = useMemo(() => new Map(mockEvents.map(e => [e.id, e])), [])

  const filtered = useMemo(() => {
    return mockTickets.filter(t => {
      const ev = eventsById.get(t.eventId)
      const matchQuery = !query || ev?.title.toLowerCase().includes(query.toLowerCase()) || t.userEmail.toLowerCase().includes(query.toLowerCase())
      const matchStatus = tab === "active" ? t.status === "active" : t.status !== "active"
      return matchQuery && matchStatus
    })
  }, [query, tab, eventsById])

  return (
    <SidebarLayout role="agency" title="Tickets">
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="w-64">
            <label className="text-xs text-zinc-400">Search</label>
            <Input placeholder="Event or buyer email..." value={query} onChange={e=>setQuery(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/20">Export CSV</Button>
            <Button>Scan Ticket</Button>
          </div>
        </div>

        <Tabs value={tab} onValueChange={(v)=>setTab(v as "active" | "used")}>
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="used">Scanned / Used</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
              {filtered.length === 0 && <div className="p-8 text-center text-sm text-zinc-400">No tickets found.</div>}
              <table className="w-full text-sm">
                <thead className="bg-black/40 text-zinc-400">
                  <tr>
                    <th className="px-4 py-3 text-left">Ticket ID</th>
                    <th className="px-4 py-3 text-left">Event</th>
                    <th className="px-4 py-3 text-left">Buyer</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(t => {
                    const ev = eventsById.get(t.eventId)
                    return (
                      <tr key={t.id} className="border-t border-white/5">
                        <td className="px-4 py-3 text-white">{t.id}</td>
                        <td className="px-4 py-3 text-zinc-400">{ev?.title}</td>
                        <td className="px-4 py-3 text-zinc-400">{t.userEmail}</td>
                        <td className="px-4 py-3 text-zinc-400">{t.categoryName}</td>
                        <td className="px-4 py-3 text-zinc-400 capitalize">{t.status}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Card>
          </TabsContent>
          <TabsContent value="used">
            <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
              {filtered.length === 0 && <div className="p-8 text-center text-sm text-zinc-400">No scanned tickets.</div>}
              <table className="w-full text-sm">
                <thead className="bg-black/40 text-zinc-400">
                  <tr>
                    <th className="px-4 py-3 text-left">Ticket ID</th>
                    <th className="px-4 py-3 text-left">Event</th>
                    <th className="px-4 py-3 text-left">Buyer</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(t => {
                    const ev = eventsById.get(t.eventId)
                    return (
                      <tr key={t.id} className="border-t border-white/5">
                        <td className="px-4 py-3 text-white">{t.id}</td>
                        <td className="px-4 py-3 text-zinc-400">{ev?.title}</td>
                        <td className="px-4 py-3 text-zinc-400">{t.userEmail}</td>
                        <td className="px-4 py-3 text-zinc-400">{t.categoryName}</td>
                        <td className="px-4 py-3 text-zinc-400 capitalize">{t.status}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  )
}


