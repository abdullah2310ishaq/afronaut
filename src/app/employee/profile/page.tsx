"use client"

import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/auth-store"
import { mockUsers } from "@/lib/mock-data"
import { useMemo, useState } from "react"

export default function EmployeeProfilePage() {
  const { user } = useAuthStore()
  const profile = useMemo(() => mockUsers.find(u => u.id === user?.id) || mockUsers.find(u=>u.role==='employee'), [user?.id])
  const [name, setName] = useState(profile?.name || "")
  const [email, setEmail] = useState(profile?.email || "")
  const [password, setPassword] = useState("")
  const [saved, setSaved] = useState(false)

  return (
    <SidebarLayout role="employee" title="Profile">
      <div className="space-y-6 max-w-xl">
        <Card className="border-white/10 bg-zinc-900/60 p-6 space-y-4">
          <div>
            <label className="text-sm text-zinc-400">Name</label>
            <Input value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <Input value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-zinc-400">Change Password</label>
            <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="New password" />
          </div>
          <div>
            <Button onClick={()=>setSaved(true)}>Save</Button>
            {saved && <p className="text-green-400 text-sm mt-2">Saved (demo).</p>}
          </div>
        </Card>
      </div>
    </SidebarLayout>
  )
}


