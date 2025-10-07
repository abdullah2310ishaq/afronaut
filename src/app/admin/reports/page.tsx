"use client"

import { useMemo, useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { mockEvents, mockTickets } from "@/lib/mock-data"

export default function AdminReportsPage() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")

  const dailySales = useMemo(() => {
    const map = new Map<string, number>()
    for (const t of mockTickets) {
      const d = new Date(t.purchaseDate || t.createdAt || Date.now())
      const key = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString()
      map.set(key, (map.get(key) || 0) + t.price)
    }
    let arr = Array.from(map.entries()).map(([date, amount]) => ({ date, amount }))
    if (from) arr = arr.filter(x => new Date(x.date) >= new Date(from))
    if (to) arr = arr.filter(x => new Date(x.date) <= new Date(to))
    return arr.sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [from, to])

  const topAgencies = useMemo(() => {
    const revenueByAgency = new Map<string, number>()
    for (const t of mockTickets) {
      const ev = mockEvents.find(e => e.id === t.eventId)
      if (!ev) continue
      revenueByAgency.set(ev.agencyName, (revenueByAgency.get(ev.agencyName) || 0) + t.price)
    }
    return Array.from(revenueByAgency.entries()).sort((a,b)=>b[1]-a[1]).slice(0,5)
  }, [])

  return (
    <SidebarLayout role="admin" title="Reports & Analytics">
      <div className="space-y-6">
        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-sm text-zinc-400">From</label>
              <Input type="date" value={from} onChange={e => setFrom(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-zinc-400">To</label>
              <Input type="date" value={to} onChange={e => setTo(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button className="w-full">Export CSV</Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-white font-semibold mb-4">Total Sales Over Time</h2>
            <ChartContainer
              config={{ sales: { label: "Sales", color: "hsl(var(--primary))" } }}
              className="h-64"
            >
              <AreaChart data={dailySales} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v)=> new Date(v).toLocaleDateString()} />
                <YAxis tickLine={false} axisLine={false} width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="amount" type="monotone" fill="var(--color-sales)" stroke="var(--color-sales)" />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </Card>

          <Card className="border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-white font-semibold mb-4">Top Agencies (Revenue)</h2>
            {topAgencies.length === 0 ? (
              <div className="text-sm text-zinc-400">No data in selected range.</div>
            ) : (
              <div className="space-y-2">
                {topAgencies.map(([name, amount]) => (
                  <div key={name} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-white">{name}</span>
                    <span className="text-zinc-400">${amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </SidebarLayout>
  )
}


