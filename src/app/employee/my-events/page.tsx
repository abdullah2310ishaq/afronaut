"use client"

import Link from "next/link"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { mockEmployees, mockEvents } from "@/lib/mock-data"

export default function EmployeeMyEventsPage() {
  const employee = mockEmployees[0]
  const assigned = mockEvents.filter(e => employee.assignedEvents.includes(e.id))

  return (
    <SidebarLayout role="employee" title="My Events">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assigned.map(event => (
            <Card key={event.id} className="border-white/10 bg-zinc-900/60 p-5">
              <div className="aspect-video overflow-hidden rounded-md mb-4">
                <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-white">{event.title}</h3>
              <p className="text-sm text-zinc-400">{event.venue} — {event.location}</p>
              <div className="mt-4">
                <Button asChild>
                  <Link href={`/employee/scanner/${event.id}`}>Open Scanner</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </SidebarLayout>
  )
}


