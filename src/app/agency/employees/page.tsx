"use client"

import Link from "next/link"
import { useState } from "react"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { mockEmployees } from "@/lib/mock-data"

export default function AgencyEmployeesPage() {
  const [employees, setEmployees] = useState(mockEmployees)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("Ticket Checker")
  return (
    <SidebarLayout role="agency" title="Employees">
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Invite Employee</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Invite Employee</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <Input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
                <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
                <Input placeholder="Role" value={role} onChange={e=>setRole(e.target.value)} />
                <Button onClick={() => {
                  if (!name || !email) return
                  const now = new Date().toISOString()
                  const newEmp = { id: `emp-${employees.length+1}`, name, email, role: "employee" as const, position: role, assignedEvents: [], scansCount: 0, dateHired: now }
                  setEmployees([newEmp, ...employees])
                  setName("")
                  setEmail("")
                }}>Send Invite</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Assigned Events</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map(e => (
                <tr key={e.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{e.name}</td>
                  <td className="px-4 py-3 text-zinc-400">{e.email}</td>
                  <td className="px-4 py-3 text-zinc-400">{e.assignedEvents.length}</td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild size="sm" variant="outline" className="border-white/20">
                      <Link href={`/agency/employees/${e.id}`}>View</Link>
                    </Button>
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


