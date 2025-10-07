
"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/ui/stat-card"
import { mockStats, mockAgencies, mockEvents } from "@/lib/mock-data"
import { BarChart3, Users, Calendar, DollarSign, LogOut } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if clearly not authenticated or wrong role
    if (isAuthenticated === false || (isAuthenticated && user && user.role !== "admin")) {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (isAuthenticated === false || (isAuthenticated && user && user.role !== "admin")) {
    return null
    // Show loading or nothing while checking auth
  }

  if (!isAuthenticated || !user) {
    // Show loading if auth state is still initializing
    return (
      <div className="min-h-screen bg-black pt-20 pb-12 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const activeAgencies = mockAgencies.filter((a) => a.stats && a.stats.isActive).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.05),transparent_50%)]" />
      <div className="relative pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent mb-3">
                Admin Dashboard
              </h1>
              <p className="text-lg text-zinc-400">Platform overview and management</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Button
                variant="outline"
                onClick={() => {
                  logout()
                  router.push("/")
                }}
                className="gap-2 border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/50 transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Events"
              value={mockStats.totalEvents.toString()}
              icon={Calendar}
              trend={{ value: 12, isPositive: true }}
              delay={0}
            />
            <StatCard
              title="Active Agencies"
              value={activeAgencies.toString()}
              icon={Users}
              trend={{ value: 3, isPositive: true }}
              delay={0.1}
            />
            <StatCard
              title="Tickets Sold"
              value={mockStats.totalTicketsSold.toLocaleString()}
              icon={BarChart3}
              trend={{ value: 18, isPositive: true }}
              delay={0.2}
            />
            <StatCard
              title="Total Revenue"
              value={`$${(mockStats.totalRevenue / 1000).toFixed(0)}K`}
              icon={DollarSign}
              trend={{ value: 24, isPositive: true }}
              delay={0.3}
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="agencies" className="space-y-6">
            <TabsList className="bg-zinc-900 border border-zinc-800">
              <TabsTrigger value="agencies">Agencies</TabsTrigger>
              <TabsTrigger value="events">All Events</TabsTrigger>
            </TabsList>

            {/* Agencies Tab */}
            <TabsContent value="agencies" className="space-y-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Agencies</h2>
                    <Button className="bg-green-600 hover:bg-green-700">Add Agency</Button>
                  </div>
                  <div className="space-y-4">
                    {mockAgencies.map((agency) => (
                      <div
                        key={agency.id}
                        className="flex items-center justify-between p-4 bg-black border border-zinc-800 rounded-lg hover:border-green-500/50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{agency.name}</h3>
                            <Badge
                              variant={agency.role === "agency" ? "default" : "destructive"}
                              className={
                                agency.role === "agency" ? "bg-green-500/20 text-green-400 border-green-500/50" : ""
                              }
                            >
                              {agency.role === "agency" ? "active" : "inactive"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">{agency.email}</p>
                        </div>
                        <div className="flex items-center gap-8 mr-8">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-white">{agency.stats?.eventsCount || 0}</p>
                            <p className="text-xs text-gray-400">Events</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-400">
                              ${((agency.stats?.totalRevenue || 0) / 1000).toFixed(0)}K
                            </p>
                            <p className="text-xs text-gray-400">Revenue</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-zinc-700 hover:border-green-500 bg-transparent"
                          >
                            View
                          </Button>
                          {agency.role === "agency" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-zinc-700 hover:border-red-500 bg-transparent"
                            >
                              Suspend
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-zinc-700 hover:border-green-500 bg-transparent"
                            >
                              Activate
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">All Events</h2>
                  <div className="space-y-4">
                    {mockEvents.map((event) => (
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
                            <Badge
                              variant={event.status === "active" ? "default" : "secondary"}
                              className={
                                event.status === "active"
                                  ? "bg-green-500/20 text-green-400 border-green-500/50"
                                  : "bg-zinc-800 text-gray-400"
                              }
                            >
                              {event.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {new Date(event.startDate).toLocaleDateString()} • {event.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-6 mr-4">
                          <div className="text-center">
                            <p className="text-xl font-bold text-white">
                              {event.categories?.reduce((sum, cat) => sum + cat.soldTickets, 0) || 0}
                            </p>
                            <p className="text-xs text-gray-400">Sold</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xl font-bold text-gray-400">
                              {event.categories?.reduce((sum, cat) => sum + cat.totalTickets, 0) || 0}
                            </p>
                            <p className="text-xs text-gray-400">Capacity</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-zinc-700 hover:border-green-500 bg-transparent"
                        >
                          Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>


          </Tabs>
        </div>
      </div>
    </div>
  )
}
