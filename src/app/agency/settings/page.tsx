"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function AgencySettingsPage() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    logo: "",
    name: "Acme Events",
    contact: "+1 555 123 4567",
    email: "contact@acme.com",
    bank: "",
    stripe: "acct_123",
    notificationsEmail: true,
    notificationsSms: false,
    password: "",
  })

  return (
    <SidebarLayout role="agency" title="Settings">
      <div className="space-y-6 max-w-3xl">
        <Card className="border-white/10 bg-zinc-900/60 p-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-zinc-400">Agency Name</label>
              <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Contact</label>
              <Input value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Email</label>
              <Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Logo URL</label>
              <Input value={form.logo} onChange={e => setForm({...form, logo: e.target.value})} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-zinc-400">Bank Details</label>
              <Textarea value={form.bank} onChange={e => setForm({...form, bank: e.target.value})} />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Stripe Account ID</label>
              <Input value={form.stripe} onChange={e => setForm({...form, stripe: e.target.value})} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-zinc-400">Notifications</label>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <label className="flex items-center gap-2"> <input type="checkbox" checked={form.notificationsEmail} onChange={e=>setForm({...form, notificationsEmail: e.target.checked})} /> Email</label>
                <label className="flex items-center gap-2"> <input type="checkbox" checked={form.notificationsSms} onChange={e=>setForm({...form, notificationsSms: e.target.checked})} /> SMS</label>
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Change Password</label>
              <Input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="New password" />
            </div>
          </div>

          <div>
            <Button onClick={() => setSaved(true)}>Save Settings</Button>
            {saved && <p className="mt-2 text-green-400 text-sm">Settings saved (demo).</p>}
          </div>
        </Card>
      </div>
    </SidebarLayout>
  )
}


