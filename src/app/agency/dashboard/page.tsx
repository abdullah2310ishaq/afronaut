"use client"

import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { mockEvents } from "@/lib/mock-data"
import { Calendar, DollarSign, Ticket, TrendingUp } from "lucide-react"

export default function AgencyDashboardPage() {
  const myEvents = mockEvents
  const active = myEvents.filter(e => e.status === "active")
  const revenue = myEvents.reduce((s, e) => s + e.totalRevenue, 0)
  const sold = myEvents.reduce((s, e) => s + e.categories.reduce((a,c)=>a+c.soldTickets,0), 0)

  return (
    <SidebarLayout role="agency" title="Dashboard">
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Active Events" value={active.length.toString()} icon={Calendar} delay={0} />
          <StatCard title="Tickets Sold" value={sold.toLocaleString()} icon={Ticket} delay={0.1} />
          <StatCard title="Revenue" value={`$${(revenue/1000).toFixed(0)}K`} icon={DollarSign} delay={0.2} />
          <StatCard title="Growth" value="+12%" icon={TrendingUp} delay={0.3} />
        </div>

        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <h2 className="text-white font-semibold mb-4">Upcoming Events</h2>
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Sold</th>
              </tr>
            </thead>
            <tbody>
              {active.slice(0,5).map(e => (
                <tr key={e.id} className="border-t border-white/5">
                  <td className="px-3 py-2 text-white">{e.title}</td>
                  <td className="px-3 py-2 text-zinc-400">{new Date(e.startDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2 text-zinc-400">{e.categories.reduce((a,c)=>a+c.soldTickets,0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <h2 className="text-white font-semibold mb-4">Daily Sales (placeholder)</h2>
          <div className="h-48 rounded-md bg-black/40 grid place-items-center text-zinc-600">Chart placeholder</div>
        </Card>
      </div>
    </SidebarLayout>
  )
}


