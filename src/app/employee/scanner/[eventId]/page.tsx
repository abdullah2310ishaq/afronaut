"use client"

import { useMemo, useState } from "react"
// removed unused Link import
import { useParams } from "next/navigation"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getEventById, mockTickets } from "@/lib/mock-data"

type ScanStatus = "idle" | "valid" | "used" | "invalid"

export default function ScannerPage() {
  const params = useParams<{ eventId: string }>()
  const event = useMemo(() => getEventById(params.eventId), [params.eventId])
  const [status, setStatus] = useState<ScanStatus>("idle")
  const [scannedCode, setScannedCode] = useState<string>("")

  function simulateScan(code: string) {
    setScannedCode(code)
    const ticket = mockTickets.find(t => t.ticketCode === code && t.eventId === event?.id)
    if (!ticket) return setStatus("invalid")
    if (ticket.status !== "active") return setStatus("used")
    setStatus("valid")
  }

  function markAsUsed() {
    if (status !== "valid") return
    setStatus("used")
  }

  return (
    <SidebarLayout role="employee" title={event ? `Scanner — ${event.title}` : "Scanner"}>
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-zinc-900/60 p-6">
            <div className="aspect-video rounded-md bg-black/50 grid place-items-center text-zinc-500">
              <p>Camera preview placeholder</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => simulateScan("SMF2025-VIP-001")} className="bg-green-600 hover:bg-green-700">Simulate Valid</Button>
              <Button onClick={() => simulateScan("USED-CODE")} variant="outline" className="border-white/20">Simulate Used</Button>
              <Button onClick={() => simulateScan("RANDOM-INVALID")} variant="destructive">Simulate Invalid</Button>
            </div>
          </Card>

          <Card className="border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-lg font-semibold text-white">Scan Result</h2>
            {status === "idle" && <p className="text-zinc-400 mt-2">No scan yet.</p>}
            {status !== "idle" && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-zinc-400">Code: {scannedCode || "—"}</p>
                {status === "valid" && (
                  <>
                    <div className="rounded-md border border-green-500/30 bg-green-500/10 p-4 text-green-400">Valid ticket. Access granted.</div>
                    <div className="pt-2">
                      <Button onClick={markAsUsed} className="bg-yellow-600 hover:bg-yellow-700">Mark as Used</Button>
                    </div>
                  </>
                )}
                {status === "used" && (
                  <div className="rounded-md border border-yellow-500/30 bg-yellow-500/10 p-4 text-yellow-400">Ticket used.</div>
                )}
                {status === "invalid" && (
                  <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-red-400">Invalid ticket.</div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </SidebarLayout>
  )
}


