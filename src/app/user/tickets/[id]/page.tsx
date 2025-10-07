"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/common/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { mockTickets } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Send, 
  QrCode,
  Download,
  Copy,
  Check,
  Shield,
  Lock,
  Share2,
  Clock,
  User,
  RefreshCw,
  AlertTriangle
} from "lucide-react"

export default function TicketDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const ticket = mockTickets.find((t) => t.id === params.id)

  const [pin, setPin] = useState("")
  const [isPinVerified, setIsPinVerified] = useState(false)
  const [transferEmail, setTransferEmail] = useState("")
  const [transferLoading, setTransferLoading] = useState(false)
  const [qrGenerated, setQrGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showFullScreenQR, setShowFullScreenQR] = useState(false)
  const [attempts, setAttempts] = useState(0)

  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <div className="container px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-white">Ticket Not Found</h1>
            <Button onClick={() => router.back()} className="bg-green-600 hover:bg-green-700">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Enhanced PIN verification with attempts tracking
  const handlePinVerification = () => {
    if (pin === "1234") { // Demo PIN - in real app, this would be unique per ticket
      setIsPinVerified(true)
      setQrGenerated(true)
      setAttempts(0)
      toast({
        title: "PIN Verified ✓",
        description: "Access granted to your ticket features",
      })
    } else {
      setAttempts(prev => prev + 1)
      if (attempts >= 2) {
        toast({
          title: "Too Many Attempts",
          description: "Please wait 30 seconds before trying again",
          variant: "destructive",
        })
        // In real app, implement actual lockout
      } else {
        toast({
          title: "Invalid PIN",
          description: `Incorrect PIN. ${3 - attempts - 1} attempts remaining`,
          variant: "destructive",
        })
      }
    }
  }

  // Generate QR Code with animation
  const generateQRCode = () => {
    setQrGenerated(true)
    toast({
      title: "QR Code Generated ✓",
      description: "Your entry QR code is ready for scanning",
    })
  }

  // Enhanced ticket transfer with validation
  const handleTransfer = async () => {
    if (!transferEmail) {
      toast({
        title: "Email Required",
        description: "Please enter recipient's email address",
        variant: "destructive",
      })
      return
    }

    if (!isPinVerified) {
      toast({
        title: "PIN Verification Required",
        description: "Please verify your PIN before transferring",
        variant: "destructive",
      })
      return
    }

    setTransferLoading(true)
    
    // Simulate API call with proper loading
    setTimeout(() => {
      setTransferLoading(false)
      toast({
        title: "Transfer Initiated ✓",
        description: `Transfer request sent to ${transferEmail}. They will receive an email with instructions.`,
      })
      setTransferEmail("")
    }, 2000)
  }

  // Copy ticket code to clipboard
  const copyTicketCode = () => {
    navigator.clipboard.writeText(ticket.ticketCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Ticket code copied to clipboard",
    })
  }

  // Download QR code as image
  const downloadQR = () => {
    // In real app, this would generate and download actual QR image
    toast({
      title: "Download Started",
      description: "QR code image download initiated",
    })
  }

  // Share ticket
  const shareTicket = () => {
    if (navigator.share) {
      navigator.share({
        title: ticket.eventTitle,
        text: `Check out my ticket for ${ticket.eventTitle}!`,
        url: window.location.href,
      })
    } else {
      copyTicketCode()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <div className="container px-4 py-8 space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.back()} 
            className="gap-2 border-zinc-700 hover:border-green-500 text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tickets
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Ticket Management</h1>
            <p className="text-gray-400">Secure access and transfer options</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Ticket Card */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white">{ticket.eventTitle}</CardTitle>
                    <CardDescription className="mt-2 text-green-400 font-semibold">{ticket.categoryName}</CardDescription>
                  </div>
                  <Badge
                    className={
                      ticket.status === "active" 
                        ? "bg-green-500/20 text-green-400 border-green-500/50" 
                        : ticket.status === "used" 
                        ? "bg-gray-500/20 text-gray-400 border-gray-500/50" 
                        : "bg-red-500/20 text-red-400 border-red-500/50"
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
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-gray-400">Event Date</p>
                      <p className="font-medium text-white">
                        {new Date(ticket.eventDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-gray-400">Time</p>
                      <p className="font-medium text-white">
                        {new Date(ticket.eventDate).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-gray-400">Venue</p>
                      <p className="font-medium text-white">{ticket.venue}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-gray-400">Seat</p>
                      <p className="font-medium text-white">{ticket.seatInfo}</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-zinc-700" />

                {/* Ticket Information */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Ticket ID</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium text-white">{ticket.ticketCode}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyTicketCode}
                        className="h-8 w-8 p-0 hover:bg-zinc-800"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-gray-400" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Purchase Date</span>
                    <span className="font-medium text-white">{new Date(ticket.purchaseDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price Paid</span>
                    <span className="font-bold text-lg text-white">${ticket.price.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - QR Code & Actions */}
          <div className="space-y-6">
            {/* PIN & QR Code Section */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="h-5 w-5 text-green-400" />
                  Security Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isPinVerified ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pin" className="text-white">Enter PIN to unlock features</Label>
                      <div className="flex gap-2">
                        <Input
                          id="pin"
                          type="password"
                          placeholder="4-digit PIN"
                          value={pin}
                          onChange={(e) => setPin(e.target.value.slice(0, 4))}
                          maxLength={4}
                          className="bg-zinc-800 border-zinc-700 text-white"
                        />
                        <Button 
                          onClick={handlePinVerification}
                          disabled={pin.length !== 4 || attempts >= 3}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Lock className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">Demo PIN: 1234</p>
                      {attempts > 0 && (
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-red-400">
                            {attempts >= 3 ? "Account locked. Contact support." : `${attempts}/3 failed attempts`}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <Check className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <p className="text-green-400 font-semibold">PIN Verified</p>
                      <p className="text-xs text-gray-400">All features unlocked</p>
                    </div>

                    {/* QR Code Generation */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">Entry QR Code</h4>
                      <div className="w-full aspect-square bg-white rounded-lg flex items-center justify-center relative overflow-hidden">
                        {qrGenerated ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-center"
                          >
                            <QrCode className="h-32 w-32 mx-auto text-black mb-2" />
                            <p className="text-xs text-black font-semibold">Scan at venue</p>
                          </motion.div>
                        ) : (
                          <div className="text-center text-gray-600">
                            <QrCode className="h-16 w-16 mx-auto mb-2" />
                            <p className="text-sm">Generate QR</p>
                          </div>
                        )}
                      </div>

                      {!qrGenerated ? (
                        <Button 
                          onClick={generateQRCode}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <QrCode className="h-4 w-4 mr-2" />
                          Generate QR Code
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <Button 
                            onClick={() => setShowFullScreenQR(true)}
                            className="w-full bg-green-600 hover:bg-green-700"
                          >
                            <QrCode className="h-4 w-4 mr-2" />
                            Full Screen QR
                          </Button>
                          <Button 
                            onClick={downloadQR}
                            variant="outline"
                            className="w-full border-zinc-700 hover:border-green-500 text-white"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download QR
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Transfer Section */}
            {ticket.transferable && (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Transfer Ticket</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="transfer-email" className="text-white">Recipient Email</Label>
                    <Input
                      id="transfer-email"
                      type="email"
                      placeholder="recipient@example.com"
                      value={transferEmail}
                      onChange={(e) => setTransferEmail(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      disabled={!isPinVerified}
                    />
                  </div>

                  <Button
                    onClick={handleTransfer}
                    disabled={transferLoading || !transferEmail || !isPinVerified}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {transferLoading ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {transferLoading ? "Processing..." : "Transfer Ticket"}
                  </Button>

                  <Alert>
                    <AlertDescription className="text-sm text-gray-400">
                      {!isPinVerified 
                        ? "PIN verification required for transfers" 
                        : "Transfer will revoke your access to this ticket"}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}

            {/* Share Section */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Share</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline"
                  className="w-full border-zinc-700 hover:border-green-500 text-white"
                  onClick={shareTicket}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Ticket Info
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full Screen QR Modal */}
        <Dialog open={showFullScreenQR} onOpenChange={setShowFullScreenQR}>
          <DialogContent className="max-w-md bg-white p-8">
            <DialogHeader>
              <DialogTitle className="text-center text-black">Entry QR Code</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-64 h-64 flex items-center justify-center bg-white border-4 border-gray-200 rounded-lg">
                <QrCode className="h-48 w-48 text-black" />
              </div>
              <div className="text-center text-black">
                <p className="font-semibold">{ticket.eventTitle}</p>
                <p className="text-sm text-gray-600">{ticket.ticketCode}</p>
                <p className="text-xs text-gray-500 mt-2">Show this QR code at venue entrance</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
  