"use client"

import { useParams } from "next/navigation"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TicketDownloadPage() {
  const params = useParams<{ ticketId: string }>()
  return (
    <SidebarLayout role="user" title="Download Ticket">
      <Card className="border-white/10 bg-zinc-900/60 p-6 text-center">
        <p className="text-zinc-400">Prepare PDF for ticket <span className="text-white">{params.ticketId}</span>.</p>
        <div className="mt-4 flex justify-center gap-2">
          <Button>Download PDF</Button>
          <Button variant="outline" className="border-white/20">Share</Button>
        </div>
      </Card>
    </SidebarLayout>
  )
}


