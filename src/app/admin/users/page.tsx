"use client"

import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockUsers } from "@/lib/mock-data"
import { useMemo, useState } from "react"

export default function AdminUsersPage() {
  const [query, setQuery] = useState("")
  const users = useMemo(() => {
    const q = query.toLowerCase()
    return mockUsers.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
  }, [query])

  return (
    <SidebarLayout role="admin" title="Users">
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Users</h1>
            <p className="text-zinc-400">Manage platform users</p>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Search users..." value={query} onChange={e => setQuery(e.target.value)} />
          </div>
        </div>

        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Joined</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{u.name}</td>
                  <td className="px-4 py-3 text-zinc-400">{u.email}</td>
                  <td className="px-4 py-3 text-zinc-400 capitalize">{u.role}</td>
                  <td className="px-4 py-3 text-zinc-400">{new Date(u.dateJoined).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="outline" className="border-white/20">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </SidebarLayout>
  )
}


