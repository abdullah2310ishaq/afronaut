"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const initialNotifications = [
  { id: "n1", text: "New agency registered: Acme Events", time: "2h ago", read: false },
  { id: "n2", text: "Event approved: Summer Fest 2025", time: "1d ago", read: false },
  { id: "n3", text: "High sales alert: Tech Conference", time: "3d ago", read: true },
]

export default function AdminNotificationsPage() {
  const [items, setItems] = useState(initialNotifications)
  const unread = items.some(i => !i.read)

  return (
    <SidebarLayout role="admin" title="Notifications">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button variant="outline" className="border-white/20" onClick={() => setItems(items.map(i => ({...i, read: true})))} disabled={!unread}>
            Mark all as read
          </Button>
        </div>
        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
          <ul className="divide-y divide-white/5">
            {items.map(n => (
              <li key={n.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className={`text-sm ${n.read ? 'text-zinc-400' : 'text-white'}`}>{n.text}</p>
                  <p className="text-xs text-zinc-500">{n.time}</p>
                </div>
                {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </SidebarLayout>
  )
}


