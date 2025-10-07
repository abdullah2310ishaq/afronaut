"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/ui/stat-card"
import { mockEvents, mockEmployees } from "@/lib/mock-data"
import { Calendar, Users, DollarSign, Plus, Edit, Trash2, UserPlus, LogOut } from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

export default function AgencyDashboard() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const router = useRouter()

    useEffect(() => {
    if (!isAuthenticated || user?.role !== "agency") {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (isAuthenticated === false || (isAuthenticated && user && user.role !== "agency")) {
    return null
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-black pt-20 pb-12 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const agencyEvents = mockEvents.filter((e) => e.agencyId === user.id)
  const totalRevenue = agencyEvents.reduce((sum, e) => sum + e.totalRevenue, 0)
  const totalSold = agencyEvents.reduce((sum, e) => sum + e.categories.reduce((catSum, cat) => catSum + cat.soldTickets, 0), 0)

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Agency Dashboard</h1>
            <p className="text-gray-400">Manage your events and team</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/agency/events/create">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </Link>
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
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Events"
            value={agencyEvents.length.toString()}
            icon={Calendar}
            trend={{ value: 2, isPositive: true }}
            delay={0}
          />
          <StatCard
            title="Active Events"
            value={agencyEvents.filter((e) => e.status === "active").length.toString()}
            icon={Calendar}
            delay={0.1}
          />
          <StatCard
            title="Tickets Sold"
            value={totalSold.toLocaleString()}
            icon={Users}
            trend={{ value: 156, isPositive: true }}
            delay={0.2}
          />
          <StatCard
            title="Revenue"
            value={`$${(totalRevenue / 1000).toFixed(0)}K`}
            icon={DollarSign}
            trend={{ value: 18, isPositive: true }}
            delay={0.3}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <div className="p-6">
                <div className="space-y-4">
                  {agencyEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 p-4 bg-black border border-zinc-800 rounded-lg hover:border-green-500/50 transition-all group"
                    >
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{event.title}</h3>
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
                        <p className="text-sm text-gray-400 mb-3">
                          {new Date(event.startDate).toLocaleDateString()} • {new Date(event.startDate).toLocaleTimeString()} • {event.venue}
                        </p>

                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-2xl font-bold text-white">{event.categories.reduce((sum, cat) => sum + cat.soldTickets, 0)}</p>
                            <p className="text-xs text-gray-400">Tickets Sold</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-400">{event.categories.reduce((sum, cat) => sum + cat.totalTickets, 0)}</p>
                            <p className="text-xs text-gray-400">Total Capacity</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-green-400">
                              {((event.categories.reduce((sum, cat) => sum + cat.soldTickets, 0) / event.categories.reduce((sum, cat) => sum + cat.totalTickets, 0)) * 100).toFixed(0)}%
                            </p>
                            <p className="text-xs text-gray-400">Sold</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-zinc-700 hover:border-green-500 bg-transparent"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-zinc-700 hover:border-red-500 text-red-400 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}

                  {agencyEvents.length === 0 && (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">No events yet</h3>
                      <p className="text-gray-500 mb-6">Create your first event to get started</p>
                      <Link href="/dashboard/agency/events/create">
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Event
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees" className="space-y-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Team Members</h2>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Employee
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between p-4 bg-black border border-zinc-800 rounded-lg hover:border-green-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{employee.name}</h3>
                          <p className="text-sm text-gray-400">{employee.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 mr-8">
                        <div className="text-center">
                          <p className="text-xl font-bold text-white">{employee.assignedEvents.length}</p>
                          <p className="text-xs text-gray-400">Events</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-green-400">{employee.scansCount}</p>
                          <p className="text-xs text-gray-400">Scans</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-zinc-700 hover:border-green-500 bg-transparent"
                        >
                          Assign Events
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-zinc-700 hover:border-red-500 text-red-400 bg-transparent"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
