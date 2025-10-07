"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AdminSettingsPage() {
  const [templates, setTemplates] = useState({
    welcome: "Welcome to Afronaut Ticketing!",
    ticket: "Your ticket is attached.",
  })
  const [saved, setSaved] = useState(false)

  return (
    <SidebarLayout role="admin" title="System Settings">
      <div className="space-y-6 max-w-3xl">
        <Card className="border-white/10 bg-zinc-900/60 p-6 space-y-6">
          <div>
            <label className="text-sm text-zinc-400">Welcome Email Template</label>
            <Textarea value={templates.welcome} onChange={e => setTemplates({...templates, welcome: e.target.value})} />
          </div>
          <div>
            <label className="text-sm text-zinc-400">Ticket Email Template</label>
            <Textarea value={templates.ticket} onChange={e => setTemplates({...templates, ticket: e.target.value})} />
          </div>
          <div>
            <Button onClick={() => setSaved(true)}>Save</Button>
            {saved && <p className="mt-2 text-green-400 text-sm">Saved.</p>}
          </div>
        </Card>
      </div>
    </SidebarLayout>
  )
}


