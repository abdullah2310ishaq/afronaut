"use client"

import { useParams } from "next/navigation"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { mockUsers, getTicketsByUser } from "@/lib/mock-data"

export default function AdminUserDetailPage() {
  const params = useParams<{ userId: string }>()
  const user = mockUsers.find(u => u.id === params.userId)
  if (!user) return null
  const tickets = getTicketsByUser(user.id)

  return (
    <SidebarLayout role="admin" title={`User: ${user.name}`}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <p className="text-zinc-400 text-sm">Email: {user.email}</p>
          <p className="text-zinc-400 text-sm">Role: {user.role}</p>
          <p className="text-zinc-400 text-sm">Joined: {new Date(user.dateJoined).toLocaleDateString()}</p>
        </Card>
        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <h2 className="text-white font-semibold mb-4">Tickets</h2>
          <ul className="space-y-2">
            {tickets.map(t => (
              <li key={t.id} className="text-zinc-300">{t.eventTitle} — {t.status} — ${t.price.toFixed(2)}</li>
            ))}
            {tickets.length === 0 && <li className="text-zinc-500 text-sm">No tickets</li>}
          </ul>
        </Card>
      </div>
    </SidebarLayout>
  )
}


