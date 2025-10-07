"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/common/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockEvents } from "@/lib/mock-data"
import { Calendar, MapPin, Users, ArrowLeft, Minus, Plus } from "lucide-react"

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const event = mockEvents.find((e) => e.id === params.id)

  const [selectedCategories, setSelectedCategories] = useState<Record<string, number>>({})

  if (!event) {
    return <div>Event not found</div>
  }

  const updateQuantity = (categoryId: string, delta: number) => {
    setSelectedCategories((prev) => {
      const current = prev[categoryId] || 0
      const newValue = Math.max(0, Math.min(10, current + delta))
      if (newValue === 0) {
        const { [categoryId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [categoryId]: newValue }
    })
  }

  const totalAmount = Object.entries(selectedCategories).reduce((sum, [catId, qty]) => {
    const category = event.categories.find((c) => c.id === catId)
    return sum + (category?.price || 0) * qty
  }, 0)

  const totalTickets = Object.values(selectedCategories).reduce((sum, qty) => sum + qty, 0)

  const handleCheckout = () => {
    if (totalTickets === 0) return
    const items = Object.entries(selectedCategories)
      .map(([catId, qty]) => `${catId}:${qty}`)
      .join(",")
    const url = `/checkout?eventId=${encodeURIComponent(event.id)}&items=${encodeURIComponent(items)}`
    router.push(url)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container px-4 py-8 space-y-8">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
                <p className="text-muted-foreground">Organized by {event.agencyName}</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {new Date(event.startDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    • {new Date(event.startDate).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>
                    {event.venue}, {event.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>
                    {event.categories.reduce((sum, cat) => sum + cat.soldTickets, 0).toLocaleString()} / {event.categories.reduce((sum, cat) => sum + cat.totalTickets, 0).toLocaleString()} tickets sold
                  </span>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-semibold mb-3">About This Event</h2>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-semibold mb-4">Select Tickets</h2>
                <div className="space-y-3">
                  {event.categories.map((category) => (
                    <Card key={category.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {category.availableTickets} of {category.totalTickets} available
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <p className="text-lg font-bold">${category.price.toFixed(2)}</p>

                            {category.availableTickets > 0 ? (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => updateQuantity(category.id, -1)}
                                  disabled={!selectedCategories[category.id]}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-medium">
                                  {selectedCategories[category.id] || 0}
                                </span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => updateQuantity(category.id, 1)}
                                  disabled={(selectedCategories[category.id] || 0) >= Math.min(10, category.availableTickets)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <Badge variant="secondary">Sold Out</Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your ticket selection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {totalTickets === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No tickets selected</p>
                ) : (
                  <>
                    <div className="space-y-2">
                      {Object.entries(selectedCategories).map(([catId, qty]) => {
                        const category = event.categories.find((c) => c.id === catId)
                        if (!category) return null
                        return (
                          <div key={catId} className="flex justify-between text-sm">
                            <span>
                              {category.name} × {qty}
                            </span>
                            <span className="font-medium">${(category.price * qty).toFixed(2)}</span>
                          </div>
                        )
                      })}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Service Fee</span>
                        <span>${(totalAmount * 0.05).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${(totalAmount * 1.05).toFixed(2)}</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                      Proceed to Checkout
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
