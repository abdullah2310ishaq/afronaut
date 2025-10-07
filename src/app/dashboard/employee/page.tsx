"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/ui/stat-card"
import { mockEvents, mockEmployees } from "@/lib/mock-data"
import { QrCode, Calendar, CheckCircle2, XCircle, Scan, LogOut } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EmployeeDashboard() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null)

    useEffect(() => {
    if (!isAuthenticated || user?.role !== "employee") {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (isAuthenticated === false || (isAuthenticated && user && user.role !== "employee")) {
    return null
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-black pt-20 pb-12 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const employee = mockEmployees.find((e) => e.id === user.id)
  const assignedEvents = mockEvents.filter((e) => employee?.assignedEvents.includes(e.id))

  const handleStartScanning = () => {
    setScanning(true)
    // Simulate scanning after 2 seconds
    setTimeout(() => {
      const isValid = Math.random() > 0.3 // 70% success rate
      setScanResult({
        success: isValid,
        message: isValid ? "Ticket validated successfully!" : "Invalid ticket or already used",
      })
      setScanning(false)

      // Clear result after 3 seconds
      setTimeout(() => setScanResult(null), 3000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Scanner Dashboard</h1>
            <p className="text-gray-400">Validate tickets at event entrances</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              logout()
              router.push("/")
            }}
            className="gap-2 border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Assigned Events"
            value={assignedEvents.length.toString()}
            icon={Calendar}
            delay={0}
          />
          <StatCard
            title="Total Scans"
            value={employee?.scansCount.toString() || "0"}
            icon={QrCode}
            delay={0.1}
          />
          <StatCard
            title="Today's Scans"
            value="47"
            icon={CheckCircle2}
            trend={{ value: 12, isPositive: true }}
            delay={0.2}
          />
        </div>

        {/* Scanner Section */}
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">QR Code Scanner</h2>

            <div className="max-w-md mx-auto">
              {!scanning && !scanResult && (
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto mb-6 bg-black border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-zinc-700" />
                  </div>
                  <Button onClick={handleStartScanning} className="bg-green-600 hover:bg-green-700 w-full py-6 text-lg">
                    <Scan className="w-5 h-5 mr-2" />
                    Start Scanning
                  </Button>
                </div>
              )}

              {scanning && (
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto mb-6 bg-black border-2 border-green-500 rounded-lg flex items-center justify-center animate-pulse">
                    <div className="relative">
                      <QrCode className="w-32 h-32 text-green-500" />
                      <div className="absolute inset-0 border-2 border-green-500 animate-ping rounded-lg" />
                    </div>
                  </div>
                  <p className="text-green-400 text-lg font-semibold">Scanning...</p>
                </div>
              )}

              {scanResult && (
                <div className="text-center">
                  <div
                    className={`w-64 h-64 mx-auto mb-6 rounded-lg flex items-center justify-center ${
                      scanResult.success
                        ? "bg-green-500/20 border-2 border-green-500"
                        : "bg-red-500/20 border-2 border-red-500"
                    }`}
                  >
                    {scanResult.success ? (
                      <CheckCircle2 className="w-32 h-32 text-green-500" />
                    ) : (
                      <XCircle className="w-32 h-32 text-red-500" />
                    )}
                  </div>
                  <p className={`text-lg font-semibold mb-4 ${scanResult.success ? "text-green-400" : "text-red-400"}`}>
                    {scanResult.message}
                  </p>
                  <Button
                    onClick={() => setScanResult(null)}
                    variant="outline"
                    className="border-zinc-700 hover:border-green-500"
                  >
                    Scan Next Ticket
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Assigned Events */}
        <Card className="bg-zinc-900 border-zinc-800">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Assigned Events</h2>

            <div className="space-y-4">
              {assignedEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 bg-black border border-zinc-800 rounded-lg hover:border-green-500/50 transition-colors"
                >
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">{event.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {new Date(event.startDate).toLocaleDateString()} • {new Date(event.startDate).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-500">{event.venue}</p>
                  </div>

                  <div className="text-center mr-4">
                    <p className="text-2xl font-bold text-white">{event.categories.reduce((sum, cat) => sum + cat.soldTickets, 0)}</p>
                    <p className="text-xs text-gray-400">Expected Attendees</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
