"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockUsers, getEventsByAgency } from "@/lib/mock-data"

type StatusFilter = "all" | "active" | "blocked"

export default function AdminAgenciesPage() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<StatusFilter>("all")

  const agencies = useMemo(() => {
    const base = mockUsers.filter(u => u.role === "agency")
    const q = query.toLowerCase()
    // demo: assume all active (could be extended with mock status later)
    return base
      .filter(a => !q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q))
      .filter(() => status === "all" || status === "active")
  }, [query, status])

  return (
    <SidebarLayout role="admin" title="Agencies">
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Agencies</h1>
            <p className="text-zinc-400">Manage all registered agencies</p>
          </div>
          <div className="flex items-end gap-2">
            <div className="w-64">
              <label className="text-xs text-zinc-400">Search</label>
              <Input placeholder="Search name or email..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <div className="w-40">
              <label className="text-xs text-zinc-400">Status</label>
              <Select value={status} onValueChange={(v: StatusFilter) => setStatus(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Add Agency</Button>
          </div>
        </div>

        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
          {agencies.length === 0 && (
            <div className="p-8 text-center text-sm text-zinc-400">No agencies found.</div>
          )}
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Agency</th>
                <th className="px-4 py-3 text-left">Owner Email</th>
                <th className="px-4 py-3 text-left">Total Events</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {agencies.map(a => (
                <tr key={a.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{a.name}</td>
                  <td className="px-4 py-3 text-zinc-400">{a.email}</td>
                  <td className="px-4 py-3 text-zinc-400">{getEventsByAgency(a.id).length}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-md border border-green-500/30 bg-green-500/10 px-2 py-1 text-xs text-green-400">Active</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild size="sm" variant="outline" className="border-white/20">
                        <Link href={`/admin/agencies/${a.id}`}>View</Link>
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20">Block</Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
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


