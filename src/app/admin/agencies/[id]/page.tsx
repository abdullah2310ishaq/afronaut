"use client"

import { useParams } from "next/navigation"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { mockUsers, getEventsByAgency } from "@/lib/mock-data"

export default function AdminAgencyDetailPage() {
  const params = useParams<{ id: string }>()
  const agency = mockUsers.find(u => u.id === params.id && u.role === "agency")
  if (!agency) return null
  const events = getEventsByAgency(agency.id)

  return (
    <SidebarLayout role="admin" title={`Agency: ${agency.name}`}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <h2 className="text-white font-semibold mb-2">Profile</h2>
          <p className="text-zinc-400 text-sm">Email: {agency.email}</p>
          <p className="text-zinc-400 text-sm">Joined: {new Date(agency.dateJoined).toLocaleDateString()}</p>
          <p className="text-zinc-400 text-sm">Website: {agency.companyInfo?.website}</p>
          <p className="text-zinc-400 text-sm">Revenue: ${((agency.stats?.totalRevenue as number) || 0).toLocaleString()}</p>
        </Card>

        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <h2 className="text-white font-semibold mb-4">Events</h2>
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Start</th>
                <th className="px-3 py-2 text-left">Sold</th>
              </tr>
            </thead>
            <tbody>
              {events.map(e => (
                <tr key={e.id} className="border-t border-white/5">
                  <td className="px-3 py-2 text-white">{e.title}</td>
                  <td className="px-3 py-2 text-zinc-400">{new Date(e.startDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2 text-zinc-400">{e.categories.reduce((a,c)=>a+c.soldTickets,0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </SidebarLayout>
  )
}


