"use client"

import { useParams } from "next/navigation"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { getEventById } from "@/lib/mock-data"

export default function AdminEventDetailPage() {
  const params = useParams<{ id: string }>()
  const event = getEventById(params.id)
  if (!event) return null

  const sold = event.categories.reduce((a, c) => a + c.soldTickets, 0)
  const capacity = event.categories.reduce((a, c) => a + c.totalTickets, 0)

  return (
    <SidebarLayout role="admin" title={`Event: ${event.title}`}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <img src={event.image} alt={event.title} className="rounded-md w-full h-64 object-cover mb-4" />
          <p className="text-zinc-300 mb-2">{event.description}</p>
          <p className="text-zinc-400 text-sm">Venue: {event.venue} • {event.location}</p>
          <p className="text-zinc-400 text-sm">Start: {new Date(event.startDate).toLocaleString()}</p>
          <p className="text-zinc-400 text-sm">End: {new Date(event.endDate).toLocaleString()}</p>
        </Card>

        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <h2 className="text-white font-semibold mb-4">Ticket Categories</h2>
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Price</th>
                <th className="px-3 py-2 text-left">Sold / Total</th>
              </tr>
            </thead>
            <tbody>
              {event.categories.map(cat => (
                <tr key={cat.id} className="border-t border-white/5">
                  <td className="px-3 py-2 text-white">{cat.name}</td>
                  <td className="px-3 py-2 text-zinc-400">${cat.price.toFixed(2)}</td>
                  <td className="px-3 py-2 text-zinc-400">{cat.soldTickets} / {cat.totalTickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-sm text-zinc-400">Overall: {sold} / {capacity} sold</div>
        </Card>
      </div>
    </SidebarLayout>
  )
}


