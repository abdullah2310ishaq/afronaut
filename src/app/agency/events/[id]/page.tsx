"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getEventById } from "@/lib/mock-data"

type Tab = "overview" | "categories" | "sales" | "employees" | "settings"

export default function AgencyEventDetailPage() {
  const params = useParams<{ id: string }>()
  const event = getEventById(params.id)
  const [tab, setTab] = useState<Tab>("overview")
  if (!event) return null

  return (
    <SidebarLayout role="agency" title={event.title}>
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{event.title}</h1>
            <p className="text-zinc-400">{event.venue} — {event.location}</p>
          </div>
          <Button asChild variant="outline" className="border-white/20">
            <Link href="/agency/events">Back</Link>
          </Button>
        </div>

        <div className="flex gap-2">
          {["overview","categories","sales","employees","settings"].map(t => (
            <Button key={t} variant={tab===t?"default":"outline"} className={tab===t?"":"border-white/20"} onClick={()=>setTab(t as Tab)}>{t[0].toUpperCase()+t.slice(1)}</Button>
          ))}
        </div>

        {tab === "overview" && (
          <Card className="border-white/10 bg-zinc-900/60 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <img src={event.image} alt={event.title} className="rounded-md w-full" />
              <div>
                <p className="text-zinc-300">{event.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-zinc-400">
                  <div>Start: {new Date(event.startDate).toLocaleString()}</div>
                  <div>End: {new Date(event.endDate).toLocaleString()}</div>
                  <div>Agency: {event.agencyName}</div>
                  <div>Revenue: ${event.totalRevenue.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {tab === "categories" && (
          <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-black/40 text-zinc-400">
                <tr>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Sold / Total</th>
                </tr>
              </thead>
              <tbody>
                {event.categories.map(c => (
                  <tr key={c.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-white">{c.name}</td>
                    <td className="px-4 py-3 text-zinc-400">${c.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-zinc-400">{c.soldTickets} / {c.totalTickets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {tab === "sales" && (
          <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-black/40 text-zinc-400">
                <tr>
                  <th className="px-4 py-3 text-left">Order ID</th>
                  <th className="px-4 py-3 text-left">Buyer</th>
                  <th className="px-4 py-3 text-left">Qty</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4,5].map(i => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="px-4 py-3 text-white">ord-{i.toString().padStart(3,'0')}</td>
                    <td className="px-4 py-3 text-zinc-400">user@demo.com</td>
                    <td className="px-4 py-3 text-zinc-400">{2+i}</td>
                    <td className="px-4 py-3 text-zinc-400">${(50*(2+i)).toFixed(2)}</td>
                    <td className="px-4 py-3 text-zinc-400">paid</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {tab === "employees" && (
          <Card className="border-white/10 bg-zinc-900/60 p-6">
            <p className="text-zinc-400">Invite and manage employees for this event.</p>
            <div className="mt-4 flex gap-2">
              <input className="bg-black/40 border border-white/20 rounded px-3 py-2 text-sm text-white" placeholder="employee@example.com" />
              <Button>Invite</Button>
            </div>
          </Card>
        )}

        {tab === "settings" && (
          <Card className="border-white/10 bg-zinc-900/60 p-6">
            <p className="text-zinc-400">Edit event info and delete event.</p>
            <div className="mt-4 flex gap-3">
              <Button>Save Changes</Button>
              <Button variant="destructive">Delete Event</Button>
            </div>
          </Card>
        )}
      </div>
    </SidebarLayout>
  )
}


