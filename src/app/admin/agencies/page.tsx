"use client"

import Link from "next/link"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockUsers, getEventsByAgency } from "@/lib/mock-data"

export default function AdminAgenciesPage() {
  const agencies = mockUsers.filter(u => u.role === "agency")
  return (
    <SidebarLayout role="admin" title="Agencies">
      <div className="space-y-6">

        <Card className="border-white/10 bg-zinc-900/60 p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Agency</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Events</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {agencies.map(a => (
                <tr key={a.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">{a.name}</td>
                  <td className="px-4 py-3 text-zinc-400">{a.email}</td>
                  <td className="px-4 py-3 text-zinc-400">{getEventsByAgency(a.id).length}</td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild size="sm" variant="outline" className="border-white/20">
                      <Link href={`/admin/agencies/${a.id}`}>Details</Link>
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


