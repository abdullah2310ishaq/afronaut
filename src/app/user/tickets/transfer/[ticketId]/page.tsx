"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { SidebarLayout } from "@/components/common/sidebar-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { getTicketById } from "@/lib/mock-data"

export default function UserTicketTransferPage() {
  const params = useParams<{ ticketId: string }>()
  const router = useRouter()
  const { toast } = useToast()
  const ticket = getTicketById(params.ticketId)

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  }

  async function handleTransfer() {
    setError("")
    if (!isValidEmail(email)) {
      setError("Enter a valid email")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({ title: "Transfer successful", description: `Ticket sent to ${email}` })
      router.push("/user/my-tickets")
    }, 900)
  }

  return (
    <SidebarLayout role="user" title="Transfer Ticket">
      <div className="space-y-6 max-w-xl">
        <Card className="border-white/10 bg-zinc-900/60 p-6 space-y-4">
          <div>
            <p className="text-sm text-zinc-400">You are transferring</p>
            <p className="text-white font-semibold">{ticket?.eventTitle || "Ticket"}</p>
            <p className="text-xs text-zinc-500">ID: {ticket?.id}</p>
          </div>
          <div>
            <label className="text-sm text-zinc-300">Recipient Email</label>
            <Input placeholder="user@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <Alert>
            <AlertDescription className="text-xs text-zinc-400">
              Once transferred, this ticket will no longer appear in your account.
            </AlertDescription>
          </Alert>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex gap-2">
            <Button onClick={handleTransfer} disabled={loading}>
              {loading ? "Transferring..." : "Confirm Transfer"}
            </Button>
            <Button variant="outline" className="border-white/20" onClick={()=>router.back()}>Cancel</Button>
          </div>
        </Card>
      </div>
    </SidebarLayout>
  )
}


