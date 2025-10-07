"use client"

import { Header } from "@/components/common/header"
import { Card } from "@/components/ui/card"
import { mockEvents } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

export default function AgencyStatisticsPage() {
  const events = mockEvents
  const rows = events.map(e => ({
    id: e.id,
    title: e.title,
    revenue: e.totalRevenue,
    sold: e.categories.reduce((a,c)=>a+c.soldTickets,0),
  }))

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container px-4 py-10 space-y-6">
        <div className="flex items-end justify-between">
          <h1 className="text-3xl font-bold text-white">Statistics</h1>
          <Button>Export CSV</Button>
        </div>
        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Event</th>
                <th className="px-4 py-3 text-left">Tickets Sold</th>
                <th className="px-4 py-3 text-left">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{r.title}</td>
                  <td className="px-4 py-3 text-zinc-400">{r.sold.toLocaleString()}</td>
                  <td className="px-4 py-3 text-zinc-400">${r.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  )
}


