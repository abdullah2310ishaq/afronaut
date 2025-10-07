"use client"

import Link from "next/link"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockEmployees } from "@/lib/mock-data"

export default function AgencyEmployeesPage() {
  const employees = mockEmployees
  return (
    <SidebarLayout role="agency" title="Employees">
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <Button>Invite Employee</Button>
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


