"use client"

import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockUsers } from "@/lib/mock-data"
import { useMemo, useState } from "react"

export default function AdminEmployeesPage() {
  const [query, setQuery] = useState("")
  const employees = useMemo(() => {
    const q = query.toLowerCase()
    return mockUsers.filter(u => u.role === "employee" && (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)))
  }, [query])

  return (
    <SidebarLayout role="admin" title="Employees">
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Employees</h1>
            <p className="text-zinc-400">All employees added by agencies</p>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Search employees..." value={query} onChange={e => setQuery(e.target.value)} />
          </div>
        </div>

        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
          {employees.length === 0 && (
            <div className="p-8 text-center text-sm text-zinc-400">No employees found.</div>
          )}
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Agency</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{emp.name}</td>
                  <td className="px-4 py-3 text-zinc-400">{emp.email}</td>
                  <td className="px-4 py-3 text-zinc-400">{emp.companyInfo?.agencyName || "—"}</td>
                  <td className="px-4 py-3 text-zinc-400">Active</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="border-white/20">View</Button>
                      <Button size="sm" variant="destructive">Block</Button>
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


