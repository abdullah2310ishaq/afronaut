"use client"

import Link from "next/link"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockEvents } from "@/lib/mock-data"

export default function AdminEventsPage() {
  const events = mockEvents
  return (
    <SidebarLayout role="admin" title="All Events">
      <div className="space-y-6">

        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
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
                    <Button asChild size="sm" variant="outline" className="border-white/20">
                      <Link href={`/admin/events/${e.id}`}>View</Link>
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


