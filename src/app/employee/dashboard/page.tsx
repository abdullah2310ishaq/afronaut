"use client"

import Link from "next/link"
import { Header } from "@/components/common/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/ui/stat-card"
import { mockEvents, mockEmployees } from "@/lib/mock-data"
import { Calendar, QrCode, Ticket } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"

export default function EmployeeDashboardBasic() {
  const { user } = useAuthStore()
  const employee = mockEmployees.find(e => e.id === user?.id) || mockEmployees[0]
  const assigned = mockEvents.filter(e => employee.assignedEvents.includes(e.id))
  const ticketsToday = 47

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container px-4 py-10 space-y-8">
        <h1 className="text-3xl font-bold text-white">Employee Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <StatCard title="Assigned Events" value={assigned.length.toString()} icon={Calendar} delay={0} />
          <StatCard title="Total Scans" value={(employee.scansCount || 0).toString()} icon={Ticket} delay={0.1} />
          <StatCard title="Today's Scans" value={ticketsToday.toString()} icon={QrCode} delay={0.2} />
        </div>

        <Card className="border-white/10 bg-zinc-900/60 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="/employee/my-events">Go to My Events</Link>
            </Button>
            {assigned[0] && (
              <Button asChild variant="outline" className="border-white/20">
                <Link href={`/employee/scanner/${assigned[0].id}`}>Open Scanner</Link>
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  )
}


