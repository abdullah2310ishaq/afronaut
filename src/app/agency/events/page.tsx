"use client"

import Link from "next/link"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockEvents } from "@/lib/mock-data"

export default function AgencyEventsPage() {
  const events = mockEvents
  return (
    <SidebarLayout role="agency" title="My Events">
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <p className="text-zinc-400">Drafts, published and completed events</p>
          <Button asChild>
            <Link href="/agency/event-builder">Create New Event</Link>
          </Button>
        </div>

        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Start</th>
                <th className="px-4 py-3 text-left">Sold</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {events.map(e => (
                <tr key={e.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{e.title}</td>
                  <td className="px-4 py-3 text-zinc-400 capitalize">{e.status}</td>
                  <td className="px-4 py-3 text-zinc-400">{new Date(e.startDate).toLocaleString()}</td>
                  <td className="px-4 py-3 text-zinc-400">{e.categories.reduce((a,c)=>a+c.soldTickets,0)}</td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild size="sm" variant="outline" className="border-white/20">
                      <Link href={`/agency/events/${e.id}`}>Manage</Link>
                    </Button>
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


