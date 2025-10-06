"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockTickets } from "@/lib/mock-data"
import { useAuthStore } from "@/stores/auth-store"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react"

export default function TransferTicket() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const params = useParams()
  const [email, setEmail] = useState("")
  const [transferred, setTransferred] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "user") {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  const ticket = mockTickets.find((t) => t.id === params.id)

  if (!isAuthenticated || user?.role !== "user" || !ticket) {
    return null
  }

  const handleTransfer = () => {
    if (email) {
      setTransferred(true)
      setTimeout(() => {
        router.push("/tickets")
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => router.push(`/tickets/${ticket.id}`)}
          className="mb-4 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Ticket
        </Button>

        {!transferred ? (
          <Card className="bg-zinc-900 border-zinc-800">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-white mb-6">Transfer Ticket</h1>

              {/* Ticket Info */}
              <div className="mb-8 p-4 bg-black border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={ticket.eventImage || "/placeholder.svg"}
                    alt={ticket.eventTitle}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{ticket.eventTitle}</h3>
                    <p className="text-sm text-gray-400">{ticket.category}</p>
                    <p className="text-sm text-gray-500">{ticket.eventDate}</p>
                  </div>
                </div>
              </div>

              {/* Transfer Form */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-white">
                    Recipient Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="recipient@example.com"
                    className="bg-black border-zinc-700 text-white"
                  />
                  <p className="text-sm text-gray-400 mt-2">The ticket will be transferred to this email address</p>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                  <p className="text-sm text-yellow-400">
                    <strong>Warning:</strong> Once transferred, you will no longer have access to this ticket. This
                    action cannot be undone.
                  </p>
                </div>

                <Button onClick={handleTransfer} disabled={!email} className="w-full bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4 mr-2" />
                  Transfer Ticket
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="bg-zinc-900 border-zinc-800">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Transfer Successful!</h2>
              <p className="text-gray-400 mb-6">
                The ticket has been transferred to <span className="text-green-400">{email}</span>
              </p>
              <p className="text-sm text-gray-500">Redirecting to your tickets...</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
