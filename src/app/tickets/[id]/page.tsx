"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/common/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { mockTickets } from "@/lib/mock-data"
import { ArrowLeft, Calendar, MapPin, Send } from "lucide-react"

export default function TicketDetailPage() {
  const params = useParams()
  const router = useRouter()
  const ticket = mockTickets.find((t) => t.id === params.id)

  const [pin, setPin] = useState("")
  const [showQR, setShowQR] = useState(false)
  const [transferEmail, setTransferEmail] = useState("")

  if (!ticket) {
    return <div>Ticket not found</div>
  }

  const handleViewQR = () => {
    if (pin === "1234") {
      // Mock PIN validation
      setShowQR(true)
    } else {
      alert("Invalid PIN. Try: 1234")
    }
  }

  const handleTransfer = () => {
    if (transferEmail) {
      alert(`Ticket transfer initiated to ${transferEmail}`)
      setTransferEmail("")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={{ name: "Jane Doe", role: "user" }} />

      <div className="container px-4 py-8 space-y-8 max-w-3xl">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Tickets
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{ticket.eventTitle}</CardTitle>
                <CardDescription className="mt-2">{ticket.category}</CardDescription>
              </div>
              <Badge
                className={
                  ticket.status === "valid" ? "bg-primary" : ticket.status === "used" ? "bg-muted" : "bg-secondary"
                }
              >
                {ticket.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={ticket.eventImage || "/placeholder.svg"}
                alt={ticket.eventTitle}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">Event Date</p>
                  <p className="font-medium">
                    {new Date(ticket.eventDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">Venue</p>
                  <p className="font-medium">{ticket.eventVenue}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ticket ID</span>
                <span className="font-mono font-medium">{ticket.qrCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchase Date</span>
                <span className="font-medium">{new Date(ticket.purchaseDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price Paid</span>
                <span className="font-bold text-lg">${ticket.price.toFixed(2)}</span>
              </div>
            </div>

            {ticket.status === "valid" && (
              <>
                <Separator />

                {!showQR ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">View QR Code</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Enter your PIN to display the QR code for entry
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pin">PIN Code</Label>
                      <div className="flex gap-2">
                        <Input
                          id="pin"
                          type="password"
                          placeholder="Enter PIN (try: 1234)"
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                          maxLength={4}
                        />
                        <Button onClick={handleViewQR}>View QR</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center space-y-4">
                      <h3 className="font-semibold">Your Entry QR Code</h3>
                      <div className="inline-block p-8 bg-white rounded-lg">
                        <img
                          src={`/qr-code.png?height=200&width=200&query=qr code ${ticket.qrCode}`}
                          alt="QR Code"
                          className="w-48 h-48"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">Show this QR code at the venue entrance</p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Transfer Ticket</h3>
                    <p className="text-sm text-muted-foreground mb-4">Send this ticket to someone else via email</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transfer-email">Recipient Email</Label>
                    <div className="flex gap-2">
                      <Input
                        id="transfer-email"
                        type="email"
                        placeholder="recipient@example.com"
                        value={transferEmail}
                        onChange={(e) => setTransferEmail(e.target.value)}
                      />
                      <Button onClick={handleTransfer} className="gap-2">
                        <Send className="h-4 w-4" />
                        Transfer
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
