"use client"

import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const initial = [
  { id: "n1", title: "Event tomorrow", text: "Your Tech Conference starts tomorrow.", time: "1d ago", read: false },
  { id: "n2", title: "Transfer successful", text: "Ticket tkt-001 transferred.", time: "2d ago", read: true },
]

export default function UserNotificationsPage() {
  const [items, setItems] = useState(initial)
  const unread = items.some(i => !i.read)
  const [showUnread, setShowUnread] = useState(false)

  const list = showUnread ? items.filter(i => !i.read) : items

  return (
    <SidebarLayout role="user" title="Notifications">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={showUnread} onChange={e=>setShowUnread(e.target.checked)} /> Show unread only</label>
          </div>
          <Button variant="outline" className="border-white/20" disabled={!unread} onClick={()=>setItems(items.map(i=>({...i, read:true})))}>
            Mark all as read
          </Button>
        </div>
        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
          <ul className="divide-y divide-white/5">
            {list.map(n => (
              <li key={n.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className={`text-sm ${n.read?"text-zinc-400":"text-white"}`}>{n.title}</p>
                  <p className="text-xs text-zinc-500">{n.text}</p>
                </div>
                <span className="text-xs text-zinc-500">{n.time}</span>
              </li>
            ))}
            {list.length===0 && <li className="px-4 py-6 text-center text-sm text-zinc-400">No notifications.</li>}
          </ul>
        </Card>
      </div>
    </SidebarLayout>
  )
}


