"use client"

import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/auth-store"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { mockStats, mockUsers, mockEvents } from "@/lib/mock-data"

export default function AdminDashboardPage() {
  const router = useRouter()
  const topAgencies = mockUsers.filter(u => u.role === "agency").slice(0, 5)
  return (
    <SidebarLayout role="admin" title="Admin Dashboard">
      <div className="space-y-8">
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            className="border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
            onClick={() => {
              const { logout } = useAuthStore.getState()
              logout()
             
              router.push("/")
            }}
          >
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[{label:"Users",value:mockStats.totalUsers},{label:"Agencies",value:mockStats.totalAgencies},{label:"Events",value:mockStats.totalEvents},{label:"Tickets Sold",value:mockStats.totalTicketsSold}].map(card => (
            <Card key={card.label} className="border-white/10 bg-zinc-900/60 p-6">
              <p className="text-sm text-zinc-400">{card.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">{card.value.toLocaleString()}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-lg font-semibold text-white">Top Agencies</h2>
            <div className="mt-4 space-y-3">
              {topAgencies.map(a => (
                <div key={a.id} className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <img src={a.avatar} alt={a.name} className="h-8 w-8 rounded-full object-cover" />
                    <div>
                      <p className="text-white font-medium">{a.name}</p>
                      <p className="text-xs text-zinc-400">{a.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-zinc-400">Events: {mockEvents.filter(e=>e.agencyId===a.id).length}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-lg font-semibold text-white">Growth</h2>
            <p className="mt-2 text-zinc-400 text-sm">Users: {mockStats.monthlyGrowth.users}% • Revenue: {mockStats.monthlyGrowth.revenue}% • Events: {mockStats.monthlyGrowth.events}%</p>
            <div className="mt-4 h-40 rounded-md bg-black/40 grid place-items-center text-zinc-600">Chart placeholder</div>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  )
}


