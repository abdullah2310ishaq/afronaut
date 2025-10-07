"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { mockEvents } from "@/lib/mock-data"

type Status = "all" | "upcoming" | "ongoing" | "ended"

export default function AdminEventsPage() {
  const [query, setQuery] = useState("")
  const [agency, setAgency] = useState<string>("all")
  const [status, setStatus] = useState<Status>("all")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")

  const agencies = useMemo(() => Array.from(new Set(mockEvents.map(e => e.agencyName))).sort(), [])

  const events = useMemo(() => {
    const q = query.toLowerCase()
    return mockEvents
      .filter(e => !q || e.title.toLowerCase().includes(q))
      .filter(e => agency === "all" || e.agencyName === agency)
      .filter(e => {
        if (status === "all") return true
        const now = Date.now()
        const start = new Date(e.startDate).getTime()
        const end = new Date(e.endDate).getTime()
        if (status === "upcoming") return start > now
        if (status === "ongoing") return start <= now && end >= now
        return end < now
      })
      .filter(e => {
        if (!from && !to) return true
        const start = new Date(e.startDate).getTime()
        const afterFrom = from ? start >= new Date(from).getTime() : true
        const beforeTo = to ? start <= new Date(to).getTime() : true
        return afterFrom && beforeTo
      })
  }, [query, agency, status, from, to])

  return (
    <SidebarLayout role="admin" title="All Events">
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 w-full">
            <div>
              <label className="text-xs text-zinc-400">Search</label>
              <Input placeholder="Event title..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-zinc-400">Agency</label>
              <Select value={agency} onValueChange={v => setAgency(v)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="All agencies" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {agencies.map(a => (<SelectItem key={a} value={a}>{a}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-zinc-400">Status</label>
              <Select value={status} onValueChange={(v: Status) => setStatus(v)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="All statuses" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="ended">Ended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-zinc-400">From</label>
                <Input type="date" value={from} onChange={e => setFrom(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-zinc-400">To</label>
                <Input type="date" value={to} onChange={e => setTo(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
          {events.length === 0 && (
            <div className="p-8 text-center text-sm text-zinc-400">No events match your filters.</div>
          )}
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Agency</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Tickets Sold</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {events.map(e => (
                <tr key={e.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{e.title}</td>
                  <td className="px-4 py-3 text-zinc-400">{e.agencyName}</td>
                  <td className="px-4 py-3 text-zinc-400">{new Date(e.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-zinc-400">{e.categories.reduce((a,c)=>a+c.soldTickets,0)} / {e.categories.reduce((a,c)=>a+c.totalTickets,0)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="border-white/20">Quick View</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>{e.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-2 text-sm text-zinc-400">
                            <div>Agency: <span className="text-white">{e.agencyName}</span></div>
                            <div>Date: {new Date(e.startDate).toLocaleString()}</div>
                            <div>Tickets: {e.categories.reduce((a,c)=>a+c.soldTickets,0)} / {e.categories.reduce((a,c)=>a+c.totalTickets,0)}</div>
                            <div>Status: {/* derived in real impl */}—</div>
                          </div>
                          <div className="flex justify-end">
                            <Button asChild size="sm">
                              <Link href={`/admin/events/${e.id}`}>Open Details</Link>
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button asChild size="sm">
                        <Link href={`/admin/events/${e.id}`}>View</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </SidebarLayout>
  )
}


