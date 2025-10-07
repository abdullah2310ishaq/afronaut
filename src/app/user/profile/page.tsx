"use client"

import { useState } from "react"
import { Header } from "@/components/common/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function UserProfilePage() {
  const [name, setName] = useState("Jane Doe")
  const [email, setEmail] = useState("user@afronaut.com")
  const [saved, setSaved] = useState(false)
  const [emailNotif, setEmailNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container px-4 py-10 space-y-6 max-w-2xl">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <Card className="border-white/10 bg-zinc-900/60 p-6 space-y-4">
          <div className="grid gap-4">
            <label className="text-sm text-zinc-400">Name</label>
            <Input value={name} onChange={e => setName(e.target.value)} />
            <label className="text-sm text-zinc-400">Email</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2 pt-2">
            <label className="text-sm text-zinc-400">Notifications</label>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" checked={emailNotif} onChange={e=>setEmailNotif(e.target.checked)} /> Email updates
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" checked={smsNotif} onChange={e=>setSmsNotif(e.target.checked)} /> SMS alerts
            </label>
          </div>
          <div className="pt-2">
            <Button onClick={() => setSaved(true)}>Save Changes</Button>
          </div>
          {saved && <p className="text-green-400 text-sm">Saved successfully.</p>}
        </Card>
      </main>
    </div>
  )
}


