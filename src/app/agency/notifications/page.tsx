"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const initialNotifications = [
  { id: "an1", text: "Ticket sale completed: Rock Concert", time: "2h ago", read: false },
  { id: "an2", text: "Event approved by Admin: Food & Wine Expo", time: "1d ago", read: false },
  { id: "an3", text: "Payout processed", time: "3d ago", read: true },
]

export default function AgencyNotificationsPage() {
  const [items, setItems] = useState(initialNotifications)
  const unread = items.some(i => !i.read)

  return (
    <SidebarLayout role="agency" title="Notifications">
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


